import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Car } from '../model/car';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiServiceService } from './api-service.service';
export class CarDatasource implements DataSource<Car>{
    
    private carSubject = new BehaviorSubject<Car[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private carService:ApiServiceService){
    }

    connect(collectionViewer:CollectionViewer):Observable<Car[]>{
        console.log("Connecting data source");
        return this.carSubject.asObservable();
    }
    
    disconnect(collectionViewer:CollectionViewer){
        this.carSubject.complete();
    }

    loadCars(){
        this.carService.getCars().pipe(
            catchError(()=>of([])),
            finalize(()=>this.loadingSubject.next(false))
        ).subscribe(cars=>this.carSubject.next(cars));
    }
}