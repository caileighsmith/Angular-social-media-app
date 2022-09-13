import { Component } from "@angular/core";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    //assinging properties
    newPost = 'Empty post.'; 
    enteredValue = ''; //two way binding. Entered value is a prop we bind to the HTML.

    onAddPost(){
        if (this.enteredValue.length != 0){
            //chaning the property, need to use 'this' as it is in a class.
            this.newPost = this.enteredValue; //binding the newPost to the entered value on the textarea.
        }else{
            alert('Post needs to be at least one character long.')
        }

    }

}