# Generador de Usuarios de Prueba con Bcrypt y CSV

Este proyecto Node.js permite generar una lista de usuarios de prueba con nombres de usuario, contraseñas hasheadas con bcrypt, correos electrónicos y números de teléfono, exportándolos directamente a un archivo CSV. Es ideal para poblar bases de datos de prueba o entornos de desarrollo.

## Características

* Generación de nombres de usuario y correos electrónicos únicos y aleatorios.
* Hasheo de contraseñas con el algoritmo seguro **Bcrypt**.
* Generación de números de teléfono en el formato `+569XXXXXXXX`.
* Configuración sencilla del número de usuarios a generar y el nombre del archivo de salida CSV.
* Salida directa a un archivo CSV, listo para importar a tu base de datos o abrir con Excel.

## Requisitos

Asegúrate de tener instalado lo siguiente en tu sistema (Windows 11):

* **Node.js**:
 Si no lo tienes, descárgalo de [nodejs.org](https:
//nodejs.org/en/download/). La instalación incluye `npm` (Node Package Manager).

## Configuración del Proyecto

1. **Crea una Carpeta para el Proyecto**:

    Abre tu Terminal (Símbolo del Sistema o PowerShell) y crea una nueva carpeta para tu proyecto:

    ```bash
    mkdir generador-usuarios-db
    cd generador-usuarios-db
    ```

2. **Inicializa el Proyecto Node.js**:

    Dentro de la carpeta, inicializa un nuevo proyecto para gestionar las dependencias. Esto creará un archivo `package.json`.

    ```bash
    npm init -y
    ```

3. **Instala la Librería `bcrypt`**:

    Instala la librería necesaria para el hasheo de contraseñas:

    ```bash
    npm install bcrypt
    ```

## Uso

1. **Abre tu Terminal**:
 Navega a la carpeta `generador-usuarios-db` donde guardaste el script `generateUsers.js`.

    ```bash
    cd generador-usuarios-db
    ```

2. **Ejecuta el Script**:

    ```bash
    node generateUsers.js
    ```

3. **Verifica el Archivo CSV**:

    Una vez que el script termine de ejecutarse, un archivo con el nombre especificado en `fileNameOutput` (por defecto `test_users.csv`) será creado en la misma carpeta.

## Personalización

Puedes modificar las siguientes constantes al principio del archivo `generateUsers.js` para adaptar la generación a tus necesidades:

* `numberOfUserToCreate`:
 Cambia este valor para definir cuántos usuarios quieres generar.
* `fileNameOutput`:
 Modifica este string para cambiar el nombre del archivo CSV de salida.
* `bcryptSaltRounds`:
 Ajusta este número para controlar la "lentitud" del hasheo bcrypt. Un valor más alto aumenta la seguridad pero también el tiempo de generación.
* `defaultTestPassword`:
 Cambia esta cadena para definir la contraseña en texto plano que usarán todos los usuarios generados.
* `emailDomain`:
 Modifica este string para personalizar el dominio de los correos electrónicos generados (ej. `"@mi-empresa.cl"`).

## Importar los Datos

Una vez que tienes el archivo CSV, puedes importarlo a tu base de datos de prueba de las siguientes maneras:

### A. Abrir con Excel

Simplemente haz doble clic en el archivo `test_users.csv` (o el nombre que hayas configurado) desde el Explorador de Archivos de Windows. Excel 2016 lo abrirá automáticamente, reconociendo las columnas y los datos.

### B. Importar a tu Base de Datos (Recomendado)

Utiliza la herramienta de importación de tu sistema de gestión de bases de datos. La mayoría de las bases de datos tienen asistentes o comandos para importar archivos CSV:

* **MySQL**:
 Usa `LOAD DATA INFILE` o la herramienta de importación en MySQL Workbench.
* **PostgreSQL**:
 Usa el comando `\copy` en `psql` o el asistente de importación en pgAdmin.
* **SQL Server**:
 Usa el "Import and Export Data Wizard" o el comando `BULK INSERT`.
* **Otros**:
 Consulta la documentación de tu base de datos específica para los pasos de importación de CSV.

Asegúrate de que la estructura de tu tabla en la base de datos coincida con las columnas del CSV:

* `username` (VARCHAR)
* `password_hash` (VARCHAR - usualmente 255 es suficiente para bcrypt)
* `email` (VARCHAR)
* `phone_number` (VARCHAR)

---

¡Listo! Ya tienes todo lo necesario para empezar a generar tus usuarios de prueba.
