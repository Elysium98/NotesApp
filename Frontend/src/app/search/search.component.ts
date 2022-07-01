import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() emitSearchedTitle = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  searchedTitle(title: string) {
    this.emitSearchedTitle.emit(title);
    console.log('searchedTitle() is ' + title);
  }
}
