import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  private _searchSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  get searchTerm(): string {
    return this._searchSubject$.getValue();
  }
  set searchTerm(value: string) {
    if (this._searchSubject$.getValue() !== value) {
      this._searchSubject$.next(value);
    }
  }

  constructor() {
    this._subscriptions.push(
      this._searchSubject$
        .asObservable()
        .pipe(debounceTime(250))
        .subscribe((searchTerm: string) => this.search.emit(searchTerm))
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
