import { Component, OnInit } from '@angular/core';
import { signup } from '../../signup';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupObject: signup = {
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  }

  constructor(private http :HttpClient, private route:Router) { }

  ngOnInit() {
  }
signupCall(){
  console.log("Register"+this.signupObject.email);
 this.http.post('http://localhost:3000/signup',this.signupObject).subscribe(
 data=>{
     console.log(data);
     this.route.navigate(["/","login"]);
 },error=>{

 console.log("Error");
 }
 );
}
}
