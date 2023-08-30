# 100096-DowellChat-v2

- [DOCUMENTATION](https://documenter.getpostman.com/view/26372308/2s9Y5VTPPH)

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

## Client side chat api

Api_url = `https://100096.pythonanywhere.com/`

### 1. Create room API

\_Post_to `Api_url/api/v2/room-control/`

- Request body

```json
{
  "user_id": "ABCD12345",
  "org_id": "DOWELL12345",
  "portfolio_name": "umair",
  "product_name": "WIFIQRCODE"
}
```

- Response 200

```json
{
  "success": true,
  "message": "Room filter successfully",
  "inserted_id": "64e96a73f59c079a226e1ae9",
  "response": {
    "_id": "64e96a73f59c079a226e1ae9",
    "eventId": "FB10100000001693018738#5535526",
    "user_id": "ABCD12345",
    "org_id": "DOWELL12345",
    "portfolio_name": "umair",
    "room_room_id": "19-ABCD12345",
    "product_name": "LOGOSCAN",
    "message_data": "message",
    "is_active": true
  }
}
```

## 2. Post send_message to database

_Post_ to `Api_url/api/v2/room-service/`

**Request:**

```json
{
  "type": "create_message",
  "room_id": "64ed7d75a57293efb539eb19",
  "message_data": "message",
  "side": true,
  "auther": "client",
  "message_type": "text"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message updated successfully",
  "response": {
    "isSuccess": true
  }
}
```

## 3. Get message by room Id

_Get_ to `Api_url/api/v2/room-service/?type=get_messages`

**Query Parameters:**

- `type`: "get_messages"
- `room_id`: "room_id"

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Room deatils based on workspace id",
  "response": [
    {
      "_id": "_id",
      "eventId": "eventId",
      "user_id": "user_id",
      "org_id": "org_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message_data": "message",
      "is_active": false
    }
  ]
}
```

## 4. Get room by Id

_Get_ to `Api_url/api/v2/room-service/?type=get_room_by_id`

**Query Parameters:**

- `type`: "get_room_by_id"
- `room_id`: "room_id"

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Room deatils based on workspace id",
  "response": [
    {
      "_id": "_id",
      "eventId": "eventId",
      "user_id": "user_id",
      "org_id": "org_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message_data": "message",
      "is_active": false
    }
  ]
}
```

## 5. Delete Chat room to database

_Get_ to `Api_url/api/v2/room-service/`

**Request:**

```json
{
  "type": "delete_room",
  "room_id": "64edd973bb5e27de179c721c",
  "is_active": false
}
```

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Room deleted successfully",
  "response": {
    "isSuccess": true
  }
}
```

# Server side chat api

## 1. fetch list of rooms product from database

_Get_ to `Api_url/api/v2/room-list/?org_id=DOWELL12345&product_name=WORKFLOWAI`

**Query Parameters:**

- `org_id`: org_id,
- `product_name`: product_name

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "rooms": ["List of rooms"]
}
```

## 2. Get room by Id

_Get_ to `Api_url/api/v2/room-service/?type=get_room_by_id`

**Query Parameters:**

- `type`: "get_room_by_id"
- `room_id`: "room_id"

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Room deatils based on workspace id",
  "response": [
    {
      "_id": "_id",
      "eventId": "eventId",
      "user_id": "user_id",
      "org_id": "org_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message_data": "message",
      "is_active": false
    }
  ]
}
```

## 3. Post send_message to database

_Post_ to `Api_url/api/v2/room-service/`

**Request:**

```json
{
  "type": "create_message",
  "room_id": "64ed7d75a57293efb539eb19",
  "message_data": "message",
  "side": true,
  "auther": "client",
  "message_type": "text"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message updated successfully",
  "response": {
    "isSuccess": true
  }
}
```

## 4. Get message by room Id

_Get_ to `Api_url/api/v2/room-service/?type=get_messages&room_id=room_id`

**Query Parameters:**

- `type`: "get_messages"
- `room_id`: "room_id"

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Room deatils based on workspace id",
  "response": [
    {
      "_id": "_id",
      "eventId": "eventId",
      "user_id": "user_id",
      "org_id": "org_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message_data": "message",
      "is_active": false
    }
  ]
}
```
