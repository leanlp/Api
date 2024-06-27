# Secure Data API

## Overview

The Secure Data API provides endpoints for managing secure customer data, including functionalities for creating customers, fetching encrypted and decrypted customer data, and integrating with external APIs. Authentication is handled via JWT tokens. All customer data is encrypted before being stored in the database and decrypted upon retrieval using a dual-password system.

## Features

- Create new customers
- Retrieve all customers in encrypted format
- Retrieve all customers in decrypted format
- Fetch and store customers from an external API
- Authentication with JWT tokens
- Secure data storage with encryption and hashing

## Workflow Description

1. **Customer Registration**
    - Customers register by providing necessary details.
    - The provided details are used to encrypt the customer's data before storing it in the database.
    - A second, internal password is used by the system to hash all stored data.
    - The customer data, now encrypted and hashed, is stored in the database.

2. **Customer Authentication**
    - Customers log in by providing their credentials.
    - The API verifies the credentials.
    - Upon successful verification, the API generates a JWT token which the customer must use for subsequent requests.

3. **Data Encryption and Decryption**
    - When storing data, the customer's details are used to encrypt their data.
    - The data is then hashed using an internal password before being stored in the database.
    - When retrieving data, the API uses the internal password to decrypt the data and then decrypts it further using the customer's details.

## Endpoints

### Customer Endpoints
    
![alt text](/images/Swagger.png)


## Run API

1. Install dependency

```bash
npm install
```

2. Rename the .envExample file to .env
   
```bash 
mv .envExample .env
```
3. Start the development server
```bash 
npm run start:dev
```

## Password Hashing

```bash

node /scripts/scriptHashPassword.js

``` 

## Curl Methods

curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "test", "password": "test"}'


curl -X GET http://localhost:3000/users/fetch -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ1MDk3NCwiZXhwIjoxNzE5NDU0NTc0fQ.40V8zUcxoRjsjVTZDR39FJ_wJITB2vz7Xu887NxWCFI" -H "x-password: h"
                                                                                            
curl -X GET http://localhost:3000/users/decrypted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ5NDQxNCwiZXhwIjoxNzE5NDk4MDE0fQ.Jfp2AR9SA4ZyplQkEwPz9rw7RivoS9--KV77t4FqnIs" -H "x-password: h"


curl -X GET http://localhost:3000/users/encrypted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ5NDQxNCwiZXhwIjoxNzE5NDk4MDE0fQ.Jfp2AR9SA4ZyplQkEwPz9rw7RivoS9--KV77t4FqnIs" -H "x-password: h"



