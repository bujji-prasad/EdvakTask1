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
},
{
    path : "home",
    loadComponent : () => {
        return import("../app/components/home/home.component")
        .then(m => m.HomeComponent)
    }
},
{
    path : "addTask",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},
{
    path : "tasks",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},
{
    path : "",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},
{
    path : "deleteTask/:taskId",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},

{
    path : "taskEdit/:taskId",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},

{
    path : "task/:taskId",
    loadComponent : () => {
        return import("../app/components/task/task.component")
        .then(m => m.TaskComponent)
    }
},

];
