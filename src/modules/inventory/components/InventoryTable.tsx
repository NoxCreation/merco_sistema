import React from "react";

const tableItems: InventoryItem[] = [
  {
    code: "INV001",
    image: "https://example.com/images/inventory/inv001.jpg",
    category: "Electronics",
    product: "Smartphone Galaxy S21",
    inStock: 75,
    cost: 750,
    price: 999,
  },
  {
    code: "INV002",
    image: "https://example.com/images/inventory/inv002.jpg",
    category: "Clothing",
    product: "Men's Casual Shirt",
    inStock: 50,
    cost: 45,
    price: 59,
  },
  {
    code: "INV003",
    image: "https://example.com/images/inventory/inv003.jpg",
    category: "Home Appliances",
    product: "Air Purifier",
    inStock: 30,
    cost: 120,
    price: 150,
  },
  {
    code: "INV004",
    image: "https://example.com/images/inventory/inv004.jpg",
    category: "Sports Equipment",
    product: "Mountain Bike",
    inStock: 85,
    cost: 800,
    price: 1050,
  },
  {
    code: "INV005",
    image: "https://example.com/images/inventory/inv005.jpg",
    category: "Books",
    product: "The Great Gatsby",
    inStock: 60,
    cost: 15,
    price: 19,
  },
  {
    code: "INV006",
    image: "https://example.com/images/inventory/inv006.jpg",
    category: "Toys",
    product: "Remote Control Car",
    inStock: 40,
    cost: 35,
    price: 45,
  },
  {
    code: "INV007",
    image: "https://example.com/images/inventory/inv007.jpg",
    category: "Furniture",
    product: "Dining Table",
    inStock: 55,
    cost: 250,
    price: 325,
  },
  {
    code: "INV008",
    image: "https://example.com/images/inventory/inv008.jpg",
    category: "Beauty & Personal Care",
    product: "Facial Cleansing Brush",
    inStock: 70,
    cost: 80,
    price: 100,
  },
  {
    code: "INV009",
    image: "https://example.com/images/inventory/inv009.jpg",
    category: "Gardening",
    product: "Hydroponic System",
    inStock: 90,
    cost: 300,
    price: 375,
  },
  {
    code: "INV010",
    image: "https://example.com/images/inventory/inv010.jpg",
    category: "Tools",
    product: "Power Drill",
    inStock: 65,
    cost: 200,
    price: 250,
  },
];

type InventoryItem = {
  code: string;
  image: string;
  category: string;
  product: string;
  inStock: number;
  cost: number;
  price: number;
};

export default function InventoryTable() {
  return ;
}
