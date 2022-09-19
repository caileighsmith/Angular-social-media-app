import { Post } from "./posts.model";

export class PostsService{
    private posts: Post[] = []; //private as we do not want it to be edited from outside.


    getPosts(){
        return this.posts; //using '...' to create a new array with the old objects. a copy. Reasoning: Changing this array will not effect the private array initialised in the PostSerice class.
    }

    // addPost(title:string, content: string){
    //     const post: Post = {title: title, content: content}
    //     this.posts.push(post)
    // }
    addPost(post:Post){
        this.posts.push(post)
    }


}