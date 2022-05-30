# user-generator

user-generator es una librería desarrollada por [Axel Wine](https://axelwine.me) que permite la generación de usuarios aleatorios ideales para pruebas con bases de datos.

## Instalación

```bash
$ npm install generar-usuario -D
```

## Uso

Código de ejemplo para generar un objeto usuario con un nombre de usuario, nombre y apellidos.
```javascript
const generator = require("generar-usuario");
const testUser = generator.newUser(["username","name","surnames"]);

console.log(testUser);
```

La propiedad `newUser` admite los siguientes elementos:
* `username`
* `name`
* `names`
* `surname`
* `surnames`