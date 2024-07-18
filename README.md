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