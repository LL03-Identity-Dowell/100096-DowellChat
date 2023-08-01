# API Internal Documentation

## 1. Getting Started

### a) Get client product list

- **Request Type:** GET
- **Description:** Fetch the client product list from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/client_product_list/`

### b) Get admin product list

- **Request Type:** GET
- **Description:** Fetch the admin product list from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/admin_product_list/`

### c) Get room list

- **Request Type:** POST
- **Description:** Get the list of rooms for the given Workflow AI and Organization id.
- **Endpoint:** `https://100096.pythonanywhere.com/room_list/Workflow%20AI/64a5658b3d4a9c181cc098e8`
- **URL Parameters:**
  - `Product` (type: string)
  - `Organization` (type: string)

### d) Post message to database

- **Request Type:** POST
- **Description:** Post a message to the database for the specified room id.
- **Endpoint:** `https://100096.pythonanywhere.com/send_message/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "Your message content here"
      }
      ```

### e) Send message from database

- **Request Type:** GET
- **Description:** Get a message from the database for the specified room id.
- **Endpoint:** `https://100096.pythonanywhere.com/send_message/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "Your message content here"
      }
      ```

Please note that for the endpoints with a `POST` request, the message content should be passed as JSON in the request body.


## 2. Sales Agent APP APIs

### a) Fetch Products from the database

- **Request Type:** GET
- **Description:** Fetch products from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/product_list/`

### b) Fetch rooms in sales-agent from the database

- **Request Type:** GET
- **Description:** Fetch rooms in sales-agent from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/dowell-api/create-room/sales-agent/`
- **URL Parameter:**
  - `session_id` (type: string)
    - Example: `'2gzk15hs6jxxa6teoa6fptsgopc2wtxp'`

### c) Post message to the database

- **Request Type:** POST
- **Description:** Post a message to the database for the specified room id.
- **Endpoint:** `http://100096.pythonanywhere.com/send/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "no hello but I need help but this is a documentation test",
        "user_id": "64a56597d670bfe5f0c0b83f",
        "org_id": "64a5658b3d4a9c181cc098e8"
      }
      ```

### d) Send Message from the database

- **Request Type:** GET
- **Description:** Get a message from the database for the specified room id.
- **Endpoint:** `https://100096.pythonanywhere.com/send/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "no hello but I need help but this is a documentation test",
        "user_id": "64a56597d670bfe5f0c0b83f",
        "org_id": "64a5658b3d4a9c181cc098e8"
      }
      ```


## 3. Customer Support APP APIs

### a) Fetch products from the database

- **Request Type:** GET
- **Description:** Fetch products from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/product_list/`

### b) Fetch rooms in sales agent from the database

- **Request Type:** POST
- **Description:** Fetch rooms in sales agent from the database. Log in is required.
- **Endpoint:** `https://100096.pythonanywhere.com/create-portfolio-mobile/`
- **URL Parameters:**
  - `session_id` (type: string)
    - Example: `'2gzk15hs6jxxa6teoa6fptsgopc2wtxp'`

- **Other Parameters:**
  - **Body:** formdata
    - `username` (type: string)
    - `user_id` (type: string)
    - `org_id` (type: string)

### c) Send messages from the database

- **Request Type:** GET
- **Description:** Get messages from the database for the specified room id.
- **Endpoint:** `https://100096.pythonanywhere.com/send/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "Testing Sales Agent",
        "user_id": "64a56597d670bfe5f0c0b83f",
        "org_id": "64a5658b3d4a9c181cc098e8"
      }
      ```

### d) Post message to the database

- **Request Type:** POST
- **Description:** Post a message to the database for the specified room id.
- **Endpoint:** `https://100096.pythonanywhere.com/send/3408/`
- **URL Parameter:**
  - `room_id` (type: integer, pk)

- **Other Parameters:**
  - **Body:** raw (type: JSON)
    - Example:
      ```json
      {
        "message": "Testing Sales Agent",
        "user_id": "64a56597d670bfe5f0c0b83f",
        "org_id": "64a5658b3d4a9c181cc098e8"
      }
      ```

### e) Delete room from the database

- **Request Type:** GET
- **Description:** Delete a room from the database.
- **Endpoint:** `https://100096.pythonanywhere.com/delete-customer-support-room/`
- **URL Parameters:**
  - `session_id` (type: string)
  - `product` (type: string)
