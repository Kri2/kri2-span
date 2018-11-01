import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kri2-span';
  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.http.get<UserResponse>('http://kri2-span.herokuapp.com/api/hello-world')
    .subscribe(
        data=>{console.log(data.helloMessage)},
        error=>{console.log("error occured!!!!!")}
    )
  }
}

interface UserResponse{
  helloMessage:string;
}