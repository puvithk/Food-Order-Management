# Food Ordering System API

A simple Express.js API for managing food menus, placing orders, and automating order status updates.

## Features

- **GET /menu**: View available food items.
- **POST /menu**: Add a new food item to the menu.
- **POST /order**: Place an order.
- **GET /order**: View all orders.
- **GET /order/:id**: View a specific order's status.
- **Automated Status Update**: Order status updates every minute (Preparing → Out for Delivery → Delivered).

## Endpoints

- `GET /menu`: Get the list of food items.
- `POST /menu`: Add a food item (requires `name`, `price`, `category`).
- `POST /order`: Place an order (requires `name`, `quantity`, `address`).
- `GET /order`: Get all orders.
- `GET /order/:id`: Get order details by ID.

## Installation

1. Clone the repo:  
   `git clone <repository-url>`

2. Install dependencies:  
   `npm install`

3. Run the app:  
   `node app.js`

Server runs on `http://localhost:8052`.

## Cron Job

Order status updates every minute:
- **Preparing → Out for Delivery → Delivered** (then removed).

## Technologies

- **Express.js**
- **Node-Cron**

