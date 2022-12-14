import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatExpansionModule} from '@angular/material/expansion'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDividerModule} from '@angular/material/divider'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent} from './posts/post-create.component'
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts/posts.service';
import { LoginComponent } from './auth/login/login-component';
import { SignUpComponent } from './auth/signup/signup-component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDividerModule,
    FormsModule
    
    
  ],
  providers: [PostsService, [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
