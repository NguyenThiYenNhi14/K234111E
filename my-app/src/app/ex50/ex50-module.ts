import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Books } from './books/books';
import { BookCreate } from './book-create/book-create';
import { BookDetail } from './book-detail/book-detail';
import { BookEdit } from './book-edit/book-edit';

const routes: Routes = [
  { path: '', component: Books },
  { path: 'books', component: Books },
  { path: 'create', component: BookCreate },
  { path: 'detail/:id', component: BookDetail },
  { path: 'edit/:id', component: BookEdit }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Books,
    BookDetail,
    BookCreate,
    BookEdit
  ]
})
export class Ex50Module {}
