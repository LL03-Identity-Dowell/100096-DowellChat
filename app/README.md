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
  "author": "client",
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
  "author": "client",
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

## 5. Get QR Ids By org_id

_Post_ to `Api_url/api/v2/get_QR_Id/6385c0f18eca0fb652c94558/`
**Query Parameters:**

- `org_id`: "org_id"

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "qr_id_list": [
    "ZiQ7qUH73Q83",
    "Gr4t0YhpMfVa",
    "E37l1lMsbsJK",
    "uSGUUNoxhzEX",
    "E37l1lMsbsJK",
    "uSGUUNoxhzEX"
  ]
}
```

## 6 . create public room for

_Get_ to `Api_url/api/v2/init/6385c0f18eca0fb652c94558/WORKFLOWAI/g6tWCp5trVRO/`

**Response:**

- **Status:** 200 OK
- **Content:**

```json
{
  "room": {
    "success": true,
    "message": "Room created successfully",
    "inserted_id": "64f6bf10492215a52e7af43f",
    "response": {
      "eventId": "FB101000000001693892367#565077",
      "user_id": "g6tWCp5trVRO",
      "org_id": "6385c0f18eca0fb652c94558",
      "portfolio_name": "g6tWCp5trVRO",
      "room_room_id": "11-g6tWCp5trVRO",
      "product_name": "WORKFLOWAI",
      "message": {
        "receiver": "How may I help you"
      },
      "isLogin": false,
      "is_active": true
    }
  }
}
```

## Sale Agent chat api

Api_url = `https://100096.pythonanywhere.com/`

### 1. Create room API for login products

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

### 2. Create room API for open chat

\_Post_to `Api_url/api/v2/openChatRoom/`

- Request body

```json
{
  "user_id": "ABCD12345",
  "product_name": "SALESAGENT"
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

## 3. Post send_message to database

_Post_ to `Api_url/api/v2/room-service/`

**Request:**

```json
{
  "type": "create_message",
  "room_id": "64ed7d75a57293efb539eb19",
  "message_data": "message",
  "side": true,
  "author": "client",
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

## 5. Get room by Id

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

## 6. Delete Chat room to database

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

## 7. Login
_Post_ to `Api_url/api/v2/login/`


- Request body

```json
{
  "user_id": "ABCD12345",
  "org_id": "DOWELL12345",

}
```

- Response 200

```json
{
  "success": true,
  "message": "Room created successfully",
  "inserted_id": "651687bbff672eb4616037b7",
  "response": {
    "eventId": "FB10100000001695975354#9018712",
    "user_id": "13-3700b6adce4a41d392c298be682ec550",
    "org_id": "fb06c88719004461acc26134cd421343",
    "portfolio_name": "WIFIQRCODE13-3700b6adce4a41d392c298be682ec550",
    "product_name": "WIFIQRCODE",
    "message": {
      "receiver": "How may I help you"
    },
    "isLogin": true,
    "is_active": true,
    "room_id": "651687bbff672eb4616037b7"
  }
}
```

## 8. Extension
_Post_ to `Api_url/api/v2/extension/`


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
    "inserted_id": "6516772afa40f284cce7a26a",
    "response": {
        "_id": "6516772afa40f284cce7a26a",
        "eventId": "FB10100000001695971113#6467628",
        "user_id": "13-3700b6adce4a41d392c298be682ec550",
        "org_id": "DOWELL12345",
        "portfolio_name": "umair",
        "product_name": "WIFIQRCODE",
        "message": {
            "receiver": "How may I help you"
        },
        "isLogin": true,
        "is_active": true
    }
}
```