import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
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
