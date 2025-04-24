# 🧩 PRUEBA TECNICA 

Este proyecto es una aplicación web full-stack que incluye tanto el **frontend** como el **backend**.  
El frontend está desarrollado con **React** y el backend con **Spring Boot**. 

## 🚀 Tecnologías Utilizadas

### 🖥️ Frontend
- React
- JavaScript (ES6+)
- HTML5 + CSS3
- Axios (para llamadas a la API)
- React Router

### 🛠️ Backend
- Java 17+ con Spring Boot
- Spring Web (REST API)
- Spring Data JPA
- Base de datos: PostgreSQL / H2
- Seguridad: Spring Security + JWT 

## ⚙️ Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseCamposTorres/PRUEBA_TECNICA_NTTDATA.git
cd PRUEBA_TECNICA_NTTDATA

# 🛠️ Backend - API REST con Spring Boot

cd  BACKEND

## ⚙️ Configuración y ejecución

### 1. Requisitos previos

- Java 21
- Maven 3.2+
- postgreSQL 

### 2. Configurar el archivo `application.properties`

Ubicación: `src/main/resources/application.properties`

```properties
server.port=8080

# Configuración base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/system_prueba
spring.datasource.username=postgres
spring.datasource.password=74757759
spring.datasource.driver-class-name=org.postgresql.Driver

# Ejecutar Aplicación
./mvnw spring-boot:run

# DOCUMENTACION
http://localhost:8080/api/v1/swagger-ui/index.html#/



# 🌐 Frontend - React + Vite
## ⚙️ Configuración y ejecución

### 1. Requisitos

- Node.js (v16+)
- npm o yarn

### 2. Instalar Dependencias
npm install

### 3. Ejecutar Desarrollo
npm run dev

