import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note/note.component';
import { map } from 'rxjs/operators';
import { notEqual } from 'assert';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';
import { title } from 'process';

@Injectable()
export class NoteService {
  readonly baseUrl = 'https://localhost:44367';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  serviceCall() {}

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(
      this.baseUrl + '/Notes',
      this.httpOptions
    );
  }
  getFilteredNotes(categoryId: string): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(this.baseUrl + '/notes', this.httpOptions)
      .pipe(
        map((notes) => notes.filter((note) => note.categoryId === categoryId))
      );
  }

  addNote(
    noteTitle: string,
    noteDescription: string,
    noteCategoryId: string,
    uid: string
  ) {
    let note = {
      id: uid,
      ownerId: '00000000-0000-0000-0000-000000000000',
      description: noteDescription,
      title: noteTitle,
      categoryId: noteCategoryId,
    };
    return this.httpClient
      .post(this.baseUrl + '/notes', note, this.httpOptions)
      .subscribe();
  }

  deleteNote(id: string) {
    return this.httpClient.delete<Note>(
      this.baseUrl + '/notes/' + id,
      this.httpOptions
    );
  }

  getSearchedNotes(title: string): Observable<Note[]> {
    return this.httpClient
      .get<Note[]>(this.baseUrl + '/notes', this.httpOptions)
      .pipe(map((notes) => notes.filter((note) => note.title.includes(title))));
  }

  updateNote(note: Note) {
    return this.httpClient.put<Note>(
      this.baseUrl + '/notes/' + note.id,
      note,
      this.httpOptions
    );
  }
}
