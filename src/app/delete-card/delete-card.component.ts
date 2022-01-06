import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css']
})
export class DeleteCardComponent implements OnInit {
  message!: string;

  constructor(public dialogRef: MatDialogRef<DeleteCardComponent>) { }

  ngOnInit() {
    this.message="Are you sure you want to delete this card?";
  }

}
