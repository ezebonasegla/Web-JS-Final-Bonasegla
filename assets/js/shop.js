(function ($) {
    "use strict";



    $(document).ready(function ($) {
        /* var $container = $('#cards');

         $container.isotope({
            getSortData: {
                price: '[data-precio]',
            }
        });
        console.log($container);


        $('#price-sort').on('change', function () {
            var type = $(this).find(':selected').attr('data-sorttype');
            console.log(type);
            var sortValue = this.value;
            if (type == 'ass') {
                $container.isotope({
                    sortBy: sortValue,
                    sortAscending: false
                });
            } else {
                $container.isotope({
                    sortBy: sortValue,
                    sortAscending: true
                });
            }
            $container.isotope({
                sortBy: sortValue
            });
        }); */
        // projects filters isotop
        $(".product-filters li").on('click', function () {

            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            let selector = $(this).attr('data-filter');

            $('#cards').isotope({
                filter: selector,
            });
            
        });
    })
}(jQuery));


const cards = document.getElementById('cards')
const cervezaProducts = document.getElementById('cervezaProducts')
const btnMayorMenor = document.getElementById('mayorMenor')
const btnMenorMayor = document.getElementById('menorMayor')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}
let arrayProductos = [];
let arrayType = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
})

const fetchData = async () => {
    try {
        const res = await fetch('../api.json')
        const data = await res.json()
        for (let i = 0; i < data.length; i++) {
            arrayProductos.push(data[i]);
        }
        mostrarCards(arrayProductos)
    } catch (error) {
        console.log(error)
    }
}

const mostrarCards = (array) => {
    array.forEach(p => {
        templateCard.querySelector('h3').textContent = p.title
        templateCard.querySelectorAll('span')[0].textContent = p.precio
        templateCard.querySelectorAll('span')[1].textContent = p.size
        templateCard.querySelector('img').setAttribute("src", p.thumbnailUrl)
        templateCard.querySelector('.cart-btn').dataset.id = p.id
        templateCard.querySelectorAll('div')[0].className = `col-lg-4 col-md-6 text-center ${p.type}`
        templateCard.querySelectorAll('div')[0].dataset.precio = p.precio

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

cards.addEventListener('click', e => {
    addCarrito(e)
})

const addCarrito = e => {
    if (e.target.classList.contains('cart-btn')) {
        Toastify({
            text: "Producto añadido al carrito",
            duration: 3000,
            close: true,
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #ccdc8c, #A4DC8C)",
            },
            onClick: function () {} // Callback after click
        }).showToast();
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.cart-btn').dataset.id,
        title: objeto.querySelector('h3').textContent,
        precio: objeto.querySelectorAll('span')[0].textContent,
        tam: objeto.querySelectorAll('span')[1].textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {
        ...producto
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


