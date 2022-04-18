import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const EXCHANGE_API = 'https://api.coingecko.com/api/v3/exchange_rates';

interface Exchange {
  name: string,
  unit: string,
  value: number,
  type: string,
}

interface ExchangeRates {
  rates: Record<string, Exchange>,
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private rateSubject$: BehaviorSubject<ExchangeRates> = new BehaviorSubject<ExchangeRates>({rates: {}});
  rates$: Observable<ExchangeRates> = this.rateSubject$.asObservable();

  constructor(private _http: HttpClient) {
    this.refresh();
  }

  refresh() {
    this._http.get<ExchangeRates>(EXCHANGE_API).subscribe((rates: ExchangeRates) => (this.rateSubject$.next(rates)));

  }
}
