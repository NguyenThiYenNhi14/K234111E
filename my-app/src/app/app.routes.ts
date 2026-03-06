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
import { BookDetail } from './book-detail/book-detail';
import { BookUpdate } from './book-update/book-update';
import { FashionComponent } from './fashion/fashion';
import { FashionDetailComponent } from './fashion-detail/fashion-detail';
import { authGuard } from './myclasses/auth.guard.ts';
import { Login } from './login/login';
import { Register } from './register/register';
import { Ex63 } from './ex63/ex63';
import { Ex63cart } from './ex63cart/ex63cart';


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
    {path:"ex41", component: BookDetail},
    {path:"ex41/:id", component: BookDetail},
    { 
  path: 'ex50',
  loadChildren: () =>
    import('./ex50/ex50-module').then(m => m.Ex50Module)},
    {path:"BookUpdate", component: BookUpdate},
    {path:"ex53", component: FashionComponent, canActivate: [authGuard]},
    {path:"ex54", component: FashionDetailComponent, canActivate: [authGuard]},
    {path:"ex63", component: Ex63, canActivate: [authGuard]},
    {path:"ex63cart", component: Ex63cart, canActivate: [authGuard]},
    {path:"login", component: Login},
    {path:"register", component: Register},
    {path:"**",component:NotFound},
];