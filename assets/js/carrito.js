const subtotal = document.getElementById('subtotal')
const envio = document.getElementById('envio')
const precioFinal = document.getElementById('precioFinal')
const productsCarrito = document.getElementById('products-carrito')
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()


function obtenerProductosLocalStorage() {
    let carritoLS;


    if (localStorage.getItem('carrito') === null) {
        carritoLS = [];
    } else {
        carritoLS = JSON.parse(localStorage.getItem('carrito'));
    }
    return carritoLS;
}

function cargarProductos() {
    let carritoLS;

    carritoLS = obtenerProductosLocalStorage();

    Object.values(carritoLS).forEach(p => {
        templateCarrito.querySelector('a').dataset.id = p.id
        templateCarrito.querySelector('button').dataset.id = p.id
        templateCarrito.querySelectorAll('td')[1].textContent = p.title
        templateCarrito.querySelector('input').setAttribute("placeholder", p.cantidad)
        templateCarrito.querySelectorAll('span')[0].textContent = p.precio * p.cantidad
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    productsCarrito.appendChild(fragment)
}

const btnDelete = e => {
    let carritoLS;
    carritoLS = obtenerProductosLocalStorage();
    if (e.target.classList.contains('fa-window-close')){
        delete carritoLS[e.target.dataset.id]
        location.reload();
    }
    localStorage.setItem('carrito', JSON.stringify(carritoLS))  
}

const actualizarCantidad = e => {
    let carritoLS;
    carritoLS = obtenerProductosLocalStorage();
    if (e.target.classList.contains('btn-success')){
        const targetP = e.target.parentNode.parentNode
        const producto = carritoLS[e.target.dataset.id]
        if (targetP.querySelector('input').value != ''){
            producto.cantidad = parseInt(targetP.querySelector('input').value)
        }else{
            producto.cantidad = parseInt(targetP.querySelector('input').placeholder)
        }
        carritoLS[e.target.dataset.id] = {
            ...producto
        }
        location.reload();
    }
    localStorage.setItem('carrito', JSON.stringify(carritoLS))  
}


function cargarDetalleFinal() {
    let carritoLS;
    let nEnvio;

    carritoLS = obtenerProductosLocalStorage();
    const nSubtotal = Object.values(carritoLS).reduce((acumulador, {
        cantidad,
        precio
    }) => acumulador + cantidad * precio, 0)

    if (nSubtotal > 5000) {
        nEnvio = 0;
    }else{
        nEnvio = 300;
    }

    nTotal = nEnvio + nSubtotal

    subtotal.textContent = nSubtotal
    envio.textContent = nEnvio
    precioFinal.textContent = nTotal

}

productsCarrito.addEventListener('click', e => {
    btnDelete(e)
    actualizarCantidad(e)
})


function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', cargarProductos);
    document.addEventListener('DOMContentLoaded', cargarDetalleFinal);
}
cargarEventListeners();