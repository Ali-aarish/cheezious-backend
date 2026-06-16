// Product schema — Demo
// Shape of a product (menu item). In a real service this would be a Mongoose
// schema; here it's a simple interface plus a couple of sample records so the
// demo runs without a database.

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // in PKR
  available: boolean;
}

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Cheezious Special Pizza', category: 'Pizza', price: 1200, available: true },
  { id: 2, name: 'Garlic Bread', category: 'Sides', price: 350, available: true },
  { id: 3, name: 'Cheese Lava Burger', category: 'Burgers', price: 650, available: true },
  { id: 4, name: 'Cold Drink 500ml', category: 'Drinks', price: 120, available: true },
];
