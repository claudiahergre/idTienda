//organizar y hacer grupos de pruebas

const request = require('supertest');
const mongoose = require('mongoose')

const app = require('../../src/app')
const Producto = require('../../src/models/products.model')


describe('API de productos', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/idtienda');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        // 4 metodos que podemos aplicar dependiendo del punto donde queremos ejecutar las cosas
        /*  beforeAll
         beforeEach - se ejecuta varias veces: antes de cada uno de los test
         afterAll
         afterEach */

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        })

        // 2 opciones: funcion test o funcion it
        it('should devolver status 200', async () => { // esto devuelve una promesa, asi que meto async await
            // metodo de jest: expect
            expect(response.statusCode).toBe(200); // (colocamos lo que queremos evaluar status code será el 200, 404...), lo que quieor que sea. " espero que (lo que quiero evaluar) sea (esto)". toBe = igualdad estricta
        });

        it('should devolver un JSON', async () => {
            expect(response.headers['content-type']).toContain('application/json'); // contain= compruebo si contiene
        })

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })


    });

    describe('POST /api/products', () => {

        let response;
        const body = { nombre: 'lapiz verde', descripcion: 'pinta cosas verdes', precio: 4, departamento: 'test', disponible: true, stock: 23 }
        beforeAll(async () => {
            //cuando hacemos una request le pasamos url, heathers si los tiene, y body
            response = await request(app).post('/api/products').send(body);
        })

        afterAll(async () => {
            await Producto.deleteMany({ departamento: 'test' })
        });

        it('deberia funcionar la url,', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        })

        it('should tener el _id definido', () => {
            expect(response.body._id).toBeDefined();
        });

        it('deberia insertar los mismos datos del body', () => {
            expect(response.body.nombre).toBe(body.nombre);
            expect(response.body.descripcion).toBe(body.descripcion);
            expect(response.body.precio).toBe(body.precio);
            expect(response.body.disponible).toBe(body.disponible);
            expect(response.body.stock).toBe(body.stock);

        })
    });

    describe('PUT /api/products/:productId', () => {

        const body = { nombre: 'lapiz verde', descripcion: 'pinta cosas verdes', precio: 4, departamento: 'test', disponible: true, stock: 23 }

        let product

        beforeAll(async () => {
            product = await Producto.create(body);
            response = await request(app).put(`/api/products/${product._id}`).send({
                disponible: false,
                precio: 15,
                stock: 12
            })
        });

        afterAll(async () => {
            await Producto.findByIdAndDelete(product._id); ///no lo guardo en variable, porque lo voy a borrar
        });

        it('deberia funcionarl la url', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');

        })

        it('deberia ver las modificaciones', () => {
            expect(response.body.disponible).toBe(false);
            expect(response.body.precio).toBe(15);
            expect(response.body.stock).toBe(12);
        })

    })

    describe('DELETE /api/products/productid', () => {
        const body = { nombre: 'lapiz verde', descripcion: 'pinta cosas verdes', precio: 4, departamento: 'test', disponible: true, stock: 23 }

        let product
        let response
        beforeAll(async () => {
            product = await Producto.create(body);
            response = await request(app).delete(`/api/products/${product._id}`).send()
        });

        afterAll(async () => {
            await Producto.findByIdAndDelete(product._id); ///no lo guardo en variable, porque lo voy a borrar
        });

        it('deberia funcionarl la url', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        })

        it('el producto no debe estar en la bd', async () => {
            const productoBorrado = await Producto.findById(product._id);
            expect(productoBorrado).toBeNull();
        })
    });
});