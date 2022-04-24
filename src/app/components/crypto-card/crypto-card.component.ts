import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoinMarket } from 'src/app/services/coins.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss'],
})
export class CryptoCardComponent {
  @Input()
  market?: ICoinMarket;
  @Input()
  favorited: boolean = false;

  @Output()
  toggle: EventEmitter<void> = new EventEmitter<void>();

  get isUpTrend(): boolean {
    return this.market!.price_change_24h > 0;
  }

  toggleFavorite() {
    this.toggle.emit();
  }
}
