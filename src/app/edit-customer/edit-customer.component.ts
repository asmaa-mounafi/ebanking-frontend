import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  customerId!: number;
  customerFormGroup !: FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private  productService: CustomerService,
              private fb: FormBuilder,private router:Router) {
  }
  ngOnInit() {
    this.customerId=this.activatedRoute.snapshot.params['id'];
    this.productService.getCustomerById(this.customerId).subscribe({
      next:(customer)=>{
        this.customerFormGroup=this.fb.group({
          id: this.fb.control(customer.id),
          name: this.fb.control(customer.name),
          email: this.fb.control(customer.email),


        })
      },
      error : err => {
        console.log(err)
      }
    })
  }

  updateCustomer() {
    let customer : Customer=this.customerFormGroup.value;
    this.productService.updateCustomer(customer).subscribe({
      next : data=>{
        alert(JSON.stringify(data));
        this.router.navigateByUrl("/admin/customers");
      }
    });
  }
}
