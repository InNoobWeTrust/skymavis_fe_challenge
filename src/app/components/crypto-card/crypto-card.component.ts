import { Component, Input } from '@angular/core';
import { ICoinMarket } from 'src/app/services/coins.service';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.scss'],
})
export class CryptoCardComponent {
  @Input()
  symbol: string = '';
  @Input()
  marketLoaded: boolean = false;
  @Input()
  market: ICoinMarket = {
    id: '',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://via.placeholder.com/32',
    current_price: 41500.0,
    market_cap: 0,
    market_cap_rank: 0,
    total_volume: 0,
    high_24h: 42000.0,
    low_24h: 40000.0,
    price_change_24h: 1150.0,
    price_change_percentage_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    circulating_supply: 0,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: '',
    atl: 0,
    atl_change_percentage: 0,
    atl_date: '',
    last_updated: '',
  };

  get isUpTrend(): boolean {
    return this.market!.price_change_24h > 0;
  }
}
