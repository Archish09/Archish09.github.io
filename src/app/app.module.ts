import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatStepperModule} from '@angular/material/stepper';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { SavedCardsComponent } from './saved-cards/saved-cards.component';
import { AddNewCardComponent } from './add-new-card/add-new-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IMaskModule} from 'angular-imask';
import { CardDetailsService } from './card-details.service';
import { NumberMaskingPipe } from './number-masking.pipe';
import { DeleteCardComponent } from './delete-card/delete-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SavedCardsComponent,
    AddNewCardComponent,
    NumberMaskingPipe,
    DeleteCardComponent
  ],
  entryComponents: [AddNewCardComponent,DeleteCardComponent],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    HttpClientModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule, 
    ReactiveFormsModule,
    IMaskModule
  ],
  providers: [CardDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
