import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import {
  MatProgressBar,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';

import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { HomeComponent } from './home/home.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatListModule,
];

const UNITS = [CryptoCardComponent];

const FULL = [HomeComponent];

@NgModule({
  declarations: [...UNITS, ...FULL],
  imports: [CommonModule, ...MATERIAL_MODULES],
})
export class ComponentsModule {}
