import { Component } from "@angular/core";



@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    //assinging properties
        //Two way binding 'newpost'
    newPost = 'Empty post.';
    
    enteredValue = '';

    onAddPost(){
        //chaning the property, need to use 'this' as it is in a class.
        this.newPost = this.enteredValue;
    }

}