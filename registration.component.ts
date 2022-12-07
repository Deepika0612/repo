import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from '../service/parent.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  regForm: FormGroup
  msg: boolean = false;
  emailPattern = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z" + "A-Z]{2,7}$";
  constructor(private fb: FormBuilder, private parentService: ParentService, private router: Router) { 
    this.regForm = this.fb.group({
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
    }
   
  onSubmit() {
    console.log(this.regForm.value);
    if(this.regForm.valid) {
      this.parentService.doReg(this.regForm.value).subscribe({
        next: (data: any) => {
        console.log(data)
        alert("Details Submitted Successfully and Save Your REGISTRATION ID : " + data.id + " For Your Future Updates, And next it open Update form, if you want to update your details, Enter your details and click submit or click cancel for navigate to registration page");
        this.router.navigate(['/update',data.id]);
      },
      error: (error) => {
        console.log(error.error);
        alert(error.error);
      }
    });
  } else {
    this.msg = true;
    window.alert('Please fill all required field');
  }
}
  resetBtn() {
    this.regForm.reset();
    this.msg = false;
  }
  check(input: string) {
    return(this.regForm.get(input)?.errors?.['required'] && this.regForm.get(input)?.touched) || (this.regForm.get(input)?.errors?.['required'] && this.msg)
  }

  checkLength(input: string) {
    return (this.regForm.get(input)?.errors?.['minlength'] || this.regForm.get(input)?.errors?.['maxlength']);
  }
}

