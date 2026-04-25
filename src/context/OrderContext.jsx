import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Initialize with some mock data for demonstration
  const [orders, setOrders] = useState([
    { 
        id: 'ORD-7829', 
        date: 'Oct 24, 2023', 
        total: 1250.00, 
        status: 'Delivered', 
        items: ['Organic Milk', 'Fresh Spinach', 'Brown Eggs'],
        tracking: [
            { status: 'Order Placed', date: 'Oct 24, 9:00 AM', completed: true },
            { status: 'Processing', date: 'Oct 24, 11:30 AM', completed: true },
            { status: 'Shipped', date: 'Oct 25, 2:00 PM', completed: true },
            { status: 'Out for Delivery', date: 'Oct 26, 8:00 AM', completed: true },
            { status: 'Delivered', date: 'Oct 26, 1:45 PM', completed: true },
        ]
    },
    { 
        id: 'ORD-9921', 
        date: 'Nov 02, 2023', 
        total: 850.50, 
        status: 'Shipped', 
        items: ['Green Tea', 'Honey', 'Oats'],
        tracking: [
            { status: 'Order Placed', date: 'Nov 02, 10:15 AM', completed: true },
            { status: 'Processing', date: 'Nov 02, 1:00 PM', completed: true },
            { status: 'Shipped', date: 'Nov 03, 9:30 AM', completed: true },
            { status: 'Out for Delivery', date: 'Pending', completed: false },
            { status: 'Delivered', date: 'Pending', completed: false },
        ]
    }
  ]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Processing',
      tracking: [
        { status: 'Order Placed', date: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), completed: true },
        { status: 'Processing', date: 'Pending', completed: false },
        { status: 'Shipped', date: 'Pending', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false },
      ]
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
