import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../domain/product';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  products: Array<Product>;

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.products = [];
  }


  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });
    await loading.present();
    await this.api.getProducts()
      .subscribe(res => {
        this.products = res;
        console.log(this.products);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  addProduct(): void {
    this.router.navigate(['product-add']);
  }

  drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }

}
