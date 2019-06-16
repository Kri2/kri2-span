import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable, MatPaginator, MatSort, Sort } from '@angular/material';
import { Car } from '../model/car';

const CARS_MOCK:Car[]=[
  {id:1, make:'Toyota', model:'Celica'},
  {id:2, make:'Nissan', model:'GTR'},
  {id:3, make:'FSO', model:'Nysa'},
  {id:4, make:'Isuzu', model:'Rodeo'},
  {id:5, make:'Porsche', model: '911'},
  {id:6, make:'Geo', model: 'Metro'}
];


@Component({
  selector: 'app-car-list-local',
  templateUrl: './car-list-local.component.html',
  styleUrls: ['./car-list-local.component.css']
})
export class CarListLocalComponent implements OnInit {

  constructor() { }

  // columns definitions for material table
  displayedColumns:string[] = ["make", "model", "remove"];
  
  dataSource:MatTableDataSource<Car>; //now it will be initialized in reset() function
  
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit() {
    this.dataSource = new MatTableDataSource(CARS_MOCK.slice());
    this.dataSource.paginator = this.paginator;
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
  
  sortData(sort:Sort){
    if (sort.active && sort.direction !== '') {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'make': return this.compare(a.make, b.make, isAsc);
          case 'model': return this.compare(a.model, b.model, isAsc);
          default: return 0;
        }
      });
    }
  }
  
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
