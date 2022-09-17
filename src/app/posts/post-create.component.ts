import { formatPercent } from "@angular/common";
import { Component, EventEmitter, Output} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "./posts.model";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    //assinging properties
    enteredTitle = '';
    enteredContent = '';
    @Output() postCreated = new EventEmitter<Post>(); //Output() allows the event to be listened to from the outside.

    onAddPost(form: NgForm){
        if (form.invalid){
            return
        }
        const post:Post = { //creating a post to push.
            title: form.value.postTitle,
            content: form.value.postContent
        };
        this.postCreated.emit(post)
        

    };

}