// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// Función para actualizar la tabla del carrito en carrito.html
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (listaCarrito && totalCarrito) {
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="cambiarCantidad(${index}, 1)">+</button>
                    ${producto.cantidad}
                    <button class="btn btn-sm btn-danger" onclick="cambiarCantidad(${index}, -1)">-</button>
                </td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">❌</button></td>
            `;
            listaCarrito.appendChild(fila);
            total += producto.precio * producto.cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
    }

    // También actualizamos el panel en index.html
    actualizarCarritoPanel();
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para cambiar cantidad con botones + y -
function cambiarCantidad(index, cambio) {
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Vaciar carrito desde el carrito.html
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    });
}

// Vaciar carrito desde el panel en index.html
const vaciarCarritoPanelBtn = document.getElementById("vaciar-carrito-panel");
if (vaciarCarritoPanelBtn) {
    vaciarCarritoPanelBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    });
}

// Cargar carrito al inicio
actualizarCarrito();



function toggleCarrito() {
    const panel = document.getElementById("panel-carrito");
    panel.classList.toggle("active"); // Muestra u oculta el panel
}



// Mostrar los productos en el panel del index
function actualizarCarritoPanel() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCarritoPanel = document.getElementById("lista-carrito-panel");
    listaCarritoPanel.innerHTML = "";

    if (carrito.length === 0) {
        listaCarritoPanel.innerHTML = "<p>El carrito está vacío.</p>";
        document.getElementById("vaciar-carrito-panel").style.display = "none";
        return;
    }

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} 
        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">🗑️</button>`;
        listaCarritoPanel.appendChild(li);
    });

    document.getElementById("vaciar-carrito-panel").style.display = "inline-block";
}

// Sincronizar con carrito.html
document.addEventListener("DOMContentLoaded", actualizarCarritoPanel);
document.getElementById("vaciar-carrito-panel").addEventListener("click", function () {
    localStorage.removeItem("carrito");
    actualizarCarritoPanel();
});
