import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  message = "";

  blogs = []

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user',{
      withCredentials: true
    }).subscribe( (res:any) => {
      this.message = 'Logged in as: '+res.name;
      Emitters.authEmitter.emit(true);
    },(err) => {
        this.message = " You Are Not Logged in";
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/login'])
    }
    );
    this.getBlogs();

  }

  openCreateBlogDialog(){
    this.router.navigate(['/blogDetails'])
  }

  getBlogs(){
    this.http.get('http://localhost:5000/api/posts').subscribe((res:any) => {
      this.blogs = res;
      console.log(res);
    },(err) => {
      console.log(err);
    })
  }

}
