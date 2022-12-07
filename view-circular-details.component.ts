import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CircularService } from '../service/circular.service';
import { CircularDetails } from '../service/circulardetails.service';

@Component({
  selector: 'app-view-circular-details',
  templateUrl: './view-circular-details.component.html',
  styleUrls: ['./view-circular-details.component.css']
})
export class ViewCircularDetailsComponent {

  cir: CircularDetails[];
  circularId:number
  appList:any
  isDisabled: boolean = false;
  circularDetails: Observable<CircularDetails[]>
  constructor(private circularService: CircularService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.circularService.getCircularDetailsList()
    .subscribe((data: CircularDetails[]) =>{
      console.log(data)
      this.cir=data;
    },(error: any)=> console.log(error));
  }
  acknowledge(circularId: number){
    this.circularService.ackDetails(circularId).subscribe(data => {
     console.log(data);
     window.alert('Acknowledge successfuly');
     window.location.reload();
    });
}

}
