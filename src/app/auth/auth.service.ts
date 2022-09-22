import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model'
import { registerLocaleData } from '@angular/common'
import { response } from 'express'

@Injectable({providedIn: 'root'})
export class AuthService {
    private token: string;


    constructor (private http: HttpClient){}

    getToken(){
        return this.token;
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

            })
    }
        
    
}