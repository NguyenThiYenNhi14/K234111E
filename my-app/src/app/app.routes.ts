import { Routes } from '@angular/router';
import { Listcustomer } from './listcustomer/listcustomer';
import { ListCustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { NotFound } from './not-found/not-found';
import { About } from './about/about';
import { ListProduct } from './list-product/list-product';
import { ProductDetail } from './product-detail/product-detail';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct2 } from './fake-product2/fake-product2';
import { Bitcoin } from './bitcoin/bitcoin';
import { Books } from './books/books';
import { Ex13 } from './ex13/ex13';
import { Ex13Detail } from './ex13-detail/ex13-detail';
import { Ex18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { Product19 } from './product19/product19';
import { ListProduct19 } from './list-product19/list-product19';
import { Serviceproduct19 } from './serviceproduct19/serviceproduct19';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { Component } from '@angular/core';


export const routes: Routes = [
    {path:"gioi-thieu",component:About},
    {path:"khach-hang-1",component:Listcustomer},
    {path:"khach-hang-2",component:ListCustomer2},
    {path:"khach-hang-3",component:Listcustomer3},
    {path:"san-pham-1", component:ListProduct},
    {path:"san-pham-1/:id",component:ProductDetail},
    {path:"ex26", component:FakeProduct},
    {path:"ex27",component:FakeProduct2},
    {path:"ex28",component:Bitcoin},
    {path:"ex39",component:Books},
    {path:"ex13",component:Ex13},
    {path:"app-ex13-detail/:id",component:Ex13Detail},
    {path:"ex18",component:Ex18},
    {path:"ex19",component:Ex19},
    {path:"product19",component:Product19},
    {path:"list-product19",component:ListProduct19},
    {path:"service-product19",component:Serviceproduct19},
    {path:"ex41", component: BookDetailComponent},
    {path:"ex41/:id", component: BookDetailComponent},
    { 
  path: 'ex50',
  loadChildren: () =>
    import('./ex50/ex50-module').then(m => m.Ex50Module)},
    {path:"**",component:NotFound}
];
