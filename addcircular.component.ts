import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CircularService } from '../service/circular.service';

@Component({
  selector: 'app-addcircular',
  templateUrl: './addcircular.component.html',
  styleUrls: ['./addcircular.component.css']
})
export class AddcircularComponent {

  cirForm: FormGroup
  msg: boolean = false;
  constructor(private fb:FormBuilder, private circularService: CircularService) {
    this.cirForm = this.fb.group({
      informText: this.fb.control('',Validators.required),
      postedBy: this.fb.control('',[Validators.required,Validators.pattern("[A-Za-z ]{1,20}"), Validators.minLength(3), Validators.maxLength(20)])
    })
   }


  onSubmit(){
    console.log(this.cirForm.value);
    if(this.cirForm.valid){
    this.circularService.addCir(this.cirForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        window.alert('Submited Sucessfully');
        window.location.reload();
      }
    });
  } else {
    this.msg = true;
    window.alert('Please fill all Required Field');

  }
}
resetBtn() {
  this.cirForm.reset();
  this.msg = false;
}
check(input: string) {
  return(this.cirForm.get(input)?.errors?.['required'] && this.cirForm.get(input)?.touched) || (this.cirForm.get(input)?.errors?.['required'] && this.msg)
}
checkLength(input: string) {
  return (this.cirForm.get(input)?.errors?.['minlength'] || this.cirForm.get(input)?.errors?.['maxlength']);
}
}

