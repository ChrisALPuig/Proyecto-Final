# Ecommerce de Videojuegos

Este proyecto es una plataforma de comercio electrónico de videojuegos desarrollada con Spring Boot (backend) y React + Ionic (frontend).

---

# Tecnologías utilizadas
- Spring Boot (Java) – Backend API REST
- React – Frontend web
- Ionic – Aplicación híbrida/móvil
- MySQL – Base de datos
- JWT 
- REST API

---

# Cómo ejecutar el proyecto
1. Requisitos previos

Asegúrate de tener instalado:

- Java 17 o superior
- Node.js (recomendado LTS)
- npm o yarn
- MySQL
- Maven

---

# 2. Backend (Spring Boot)

## Configurar base de datos

Crear una base de datos en MySQL:

    CREATE DATABASE ecommerce;

Configurar application.properties:

    spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
    spring.datasource.username=TU_USUARIO
    spring.datasource.password=TU_PASSWORD

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

---

## Ejecutar backend

Desde la carpeta del backend:

    cd Proyecto-Final-Master

Compilar y ejecutar:

    mvn spring-boot:run

El backend estará disponible en:

    http://localhost:8080

---

# 3. Frontend Web (React) (Rama Frontend1)

## Instalar dependencias

    cd Proyecto-Final-frontend1
    npm install

## Ejecutar proyecto

    npm run dev

La aplicación estará disponible en:

    http://localhost:5173

---

# Funcionalidades principales

- Registro e inicio de sesión
- Catálogo de videojuegos
- Carrito de compra persistente
- Sistema de pagos
- Lista de deseos
- Panel de administración
- Soporte de usuarios
- Filtros de búsqueda

---

# Autor

Proyecto desarrollado como trabajo de final de curso.

