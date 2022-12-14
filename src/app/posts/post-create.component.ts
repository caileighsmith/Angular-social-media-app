import { formatPercent } from "@angular/common";
import { Component, OnInit} from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Post } from "./posts.model";
import { PostsService } from "./posts.service";
import { mimeType } from "./mime-type.validator";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
    //assinging properties
    enteredTitle = '';
    enteredContent = '';
    isLoading = false;
    form:FormGroup;
    imagePreview: any;
    private mode = 'create'
    postId: string;
    post: Post;
    triedImage = false;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(2)]
            }),
            content : new FormControl(null, {
                validators: [Validators.required]
            }),
            image : new FormControl(null, {
                validators: [Validators.required],
                asyncValidators: [mimeType] //only accepting images.
            })
        })
        this.route.paramMap.subscribe((paramMap:  ParamMap)=>{
            if (paramMap.has('postId')){
                console.log('editing')
                this.mode = 'edit'; //setting mode to edit if there is a given id.
                this.postId = paramMap.get('postId')
                this.isLoading = true;  
                this.postsService.getPost(this.postId).subscribe(postData=>{
                    this.isLoading = false;
                    this.post = {
                        _id: postData._id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: postData.imagePath
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath
                    })
                });
                
            }else{
                this.mode = 'create'
                this.postId = null
            }
        });
    }

    onImagePicked(event: Event){
        this.triedImage = true;
        const file = (event.target as HTMLInputElement).files[0]; //telling JS this is a file from HTML 
        this.form.patchValue({image: file})
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(file);
    }


    onSavePost(){
        if (this.form.invalid){
            return
        }
        this.isLoading = true;
        if (this.mode === 'create'){
            this.postsService.addPost(
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            )
        }else{
            console.log('New title:', this.form.value.title)
            console.log('New content',this.form.value.content)
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image)
        }

        
        this.form.reset()

    };

}