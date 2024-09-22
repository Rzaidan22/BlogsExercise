import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blogDetails.component.html',
  styleUrls: ['./blogDetails.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  message = "";
  dataSource;
  show = true;
  Title= '';
  Content = '';
  Author = '';


  constructor(private http: HttpClient, private router: Router,) { }

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
    )
  }

  backToHomePage(){
    this.router.navigate(['/home'])
  }

  save(){
    let body = {
      'title':this.Title,
      'content':this.Content,
      'author':this.Author
    }
    if(!this.Title || !this.Content || !this.Author){
      alert('Please Fill in all the attributes Above!');
    }else{
      this.http.post('http://localhost:5000/api/posts',body).subscribe((res:any) => {
        console.log(res);
        window.location.reload();
      },(err) => {
        console.log(err);
      })
    }
  }

}
