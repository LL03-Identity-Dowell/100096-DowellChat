# Dowell Chat and Customer Support API Documentation

Welcome to the API documentation for Dowell Chat and Customer Support. This documentation provides details about the various endpoints and functionalities offered by the API.

## Getting Started

To get started with the Dowell Chat and Customer Support API, please refer to the [Getting Started Guide](https://documenter.getpostman.com/view/28229446/2s93z9ciQb).

## Sales Agent App APIs

To integrate with the Sales Agent App, please refer to the [Sales Agent App APIs Documentation](https://documenter.getpostman.com/view/28229446/2s93z9ciQd).

## Customer Support App APIs

To integrate with the Customer Support App, please refer to the [Customer Support App APIs Documentation](https://documenter.getpostman.com/view/28229446/2s93z9b2va).

## Web Support-Page APIs

API Base URL: `https://100096.pythonanywhere.com/`

## Getting Started 

### 1. create user_profile admin

Description:
The "create user_profile admin" API is used to create a user profile for an admin. This API requires the `session_id` query parameter to be included in the request. By making a request to the specified endpoint, you can create a user profile for an admin.

### 2. fetch admin product list from database

Description:
The "fetch admin product list from database" API is used to retrieve a list of products for an admin from the database. By sending a GET request to the specified endpoint, you can fetch the admin product list.

### 3. fetch client product list from database

Description:
The "fetch client product list from database" API is used to retrieve a list of products for a client from the database. By sending a GET request to the specified endpoint, you can fetch the client product list.

### 4. fetch list of rooms product from database

Description:
The "fetch list of rooms product from database" API is used to fetch a list of rooms for a specific product and organization from the database. This API requires the `product` and `organization_id` path parameters to be included in the request URL.

### 5. GET send_message from database

Description:
The "GET send_message from database" API is used to retrieve a list of messages from the database for a specific room. By sending a GET request to the specified endpoint, you can fetch the messages for the given room ID.

### 6. Post send_message to database

Description:
The "Post send_message to database" API is used to post a new message to a specific room in the database. By sending a POST request to the specified endpoint, you can add a new message to the room. The request body should include the necessary details such as the message content, user ID, message type, and organization ID.

### 7. Delete Chat room from database

Description:
The "Delete Chat room from database" API is used to delete a chat room from the database. This API requires the `session_id` and `product` query parameters to be included in the request. By sending a GET request to the specified endpoint, you can delete the chat room associated with the provided session ID and product.


## Sales-Agent App Apis

### 1. fetch products from database

Description:
The "fetch products from database" API is used to retrieve a list of products from the database. By sending a GET request to the specified endpoint, you can fetch the product list.

### 2. fetch rooms in sales-agent from database

Description:
The "fetch rooms in sales-agent from database" API is used to fetch a list of rooms in the sales agent application from the database. This API requires the `session_id` query parameter to be included in the request URL.

### 3. GET send_message from database

Description:
The "GET send_message from database" API is used to retrieve a list of messages from the database for a specific room. By sending a GET request to the specified endpoint, you can fetch the messages for the given room ID.

### 4. Post send_message to database

Description:
The "Post send_message to database" API is used to post a new message to a specific room in the database. By sending a POST request to the specified endpoint, you can add a new message to the room. The request body should include the necessary details such as the message content, user ID, and side (boolean).

### 6. Delete chat to database

Description:
The "Delete chat to database" API is used to delete a chat room from the database. This API requires the `session_id` and `product` query parameters to be included in the request. By sending a GET request to the specified endpoint, you can delete the chat room associated with the provided session ID and product.


## custom-support App Apis

### 1. fetch products from database

Description:
The "fetch products from database" API is used to retrieve a list of products from the database. By sending a GET request to the specified endpoint, you can fetch the product list.

### 2. fetch rooms in sales-agent from database

Description:
The "fetch rooms in sales-agent from database" API is used to fetch a list of rooms in the sales agent application from the database. This API requires a login to be performed before accessing the endpoint. The necessary information should be provided in the request body, including the username, user ID, session ID, and organization ID.

### 3. GET send_message from database

Description:
The "GET send_message from database" API is used to retrieve a list of messages from the database for a specific room. By sending a GET request to the specified endpoint with the room ID as a parameter, you can fetch the messages for the given room.

### 4. Post send_message to database

Description:
The "Post send_message to database" API is used to post a new message to a specific room in the database. By sending a POST request to the specified endpoint with the room ID as a parameter, you can add a new message to the room. The request body should include the necessary details such as the message content, user ID, and side (boolean).

### 6. Delete room to database

Description:
The "Delete room to database" API is used to delete a chat room from the database. This API requires the `session_id` and `product` query parameters to be included in the request. By sending a GET request to the specified endpoint, you can delete the chat room associated with the provided session ID and product.


