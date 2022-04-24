import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CoinsService,
  ICoin,
  ICoinMarket,
} from 'src/app/services/coins.service';
import { FavoriteStoreService } from 'src/app/services/favorite-store.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements OnDestroy {
  private _cachedCoinList: Readonly<ICoin[]> = [];
  private _cachedMarket: Readonly<ICoinMarket[]> = [];
  private _filteredMarket: Readonly<ICoinMarket[]> = [];
  private _favorites: Readonly<Set<string>> = new Set();
  private _searchTerm: string = '';
  private _loaded = false;
  private _searchSubscription?: Subscription;

  @Input()
  set searchTerm(value: string) {
    const toBeUpdated = value.trim();
    if (this._searchTerm !== toBeUpdated) {
      this._searchTerm = toBeUpdated;
    }
    if (this._searchTerm) {
      const wholeMarketMatch = this._cachedCoinList.filter((coin: ICoin) =>
        coin.symbol.includes(this._searchTerm)
      );
      if (this._searchSubscription) this._searchSubscription.unsubscribe();
      // Background network search
      this._searchSubscription = this._coinsService.getMarket({
        ids: wholeMarketMatch.map((coin: ICoin) => coin.id),
      });
    }
    // Cached search
    this.update();
  }

  get loaded(): boolean {
    return this._loaded;
  }
  get marketData(): Readonly<ICoinMarket[]> {
    return [...this._filteredMarket].sort((a: ICoinMarket, b: ICoinMarket) => {
      if (this.isFavorite(a)) return -1;
      if (this.isFavorite(b)) return 1;
      return 0;
    });
  }

  constructor(
    private _favoriteStoreService: FavoriteStoreService,
    private _coinsService: CoinsService
  ) {
    _coinsService.market$.subscribe((data: Readonly<ICoinMarket[]>) => {
      this._cachedMarket = data;
      if (!this._loaded) this._loaded = true;
      if (this._searchSubscription) {
        this._searchSubscription.unsubscribe();
        delete this._searchSubscription;
      }
      this.update();
    });
    _coinsService.coins$.subscribe(
      (coinsList: Readonly<ICoin[]>) => (this._cachedCoinList = coinsList)
    );
    _favoriteStoreService.favoriteStore$.subscribe(
      (favorites: Readonly<Set<string>>) => (this._favorites = favorites)
    );
  }

  private update() {
    if (this._searchTerm) {
      // Preload from cache
      this._filteredMarket = this._cachedMarket.filter((market: ICoinMarket) =>
        market.symbol.includes(this._searchTerm)
      );
    } else {
      this._filteredMarket = this._cachedMarket;
    }
  }

  isFavorite(market: ICoinMarket) {
    return this._favorites.has(market.id);
  }

  toggleFavorite(market: ICoinMarket) {
    this._favoriteStoreService.toggleFavorite(market.id);
  }

  marketTrackBy(_idx: number, market: ICoinMarket) {
    return market.id;
  }

  ngOnDestroy(): void {
    if (this._searchSubscription) this._searchSubscription.unsubscribe();
  }
}
