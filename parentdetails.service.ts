import { Injectable } from "@angular/core";

@Injectable()
export class ParentDetails{
  id: string;
  studentName: string;
  parentName: string;
  emailId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  primaryContactPersonName: string;
  primaryMobile: string;
  secondaryContactPersonName: string;
  secondaryMobile: string;
  registerDate: Date;
}