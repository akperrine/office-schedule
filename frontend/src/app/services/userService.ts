import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://127.0.0.1:5000/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addUser(body: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, body)
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateUser(body: User, id: number): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${id}`, body)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: any): Observable<never> {
    console.log("An error occurred:", error);
    return throwError(() => error);
  }
}
