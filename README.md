Instalación y Uso

Este proyecto está construido con Node.js y utiliza una base de datos SQLite, lo que significa que no necesitás instalar ni configurar motores de bases de datos externos. Todo funciona de manera local e integrada.
Requisitos Previos

    Tener instalado Node.js.

    Una terminal de comandos (Git Bash, CMD o PowerShell).

Pasos para levantar el entorno local

    Clonar el repositorio:
    
    git clone <URL_DE_TU_REPOSITORIO>
    
    cd dds-backend

    Instalar las dependencias:
    Descarga e instala todas las librerías necesarias (Express, Sequelize, Jest, etc.).
    
    npm install

    Ejecutar el servidor en modo desarrollo:
    Este comando levanta la API utilizando Nodemon.

    npm run dev

    Nota sobre la Base de Datos: Al ejecutar este comando por primera vez, el sistema creará automáticamente el archivo SQLite (.data/pymes.db)  y lo poblará con datos de prueba. Si en algún momento querés reiniciar los datos a su estado original, simplemente borrá ese archivo y volvé a levantar el servidor.

    Ejecutar la suite de pruebas automatizadas (QA):
    Para verificar que todos los endpoints y bloqueos de seguridad funcionan correctamente, abrí otra terminal y ejecutá:

    npm test

(Asegurate de frenar el servidor principal o usar una terminal paralela para correr los tests )

    Evolución del Proyecto (Paso a Paso)

Este proyecto fue desarrollado en 6 etapas incrementales (reflejadas en el historial de commits), evolucionando desde un servidor básico hasta una API RESTful segura, conectada a una base de datos y con pruebas automatizadas.

    Etapa 1: Setup y Servidor Básico 

        Inicialización del entorno Node.js y configuración de Git.

        Implementación de un servidor web inicial utilizando Express.

        Configuración de Nodemon para recarga automática en el entorno de desarrollo.

    Etapa 2: Mock API (Categorías) 

        Creación de un CRUD completo en memoria (sin persistencia real) para el recurso Categorías.

        Implementación de los verbos HTTP (GET, POST, PUT, DELETE) y prueba de endpoints.

    Etapa 3: Base de Datos y ORM 

        Integración de SQLite como motor de base de datos relacional.

        Configuración del ORM Sequelize para el mapeo de los modelos de datos (Categorías, Artículos, Usuarios).

        Desarrollo de un script de inicialización (inicializarBase.js) para crear las tablas y poblar la base de datos con información de prueba de manera automática.

    Etapa 4: API RESTful Avanzada (Artículos) 

        Desarrollo del CRUD completo para el recurso Artículos conectado a la base de datos.

        Implementación de consultas complejas: paginación de resultados y filtrado dinámico por parámetros (ej: Nombre y estado Activo).

        Configuración de middlewares globales como CORS para habilitar el consumo de la API desde clientes Frontend.

    Etapa 5: Seguridad, Autenticación y Roles 

        Implementación de un sistema de seguridad basado en JWT (JSON Web Tokens).

        Creación de endpoints de autenticación (/api/login, logout y refreshtoken).

        Desarrollo de middlewares de autorización (authenticateJWT) y control de acceso basado en Roles (ej: restringir rutas VIP solo para el rol "jefe").

    Etapa 6: Testing Automatizado (QA) 

        Configuración del entorno de pruebas utilizando Jest y Supertest.

        Aislamiento del servidor (index.js) para evitar conflictos de puertos durante la ejecución de las pruebas.

        Desarrollo de Test Suites automatizadas para validar la integridad de todas las rutas (GET, POST, PUT, DELETE), el manejo de errores HTTP (ej: 404) y los bloqueos de seguridad por falta de credenciales.

    npm test

    (Asegurate de frenar el servidor principal o usar una terminal paralela para correr los tests )
