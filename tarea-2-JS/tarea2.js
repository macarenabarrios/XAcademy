// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vacío
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /*
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        try {
            console.log(`Agregando ${cantidad} ${sku}`);
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
            //console.log("Producto encontrado", producto);
            // Verifico si el producto existe en el carrito
            const productoExistente = this.productos.find((p) => p.sku === sku);
            if (productoExistente) {
                // Verifico que la cantidad este disponible
                if (cantidad < producto.stock) {
                    this.precioTotal += producto.precio * cantidad;
                    productoExistente.cantidad += cantidad;
                    producto.stock -= cantidad;
                } else {
                    this.precioTotal += producto.stock * producto.precio;
                    productoExistente.cantidad += producto.stock;
                    producto.stock = 0;
                }
            } else {
                // Creo un nuevo producto 'nuevoProducto'
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
                // Agrego 'nuevoProducto' a los productos del carrito
                this.productos.push(nuevoProducto);
                if (cantidad < producto.stock) {
                    this.precioTotal += producto.precio * cantidad;
                    producto.stock -= cantidad;
                } else {
                    this.precioTotal += producto.stock * producto.precio;
                    producto.stock = 0;
                    nuevoProducto.cantidad = producto.stock;
                }
                if (!this.categorias.includes(producto.categoria)) {
                    this.categorias.push(producto.categoria);
                }
            }
        } catch (error) {
            console.error(`Error: no existe el producto con sku ${sku}`);
        }
    }

    /*
     * función que elimina @{cantidad} de productos con @{sku} al carrito
     */
    async eliminarProducto(sku, cantidad) {
        const producto = await findProductBySku(sku);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const productoExistente = this.productos.find((p) => p.sku === sku);
                if (productoExistente) {
                    if (cantidad < productoExistente.cantidad) {
                        this.precioTotal -= cantidad * producto.precio;
                        producto.stock += cantidad;
                        productoExistente.cantidad -= cantidad;
                        resolve(`🛒 ATENCION: ${cantidad} unidades del producto ${producto.nombre} eliminadas del carrito`);
                    } else {
                        this.precioTotal -= producto.precio * productoExistente.cantidad;
                        producto.stock += productoExistente.cantidad;
                        // Elimino el producto del carrito
                        this.productos = this.productos.filter((p) => p.sku !== sku);
                        resolve(`🛒 ATENCION: Se eliminó el producto ${producto.nombre} del carrito`);
                    }
                } else {
                    reject(`🚩 El producto ${producto.nombre} con sku ${sku} no puede ser eliminado ya que se encuentra en el carrito`)
                }
            }, 1500);
        });
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();


carrito.agregarProducto('XX92LKI', 2); // ARROZ
carrito.agregarProducto('WE328NJ', 2); // JABON
carrito.agregarProducto('WE328NJ', 2); // JABON
carrito.agregarProducto('OL883YE', 2); // SHAMPOO
carrito.agregarProducto('RT324GD', 2); // LAVANDINA
carrito.agregarProducto('PV332MJ', 4); // CERVEZA
carrito.agregarProducto('FN312PPE', 4); // GASEOSA
carrito.eliminarProducto('PV332MJ', 4) // ELIMINO CERVEZA
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error)
    })
carrito.eliminarProducto('UI999TY', 2) // ELIMINO FIDEOS (No se encuentra en el carrito)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error)
    })

setTimeout(() => {
    console.log(carrito);
}, 4000);


