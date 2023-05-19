/*
Ejercicio 1
Realizar una funcion que reciba un numero y escriba una piramide desde 1 hasta
ese numero.
*/
console.log("******************************************")
function generarPiramide(x) {
    var output = '';
    if (x > 0) {
        for (var i = 1; i <= x; i++) {
            for (var j = 1; j <= i; j++) {
                output += j + '  ';
            }
            console.log(output);
            output = '';
        }
    } else {
        console.log("Por favor ingrese un número mayor a 0");
    }
}
console.log("Prueba ejercicio 1\n");

console.log("🔺 Para 6:");
generarPiramide(6);
console.log("\n");
console.log("🔺 Para 3:");
generarPiramide(3);

/*
Ejercicio 2
Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos
que coinciden entre ellos

Ejemplo:
Array1: ['rojo', 'azul', 'amarillo']
Array2: ['blanco', 'negro', 'rojo']
Resultado: ['rojo']

Ejemplo 2:
Array1: [4, 3, true, 'manzana']
Array2: ['pera', 3, false, true, 3, true]
Resultado: [3, true]
*/

console.log("******************************************")

function elementosIguales(array1, array2) {
    let aux = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j] && !aux.includes(array2[j])) {
                aux.push(array2[j]);
            }
        }
    }
    console.log(aux);
}
var array1 = ['rojo', 'azul', 'amarillo'];
var array2 = ['blanco', 'negro', 'rojo'];
var array3 = [4, 3, true, 'manzana'];
var array4 = ['pera', 3, false, true, 3, true];
console.log("Prueba ejercicio 2\n");
console.log(`array1 = ${array1}`);
console.log(`array2 = ${array2}`);
console.log("✅ Los elementos que coinciden:")
elementosIguales(array1, array2);
console.log("\n");
console.log(`array3 = ${array3}`);
console.log(`array4 = ${array4}`);
console.log("✅ Los elementos que coinciden:")
elementosIguales(array3, array4);
console.log("******************************************")

/*
Ejercicio 3.1
Dado el siguiente objeto
let carrito = {
    montoTotal: 10,
    productos: ["Leche"]
}
Crear las clases necesarias para generar carritos respetando la estructura del
objeto dado.

Ejercicio 3.2
Agregar un metodo a la clase que agregue un producto al carrito y actualice el
montoTotal

Ejercicio 3.3
Agregar al ejercicio anterior una validación para no permitir duplicados e
imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades”
*/

class Carrito {
    constructor(montoTotal, productos) {
        this.montoTotal = montoTotal;
        this.productos = [productos];
    }

    cant = [1];
    unidadVieja(unidades) {
        this.cant.push(unidades);
    }

    agregarProducto(nombre, precio, unidades) {
        if (this.productos.includes(nombre)) {
            var indice = this.productos.indexOf(nombre);
            console.log("el indice es:", indice);

            console.log(this.unidadVieja[indice]);
            var x = this.unidadVieja[indice] / precio;
            console.log(`La unidad anterior es ${x}`);

            //console.log(`🚩 Ya existe ${nombre} con ${unidades} unidades`);
        } else {
            this.montoTotal = this.montoTotal + precio * unidades;
            this.productos.push(nombre);
            //cantProducto(unidades);
            this.unidadVieja(unidades);
        }
    }
}

console.log("Prueba ejercicio 3\n");
let aux = new Carrito(10, 'Leche');
console.log("Dado el siguiente objeto:");
console.log(aux);
console.log("\n");
console.log("🛒 Agregamos 2 unidades de azucar a $100");
aux.agregarProducto("Azucar", 100, 2);
console.log(aux);
console.log("\n");
console.log("🛒 Agregamos 1 unidad de azucar a $100");
aux.agregarProducto("Azucar", 100, 1);
console.log(aux);
console.log("\n");
console.log("🛒 Agregamos 1 unidad de pan a $50");
aux.agregarProducto("Pan", 50, 1);
console.log(aux);
console.log("******************************************")

