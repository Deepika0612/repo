import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from '../service/parent.service';
import { ParentDetails } from '../service/parentdetails.service';

@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.component.html',
  styleUrls: ['./update-parent.component.css']
})
export class UpdateParentComponent {
    
parentDetails: ParentDetails
id: string
msg: boolean = false;
updateForm: FormGroup
emailPattern = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
constructor(private router: Router, private route: ActivatedRoute, private parentService: ParentService, private fb: FormBuilder){
 this.updateForm = this.fb.group({
  studentName: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      parentName: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      emailId: this.fb.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.fb.control('',Validators.required),
      city: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      state: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      zipCode: this.fb.control('',[Validators.required,Validators.pattern("[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}")]),
      country: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      primaryContactPersonName: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      primaryMobile: this.fb.control('',[Validators.required,Validators.pattern("[0-9]{3}[0-9]{3}[0-9]{4}")]),
      secondaryContactPersonName: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)]),
      secondaryMobile: this.fb.control('',[Validators.required, Validators.pattern("[0-9]{3}[0-9]{3}[0-9]{4}")])
 })
}
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.parentService.getParentId(this.id).subscribe(data => {
        console.log('value of data onint', data);
        this.parentDetails = data;
        this.updateForm.setValue({
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
      console.log(this.updateForm.value);
    if(this.updateForm.valid) {
      this.parentService.parentUpdate(this.id, this.updateForm.value).subscribe(data => {
        console.log('update value', data);
        window.alert('Submitted Successfully');
        this.router.navigate(['']);
      });
    } else {
      this.msg = true;
      window.alert('Please fill all Required Field or Enter your details Properly');
    }
  }

    check(input: string) {
      return(this.updateForm.get(input)?.errors?.['required'] && this.updateForm.get(input)?.touched) || (this.updateForm.get(input)?.errors?.['required'] && this.msg)
    }
  
    checkLength(input: string) {
      return (this.updateForm.get(input)?.errors?.['minlength'] || this.updateForm.get(input)?.errors?.['maxlength']);
    }

    reg() {
      this.router.navigate(['']);
    }
  }


