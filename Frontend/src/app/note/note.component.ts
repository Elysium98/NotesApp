import { NoteService } from './../services/note.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnChanges {
  @Input() selectedCategoryId: string;
  @Input() searchedTitle: string;
  notes: Note[];

  constructor(private noteService: NoteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getNotes();
  }
  ngOnChanges() {
    if (this.selectedCategoryId) {
      this.noteService
        .getFilteredNotes(this.selectedCategoryId)
        .subscribe((result) => (this.notes = result));
      console.log('Ai ales categoria  ' + this.selectedCategoryId);
    }
    if (this.searchedTitle) {
      this.noteService
        .getSearchedNotes(this.searchedTitle)
        .subscribe((result) => (this.notes = result));
    }
  }
  getNotes() {
    this.noteService.getNotes().subscribe((result) => (this.notes = result));
  }

  delete(noteId: string) {
    this.noteService.deleteNote(noteId).subscribe(() => this.getNotes());
  }

  update(note: Note) {
    const dialog = this.dialog.open(UpdateNoteComponent, { data: note });
    dialog.afterClosed().subscribe((result) => {
      if (!result.data) {
        return;
      }
      this.getNotes();
    });
  }
}
export interface Note {
  id: string;
  title: string;
  description: string;
  categoryId: string;
}
