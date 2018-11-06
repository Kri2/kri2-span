import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private apiService:ApiServiceService) { }

  public cars:Array<object>=[];
  ngOnInit() {
    this.getCars();
  }

  getCars(){
    this.apiService.getCars().subscribe(
      (data:Array<object>)=>{
        this.cars=data; 
        console.log(data);
      });
  }
}
