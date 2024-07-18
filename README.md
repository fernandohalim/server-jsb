# Jasplast Sukses Bersama (Server Side)
To deploy, run:
```
nodemon index
```
## Data Models
- **User Model**
```
"username": "text/string",
"password": "text/string/hash",
"role": "text/string|superadmin|admin",
"status": "text/string|active|inactive"
```
```
"id": "text/int/generated|auto_increment"
"createdAt": "date/generated"
"updatedAt": "date/generated"
```

- **Transaction Model**
```
"name": "text/string",
"amount": "text/int",
"description": "text/string",
"date": "text/string",
"value": "text/string|plus|minus",
"status": "text/string|active|inactive",
"attachment": "file/jpg|png|jpeg"
"userId": "text/int"
```
```
"id": "text/int/generated|auto_increment"
"createdAt": "date/generated"
"updatedAt": "date/generated"
```

- **CoA Model**
```
"code": "text/string",
"name": "text/string",
```
```
"id": "text/int/generated|auto_increment"
"createdAt": "date/generated"
"updatedAt": "date/generated"
```

## User API
- **Login (POST)**
```
http://localhost:5000/api/user/login
```
- **Register (POST)**
```
http://localhost:5000/api/user/register
```
- **Logout (POST, Body Not Required)**
```
http://localhost:5000/api/user/login
```
- **Get Cookie Token (GET)**
```
http://localhost:5000/api/user
```
- **Update User Status (PATCH, Require Params [id])**
```
http://localhost:5000/api/user/update/:id
```

## Transaction API
- **Get Transaction (GET)**
```
http://localhost:5000/api/transaction
```
- **Get Transaction By ID (GET, Require Params [id])**
```
http://localhost:5000/api/transaction/:id
```
- **Create Transaction (POST)**
```
http://localhost:5000/api/transaction
```
- **Update Transaction (PATCH, Require Params [id])**
```
http://localhost:5000/api/transaction/:id
```
- **Update Transaction Status (PATCH, Require Params [id])**
```
http://localhost:5000/api/transaction/status/:id
```

## CoA API
- **Get CoA (GET)**
```
http://localhost:5000/api/coa
```
- **Get CoA By ID (GET, Require Params [id])**
```
http://localhost:5000/api/coa/:id
```
- **Create CoA (POST)**
```
http://localhost:5000/api/coa
```
- **Update CoA (PATCH, Require Params [id])**
```
http://localhost:5000/api/coa/:id
```
- **Delete CoA (DELETE, Require Params [id])**
```
http://localhost:5000/api/coa/:id
```

## Uploads Directory
- **Attachment**
```
http://localhost:5000/uploads/:filename
```