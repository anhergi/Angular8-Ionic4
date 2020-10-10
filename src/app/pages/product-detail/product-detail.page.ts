import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/domain/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {

  product: Product;
  isLoadingResults: boolean;

  constructor(
    private api: ApiService,
    public alertController: AlertController,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.product = new Product();
    this.isLoadingResults = false;
  }

  ngOnInit(): void {
    this.getProduct();
  }

  async getProduct() {
    if (this.activatedRoute.snapshot.paramMap.get('id') === 'null') {
      this.presentAlertConfirm("You are not choosing an item from the list");
    } else {
      this.isLoadingResults = true;
      await this.api.getProduct(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.product = res[0];
          // this.product.update_at = new Date(res[0].update_at);
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: "Warning",
      message: msg,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteProduct(id: any) {
    this.isLoadingResults = true;
    await this.api.deleteProduct(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['home']);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  editProduct(id: any): void {
    this.router.navigate(['product-edit', id]);
  }

}
