import {Component} from '@angular/core'
import { NgForm } from '@angular/forms';
import * as e from 'express';
import { AuthService } from '../auth.service';

@Component({
    templateUrl : './login-component.html',
    styleUrls : ['./login-component.css']
})

export class LoginComponent{
    isLoading = false;

    constructor(public authService: AuthService){}

    onLogin(form :NgForm){

        if (form.valid){
            this.isLoading = true
            this.authService.loginUser(form.value.email, form.value.password)
        }else{
            return
        }
    }

}