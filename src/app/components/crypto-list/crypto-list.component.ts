import { Component, Input, OnInit } from '@angular/core';
import { CoinsService, ICoinMarket } from 'src/app/services/coins.service';
import { FavoriteStoreService } from 'src/app/services/favorite-store.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements OnInit {
  private _cachedMarket: Readonly<ICoinMarket[]> = [];
  private _filteredMarket: Readonly<ICoinMarket[]> = [];
  private _favorites: Readonly<Set<string>> = new Set();
  private _searchTerm: string = '';
  private _loaded = false;

  @Input()
  set searchTerm(value: string) {
    this._searchTerm = value.trim();
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
    coinsService: CoinsService
  ) {
    coinsService.market$.subscribe((data: Readonly<ICoinMarket[]>) => {
      this._cachedMarket = data;
      if (!this._loaded) this._loaded = true;
      this.update();
    });
    _favoriteStoreService.favoriteStore$.subscribe(
      (favorites: Readonly<Set<string>>) => (this._favorites = favorites)
    );
  }

  private update() {
    if (this._searchTerm.length > 0) {
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

  ngOnInit(): void {}
}
