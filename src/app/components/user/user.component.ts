import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	username: string;
  password1: string;
  password2: string

  users:User[];

  constructor(private http: Http) {
  }
  ngOnInit() {
  }

  addUser(event){
  console.log('Entro aqui');
  var newUser = {username: this.username,
            password: this.password1};

  var headers = new Headers();
  headers.append('Content-Type','application/json');

  console.log(this.http.post('http://localhost:4200/users', JSON.stringify(newUser), {headers: headers}));

}

}

interface User{
username:string,
password1:string
}

