# Backend - Agenda de Tareas 

API REST para gestionar usuarios, tareas y categorías.

- Node.js + Express
- MySQL (XAMPP / phpMyAdmin)
- JWT para autenticación
- Deploy en Vercel

---

## Requisitos

- Node.js
- MySQL (por ejemplo XAMPP)

---

## Configuración local

1. Clonar el repositorio:

```bash
git clone <https://github.com/sofigonzalez14/agenda-backend.git>
cd <src>
npm install
```
2. Crear archivo .env en la raíz:
```bash
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=agenda_tareas

JWT_SECRET=un_secreto_seguro
```
3. Importar la base de datos
   - Abrir phpMyAdmin.
   - Crear una base de datos (ej: agenda_tareas).
   - Ir a Importar y cargar el archivo .sql que se encuentra en la carpeta database.

## Postman

En la carpeta postman/ se incluye:
  - Colección de endpoints (*.postman_collection.json)  
  - Environment local (*.postman_environment.json)

Uso rápido:
  - Importar colección y environment en Postman.
  - Seleccionar el environment.
  - Ejecutar POST {{base_url}}/api/auth/login.
  - El token se guarda en la variable token y se usa en los demás endpoints protegidos.

## Deploy en Vercel
El backend esta desplegado en:
https://agenda-backend-nu.vercel.app/api/health


