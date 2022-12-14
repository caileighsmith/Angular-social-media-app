import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model'
import { registerLocaleData } from '@angular/common'
import { response } from 'express'
import { Router } from '@angular/router'
import {Subject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor (private http: HttpClient, private router: Router){}

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated
    }

    registerUser(email: string, password: string){
        const authdata: AuthData = {
            email: email,
            password: password
        }
        this.http.post('http://localhost:3000/api/user/signup', authdata)
            .subscribe(response=>{
                console.log(response)
            })
    }

    loginUser(email: string, password: string){
        const authdata: AuthData = {
            email: email,
            password: password
        }
        this.http.post<{token: string}>('http://localhost:3000/api/user/login', authdata)
            .subscribe(response=>{
                const token = response.token;
                this.token = token;
                if (token){
                    this.isAuthenticated = true
                    this.authStatusListener.next(true);
                    this.router.navigate(['/'])
                }

            })
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/'])
    }
        
    
}