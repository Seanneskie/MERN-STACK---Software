# MERN-STACK---Software
# Installation
First Terminal (backend)
``` bash
cd backend
npm install
```
Second Terminal (frontend)
``` bash
cd frontend
npm install
```

# Running
First Terminal (backend)
``` bash
cd backend
npm run dev
```

Second Terminal (frontend)
``` bash
cd frontend
npm start
```
#How to access Admin Page
![image](https://github.com/Seanneskie/MERN-STACK---Software/assets/91924632/96286ffa-e8e1-4181-9e7f-edb05a04222b)
1. Open Postman
2. Use localhost:4000/api/user as the URL of the request and Select POST
3. Select Body and then Raw and select JSON as the type
4. Paste this below
{
  "username": "sampleAdmin",
  "email": "sampleuser@example.com",
  "password": "Admin",
  "role": "admin"
}
5. Send
6. Upon Login use sampleAdmin as Username and Admin as password
