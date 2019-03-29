import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Car } from '../model/car';
import { Observable } from 'rxjs';
import { getLocalRefs } from '@angular/core/src/render3/discovery_utils';
/**
 * Those methods are using service, and they are used directly by html
 */
const CARS_MOCK:Car[]=[
  {id:1, make:'Toyota', model:'Celica'},
  {id:2, make:'Nissan', model:'GTR'},
  {id:3, make:'FSO', model:'Nysa'}
];

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private apiService:ApiServiceService) { }

  public cars:Array<Car> = [];

  // experimenting with angular material table
  displayedColumns:string[] = ["make", "model"];
  dataSource = CARS_MOCK;
  
  // experimenting with angular material table end
  ngOnInit() {
    this.getCars();
  }

  getCars(){
    this.apiService.getCars().subscribe(
      (data:Array<Car>)=>{
        this.cars = data; 
        console.log(data);
      });
  }
// this one is just a prototype, not ready to be used yet (here only model name used)
// in previous version the full data from form was used (model and make)
  add(modelOfACar:string):void{
    modelOfACar = modelOfACar.trim();
    if(!modelOfACar)return;
    var car:Car = new Car({model:modelOfACar});
    this.apiService.createCar(car)//this.apiService.createCar({name} as Car)
      .subscribe(car=>{
        this.cars.push(car)
      });
  }

  removeCar(carModelToRemove:string){
    this.apiService.removeCar(carModelToRemove).subscribe(
      result=>{
        this.getCars()},
      error=>
        console.error(error));
  }

  // new version, should be used instead of removeCar()
  deleteCar(car:Car){
    this.cars = this.cars.filter( c=>c!==car ); // removes from frontend immidietly, not waiting for backend
    this.apiService.deleteCar(car).subscribe(
      result=>
        this.getCars(),
      error=>
        console.log(error)
    );
  }
}
