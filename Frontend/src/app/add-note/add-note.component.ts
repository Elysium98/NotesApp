import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Category } from '../category';
import { FilterService } from '../services/filter.service';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note/note.component';
import { FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';

declare global {
  var idCount: number;
}
let idCount = 0;

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  title: string;
  description: string;
  categories: Category[];
  idCategoryNote: string;

  constructor(
    private filterService: FilterService,
    private noteService: NoteService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: Note,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories = this.filterService.getFilters();
  }

  add() {
    this.noteService.addNote(
      this.title,
      this.description,
      this.idCategoryNote,
      this.generateUUID()
    );
    console.log(
      'Category Id este  in add() ' +
        this.idCategoryNote +
        '  Titlul este ' +
        this.title
    );
    this.router.navigateByUrl('');
  }

  uuidValue: string;
  generateUUID() {
    this.uuidValue = UUID.UUID();
    return this.uuidValue;
  }

  generateId() {
    idCount++;
    console.log('merge:' + idCount.toString());
    return idCount;
  }
}
