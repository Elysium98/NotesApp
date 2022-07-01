import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectCategoryId: string;
  searchedTitle: string;

  constructor() {}

  ngOnInit(): void {}

  receiveCategory(categoryId: string) {
    this.selectCategoryId = categoryId;
  }
  receiveTitle(title: string) {
    this.searchedTitle = title;
    console.log('receiveTitle()  este  ' + '=' + title);
  }
}
