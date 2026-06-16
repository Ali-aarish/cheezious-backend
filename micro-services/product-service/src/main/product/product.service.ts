// Product service — Demo
// Holds the business logic. Uses in-memory sample data (no database) so the
// demo runs as-is. Swap this for a Mongoose model later.

import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, SAMPLE_PRODUCTS } from '../../schemas/mongodb/product.schema';

@Injectable()
export class ProductService {
  private products: Product[] = [...SAMPLE_PRODUCTS];

  // Return the whole menu
  findAll(): Product[] {
    return this.products;
  }

  // Return one product by id
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  // Add a new product to the menu
  create(data: Omit<Product, 'id'>): Product {
    const product: Product = { id: this.products.length + 1, ...data };
    this.products.push(product);
    return product;
  }
}
