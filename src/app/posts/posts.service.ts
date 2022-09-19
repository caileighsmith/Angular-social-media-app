import { Post } from "./posts.model";
import { Subject } from 'rxjs';



export class PostsService{
    private posts: Post[] = []; //private as we do not want it to be edited from outside.
    private postsUpdated = new Subject<Post[]>()

    getPosts(){
        return [...this.posts]; //using '...' to create a new array with the old objects. a copy. Reasoning: Changing this array will not effect the private array initialised in the PostSerice class.
    }

    // addPost(title:string, content: string){
    //     const post: Post = {title: title, content: content}
    //     this.posts.push(post)
    // }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post:Post){
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
    }


}