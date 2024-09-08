  import { Component, OnInit } from '@angular/core';
  import { ProductService } from '../../../../services/models/product.service';
  import { List_Product } from '../../../../contracts/list_product';
  import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
  })
  export class ListComponent implements OnInit{
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute){}

    products:List_Product[]
    currentPageNo: number;
    totalProductCount: number;
    totalPageCount: number;
    pageSize: number = 12;
    pageList: number[] = [];
    
    
    ngOnInit() {
      this.activatedRoute.params.subscribe(async params=>{
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);


        const data=await this.productService.read(this.currentPageNo - 1,10,
          ()=>{
  
          },
          errorMessage=>{
  
          }
        );
        this.products=data.products
      })

    }

    

  }
