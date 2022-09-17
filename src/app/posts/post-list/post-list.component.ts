import {Component, Input} from "@angular/core"

import { Post } from "../posts.model"


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent{
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
    @Input() posts: Post[] = []

}