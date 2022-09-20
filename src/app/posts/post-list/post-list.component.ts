import {Component, OnInit} from "@angular/core";
import {OnDestroy} from "@angular/core"
import { Subscription } from "rxjs";

import { Post } from "../posts.model";
import { PostsService } from "../posts.service";


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    // posts = [ //example data // placeholder data.
    //     {
    //         title: 'First Post',
    //         content: 'This is the first post'
    //     },
    //     {
    //         title: 'Second Post',
    //         content: 'This is the Second post'
    //     },
    //     {
    //         title: 'Third Post',
    //         content: 'This is the Third post'
    //     },
        
    // ];
    posts: Post[] = [];
    isLoading = false;

    private postsSub = new Subscription();

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.isLoading = true
        this.postsService.getPosts(); //fetching posts on init.
        
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[])=>{
            this.isLoading = false;    
            this.posts = posts;
            }); //observables. Updating the list of posts.
        }

    onDelete(postId: string){
        this.postsService.deletePost(postId)
    }

    


    ngOnDestroy(): void {
        this.postsSub.unsubscribe(); //ensuring no memory leak. Unsubscriped when this component isn't being used.
    }

}