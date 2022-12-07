import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '../service/parent.service';
import { ParentDetails } from '../service/parentdetails.service';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.css']
})
export class ApproveRejectComponent {
    
parentDetails: ParentDetails
id: string
approvedForm: FormGroup
constructor(private router: Router, private route: ActivatedRoute, private parentService: ParentService, private fb: FormBuilder){
 this.approvedForm = this.fb.group({
   studentName: this.fb.control('', Validators.required),
   parentName:this.fb.control('',Validators.required),
   emailId:this.fb.control('',Validators.required),
   address:this.fb.control('',Validators.required),
   city:this.fb.control('',Validators.required),
   state:this.fb.control('',Validators.required),
   zipCode:this.fb.control('',Validators.required),
   country:this.fb.control('',Validators.required),
   primaryContactPersonName:this.fb.control('',Validators.required),
   primaryMobile:this.fb.control('',Validators.required),
   secondaryContactPersonName:this.fb.control('',Validators.required),
   secondaryMobile:this.fb.control('',Validators.required),
 })
}
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.parentService.getParentId(this.id).subscribe(data => {
        console.log('value of data onint', data);
        this.parentDetails = data;
        this.approvedForm.setValue({
          studentName: this.parentDetails.studentName,
          parentName: this.parentDetails.parentName,
          emailId: this.parentDetails.emailId,
          address: this.parentDetails.address,
          city: this.parentDetails.city,
          state: this.parentDetails.state,
          zipCode: this.parentDetails.zipCode,
          country: this.parentDetails.country,
          primaryContactPersonName: this.parentDetails.primaryContactPersonName,
          primaryMobile: this.parentDetails.primaryMobile,
          secondaryContactPersonName: this.parentDetails.secondaryContactPersonName,
          secondaryMobile: this.parentDetails.secondaryMobile
        })
      })
    }

    onSubmit() {
      this.parentService.approved(this.id, this.approvedForm.value).subscribe(data => {
        console.log('value', data);
        window.alert('Submitted Successfully');
        this.router.navigate(['viewparent'])
      })
    }

    view() {
      this.router.navigate(['/viewparent']);
    }
  }


