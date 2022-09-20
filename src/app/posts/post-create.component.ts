import { formatPercent } from "@angular/common";
import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Post } from "./posts.model";
import { PostsService } from "./posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
    //assinging properties
    enteredTitle = '';
    enteredContent = '';

    private mode = 'create'
    private postId: string;
    post: Post;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap:  ParamMap)=>{
            if (paramMap.has('postId')){
                console.log('editing')
                this.mode = 'edit'; //setting mode to edit if there is a given id.
                this.postId = paramMap.get('postId')
                this.postsService.getPost(this.postId).subscribe(postData=>{
                    this.post = {_id: postData._id, title: postData.title, content: postData.content}
                });

            }else{
                console.log('creating')
                this.mode = 'create'
                this.postId = null
            }
        });
    }

    onSavePost(form: NgForm){
        if (form.invalid){
            return
        }
        
        if (this.mode === 'create'){
            this.postsService.addPost(form.value.postTitle, form.value.postContent)
            form.resetForm()
        }else{
            console.log('New title:', form.value.postTitle)
            console.log('New content',form.value.postContent)
            this.postsService.updatePost(this.postId, form.value.postTitle, form.value.postContent)
        }

        

    };

}