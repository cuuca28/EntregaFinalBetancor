class Producto {
    constructor(id, nombre, precio, stock, img, descripcion, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = descripcion
        this.alt = alt
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    levantarProductos(){
        this.listaProductos = [
            new Producto(1, "Blunt", 120, 10, "./assets/img/blunt.webp", "Hojilas del tipo blunt para enrolar x2", "hojillas tipo blunt"),
            new Producto(2, "Extractor", 1500, 10, "./assets/img/extractor.webp", "Extractor de humedad para tu indoor", "extractor de humedad"),
            new Producto(3, "Kit fertilizantes", 1750, 10, "./assets/img/fertilizantes.webp", "Kit de fertilizantes para fortalecer tus plantas", "kit fertilizantes"),
            new Producto(4, "Caja hojillas", 3000, 10, "./assets/img/hojillas.webp", "Caja de hojillas comunes con goma natural", "hojillas comunes"),
            new Producto(5, "Indoor", 10000, 10, "./assets/img/indoor.webp", "Indoor tamaño grande", "indoor grande"),
            new Producto(6, "Maceta", 130, 10, "./assets/img/maceta.webp", "Maceta tamaño mediano", "maceta mediana"),
            new Producto(7, "Tierra", 1600, 10, "./assets/img/tierra.webp", "Bolsa de tierra 25 kg", "tierra"),
            new Producto(8, "Sobre bóveda 62%", 250, 10, "./assets/img/boveda-62.webp", "Sobre bóveda para mantener humedad al 62%", "sobre boveda 62%")
        ]
    }

    mostrarEnDOM(){
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card border-primary" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <a href="#" id="cpu-${producto.id}" class="btn btn-primary">Añadir al carrito</a>
                </div>
            </div>`
        })
    }

    darEventoClickAProductos(controladorCarrito){
        this.listaProductos.forEach(producto => {
            const btnAP = document.getElementById(`cpu-${producto.id}`)
            btnAP.addEventListener("click", () => {
                
                controladorCarrito.agregar(producto)
                controladorCarrito.guardarEnStorage()
                controladorCarrito.mostrarEnDOM(contenedor_carrito)
            })
        })
    }
}

class CarritoController{
    constructor(){
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
    }

    agregar(producto){
        this.listaCarrito.push(producto)
    }

    guardarEnStorage(){
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito",listaCarritoJSON)
    }

    verificarExistenciaEnStorage(){
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if(this.listaCarrito.length > 0){
            this.mostrarEnDOM()
        }
    }

    limpiarContenedor_Carrito(){
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarEnDOM(){
        this.limpiarContenedor_Carrito()
        this.listaCarrito.forEach(producto => {
            this.contenedor_carrito.innerHTML += 
            `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Descripcion: ${producto.descripcion}</p>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        </div>
                    </div>
                </div>
            </div>`
        })
    }
}

const controladorProductos = new ProductoController()
controladorProductos.levantarProductos()

const controladorCarrito = new CarritoController()

controladorCarrito.verificarExistenciaEnStorage()

controladorProductos.mostrarEnDOM()

controladorProductos.darEventoClickAProductos(controladorCarrito)