import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule,GoogleSigninButtonModule  } from '@abacritt/angularx-social-login';
import { ButtonModule } from 'primeng/button';
//import { ToastrModule } from 'ngx-toastr';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,SocialLoginModule, GoogleSigninButtonModule,ButtonModule,ToastModule ],
    template: `<router-outlet></router-outlet>`
})

export class AppComponent {
  
}
