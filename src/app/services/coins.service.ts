import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subscription,
  take,
} from 'rxjs';
import { FavoriteStoreService } from './favorite-store.service';

const COINS_API = 'https://api.coingecko.com/api/v3/coins/';
const COINS_API_ROUTES = {
  list: () => 'list',
  markets: ({ currency = 'usd', ids = [] }: MarketQueryOptions) =>
    [
      `markets?`,
      `vs_currency=${currency}`,
      `ids=${ids.join('%2C')}`,
      `order=market_cap_desc`,
      `per_page=${ids.length || '100'}`,
      `page=1`,
      `sparkline=false`,
    ].join('&'),
};

export interface MarketQueryOptions {
  currency?: string;
  ids?: string[];
}

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
  private _marketRefreshSubscription?: Subscription;

  readonly coins$: Observable<Readonly<ICoin[]>> =
    this._coinsSubject$.asObservable();
  readonly market$: Observable<Readonly<ICoinMarket[]>> =
    this._coinMarketSubject$.asObservable();

  constructor(private _http: HttpClient) {
    this.refreshList(); // Caching coins list
    this.getMarket(); // Caching market data
    this._marketRefreshSubscription = this.market$
      .pipe(take(1))
      .subscribe(() => {
        this._marketRefreshSubscription = interval(15000).subscribe(() =>
          this.getMarket()
        );
      }); // Periodic refresh of market data
  }

  refreshList(): Subscription {
    return this._http
      .get<Readonly<ICoin[]>>(`${COINS_API}${COINS_API_ROUTES.list()}`)
      .subscribe((coins: Readonly<ICoin[]>) => this._coinsSubject$.next(coins));
  }

  getMarket(options: MarketQueryOptions = {}): Subscription {
    return this._http
      .get<Readonly<ICoinMarket[]>>(
        `${COINS_API}${COINS_API_ROUTES.markets(options)}`
      )
      .subscribe((markets: Readonly<ICoinMarket[]>) => {
        // Incremental caching
        const cached = this._coinMarketSubject$.getValue();
        const cachedIds = cached.map((market: ICoinMarket) => market.id);
        const toConcat = markets.filter(
          (market: ICoinMarket) => !cachedIds.includes(market.id)
        );
        const concatenated = cached.concat(toConcat);
        this._coinMarketSubject$.next(concatenated);
      });
  }
}
