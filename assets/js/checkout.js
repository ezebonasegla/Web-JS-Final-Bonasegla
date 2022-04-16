const buttonConfirm = document.getElementById('buttonConfirm')
const templateCarritoCompra = document.getElementById('templateCarritoCompra').content
const templatePrecioTotal = document.getElementById('templatePrecioTotal').content
const itemsCarrito = document.getElementById('itemsCarrito')
const carritoCantidad = document.getElementById('carritoCantidad')
const fragment = document.createDocumentFragment()
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const phone = document.getElementById('phone')
const address = document.getElementById('address')
const address2 = document.getElementById('address2')
const province = document.getElementById('province')
const state = document.getElementById('state')
const zip = document.getElementById('zip')
const forms = document.getElementsByClassName('needs-validation')
arrayUsuarios = [];



class Usuario {
    constructor(nombre, apellido, telefono, direccion, entrecalles, provincia, localidad, cp) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.entrecalles = entrecalles;
        this.provincia = provincia;
        this.localidad = localidad;
        this.cp = cp;
    }
}

Array.prototype.filter.call(forms, function (form) {
    buttonConfirm.addEventListener('click', function (event) {
        if (form.checkValidity() != false) {
            let nombre = firstName.value;
            let apellido = lastName.value;
            let telefono = phone.value;
            let direccion = address.value;
            let entrecalles = address2.value;
            let provincia = province.value;
            let localidad = state.value;
            let cp = zip.value;
            arrayUsuarios.push(new Usuario(nombre, apellido, telefono, direccion, entrecalles, provincia, localidad, cp))
            Swal.fire({
                title: '¿Confirmar Compra?',
                html: `<h5>Nombre: ${arrayUsuarios[0].nombre}</h5><br>
                <h5>Apellido: ${arrayUsuarios[0].apellido}</h5><br>
                <h5>Telefono: ${arrayUsuarios[0].telefono}</h5><br>  
                <h5>Direccion: ${arrayUsuarios[0].direccion}</h5><br>
                <h5>Lugar: ${arrayUsuarios[0].localidad}</h5><br>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#25AA1F',
                cancelButtonColor: '#FF0000',
                confirmButtonText: 'Si'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Comprado!',
                        'Tu compra se ha realizado con exito.',
                        'success'
                    )
                }
            })
        }
    })
})

console.log(arrayUsuarios);


function obtenerProductosLocalStorage() {
    let carritoLS;


    if (localStorage.getItem('carrito') === null) {
        carritoLS = [];
    } else {
        carritoLS = JSON.parse(localStorage.getItem('carrito'));
    }
    return carritoLS;
}

function cargarCantidadProductos() {
    let carritoLS;

    carritoLS = obtenerProductosLocalStorage();
    const nCantidad = Object.values(carritoLS).reduce((acumulador, {
        cantidad
    }) => acumulador + cantidad, 0)

    carritoCantidad.textContent = nCantidad

}

function cargarProductos() {
    let carritoLS;

    carritoLS = obtenerProductosLocalStorage();

    Object.values(carritoLS).forEach(p => {
        templateCarritoCompra.querySelector('h6').textContent = p.title
        templateCarritoCompra.querySelectorAll('span')[0].textContent = p.cantidad
        templateCarritoCompra.querySelectorAll('span')[1].textContent = p.precio * p.cantidad

        const clone = templateCarritoCompra.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCarrito.appendChild(fragment)
}

function cargarPrecioFinal() {
    let carritoLS;
    let nEnvio;

    carritoLS = obtenerProductosLocalStorage();

    let nPrecio = Object.values(carritoLS).reduce((acumulador, {
        cantidad,
        precio
    }) => acumulador + cantidad * precio, 0)

    if (nPrecio > 0 && nPrecio < 5000) {
        nEnvio = 300;
        nPrecio = nPrecio + nEnvio
    } else if (nPrecio > 5000) {
        nEnvio = 0;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes productos en tu carrito',
            footer: '<a href="shop.html" style="color: #005B92";>🢂 Agregar Productos al Carrito 🢀</a>',
            allowOutsideClick: false,
            showConfirmButton: false,
        })
    }

    templatePrecioTotal.querySelectorAll('span')[1].textContent = nEnvio
    templatePrecioTotal.querySelectorAll('span')[3].textContent = nPrecio
    const clone = templatePrecioTotal.cloneNode(true)
    fragment.appendChild(clone)
    itemsCarrito.appendChild(fragment)
}

function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', cargarCantidadProductos);
    document.addEventListener('DOMContentLoaded', cargarProductos);
    document.addEventListener('DOMContentLoaded', cargarPrecioFinal);
}

cargarEventListeners();