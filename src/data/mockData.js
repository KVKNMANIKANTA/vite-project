export const products = {
  dairy: [
    { id: 101, name: "Organic Milk", price: 4.50, stock: 50, image: "/images/milk.svg", category: "Dairy" },
    { id: 102, name: "Farm Butter", price: 6.00, stock: 30, image: "/images/butter.svg", category: "Dairy" },
    { id: 103, name: "Greek Yogurt", price: 3.20, stock: 45, image: "/images/yogurt.svg", category: "Dairy" },
    { id: 104, name: "Cheddar Cheese", price: 8.50, stock: 20, image: "/images/cheese.svg", category: "Dairy" },
  ],
  vegetables: [
    { id: 201, name: "Fresh Spinach", price: 2.50, stock: 100, image: "/images/spinach.svg", category: "Vegetables" },
    { id: 202, name: "Carrots", price: 1.80, stock: 150, image: "/images/carrots.svg", category: "Vegetables" },
    { id: 203, name: "Broccoli", price: 3.00, stock: 80, image: "/images/broccoli.svg", category: "Vegetables" },
    { id: 204, name: "Bell Peppers", price: 2.20, stock: 60, image: "/images/peppers.svg", category: "Vegetables" },
  ],
  fruits: [
    { id: 301, name: "Red Apples", price: 3.50, stock: 120, image: "/images/apples.svg", category: "Fruits" },
    { id: 302, name: "Bananas", price: 1.20, stock: 200, image: "/images/bananas.svg", category: "Fruits" },
    { id: 303, name: "Strawberries", price: 5.00, stock: 40, image: "/images/strawberries.svg", category: "Fruits" },
    { id: 304, name: "Avocados", price: 4.00, stock: 50, image: "/images/avocado.svg", category: "Fruits" },
  ],
  accessories: [
    { id: 401, name: "Jute Bag", price: 5.00, stock: 100, image: "/images/bag.svg", category: "Accessories" },
    { id: 402, name: "Bamboo Straws", price: 8.00, stock: 50, image: "/images/straws.svg", category: "Accessories" },
  ]
};

export const employees = [
  { id: 1, name: "John Doe", role: "Manager", status: "Active", shift: "Morning" },
  { id: 2, name: "Jane Smith", role: "Driver", status: "On Route", shift: "Morning" },
  { id: 3, name: "Mike Johnson", role: "Packer", status: "Active", shift: "Evening" },
  { id: 4, name: "Sarah Lee", role: "Driver", status: "Break", shift: "Evening" },
];

export const orders = [
  { id: 5001, customer: "Alice Brown", items: "Milk, Apples", total: 8.00, status: "Pending" },
  { id: 5002, customer: "Bob White", items: "Carrots, Spinach", total: 4.30, status: "Delivered" },
  { id: 5003, customer: "Charlie Green", items: "Yogurt, Bananas", total: 4.40, status: "Processing" },
];

export const employeeTasks = [
  { id: 1, title: "Restock Dairy Section", status: "Pending", priority: "High", due: "10:00 AM", assignedTo: 1 },
  { id: 2, title: "Check Expiry Dates - Vegetables", status: "In Progress", priority: "Medium", due: "12:00 PM", assignedTo: 1 },
  { id: 3, title: "Clean Aisle 4", status: "Completed", priority: "Low", due: "09:30 AM", assignedTo: 2 },
  { id: 4, title: "Assist Customer - Bulk Order", status: "Pending", priority: "High", due: "11:00 AM", assignedTo: 3 },
];
