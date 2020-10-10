import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/domain/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: 'product-edit.page.html',
  styleUrls: ['product-edit.page.scss']
})
export class ProductEditPage implements OnInit {

  form: FormGroup;
  isLoadingResults: boolean;
  id: any;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = new FormGroup({});
    this.isLoadingResults = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required]
    });
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  productDetail(): void {
    this.router.navigate(['product-detail'], this.id);
  }

  getProduct(id: any): void {
    this.api.getProduct(id)
      .subscribe(res => {
        this.id = res.id;
        this.form.setValue({
          name: res.name,
          description: res.description,
          price: res.price
        });
      }, err => {
        console.log(err);
      });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.api.updateProduct(this.id, this.form.value)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['product-detail'], res.id);
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
