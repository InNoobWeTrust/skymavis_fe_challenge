import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private _searchSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  get searchTerm(): string {
    return this._searchSubject$.getValue();
  }
  set searchTerm(value: string) {
    this._searchSubject$.next(value);
  }

  constructor() {
    this._searchSubject$
      .asObservable()
      .pipe(debounceTime(250))
      .subscribe((searchTerm: string) => this.search.emit(searchTerm));
  }

  ngOnInit(): void {}
}
