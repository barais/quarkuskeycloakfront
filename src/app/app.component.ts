import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'trajetFront';
  logged = false;

  constructor(private http: HttpClient , private keyCloak: KeycloakService ) {

  }

  ngOnInit(): void {
    this.keyCloak.isLoggedIn().then( e => this.logged = e);
    console.log(this.keyCloak.getUserRoles());


  }

  foo() {
    this.keyCloak.logout();
  }
  login() {
    this.keyCloak.login();
  }

  bar() {
    this.http.get('api/gifts').subscribe(res => {console.log(res)});

  }
}
