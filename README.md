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

# Clonar el repositorio
git clone https://github.com/JoseCamposTorres/PRUEBA_TECNICA_NTTDATA.git
cd PRUEBA_TECNICA_NTTDATA

# =======================================================================
# 🛠️ BACKEND - API REST con Spring Boot
# =======================================================================

# 1. Acceder al directorio del backend
cd BACKEND

# 2. Requisitos previos para el backend
 - Java 21+
 - Maven 3.2+
 - PostgreSQL

# 3. Configuración del archivo `application.properties`
  Ubicación: src/main/resources/application.properties
  Aquí debes configurar la base de datos y otros parámetros importantes

echo "Configurando el archivo application.properties..."
cat <<EOL > src/main/resources/application.properties
server.port=8080

# Configuración de base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/system_prueba
spring.datasource.username=postgres
spring.datasource.password=74757759
spring.datasource.driver-class-name=org.postgresql.Driver

# 4. Ejecutar el backend
  Asegúrate de tener PostgreSQL en funcionamiento en tu máquina.
./mvnw spring-boot:run

# 5. Acceder a la documentación Swagger
  Una vez que la aplicación esté en ejecución, abre el navegador y ve a la siguiente URL:
echo "Accede a la documentación de la API en: http://localhost:8080/api/v1/swagger-ui/index.html"

# =======================================================================
# 🌐 FRONTEND - React + Vite
# =======================================================================

# 1. Acceder al directorio del frontend
cd ../frontend

# 2. Requisitos previos para el frontend
# - Node.js (v16+)
# - npm o yarn

# 3. Instalar dependencias del frontend
npm install

# 4. Ejecutar la aplicación en modo desarrollo
npm run dev

# =======================================================================
# ¡Listo!
# =======================================================================

