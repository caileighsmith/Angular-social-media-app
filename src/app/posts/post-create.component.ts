import { Component, EventEmitter, Output} from "@angular/core";

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

    onAddPost(){
        if (this.enteredContent.length>0 && this.enteredTitle.length > 0){
            const post:Post = { //creating a post to push.
                title: this.enteredTitle,
                content: this.enteredContent
            };
            this.postCreated.emit(post)
        }else{

        }
        

    };

}