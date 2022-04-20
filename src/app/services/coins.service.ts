import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const COINS_API = 'https://api.coingecko.com/api/v3/coins/';
const COINS_API_ROUTES = {
  list: () => 'list',
  markets: ({ currency = 'usd' }) =>
    [
      `markets?`,
      `vs_currency=${currency}`,
      `order=market_cap_desc`,
      `per_page=100`,
      `page=1`,
      `sparkline=false`,
    ].join('&'),
};

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
}

export interface ICoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coinsSubject$: BehaviorSubject<Readonly<ICoin[]>> =
    new BehaviorSubject<Readonly<ICoin[]>>([]);
  private _coinMarketSubject$: BehaviorSubject<Readonly<ICoinMarket[]>> =
    new BehaviorSubject<Readonly<ICoinMarket[]>>([]);
  readonly coins$: Observable<Readonly<ICoin[]>> =
    this._coinsSubject$.asObservable();
  readonly market$: Observable<Readonly<ICoinMarket[]>> =
    this._coinMarketSubject$.asObservable();

  constructor(private _http: HttpClient) {
    this.refreshList();
  }

  refreshList() {
    this._http
      .get<Readonly<ICoin[]>>(`${COINS_API}${COINS_API_ROUTES.list()}`)
      .subscribe((coins: Readonly<ICoin[]>) => this._coinsSubject$.next(coins));
  }

  retriveMarketInfo(currency?: string) {
    this._http
      .get<Readonly<ICoinMarket[]>>(
        `${COINS_API}${COINS_API_ROUTES.markets({ currency })}`
      )
      .subscribe((markets: Readonly<ICoinMarket[]>) =>
        this._coinMarketSubject$.next(markets)
      );
  }
}
