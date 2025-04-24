# ================================================================
# 🧩 **PRUEBA TÉCNICA** - Instrucciones de instalación y ejecución
# ================================================================

# Clonar el repositorio
echo "Clonando el repositorio..."
git clone https://github.com/JoseCamposTorres/PRUEBA_TECNICA_NTTDATA.git
cd PRUEBA_TECNICA_NTTDATA

# =======================================================================
# 🛠️ **BACKEND - API REST con Spring Boot**
# =======================================================================
echo "========================= BACKEND ========================="
echo "Accediendo al directorio del backend..."
cd BACKEND

# Requisitos previos
echo "Asegúrate de tener lo siguiente instalado para el Backend:"
echo "- Java 21+"
echo "- Maven 3.2+"
echo "- PostgreSQL"

# Configurar el archivo application.properties
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
echo "Documentación Swagger disponible en: http://localhost:8080/api/v1/swagger-ui/index.html"

# =======================================================================
# 🌐 **FRONTEND - React + Vite**
# =======================================================================
echo "========================= FRONTEND ========================="
echo "Accediendo al directorio del frontend..."
cd ../frontend

# Requisitos previos
echo "Asegúrate de tener lo siguiente instalado para el Frontend:"
echo "- Node.js (v16+)"
echo "- npm o yarn"

# Instalar dependencias del Frontend
echo "Instalando dependencias del Frontend..."
npm install

# Ejecutar el Frontend en modo desarrollo
echo "Iniciando el servidor de desarrollo..."
npm run dev

# =======================================================================
# 🚀 **¡Listo para usar!**
# =======================================================================
echo "Ambos servidores (Backend y Frontend) están corriendo."
echo "Accede a la aplicación Frontend en: http://localhost:3000"
echo "Accede a la documentación de la API Backend en: http://localhost:8080/api/v1/swagger-ui/index.html"
