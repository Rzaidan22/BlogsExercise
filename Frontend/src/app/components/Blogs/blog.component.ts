import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
import { DataSource } from '@angular/cdk/table';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Input() author;
  @Input() _id;

  message = "";
  dataSource;
  show = true;
  name;
  date;




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
    )
  }

  delete(){
    this.http.delete('http://localhost:5000/api/posts/'+this._id).subscribe((res:any) => {
      console.log(res);
      window.location.reload();
    },(err) => {
      console.log(err);
    })
  }

  edit(){
    let body = {
      'title':this.title,
      'content':this.content,
      'author':this.author
    }
    this.http.put('http://localhost:5000/api/posts/'+this._id,body).subscribe((res:any) => {
      console.log(res);
      window.location.reload();
    },(err) => {
      console.log(err);
    })
  }

}
