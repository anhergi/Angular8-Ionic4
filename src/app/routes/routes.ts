import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
    { path: 'product-detail/:id', loadChildren: () => import('../pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule) },
    { path: 'product-edit/:id', loadChildren: () => import('../pages/product-edit/product-edit.module').then(m => m.ProductEditPageModule) },
    { path: 'product-add', loadChildren: () => import('../pages/product-add/product-add.module').then(m => m.ProductAddPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
