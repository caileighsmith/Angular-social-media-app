import { Component, OnInit, OnDestroy} from "@angular/core";
import { AuthService } from "../auth/auth.service";

import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    private authListenerSubs: Subscription;
    userIsAuth = false
    constructor(private authService: AuthService){}

    ngOnInit(): void {
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
            this.userIsAuth = isAuthenticated;
        });
    }

    ngOnDestroy(){
        this.authListenerSubs.unsubscribe();
    }

    onLogOut(){
        this.authService.logout();
    }


}