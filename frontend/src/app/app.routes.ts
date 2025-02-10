import { Routes } from '@angular/router';

export const routes: Routes = [{
    path : "",
    pathMatch : "full",
    loadComponent : () => {
        return import("../app/components/about/about.component")
        .then(m => m.AboutComponent)
    }
},
{
    path : "signup",
    loadComponent : () => {
        return import("../app/components/signup/signup.component")
        .then(m => m.SignupComponent)
    }
},
{
    path : "login",
    loadComponent : () => {
        return import("../app/components/login/login.component")
        .then(m => m.LoginComponent)
    }
}];
