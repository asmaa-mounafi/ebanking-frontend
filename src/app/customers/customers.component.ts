import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchformGroup!: FormGroup;

  constructor(private customerService:CustomerService,private fb : FormBuilder,private router: Router) {
  }

  ngOnInit(): void{
    this.searchformGroup=this.fb.group({
      keyword : this.fb.control("")
    });
this.handleSearchCustomers();
  }

  handleSearchCustomers(){
let kw = this.searchformGroup?.value.keyword;
this.customers=this.customerService.searchCustomers(kw).pipe(
  catchError(err => {
    this.errorMessage=err.message;
    return  throwError(err);
  })
);
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure ?")
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
      this
        this.customers=this.customers.pipe(
          map(data=>{
           let index= data.indexOf(c);
           data.slice(index,1);
            return data;
          })
        )
      },error :err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(c: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+c.id,{state:c});
  }

  handleEdite(customer: Customer) {
    this.router.navigateByUrl(`/admin/editCustomer/${customer.id}`)
  }


}
