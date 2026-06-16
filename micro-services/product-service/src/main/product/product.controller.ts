// Product controller — Demo
// Exposes the REST endpoints for the menu.

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../schemas/mongodb/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET /products → full menu
  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  // GET /products/:id → one product
  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(Number(id));
  }

  // POST /products → add a product
  @Post()
  create(@Body() body: Omit<Product, 'id'>): Product {
    return this.productService.create(body);
  }
}
