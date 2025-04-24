
# PRUEBA TÉCNICA - Instrucciones de instalación y ejecución

# 1. Clonar el repositorio
echo "🔽 Clonando el repositorio..."
git clone https://github.com/JoseCamposTorres/PRUEBA_TECNICA_NTTDATA.git
cd PRUEBA_TECNICA_NTTDATA


# 🛠️ BACKEND - API REST con Spring Boot

echo -e "\n===== BACKEND ======"
echo "Accediendo al directorio del Backend..."
cd BACKEND

# Requisitos para Backend
echo -e "\n**Requisitos para el Backend**:"
echo "- Java 21+"
echo "- Maven 3.2+"
echo "- PostgreSQL"

# 2. Configurar el archivo application.properties
echo -e "\n**Configurando el archivo application.properties...**"

cat <<EOL > src/main/resources/application.properties
server.port=8080

# Configuración base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/system_prueba
spring.datasource.username=postgres
spring.datasource.password=74757759
spring.datasource.driver-class-name=org.postgresql.Driver
EOL

# 3. Ejecutar el Backend
echo -e "\n**Iniciando la aplicación Backend...**"
./mvnw spring-boot:run

# Documentación de la API
echo -e "\n**La documentación de la API está disponible en:**"
echo "http://localhost:8080/api/v1/swagger-ui/index.html"


# 🌐 FRONTEND - React + Vite

echo -e "\n====== FRONTEND ======"
echo "Accediendo al directorio del Frontend..."
cd ../frontend

# Requisitos para Frontend
echo -e "\n**Requisitos para el Frontend**:"
echo "- Node.js (v16+)"
echo "- npm o yarn"

# 4. Instalar dependencias del Frontend
echo -e "\n**Instalando dependencias del Frontend...**"
npm install

# 5. Ejecutar el Frontend en modo desarrollo
echo -e "\n**Iniciando el Frontend en modo desarrollo...**"
npm run dev

# 🚀 ¡Todo listo para usar!

echo -e "\n**¡Todo listo!**"
echo "✅ Backend corriendo en: http://localhost:8080"
echo "✅ Frontend corriendo en: http://localhost:5173"
echo "📚 Documentación de la API en: http://localhost:8080/api/v1/swagger-ui/index.html"
