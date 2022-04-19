import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const COINS_API = 'https://api.coingecko.com/api/v3/coins/';
const COINS_API_ROUTES = {
  list: 'list',
};

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coinsSubject$: BehaviorSubject<Coin[]> = new BehaviorSubject<Coin[]>(
    []
  );
  readonly coins$: Observable<Coin[]> = this._coinsSubject$.asObservable();

  constructor(private _http: HttpClient) {
    this.refreshList();
  }

  refreshList() {
    this._http
      .get<Coin[]>(`${COINS_API}${COINS_API_ROUTES.list}`)
      .subscribe((coins: Coin[]) => this._coinsSubject$.next(coins));
  }
}
