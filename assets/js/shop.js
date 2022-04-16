const cards = document.getElementById('cards')
const cervezaProducts = document.getElementById('cervezaProducts')
const btnMayorMenor = document.getElementById('mayorMenor')
const btnMenorMayor = document.getElementById('menorMayor')
const search = document.getElementById('searchterm')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}
let arrayProductos = [];
let arrayData = [];

const app = {
    init: () => {
        document.addEventListener('DOMContentLoaded', app.load);
        console.log('HTML loaded');
    },
    load: () => {
        app.getData();
    },

    getData: () => {
        let page = document.body.id;
        switch (page) {
            case 'index':
                app.getAllProducts();
                break;
            case 'cervezaPage':
                app.getIndustrialesProducts();
                break;
            case 'champagnePage':
                app.getChampagneProducts();
                break;
            case 'sidraPage':
                app.getSidraProducts();
                break;
            case 'ginPage':
                app.getGinProducts();
                break;
            case 'vodkaPage':
                app.getVodkaProducts();
                break;
            case 'whiskyPage':
                app.getWhiskyProducts();
                break;
            case 'sinAlcoholPage':
                app.getSinAlcoholProducts();
                break;
            case 'energizantesPage':
                app.getEnergizantesProducts();
                break;
            case 'fernetPage':
                app.getFernetProducts();
                break;
            default:
                break;
        }
    },

    getAllProducts: () => {
        let url = 'api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayProductos.push(data[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getIndustrialesProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Cerveza';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getChampagneProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Champagne';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getSidraProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Sidra';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getGinProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Gin';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getVodkaProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Vodka';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getWhiskyProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Whisky';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getSinAlcoholProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Sin-Alcohol';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getEnergizantesProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Energizante';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    getFernetProducts: () => {
        let url = '/api.json'
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors'
        });
        fetch(req)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    arrayData.push(data[i]);
                }
            })
            .then(() => {
                let arrayNuevo = arrayData.filter(function (p) {
                    return p.type === 'Fernet';
                })
                for (let i = 0; i < arrayNuevo.length; i++) {
                    arrayProductos.push(arrayNuevo[i]);
                }
            })
            .then(() => {
                mostrarCards(arrayProductos)
            })
            .then(app.recuperarCarrito)
            .catch(app.err);
    },

    recuperarCarrito: () => {
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'))
        }
    },

}
app.init();


console.log(arrayProductos);


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

function mayorMenorPrecio() {
    arrayProductos.sort(function (a, b) {
        return b.precio - a.precio;
    });
}

function menorMayorPrecio() {
    arrayProductos.sort(function (a, b) {
        return a.precio - b.precio;
    });
}

function limpiarPantalla() {
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
}

const filtrar = () => {
    const texto = search.value.toLowerCase();
    console.log(texto);
    for (let p of arrayProductos) {
        let nombre = p.title.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            templateCard.querySelector('h3').textContent = p.title
            templateCard.querySelectorAll('span')[0].textContent = p.precio
            templateCard.querySelectorAll('span')[1].textContent = p.size
            templateCard.querySelector('img').setAttribute("src", p.thumbnailUrl)
            templateCard.querySelector('.cart-btn').dataset.id = p.id
            templateCard.querySelectorAll('div')[0].className = `col-lg-4 col-md-6 text-center ${p.type}`
            templateCard.querySelectorAll('div')[0].dataset.precio = p.precio

            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
        cards.appendChild(fragment)
    }
}


search.addEventListener('keyup', () => {
    limpiarPantalla()
    filtrar()
})

btnMayorMenor.addEventListener('click', () => {
    limpiarPantalla()
    mayorMenorPrecio()
    mostrarCards(arrayProductos)
})

btnMenorMayor.addEventListener('click', () => {
    limpiarPantalla()
    menorMayorPrecio()
    mostrarCards(arrayProductos)
})

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
            destination: "cart.html",
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