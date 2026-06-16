// App module — Demo
// The root module of the product-service. It pulls in the feature modules.

import { Module } from '@nestjs/common';
import { ProductModule } from './main/product/product.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
