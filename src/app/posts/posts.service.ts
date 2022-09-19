import { Post } from "./posts.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable()
export class PostsService{
    private posts: Post[] = []; //private as we do not want it to be edited from outside.
    private postsUpdated = new Subject<Post[]>()

    constructor(private httpClient: HttpClient){}


    getPosts(){
        //return [...this.posts]; //using '...' to create a new array with the old objects. a copy. Reasoning: Changing this array will not effect the private array initialised in the PostSerice class.
        this.httpClient
            .get<{posts: Post[]}>('http://localhost:3000/api/posts')
            .subscribe( (postData)=>{
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
        } );
    }

    // addPost(title:string, content: string){
    //     const post: Post = {title: title, content: content}
    //     this.posts.push(post)
    // }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post:Post){
        this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
            console.log(responseData.message)
            this.posts.push(post)
            this.postsUpdated.next([...this.posts])
        });
        
    }

    deletePost(postId:string){
        this.httpClient.delete('http://localhost:3000/api/posts/'+postId).subscribe(()=>{
            console.log('post deleted.')
        })
    }


}