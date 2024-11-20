# Proyecto Backend de Autenticación

## Descripción General
Este es un proyecto completo de backend de autenticación construido con tecnologías modernas para proporcionar características seguras de autenticación y autorización de usuarios. El proyecto implementa un flujo completo de autenticación que incluye registro, inicio de sesión, recuperación de contraseña, restablecimiento de contraseña, rutas protegidas y autenticación de dos factores (2FA).

## Tecnologías Utilizadas
- Supabase (PostgreSQL)
- Prisma
- Node.js
- Express
- TypeScript

## Características
- Registro de Usuarios
- Inicio de Sesión de Usuarios
- Recuperación de Contraseña
- Restablecimiento de Contraseña
- Rutas Protegidas
- Autenticación de Dos Factores (2FA)

## Requisitos Previos
- Node.js instalado
- Una cuenta de Supabase
- Visual Studio Code (o cualquier editor de código preferido)

## Instrucciones de Configuración

### Configuración de Supabase
1. Crear un nuevo proyecto en Supabase:
   - Ve al [Panel de Control de Supabase](https://app.supabase.com)
   - Haz clic en "Nuevo Proyecto"
   - Elige un nombre para tu proyecto
   - Configura la contraseña de tu base de datos
   - Espera a que se complete la creación del proyecto

2. Obtener la URL de la Base de Datos:
   - Haz clic en el botón "Conectar" en tu proyecto
   - Selecciona "Modo: Transacción"
   - Copia la URL de conexión
   - Reemplaza `[TU-CONTRASEÑA]` en la URL con la contraseña de la base de datos que creaste

3. Configuración del Entorno:
   - En la carpeta del proyecto, debes actualizar el archivo `.env` para cambiar la URL de supabase por la que has creado en tu proyecto de esta misma plataforma 
   - Añade la URL de tu base de datos

### Ejecución de Prisma y levantamiento de la web

Una vez que se han realizado los pasos de supabase, solo queda ejecutar en la terminal que más prefiera `npx prisma generate` y después `npx prisma db push` para llevar los datos que están en prisma.schema a la base de datos que está en supabase (PostgreSQL). Y ya para finalizar, solo debes ejecutar `npm run dev` para comenzar el proyecto y empezar a experimentar.
