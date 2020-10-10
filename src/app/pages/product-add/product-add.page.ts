import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { fadeInDownAnimation } from "../../../app/animation";
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: 'product-add.page.html',
  styleUrls: ['product-add.page.scss'],
  // animations: [fadeInDownAnimation]
})
export class ProductAddPage implements OnInit {

  form: FormGroup;
  isLoadingResults: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = new FormGroup({});
    this.isLoadingResults = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : [null, Validators.required],
      description : [null, Validators.required],
      price : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    if (this.form.valid) {
      console.log(this.form.value);
      this.api.addProduct(this.form.value)
        .subscribe(res => {
          console.log(res);
          this.isLoadingResults = false;
          this.router.navigate(['home']);
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }

}
