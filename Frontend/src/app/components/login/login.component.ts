import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  data = {
    'email': "",
    'password': "",
  }

  constructor(private webRequestService: WebRequestService,  private router: Router,) { }

  ngOnInit(): void {

  }

  ValidateEmail(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)){
      return true;
    }

  }

  submit(){
  if(this.email == '' || this.password == '' ){
        alert("error! Please enter all the values!");
      }
      else if(!this.ValidateEmail(this.email)){
        alert("error! Please enter a valid email adress!");
      } else{
        this.data.email = this.email;
        this.data.password = this.password;
        console.log(this.data); 
        this.webRequestService.post('api/login',this.data).subscribe(
          (resp) => {
            this.router.navigate(['/home'])
            alert("Success")
          }, (err) => {
            console.log(err);
              alert("error Occured");
          }
        );
      }
  }
}
