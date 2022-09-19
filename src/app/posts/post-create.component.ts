import { formatPercent } from "@angular/common";
import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "./posts.model";
import { PostsService } from "./posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    //assinging properties
    enteredTitle = '';
    enteredContent = '';

    constructor(public postsService: PostsService) {}


    onAddPost(form: NgForm){
        if (form.invalid){
            return
        }
        const post:Post = { //creating a post to push.
            title: form.value.postTitle,
            content: form.value.postContent
        };
        this.postsService.addPost(post) //adding a new post, taking the new post Object as a param.
        form.resetForm()

    };

}