import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthLogoWidget } from '@/pages/auth/components/authlogowidget';
import { GoogleWidget } from '@/pages/auth/components/googlewidget';
import { AppleWidget } from '@/pages/auth/components/applewidget';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';


import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule  } from '@abacritt/angularx-social-login';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { ToastrService,ToastrModule } from 'ngx-toastr';  

//import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, AuthLogoWidget, GoogleWidget, AppleWidget, RouterModule, InputTextModule, FormsModule, CheckboxModule, ButtonModule,GoogleSigninButtonModule],
    template: `
        <section class="animate-fadein animate-duration-300 animate-ease-in relative lg:pb-14 lg:py-52 py-36">
            <div class="landing-container mx-auto relative z-10 px-12">
                <div class="relative mt-28 max-w-[46rem] mx-auto">
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[4deg] lg:rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <div
                        class="w-full h-full inset-0 bg-white/64 dark:bg-surface-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] lg:-rotate-[7deg] backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)] dark:shadow-sm"
                    ></div>
                    <form
                        class="space-y-8 p-8 relative z-10 bg-white/64 dark:bg-surface-800 backdrop-blur-[90px] rounded-3xl shadow-[0px_87px_24px_0px_rgba(120,149,206,0.00),0px_56px_22px_0px_rgba(120,149,206,0.01),0px_31px_19px_0px_rgba(120,149,206,0.03),0px_14px_14px_0px_rgba(120,149,206,0.04),0px_3px_8px_0px_rgba(120,149,206,0.06)]"
                    >
                        <div class="pt-8 pb-8">
                            <div class="flex items-center justify-center">
                                <auth-logo-widget />
                            </div>
                            <h1 class="text-4xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 text-center">Login</h1>
                            <p class="text-center lg:text-xl text-surface-500 dark:text-white/64 mt-6 max-w-sm mx-auto">Enter your username and password to access your account.</p>
                        </div>
                        <div class="flex md:flex-row flex-col items-center gap-4">
                        <div class="wrapper">
                            <!-- Hidden Google Sign-In Button -->
                            <asl-google-signin-button #aslGoogleSigninButton type="icon" size="large" shape="rectangular" style="display: none;"></asl-google-signin-button>
                            
                            <!-- PrimeNG Custom Button -->
                            <button pButton type="button" label="Sign in with Google" icon="pi pi-google" class="p-button-raised" (click)="loginWithGoogle()"></button>
                        </div>
                            <!--<a 
                                routerLink=""
                                class="w-full md:flex-1 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium text-surface-700 dark:text-surface-200 border border-surface shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            >
                                <p-button (click)="signInWithGoogle()">
                                <google-widget />
                                Sign in with Google
                                </p-button>
                                
                            </a>-->
                            <a
                                routerLink=""
                                class="w-full md:flex-1 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium text-surface-700 dark:text-surface-200 border border-surface shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)] hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                            >
                                <apple-widget />
                                Sign in with Google
                            </a>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="h-px w-full bg-primary-500/10"></span>
                            <span class="text-surface-400">or</span>
                            <span class="h-px w-full bg-primary-500/10"></span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email" class="font-medium text-surface-500 dark:text-white/64">Email Address</label>
                            <input name="email" pInputText id="email" [(ngModel)]="email" class="w-full" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="password" class="font-medium text-surface-500 dark:text-white/64">Password</label>
                            <input name="password" pInputText id="password" type="password" [(ngModel)]="password" class="w-full" />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <p-checkbox name="remember" id="remember" [(ngModel)]="remember" binary />
                                <label for="remember" class="text-surface-500 dark:text-white/64">Remember me</label>
                            </div>
                            <a routerLink="" class="font-semibold text-primary">Forgot password?</a>
                        </div>
                        <p-button styleClass="w-full mt-8" rounded>Login</p-button>
                        <div class="flex items-center justify-center gap-2">
                            <span class="text-surface-500 dark:text-white/64">Not registered?</span>
                            <a routerLink="/landing/login" class="text-primary">Create an Account</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class Login implements AfterViewInit {
    //private router: Router;
    @ViewChild('aslGoogleSigninButton') aslGoogleSigninButton!: ElementRef;
    constructor(private authService: SocialAuthService, private http: HttpClient, private router: Router) {}
    ngAfterViewInit() {
        
    // Subscribe to authentication state
    this.authService.authState.subscribe((user) => {
        console.log('Google User:', user);
        // Define headers
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ user.idToken
        });
        
        this.http.post('https://localhost:7061/api/Users/login', user,{headers}).subscribe({
            next: (response: any) => {
                
                console.log("Backend API response",response);
                // Assuming the response contains a token or some kind of user data
                if (response.success) {
                    console.log("Congratulations");
                    //localStorage.setItem('bctoken', response);  // Save token to localStorage
                    localStorage.setItem('bctoken', JSON.stringify(response));
                    this.router.navigate(['/']);
                
                //this.router.navigate(['/dashboard']);  // Navigate to dashboard after login
                // this.messageService.add({
                //     severity: 'success',
                //     summary: 'Success',
                //     detail: 'Congratulations! Login sucessfull'
                // });
                } else {
                    // this.messageService.add({
                    //     severity: 'error',
                    //     summary: 'Error',
                    //     detail: 'Login failed, please check your credentials'
                    // });
                }
            },
            error: (error) => {
                    // this.messageService.add({
                    //     severity: 'error',
                    //     summary: 'Error',
                    //     detail: 'An error occurred, please try again later'
                    // });
                //this.messageService.error('An error occurred, please try again later');
                console.error('Login error:', error);
            }
        });
    });
  }
  loginWithGoogle(): void {
    if (this.aslGoogleSigninButton) {
      const googleButton = this.aslGoogleSigninButton.nativeElement.querySelector('div[role=button]');
      if (googleButton) {
        googleButton.click(); // Programmatically trigger Google Sign-In
      } else {
        console.error('Google Sign-In button not found');
      }
    }
  }
     user: SocialUser | null = null;
     email: string = '';

     password: string = '';

     remember: boolean = false;
//     constructor(private authService: SocialAuthService) {
//     this.authService.authState.subscribe((user) => {
//         console.log('Login Sucess');
//       this.user = user;
//       if (user) {
//             // Send idToken to your backend for verification
//             console.log('Google ID Token:', user.idToken);
//             // Example: Call your backend API
//             // this.http.post('your-backend-api/auth/google', { idToken: user.idToken }).subscribe();
//         }
//       console.log('User signed in:', user);
//     });
//   }

//   signInWithGoogle(): void {
//     console.log('Login Sucess');
//     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).catch((error) => {
//       console.error('Google Sign-In error:', error);
//     });
//   }
}
