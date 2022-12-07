import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ParentService } from '../service/parent.service';
import { ParentDetails } from '../service/parentdetails.service';

@Component({
  selector: 'app-view-parent-details',
  templateUrl: './view-parent-details.component.html',
  styleUrls: ['./view-parent-details.component.css']
})
export class ViewParentDetailsComponent implements OnInit {
  parent: ParentDetails[];
  id: string
  appList:any
  parentDetails: Observable<ParentDetails[]>
  constructor(private parentService: ParentService, private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit() {
    this.parentService.getParentDetailsList()
    .subscribe((data:any) => {
      console.log(data)
      this.parent = data;
    }, (error: any) => console.log(error));
    
  }
  parentDetail(id: string){
    this.router.navigate(['details', id]);
  }

  update(id: string) {
    this.router.navigate(['/approved', id]);
  }

  delete(id: string){
      this.parentService.deleteDetails(id).subscribe(data => {
        console.log(data);
       window.alert('deleted successfuly');
       window.location.reload();
      });
  }
}

