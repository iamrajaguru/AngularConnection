import { Component, OnInit } from '@angular/core';
import { login } from '../../login';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObject: login = {
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private head: HttpHeaders, private route: Router) {}

  ngOnInit() {}

  loginCall() {
    console.log('works' + this.loginObject.email);
    this.http.post('http://localhost:3000/login', this.loginObject, { observe: 'response' }).subscribe(
      resp => {
        const token = this.head.get('MyToken');
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        console.log('success');
        console.log(resp);
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
