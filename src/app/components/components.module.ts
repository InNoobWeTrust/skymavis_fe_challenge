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
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { HomeComponent } from './home/home.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

const ANGULAR_MODULES = [FormsModule];

const MATERIAL_MODULES = [
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatListModule,
  MatInputModule,
  MatIconModule,
];

const UNITS = [CryptoCardComponent, CryptoListComponent, SearchComponent];

const FULL = [HomeComponent];

@NgModule({
  declarations: [...UNITS, ...FULL],
  imports: [CommonModule, ...ANGULAR_MODULES, ...MATERIAL_MODULES],
})
export class ComponentsModule {}
