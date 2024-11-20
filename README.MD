# Proyecto Backend de Autenticación

## Descripción General
Este es un proyecto completo de backend de autenticación construido con tecnologías modernas para proporcionar características seguras de autenticación y autorización de usuarios. El proyecto implementa un flujo completo de autenticación que incluye registro, inicio de sesión, recuperación de contraseña, restablecimiento de contraseña, rutas protegidas y autenticación de dos factores (2FA).

## Tecnologías Utilizadas
- Supabase
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
   - Crea un archivo `.env` en la raíz de tu proyecto
   - Añade la URL de tu base de datos:
