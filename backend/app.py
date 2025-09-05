from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS
from psycopg2 import extras
import os

app = Flask(__name__)
CORS(app)

# Database Configuration 
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_NAME = os.environ.get('DB_NAME', 'office-schedule') 
DB_USER = os.environ.get('DB_USER', 'postgres')    
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password') 

def get_db_connection():
    """Establishes and returns a new database connection."""
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

# API Endpoints

@app.route('/users', methods=['GET'])
def get_users():
    """Fetches all users from the database."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute('SELECT id, username, email FROM users ORDER BY id;')
        users = cur.fetchall()
        print('hit')
        cur.close()
        return jsonify(users)
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"error": "Could not fetch users"}), 500
    finally:
        if conn:
            conn.close()

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Fetches a single user by ID."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute('SELECT id, username, email FROM users WHERE id = %s;', (user_id,))
        user = cur.fetchone()
        cur.close()
        if user:
            return jsonify(user)
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error fetching user {user_id}: {e}")
        return jsonify({"error": "Could not fetch user"}), 500
    finally:
        if conn:
            conn.close()


@app.route('/users', methods=['POST'])
def create_user():
    """Creates a new user."""
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'email')):
        return jsonify({"error": "Missing username or email"}), 400

    username = data['username']
    email = data['email']

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO users (username, email) VALUES (%s, %s) RETURNING id;', (username, email))
        new_user_id = cur.fetchone()[0]
        conn.commit() # Commit the transaction
        cur.close()
        return jsonify({"message": "User created successfully", "id": new_user_id}), 201
    except Exception as e:
        conn.rollback() # Rollback on error
        print(f"Error creating user: {e}")
        return jsonify({"error": "Could not create user"}), 500
    finally:
        if conn:
            conn.close()

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Updates an existing user by ID."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided for update"}), 400

    # Build update query dynamically based on provided fields
    set_clauses = []
    values = []
    if 'username' in data:
        set_clauses.append('username = %s')
        values.append(data['username'])
    if 'email' in data:
        set_clauses.append('email = %s')
        values.append(data['email'])

    if not set_clauses:
        return jsonify({"error": "No valid fields to update"}), 400

    values.append(user_id) # Add user_id for the WHERE clause
    query = f"UPDATE users SET {', '.join(set_clauses)} WHERE id = %s RETURNING id;"

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(query, tuple(values))
        updated_id = cur.fetchone()
        conn.commit()
        cur.close()
        if updated_id:
            return jsonify({"message": "User updated successfully", "id": updated_id[0]})
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        conn.rollback()
        print(f"Error updating user {user_id}: {e}")
        return jsonify({"error": "Could not update user"}), 500
    finally:
        if conn:
            conn.close()

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Deletes a user by ID."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM users WHERE id = %s RETURNING id;', (user_id,))
        deleted_id = cur.fetchone()
        conn.commit()
        cur.close()
        if deleted_id:
            return jsonify({"message": "User deleted successfully", "id": deleted_id[0]})
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        conn.rollback()
        print(f"Error deleting user {user_id}: {e}")
        return jsonify({"error": "Could not delete user"}), 500
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    # For development, run with debug=True.
    # In production, use a production-ready WSGI server like Gunicorn.
    app.run(debug=True, port=5000)
