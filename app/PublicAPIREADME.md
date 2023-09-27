# DoWell-Living-Lab Chat

Welcome to the Django Rest Framework Room Chat API project! This project allows you to create rooms and send messages to rooms through a RESTful API built using Django Rest Framework.


## Authentication

This API does requires authentication for access.

# Getting started

**Step 1: Obtain the API key**

Before diving into the API integration, make sure that you have the necessary API key. You can generate your API key through the [DoWell API Key](https://ll05-ai-dowell.github.io/100105-DowellApiKeySystem/) Software

**Step 2: Set the base URL**

To make requests to the API, set the base url as `https://100096.pythonanywhere.com/api/v2/publicroom/?api_key=<your-api-key>`

**Syep 3: Structure Your Requests**

Craft your API requests by refering to the guidelines mentioned in the [Postman Documentation](https://documenter.getpostman.com/view/28557479/2s9YC8xBvg)

**Step 4: Handle Errors Gracefully**
The API follows standard HTTP status codes for error handling. Be sure to implement error handling in your code to gracefully manage potential errors and informative error messages.



## Error Handling

The API may return the following error responses:

- `400 Bad Request`: If the request payload is invalid or missing required fields.
- `500 Internal Server Error`: If an unexpected error occurs during the calculation process.

If you have any further questions or need assistance, please don't hesitate to contact our support team. We are here to help you make the most of the API service.