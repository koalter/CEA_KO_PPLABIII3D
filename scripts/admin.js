import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./models/Anuncio_Auto.js"

const listado = JSON.parse(localStorage.getItem("Elementos")) || [new Anuncio_Auto(0, 0, 0, 0, 0, 0, 0, 0)];
const $tableContainer = document.getElementById("listado");
const $form = document.forms[0];
const $btn_editar = document.getElementById("btn_editar");
const $btn_eliminar = document.getElementById("btn_eliminar");
const $btn_cancelar = document.getElementById("btn_cancelar");
const $spinner = document.getElementById("spinner");
let table;
let _id = -1;

if (listado.length > 0) {
    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");
}

$form.addEventListener("submit", e => {
    const form = e.target;
    e.preventDefault();
    
    if (validarEntrada(form)) {
        listado.push(new Anuncio_Auto(Date.now(), form.titulo.value, form.transaccion.value, form.descripcion.value, form.precio.value, form.puertas.value, form.kms.value, form.potencia.value));
        localStorage.setItem("Elementos", JSON.stringify(listado));
        actualizarTabla(listado)
            .then(() => $spinner.style.display = "none");
        form.reset();
    } else {
        alert("Datos incompletos!");
    }
});

window.addEventListener("click", e => {
    if (e.target.matches("tr td")) {
        setId(e.target.parentElement.dataset.id);
    }
});

$btn_editar.addEventListener("click", () => {
    const objeto = listado[buscarPorId(listado, _id)];
    
    if (objeto) {
        if ($form.titulo.value) {
            objeto.titulo = $form.titulo.value;
        }
        if ($form.transaccion.value) {
            objeto.transaccion = $form.transaccion.value;
        }
        if ($form.descripcion.value) {
            objeto.descripcion = $form.descripcion.value;
        }
        if (parseInt($form.precio.value)) {
            objeto.precio = $form.precio.value;
        }
        if (parseInt($form.puertas.value)) {
            objeto.num_wc = $form.puertas.value;
        }
        if (parseInt($form.kms.value)) {
            objeto.num_estacionamiento = $form.kms.value;
        }
        if (parseInt($form.potencia.value)) {
            objeto.num_dormitorio = $form.potencia.value;
        }
        
        localStorage.setItem("Elementos", JSON.stringify(listado));
        actualizarTabla(listado)
            .then(() => $spinner.style.display = "none");;
        unsetId();
        $form.reset();
    }
});
$btn_eliminar.addEventListener("click", () => {
    listado.splice(buscarPorId(listado, _id), 1);
    localStorage.setItem("Elementos", JSON.stringify(listado));
    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");
    unsetId();
});
$btn_cancelar.addEventListener("click", unsetId);

function actualizarTabla(vec) {
    return new Promise(res => {
        if ($tableContainer.contains(table)) {
            $tableContainer.removeChild(table);
            $spinner.style.display = "inherit";
        }
        
        setTimeout(() => {
            table = crearTabla(vec);
            $tableContainer.appendChild(table);
            res();
        }, 3000);
    });
}

function setId(id) {
    _id = id;
    if (_id > 0) {
        $btn_editar.classList.remove("hidden");
        $btn_cancelar.classList.remove("hidden");
        $btn_eliminar.classList.remove("hidden");
    }
}

function unsetId() {
    _id = -1;
    $btn_editar.classList.add("hidden");
    $btn_cancelar.classList.add("hidden");
    $btn_eliminar.classList.add("hidden");
}

function buscarPorId(lista, id) {
    return lista.findIndex(el => el.id == id);
}

function validarEntrada(entrada) {
    return entrada &&
    entrada.titulo.value &&
    entrada.transaccion.value &&
    entrada.descripcion.value &&
    parseInt(entrada.precio.value) &&
    parseInt(entrada.puertas.value) &&
    parseInt(entrada.kms.value) &&
    parseInt(entrada.potencia.value);
}