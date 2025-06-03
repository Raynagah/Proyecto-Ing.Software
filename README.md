# Proyecto-Ing.Software
Repositorio dedicado a la creación del proyecto que se solicita en Ing.Software

- En esta tercera fase de la creación del proyecto trabajaremos con una herramienta de IA para la creación de la base del mismo.
    - Debemos entregarle los requisitos para la creación del PMV (Producto Mínimo Viable).
    - Paralelamente, se debe establecer la arquitectura (en este caso Docker).
- Documentación obtenida de Docker Hub.


0.- Orden carpetas y archivos

    masterbikes/
    ├── docker-compose.yml
    ├── Dockerfile
    ├── README.md
    ├── frontend/
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── css/
    │   │   │   └── styles.css
    │   │   ├── js/
    │   │   │   └── app.js
    │   │   └── images/
    │   │       └── (imágenes del proyecto)
    │   └── Dockerfile
    ├── backend/
    │   ├── app.js
    │   ├── package.json
    │   ├── routes/
    │   │   └── api.js
    │   └── Dockerfile
    └── nginx/
        ├── nginx.conf
        └── Dockerfile

Pasos implementacion documento docker

1.-Instrucciones para Implementación
    Requisitos previos:
    
    Docker instalado en tu sistema
    
    Docker Compose instalado

2.-Como ejecutar en bash: 

    - Clonar el repositorio (si es necesario)
    - git clone [tu-repositorio]
    - cd masterbikes
    
    - Construir y ejecutar los contenedores
    -> docker-compose up --build
    
    - Para detener los contenedores
    - docker-compose down


3.- Recuerda que para que todo funcione correctamente, deberás:

    Ejecutar npm install en el directorio backend para instalar las dependencias
    
    Construir las imágenes con docker-compose build
    
    Iniciar los servicios con docker-compose up


4.- Acceso a la aplicación:

    Frontend: http://localhost
    
    Backend API: http://localhost/api/bikes
