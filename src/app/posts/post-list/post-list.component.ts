import {Component, OnInit} from "@angular/core"

import { Post } from "../posts.model"
import { PostsService } from "../posts.service"


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit{
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
    posts: Post[] = []

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.posts = this.postsService.getPosts(); //fetching posts.
    }

}