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

## Uploads Directory
- **Images**
```
http://localhost:5000/uploads/images/:filename
```