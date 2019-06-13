import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Car } from '../model/car';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type':'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  constructor(private httpClient:HttpClient) {}  // ---> httpClient:HttpClient is injected now is a property (can be used with "this")
  
  cars:Car
  API_URL = environment.apiUrl; // ---> localhost:8080/api or kri2-herokuapp.com/api for prod
  
  /** GET cars from the server */
  getCars():Observable<Car[]>{  // {return this.httpClient.get(`${this.API_URL}/cars`);} // ---> returns Observable<Object>
    return this.httpClient.get<Car[]>(`${this.API_URL}/cars`) // TODO: consider using interface here (for car)
      .pipe(      // pipe it
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      ); 
  }

  /** GET car by id. Return 'undefined' when id not found, id passed as parameter after ?*/
  /* TODO later
  getCarNo404(id:number):Observable<Car[]>{
    const url = `${this.API_URL}/cars/?car=${id}`;
    return this.httpClient.get<Car[]>(url)
      .pipe(
        map(cars => cars[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} car id=${id}`);
        }),
        catchError(this.handleError)
      );
  }*/
  /** GET car by id. Return 404 when not found (like others here, resource url used) */
  getCar(id:number):Observable<Car>{
    const url = `${this.API_URL}/cars/${id}`;
    return this.httpClient.get<Car>(url).pipe(
      tap(_ => this.log(`fetched car id=${id}`)),
      catchError(this.handleError)
    );
  }
  
  createCar(car:Car):Observable<Car>{ // should i need to return anything? ---> you're expecting the server to return the new car
    return this.httpClient.post<Car>(`${this.API_URL}/add`,car)
      .pipe( 
        catchError(this.handleError) 
      );
  }

  //obsolete, still used
  removeCar(carModelToRemove:string):Observable<{}>{
    return this.httpClient.delete(`${this.API_URL}/cars/bymodel/${carModelToRemove}`)
  }
  //this will be used instead of removeCar, but id must be added to model
  deleteCar(car:Car|number){ //accepts Car or id
    const id = typeof car === 'number' ? car : car.id; // id will have id number in both situations
    const url = `${this.API_URL}/cars/${id}`;
    return this.httpClient.delete(url/*, httpOptions*/)
      .pipe(
        //tap(_ => this.log(`deleted hero id=${id}`)), //TODO: dodać log, na razie console
        tap(_=> console.log(`deleted car id=${id}`)),
        catchError(this.handleError)
    );
  }

  updateCar(car:Car):Observable<Car>{
    return this.httpClient.put<Car>(`${this.API_URL}/cars/${car.id}`, car).pipe(
      catchError(this.handleError)
    );
  }

  /** TODO SEARCH */
  /* GET heroes whose name contains search term */
  /*
  searchHeroes(term: string): Observable<Car[]> {
    if (!term.trim()) {
      // if not search term, return empty car array.
      return of([]);
    }
    return this.httpClient.get<Car[]>(`${this.API_URL}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Car[]>('searchHeroes', []))
    );
  }*/
  
  /**
   * handling errors thrown by above functions
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {  // this is extra, not absolutelly needed
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  /** LOGGER */ // TODO: make it a app.module service
  private log(message:string){
    //this.messageService.add(`HeroService: ${message}`);
    console.log(`CarService: ${message}`);
  }
}
