import { Component, Input, OnInit } from '@angular/core';
import { CoinsService, ICoinMarket } from 'src/app/services/coins.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements OnInit {
  private _cachedMarket: Readonly<ICoinMarket[]> = [];
  private _filteredMarket: Readonly<ICoinMarket[]> = [];
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
    return this._filteredMarket;
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

  constructor(coinsService: CoinsService) {
    coinsService.market$.subscribe((data: Readonly<ICoinMarket[]>) => {
      this._cachedMarket = data;
      if (!this._loaded) this._loaded = true;
      this.update();
    });
    coinsService.getMarket();
  }

  ngOnInit(): void {}
}
