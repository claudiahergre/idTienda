
# GET /api/products 
(cuando lanzo esta peticion tengo que tener claro que resultado quiero obtener. un array? un objeto? un funsiona?)
- recupere de la base de datos todos los productos y devuelva un array en formato JSON con dichos productos

PRUEBAS:
- que la url funcione -> nos devuelva status 200
- que devuelva un JSON -> (la cabecera del) content-Type: application/json
- que devuelva un array -> tipo array
- que nos devuelve el numero de productos esperados


1. creamos fichero routes/api.js
2. creamos fichero routes/api/products.js
3. todas las rutas que lleguen a app.js con la url /api hay que enviarlas a la api
4. todas las rutas que lleguen a api.js con la url /api/products hay que enviarlas a products.js
5. dentro de products.js respondemos a la peticion con res.send ('chachi pistachi')

# creación de productos

- POST /api/products
- body: name, descripcion, precio, disponibilidad, departamento, stock

PRUEBAS:
1. que la URL funcione -> status 200 y content-type application/json
2. si tiene definido el _id -> si es así, es que se ha insertado
3. comprobar si los datos insertados son correctos
    al lanzar un prueba la base de datos no deberia ser modificada


# recuperar un producto por ID

- GET /api/products/idproducto

# editar un producto
- PUT /api/products/:productId

Antes de test:
- creo un producto

después de test:
- borro producto

PRUEBAS
- status 200 y content-Type application/json
- 

# borrar un producto

- DELETE /api/products/:productId

antes del test:
- creo un producto

después del test:
- borrar el producto

PRUEBAS
- probar si la url funciona
- que el producto no esté en la base de datos

# creacion usuario

POST /api/users/register
body: username, email, password

1. mirar en api.js si hay que incluirla
2. crear el controlador de usuarios
3. crear el fichero de rutas para usuarios
4. dentro de la ruta creamos el usuario sobre el modelo con el método create

PUT /api/users/:userId/buy/:productId