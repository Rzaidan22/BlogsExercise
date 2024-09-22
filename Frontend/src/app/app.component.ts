import { Component } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell-project';
  message = "";
  auth = false;

  constructor(private http: HttpClient, private router: Router,){
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user',{
      withCredentials: true
    }).subscribe( (res:any) => {
      this.message = 'Logged in as: '+res.name;
      Emitters.authEmitter.emit(true);
      this.auth = true;
    },(err) => {
        this.message = " You Are Not Logged in";
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/login']);
        this.auth = false;
    }
    )
  }

}
