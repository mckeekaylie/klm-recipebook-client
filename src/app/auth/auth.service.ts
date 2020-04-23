import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { stringify } from 'querystring';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){}

    // SIGNUP
    signup (email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD9WAGRMXr9NKgJJTg-qMXBX3LJNUM49JU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }
    
    // LOGIN 
    login (email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD9WAGRMXr9NKgJJTg-qMXBX3LJNUM49JU',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    // LOGOUT
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    // HANDLE AUTHENTICATION
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // HANDLE ERRORS
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case ' INVALID_PASSWORD':
                errorMessage = 'This password is incorrect.';
                break;
        }
        return throwError(errorMessage);
    }
}
