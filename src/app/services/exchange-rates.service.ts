import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const EXCHANGE_API = 'https://api.coingecko.com/api/v3/exchange_rates';

export interface IExchange {
  name: string;
  unit: string;
  value: number;
  type: string;
}

export interface IExchangeRates {
  rates: Record<string, IExchange>;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  private _rateSubject$: BehaviorSubject<IExchangeRates> =
    new BehaviorSubject<IExchangeRates>({ rates: {} });
  readonly rates$: Observable<IExchangeRates> =
    this._rateSubject$.asObservable();

  constructor(private _http: HttpClient) {
    this.refresh();
  }

  refresh() {
    this._http
      .get<IExchangeRates>(EXCHANGE_API)
      .subscribe((rates: IExchangeRates) => this._rateSubject$.next(rates));
  }
}
