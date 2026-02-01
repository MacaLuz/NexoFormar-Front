## 🚀 Cómo ejecutar el proyecto en local

Sigue estos pasos para correr el proyecto en tu entorno local:

### 1. Clonar el repositorio

git clone https://github.com/MacaLuz/NexoFormar-Front.git

### 2. Entrar a la carpeta del proyecto

cd NexoFormar-Front

### 3. Instalar dependencias

npm install

### 4. Configurar variables de entorno

crear un archivo .env.local en la raiz del proyecto y completar las siguientes credenciales

#### conexión al backend
NEXT_PUBLIC_BACK_URL=...

#### Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
NEXT_PUBLIC_CLOUDINARY_FOLDER=...

### 5. Ejecutar el proyecto

npm run dev

