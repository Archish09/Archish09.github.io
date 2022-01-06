import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewCardComponent } from '../add-new-card/add-new-card.component';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { CardDetailsService } from '../card-details.service';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.css']
})
export class SavedCardsComponent implements OnInit {
  cards: any=[];
  existingcards: any=[];
  cardArray: any=[];
  cardNumberOne: any;
  cardLogoOne: any;
  cardNumberTwo: any;
  cardLogoTwo: any;
  showCard1: boolean=true;
  showCard2: boolean=true;
  cardObj: any;

  constructor(public dialog: MatDialog, private cardDetailService: CardDetailsService) { }

  ngOnInit(){
    if (localStorage.getItem('CardDetails')){
    this.cardArray=JSON.parse(localStorage.getItem('CardDetails')!);
    console.log(this.cardArray);
    this.cardArray.forEach((element: any) => {
     console.log(element);
     this.cards.push(element);
    });
    }
   
    this.cardDetailService.getJSON().subscribe(data => {
      this.cardNumberOne=data.cardOne.cardnumber;
      this.cardLogoOne=data.cardOne.cardlogo;
      this.cardNumberTwo=data.cardTwo.cardnumber;
      this.cardLogoTwo=data.cardTwo.cardlogo;
    });
  }

  addCard(){
    const dialogRef = this.dialog.open(AddNewCardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        console.log("success",result);
        this.cards.push(result);
        console.log(this.cards);
      }
    },
    error => {
      console.log("error");
    });
  }

  deleteCard(value:any){
    console.log("remove clicked");
    const dialogRef = this.dialog.open(DeleteCardComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`);
      if(res==true){
        console.log("success",res);
        if(value=='card1'){
          this.showCard1=false;
        }
        else if(value=='card2'){
          this.showCard2=false;
        
        }
      }
    },
    error => {
      console.log("error");
    });
  }

  removeCard(i: any){
    console.log("index",i);
    var cardArr= JSON.parse(localStorage.getItem('CardDetails')!);
   const dialogRef = this.dialog.open(DeleteCardComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`);
      if(res==true){
        console.log("success",res);
        cardArr.splice(i,1);
        localStorage.setItem('CardDetails', JSON.stringify(cardArr));
        this.cards.splice(i,1);
      }
    },
    error => {
      console.log("error");
    });
  }

}
