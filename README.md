# 100096-DowellChat

## Primary Modules

1. [django](https://www.djangoproject.com/)
1. [django rest framework](http://www.django-rest-framework.org/)

## Prerequisites

1. Python

## Installation

```
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

# Getting Started

## In web support-page Apis

Api_url = `https://100096.pythonanywhere.com/`

### 1. create user_profile admin

_Get_ to `Api_url/create-user-profile/`

- The `session_id` query parameter is required.

* Response 200

```json
{
  "status": 200,
  "portfolio": {
    "portfolio_name": "portfolio_name",
    "userID": "userID",
    "organization": "organization"
  }
}
```

### 2. fetch admin product list from database

_Get_ to `Api_url/admin_product_list/`

- Response 200

```json
{
  "product_list": ["List of products"]
}
```

### 3. fetch client product list from database

_Get_ to `Api_url/client_product_list/`

- Response 200

```json
{
  "product_list": ["List of products"]
}
```

### 4. fetch list of rooms product from database

_Get_ to `Api_url/room_list/(?P<product>[0-9\w-]+)/(?P<organization_id>[0-9\w-]+)`

- Response 200

```json
{
  "rooms": ["List of rooms"]
}
```

### 5. GET send_message from database

_Get_ to `Api_url/send_message/<int:pk>/` (room id)

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 6. Post send_message to database

_Post_ to `Api_url/send_message/<int:pk>/` (room id)

- Request body

```json
{
  "message": "message",
  "user_id": "user_id",
  "message_type": "text/Image",
  "org_id": "org_id"
}
```

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 6. Delete Chat room to database

_Get_ to `Api_url/delete-customer-support-room/`

- The `session_id` query parameter is required.
- The `room_id` query parameter is required.

- Response 200

```json
{
  "status": "Room deleted successfully"
}
```

## Sales-Agent App Apis

Api_url = `https://100096.pythonanywhere.com/`

### 1. fetch products from database

_Get_ to `Api_url/product_list/`

- Response 200

```json
{
  "product_list": ["List of products"]
}
```

### 2. fetch rooms in sales-agent from database

_Get_ to `Api_url/dowell-api/create-room/sales-agent/?session_id`

- Response 200

```json
{
  "session_id": "session_id",
  "product": "sales-agent",
  "portfolio": 1,
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-03T11:22+00:00",
      "room_id": "room_id",
      "read": true,
      "message": "Hey, How may I help you?",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": 1,
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 3. GET send_message from database

_Get_ to `Api_url/send/<int:pk>/` (room id)

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 4. Post send_message to database

_Post_ to `Api_url/send/<int:pk>/` (room id)

- Request body

```json
{
  "message": "message",
  "user_id": "user_id",
  "side": true
}
```

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 6. Delete chat to database

_Get_ to `Api_url/dowell-api/sender-delete-room/sales-agent/?session_id`

- The `session_id` query parameter is required.
- The `product` query parameter is required.

- Response 200

```json
{
  "status": "Room deleted successfully"
}
```

## custom-support App Apis

Api_url = `https://100096.pythonanywhere.com/`

### 1. fetch products from database

_Get_ to `Api_url/product_list/`

- Response 200

```json
{
  "product_list": ["List of products"]
}
```

### 2. fetch rooms in sales-agent from database

##### (login is requied)

_Get_ to `Api_url/create-portfolio-mobile/`

Request body

```json
{
  "username": "username",
  "user_id": "user_id",
  "session_id": "session_id",
  "org_id": "org_id"
}
```

- Response 200

```json
{
  "session_id": "session_id",
  "product": "sales-agent",
  "portfolio": 1,
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-03T11:22+00:00",
      "room_id": "room_id",
      "read": true,
      "message": "Hey, How may I help you?",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": 1,
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 3. GET send_message from database

_Get_ to `Api_url/send/<int:pk>/` (room id)

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 4. Post send_message to database

_Post_ to `Api_url/send/<int:pk>/` (room id)

- Request body

```json
{
  "message": "message",
  "user_id": "user_id",
  "side": true
}
```

- Response 200

```json
{
  "messages": [
    {
      "id": "id",
      "timestamp": "2023-05-01T09:47+00:00",
      "room_id": "room_id",
      "read": "true|false",
      "message": "message",
      "message_type": "TEXT",
      "side": true,
      "author": {
        "id": "id",
        "session_id": "session_id"
      }
    }
  ],
  "room_pk": "room_pk"
}
```

### 6. Delete room to database

_Get_ to `Api_url/delete-customer-support-mobile/`

- The `session_id` query parameter is required.
- The `room_id` query parameter is required.

- Response 200

```json
{
  "status": "Room deleted successfully"
}
```
