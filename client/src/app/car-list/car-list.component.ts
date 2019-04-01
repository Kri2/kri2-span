import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Car } from '../model/car';
import { Observable } from 'rxjs';
import { getLocalRefs } from '@angular/core/src/render3/discovery_utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable, MatPaginator } from '@angular/material';
/**
 * Those methods are using service, and they are used directly by html
 */
const CARS_MOCK:Car[]=[
  {id:1, make:'Toyota', model:'Celica'},
  {id:2, make:'Nissan', model:'GTR'},
  {id:3, make:'FSO', model:'Nysa'},
  {id:4, make:'Isuzu', model:'Rodeo'},
  {id:5, make:'Porsche', model: '911'},
  {id:6, make:'Geo', model: 'Metro'}
];

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private apiService:ApiServiceService) { }

  public cars:Array<Car> = [];

  // columns definitions for material table
  displayedColumns:string[] = ["make", "model", "remove"];
  
  dataSource:MatTableDataSource<Car>; //now it will be initialized in reset() function
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit() {
    this.getCars();
    this.dataSource = new MatTableDataSource(CARS_MOCK.slice());
    this.dataSource.paginator = this.paginator;
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
  // temporary for experimenting with material table
  removeAll() {
    this.dataSource.data = [];
  }
  removeAt(index:number){
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize)+index, 1);
    this.dataSource.data = data;
  }
  reset(){
    this.dataSource.data = CARS_MOCK.slice();
    this.table.renderRows();
  }

}
