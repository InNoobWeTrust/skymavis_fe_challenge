import { Component, OnInit } from '@angular/core';
import { CryptoCardComponent } from '../crypto-card/crypto-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}
}
