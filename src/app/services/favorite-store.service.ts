import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

const FAVORITE_STORE_KEY = 'favorite-store';

@Injectable({
  providedIn: 'root',
})
export class FavoriteStoreService {
  private _store$: BehaviorSubject<Readonly<Set<string>>> = new BehaviorSubject<
    Readonly<Set<string>>
  >(new Set());
  private _subscriptions: Subscription[] = [];

  readonly favoriteStore$: Observable<Readonly<Set<string>>> =
    this._store$.asObservable();

  constructor() {
    const raw: string = localStorage.getItem(FAVORITE_STORE_KEY) || '[]';
    const initial: Readonly<string[]> = JSON.parse(raw);
    this._store$.next(new Set(initial));

    // Auto update backing localStorage data
    this._subscriptions.push(
      this.favoriteStore$.subscribe((favorites: Readonly<Set<string>>) =>
        localStorage.setItem(FAVORITE_STORE_KEY, JSON.stringify(favorites))
      )
    );
  }

  toggleFavorite(symbol: string) {
    const current = new Set(this._store$.getValue());
    if (current.has(symbol)) {
      current.delete(symbol);
    } else {
      current.add(symbol);
    }
    this._store$.next(current);
  }
}
