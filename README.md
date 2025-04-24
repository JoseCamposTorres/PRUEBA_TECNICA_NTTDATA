# ================================================================
# PRUEBA TÉCNICA - Instrucciones de instalación y ejecución
# ================================================================

# Clonación del repositorio
echo "Clonando el repositorio..."
git clone https://github.com/JoseCamposTorres/PRUEBA_TECNICA_NTTDATA.git
cd PRUEBA_TECNICA_NTTDATA

# =======================================================================
# BACKEND - API REST con Spring Boot
# =======================================================================
echo "Accediendo al directorio del Backend..."
cd BACKEND

# Requisitos para Backend
echo "Requisitos previos para el Backend:"
echo "- Java 21+"
echo "- Maven 3.2+"
echo "- PostgreSQL"

# Configuración del archivo application.properties
echo "Configurando el archivo 'application.properties'..."
cat <<EOL > src/main/resources/application.properties
server.port=8080

# Configuración base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/system_prueba
spring.datasource.username=postgres
spring.datasource.password=74757759
spring.datasource.driver-class-name=org.postgresql.Driver
EOL

# Ejecutar el Backend
echo "Iniciando la aplicación Backend..."
./mvnw spring-boot:run

# Documentación de la API
echo "La documentación de la API está disponible en: http://localhost:8080/api/v1/swagger-ui/index.html"

# =======================================================================
# FRONTEND - React + Vite
# =======================================================================
echo "Accediendo al directorio del Frontend..."
cd ../frontend

# Requisitos para Frontend
echo "Requisitos previos para el Frontend:"
echo "- Node.js (v16+)"
echo "- npm o yarn"

# Instalar dependencias del Frontend
echo "Instalando dependencias del Frontend..."
npm install

# Ejecutar el Frontend en modo desarrollo
echo "Iniciando el Frontend en modo desarrollo..."
npm run dev

# =======================================================================
# ¡Todo listo para usar!
# =======================================================================
echo "Backend corriendo en: http://localhost:8080"
echo "Frontend corriendo en: http://localhost:3000"
echo "Documentación de la API en: http://localhost:8080/api/v1/swagger-ui/index.html"
