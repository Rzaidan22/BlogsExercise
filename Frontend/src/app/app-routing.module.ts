import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './components/Blogs/blog.component';
import { BlogDetailsComponent } from './components/blogDetails/blogDetails.component';


const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'home', component: HomeComponent },
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent },
  {path:'blog', component: BlogComponent },
  {path:'blogDetails', component: BlogDetailsComponent },
  {path:'edit', component: BlogDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
