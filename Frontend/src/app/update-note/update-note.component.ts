import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../category';
import { Note } from '../note/note.component';
import { FilterService } from '../services/filter.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {
  title: string;
  description: string;
  categories: Category[];
  idCategoryNote: string;

  constructor(
    private filterService: FilterService,
    private noteService: NoteService,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: Note,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categories = this.filterService.getFilters();
    if (this.data) {
      this.title = this.data.title;
      this.description = this.data.description;
      this.idCategoryNote = this.data.categoryId;
    }
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  update() {
    const noteToUpdate = {
      id: this.data.id,
      title: this.title,
      description: this.description,
      categoryId: this.idCategoryNote,
    } as Note;
    this.noteService.updateNote(noteToUpdate).subscribe();
    this.dialogRef.close({ data: 'Success' });
  }
}
