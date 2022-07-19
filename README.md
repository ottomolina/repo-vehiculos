# API-VEHICULOS, WEB-VEHICULOS

Api-vehículos es una colección de servicios para proveer datos a web-vehículos.
Web-vehículos es una aplicación web de mantenimiento de datos de vehículos básica creada con el framerwork Angular utilizando manejo de estado global con NgRx.

## Empezando

* [Descarga el instalador](https://nodejs.org/) de Node LTS.
* Clona este repositorio:  `git clone https://github.com/ottomolina/repo-vehiculos.git`

### Configurar base de datos
* Es necesario contar con una base de datos MongoDB que es con la que fue configurada el api de servicios.

### Configurar api
* En una terminal accede a la raíz del proyecto api
```bash
  cd api
```
* Crea un archivo con extensión .env en la raíz del proyecto api y configuralo basado en .example.env que se encuentra en la raíz de api.
```bash
  PORT = Puerto que utilizarán los servicios api rest
  MONGODB_STRING = Cadena de conexión hacia MongoDb
  SECRETKEY = Palabra secreta para generar json web token
  MAIL_USER = Correo con el cual se enviarán emails
  MAIL_PASS = Contraseña segura generada en Google para mayor seguridad
```
* Ejecuta desde la raíz del proyecto api para instalar todas las dependencias requeridas
```bash
  npm install
```
* En una terminal desde la raíz del proyecto para iniciar los servicios ejecuta lo siguiente
```bash
  npm start
```
* Puedes ejecutar también este comando para iniciar el proyecto con [Nodemon](https://nodemon.io) y que este escuche los cambios que realices para compilar y recargar automáticamente
```bash
  npm run dev
```

### Configurar web-vehiculos

* [Descarga Angular](https://angular.io/start).
```bash
  npm install -g @angular/cli
```
* Clona este repositorio:  `git clone https://github.com/ottomolina/repo-vehiculos.git`

* Desde la terminal accede a la raiz del proyecto web-mant-car
```bash
  cd web-mant-car
```
* Ejecuta desde la raíz del proyecto web-mant-car para instalar todas las dependencias requeridas
```bash
  npm install
```
* Verifica que la url en environments.ts apunte al api que tienes localmente ejecutando.
* En una terminal desde la raíz del proyecto para iniciar la aplicación ejecuta lo siguiente
```bash
  ng serve
```
* Profit. :tada:

## License
[MIT](https://choosealicense.com/licenses/mit/)
