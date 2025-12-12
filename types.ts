export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}

export enum BannerType {
  FULL_HEIGHT,
  HALF_HEIGHT
}