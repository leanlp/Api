curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "test", "password": "test"}'


curl -X GET http://localhost:3000/users/fetch -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ1MDk3NCwiZXhwIjoxNzE5NDU0NTc0fQ.40V8zUcxoRjsjVTZDR39FJ_wJITB2vz7Xu887NxWCFI" -H "x-password: h"
                                                                                            
curl -X GET http://localhost:3000/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJzdWIiOjEsImlhdCI6MTcxOTQ1MDk3NCwiZXhwIjoxNzE5NDU0NTc0fQ.40V8zUcxoRjsjVTZDR39FJ_wJITB2vz7Xu887NxWCFI" -H "x-password: h"




