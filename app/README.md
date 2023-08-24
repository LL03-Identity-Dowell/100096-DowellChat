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

_Post_to `Api_url/api/v2/room-control/`

- Request body

```json
{
  "user_id": "ABCD12345",
  "workspace_id": "DOWELL12345",
  "portfolio_name": "umair",
  "product_name": "WIFIQRCODE"
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

## 2. Get room details by workspaceId

_Get_ to `Api_url/api/v2/room-service/?type=get_rooms_by_workspace_id&org_id=DOWELL12345`

**Query Parameters:**

- `type`: get_rooms_by_org_id
- `org_id`: "org_id"

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
      "workspace_id": "workspace_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message": {
        "user": "i am fine any you?",
        "recevier": "hy how are you ?"
      },
      "is_active": false
    }
  ]
}
```

## 3. Get room by Id

_Get_ to `Api_url/api/v2/room-service/?type=get_room_by_id`

**Query Parameters:**

- `type`: get_room_by_id

**Request:**

```json
{
  "room_id": "room_id"
}
```

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
      "workspace_id": "workspace_id",
      "portfolio_name": "portfolio_name",
      "room_room_id": "room_room_id",
      "product_name": "product_name",
      "message": {
        "user": "i am fine any you?",
        "recevier": "hy how are you ?"
      },
      "is_active": false
    }
  ]
}
```

### 4. Post send_message to database

_Post_ to `Api_url/api/v2/room-service/?type=update_message_room`

**Query Parameters:**

- `type`: update_message_room

**Request:**

```json
{
  "room_id": "64e573b66c3b5f96ec61434c",
  "message_data": {
    "user": "hello",
    "recevier": "hy how are you ?",
    "user": "i am fine any you?"
  }
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

### 5. fetch list of rooms product from database

_Get_ to `Api_url/api/v2/room-list/?workspace_id=DOWELL12345&product_name=WORKFLOWAI`

**Query Parameters:**

- `workspace_id`: workspace_id,
- `product_name`: product_name

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "rooms": ["List of rooms"]
}
```

### 6. Delete Chat room to database

_Get_ to `Api_url/api/v2/room-service/?type=delete_room`

**Query Parameters:**

- `workspace_id`: workspace_id,
- `product_name`: product_name

**Request:**

```json
{
  "room_id": "64e573b66c3b5f96ec61434c",
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
