import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kri2-span';
  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.http.get<UserResponse>(environment.homeUrl+'/api/hello-world')
    .subscribe(
        data=>{console.log(data.text)},
        error=>{console.log("error occured!!!!!")}
    )
  }
}

interface UserResponse{
  text:string;
}