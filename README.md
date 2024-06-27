# Secure Data API

## Overview

The Secure Data API provides endpoints for managing secure user data, including functionalities for creating users, fetching encrypted and decrypted user data, and integrating with external APIs. Authentication is handled via JWT tokens.

## Features

- Create new users
- Retrieve all users in encrypted format
- Retrieve all users in decrypted format
- Fetch and store users from an external API
- Authentication with JWT tokens

![alt text](/images/Swagger.png)


## Password Hashing

```bash

node /scripts/scriptHashPassword.js

``` 

## Curl Methods

curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "test", "password": "test"}'


curl -X GET http://localhost:3000/users/fetch -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ1MDk3NCwiZXhwIjoxNzE5NDU0NTc0fQ.40V8zUcxoRjsjVTZDR39FJ_wJITB2vz7Xu887NxWCFI" -H "x-password: h"
                                                                                            
curl -X GET http://localhost:3000/users/decrypted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ5NDQxNCwiZXhwIjoxNzE5NDk4MDE0fQ.Jfp2AR9SA4ZyplQkEwPz9rw7RivoS9--KV77t4FqnIs" -H "x-password: h"


curl -X GET http://localhost:3000/users/encrypted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ5NDQxNCwiZXhwIjoxNzE5NDk4MDE0fQ.Jfp2AR9SA4ZyplQkEwPz9rw7RivoS9--KV77t4FqnIs" -H "x-password: h"



