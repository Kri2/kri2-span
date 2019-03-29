import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-car-create-form',
  templateUrl: './car-create-form.component.html',
  styleUrls: ['./car-create-form.component.css']
})
export class CarCreateFormComponent implements OnInit {

  constructor(
    private apiService:ApiServiceService,
    private router:Router,
    private route:ActivatedRoute
  ) { }
  
  gotoList(){
    this.router.navigate(['/cars'])
  }

  goBack(): void {
    //this.location.back();
    this.gotoList();
  }

  save(form){
    console.log("dane z formy: "+form);
    console.log(form);
    
    this.apiService.createCar(form).subscribe(
        result=>{this.gotoList();},
        error=>console.error(error)
      );//raczej powinno się nazywać save() w apiservice
    
  }
  
  /* W ten sposób nie działało raczej
  //sampleCar:Car = new Car("Renault", "Espace");
  submitted = false;
  onSubmit(){this.submitted=true;}
  
  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.sampleCar); }
  */


  ngOnInit() {
  }

}
