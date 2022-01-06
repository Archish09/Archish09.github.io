import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as cardValidator from "card-validator";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as configData from 'src/config/appsettings.config';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewCardComponent implements OnInit {
  addCardForm!: FormGroup;
  public name!: string;
  public cvv!: string;
  public cardNumber!: string;
  public maxLength!: number;
  public maxCvvLength!: number;
  public validationRes: any;
  public imask = {mask:'0000'};
  expiryMonth!: number;
  monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  expiryYear!: number;
  selectedYear!: number;
  years: number[] = []; 
  CVV!: string;
  iconName: any;
  errorInvalidNum: boolean=false;
  inValidCard: boolean=true;
  successValidNum: boolean=false;
  addedCard!: any;
  lastCardNum: any;
  showValidationMssg: boolean=false;
  currentMonth!: number;
  expiryMonthFinal!: number;
  validationMessage: any;
  cardDetail: any = {};
  cardObj: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddNewCardComponent>) {
    this.maxLength = 255;
   }

  ngOnInit() {
    this.addCardForm=this.fb.group({
      cardNumber: ["", [Validators.required]],
      iconCard: [""],
      expiryMonth: ["", [Validators.required]],
      expiryYear: ["", [Validators.required]],
      CVV: ["", [Validators.required]]
    });
 
    this.selectedYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    console.log("current month",this.currentMonth);
    for (let year = this.selectedYear; year <= this.selectedYear + 20; year++) {
      this.years.push(year);
    }
    this.addedCard=JSON.parse(localStorage.getItem('CardDetails')!);
    this.cardObj=Object.assign({}, ...this.addedCard);
    console.log("Last Added Card",this.cardObj);
    this.lastCardNum=this.cardObj.cardNumber;
  }

  get f0(){
    return this.addCardForm.controls;
  }

  validate() {
    this.validationRes = cardValidator.number(this.cardNumber);
    console.log(this.validationRes);
    if (this.validationRes.card) {
      this.maxLength = this.validationRes.card?.lengths?.pop() + this.validationRes.card?.gaps.length;
      this.maxCvvLength = this.validationRes.card?.code.size;
      let maskArray = new Array(this.maxLength).fill('0');
      this.validationRes.card?.gaps.reverse().forEach((gap: number)=> {maskArray.splice(gap, 0, ' ');})
      this.imask = {mask:maskArray.join('')}
      this.showValidationMssg=false;
      if(this.validationRes.isValid==false){
        console.log("Card is Invalid");
        this.errorInvalidNum=true;
        this.successValidNum=false;
        this.inValidCard=true;
      }
      else if(this.validationRes.isValid==true){
        console.log("Card is Valid");
        this.errorInvalidNum=false;
        this.successValidNum=true;
        this.inValidCard=false;
      }
    } else {
      this.maxLength = 255;
    }
  }
  getIssuerIcon() {
    this.iconName=`https://cdn.flnf.hu/assets/${this.validationRes.card.type}.svg`
    //console.log("icon url",this.iconName);
    this.f0.iconCard.patchValue(this.iconName);
    return this.iconName;
  }

  onAddCard(){
    console.log(this.addCardForm.value);
    this.expiryMonthFinal = parseInt(this.f0.expiryMonth.value);
    if(this.f0.cardNumber.value!="" && this.f0.expiryMonth.value!="" && this.f0.expiryYear.value!="" && this.f0.CVV.value!=""){
    if(this.f0.cardNumber.value!=this.lastCardNum && (this.expiryMonthFinal > this.currentMonth || this.f0.expiryYear.value > this.selectedYear)){
      this.cardDetail= Object.assign(this.cardDetail, this.addCardForm.value);
      this.addCards(this.cardDetail);
      //localStorage.setItem('card-num', JSON.stringify(this.addCardForm.value));
      this.dialogRef.close(this.addCardForm.value);
    }
    else{
      if(this.f0.cardNumber.value==this.lastCardNum){
        console.log("card already exists!");
        this.showValidationMssg=true;
        this.validationMessage=configData.VALIDATION_MSG.sameCardAdded;
      }
      else if(this.expiryMonthFinal <= this.currentMonth){
        console.log("invalid expiry month");
        this.showValidationMssg=true;
        this.validationMessage=configData.VALIDATION_MSG.invalidExpMonth;
      }
      else if(this.f0.expiryYear.value < this.selectedYear){
        console.log("invalid expiry year");
        this.showValidationMssg=true;
        this.validationMessage=configData.VALIDATION_MSG.invalidExpYear;
      }
    }
  }
  }

  addCards(cardDetail: any){
    let cardDetails = [];
    if (localStorage.getItem('CardDetails')){
      cardDetails = JSON.parse(localStorage.getItem('CardDetails')!);
      cardDetails = [ ...cardDetails, cardDetail];
    }
    else{
      cardDetails = [cardDetail];
    }
    localStorage.setItem('CardDetails', JSON.stringify(cardDetails));
  }

  numberOnly(event: { key: string; }){
    let regex = /[0-9]/;
    if(event.key.match(regex)){
      return true;
    }
    else{
      return false;
    }
  }

}
