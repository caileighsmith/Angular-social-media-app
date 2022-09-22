import {Component, OnInit} from "@angular/core";
import {OnDestroy} from "@angular/core"
import { PageEvent } from "@angular/material/paginator";
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

    // for paginator
    totalPosts = 0;
    postsPerPage = 4
    currentPage = 1
    pageSizeOptions = [1, 2, 3, 4, 5, 10]

    private postsSub = new Subscription();

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.isLoading = true
        this.postsService.getPosts(this.postsPerPage, this.currentPage); //fetching posts on init.
        
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number})=>{
            this.totalPosts = postData.postCount
            this.isLoading = false;    
            this.posts = postData.posts;
            }); //observables. Updating the list of posts.
        }

    onDelete(postId: string){
        this.isLoading = true
        this.postsService.deletePost(postId).subscribe(()=>{
            this.postsService.getPosts(this.postsPerPage, this.currentPage)
        })
    }

    
    onChangedPage(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1; //starts at 0
        this.postsPerPage = pageData.pageSize; //setting posts per page to the page size.
        this.postsService.getPosts(this.postsPerPage, this.currentPage) //getting posts based on per page and current.
    }


    ngOnDestroy(): void {
        this.postsSub.unsubscribe(); //ensuring no memory leak. Unsubscriped when this component isn't being used.
    }

}