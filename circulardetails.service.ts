import { Injectable } from "@angular/core";

@Injectable()
export class CircularDetails{
  circularId: number;
  informText: string;
  postedBy:string;
  notifyDate:Date;
  acknowledgeDate:Date;
  isDisabled: boolean;
}
