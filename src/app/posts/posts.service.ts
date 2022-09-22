import { Post } from "./posts.model";
import { Subject, throttle } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class PostsService{
    private posts: Post[] = []; //private as we do not want it to be edited from outside.
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>()

    constructor(private httpClient: HttpClient, private router: Router){}

    redirectTo(target: string){
        //Use to redirect the page to the target, string. Example redirectTo('/') -- redirects to root.
        this.router.navigate([target]);

    }

    getPosts(pagesize: number, page: number){
        const queryParams = `?pagesize=${pagesize}&page=${page}`;

        //return [...this.posts]; //using '...' to create a new array with the old objects. a copy. Reasoning: Changing this array will not effect the private array initialised in the PostSerice class.
        this.httpClient
            .get<{posts: Post[], maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
            .pipe(
                map(postData=>{
                    return { posts: postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            _id: post._id,
                            imagePath: post.imagePath
                        }
                    }), maxposts: postData.maxPosts
                }
                })
            )
            .subscribe( (transformedPostData)=>{
                this.posts = transformedPostData.posts;
                this.postsUpdated.next({
                    posts: [...this.posts],
                    postCount: transformedPostData.maxposts
                });
        } );
    }

    // addPost(title:string, content: string){
    //     const post: Post = {title: title, content: content}
    //     this.posts.push(post)
    // }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        return this.httpClient.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' +id);
    }

    addPost(title: string, content: string, image: File){
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
        .subscribe((responseData)=>{
            this.router.navigate(['/'])
        });
        
    }

    updatePost(id: string, title: string, content: string, image: File | string){
        let postData: Post | FormData;

        if (typeof image === 'object'){
            const postData = new FormData()
            postData.append('id', id)
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title)
        }else{
            postData = 
            {
                _id: id,
                title: title,
                content: content,
                imagePath: image
            }
        }

        this.httpClient.put("http://localhost:3000/api/posts/"+ id, postData).subscribe( 
            response=> {
                
                this.router.navigate(["/"])

            }
        )
    
    }

    deletePost(postId:string){
        return this.httpClient.delete('http://localhost:3000/api/posts/'+postId)
    }


}