import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScrollingModule,
    DragDropModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    MatCardModule,
    MatIconModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
