import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    name = '';
    email = '';
    password = '';
    data = {
      'name': "",
      'email': "",
      'password': "",
    }
  

  constructor(private http: HttpClient, private router: Router, private webRequestService: WebRequestService) {

   }

  ngOnInit(): void {
   
  }

  ValidateEmail(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true;
    }

  }

  submit(){
    if(this.name == '' || this.email == '' || this.password == '' ){
      alert("error! Please enter all the values!");
    }
    else if(!this.ValidateEmail(this.email)){
      alert("error! Please enter a valid email adress!");
    }else{
      this.data.name = this.name;
      this.data.email = this.email;
      this.data.password = this.password;
      console.log(this.data); 
      this.webRequestService.post('api/register',this.data).subscribe(
        (resp) => {
          this.router.navigate(['/'])
          alert("Success")
        }, (err) => {
          console.log(err);
            alert("error Occured");
        }
      );
    }
  }

}
