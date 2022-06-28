import { crearTabla, crearFiltros } from "./tablaDinamica.js";
import Anuncio_Auto from "./models/Anuncio_Auto.js";
import { getAnunciosAsync, postAnuncioAsync, getAnunciosAjax, postAnunciosAjax, putAnunciosAjax, deleteAnunciosAjax } from "./controller.js";

const server = "http://localhost:3000/anuncios";

let listado = await getAnunciosAjax(server);
const $tableContainer = document.getElementById("listado");
const $form = document.forms[0];
const $btn_editar = document.getElementById("btn_editar");
const $btn_eliminar = document.getElementById("btn_eliminar");
const $btn_cancelar = document.getElementById("btn_cancelar");
const $cbx_filtro = document.querySelector("#cbx_filtro");
const $txt_promedio = document.querySelector("#txt_promedio");
const $campos = document.querySelector("#campos");
const $spinner = document.getElementById("spinner");
let table;
let _id = -1;

if (listado.length > 0) {
    renderFiltros(listado)
        .then(actualizarTabla(listado)
            .then(() => {
                $spinner.style.display = "none";
                $txt_promedio.value = "N/A";
            }));
    
}

$form.addEventListener("submit", async (e) => {
    const form = e.target;
    e.preventDefault();
    
    if (validarEntrada(form)) {
        const anuncio = new Anuncio_Auto(Date.now(), form.titulo.value, form.transaccion.value, form.descripcion.value, form.precio.value, form.puertas.value, form.kms.value, form.potencia.value);
        listado = await postAnunciosAjax(server, anuncio);
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
        const seleccionado = listado[buscarPorId(listado, _id)];
        $form.titulo.value = seleccionado.titulo;
        $form.transaccion.value = seleccionado.transaccion;
        $form.descripcion.value = seleccionado.descripcion;
        $form.precio.value = seleccionado.precio;
        $form.puertas.value = seleccionado.num_puertas;
        $form.kms.value = seleccionado.num_KMs;
        $form.potencia.value = seleccionado.potencia;
    }
});

$btn_editar.addEventListener("click", async () => {
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
            objeto.num_puertas = $form.puertas.value;
        }
        if (parseInt($form.kms.value)) {
            objeto.num_KMs = $form.kms.value;
        }
        if (parseInt($form.potencia.value)) {
            objeto.potencia = $form.potencia.value;
        }
        
        // localStorage.setItem("Elementos", JSON.stringify(listado));
        await putAnunciosAjax(server, _id, objeto);
        actualizarTabla(listado)
            .then(() => $spinner.style.display = "none");;
        unsetId();
        $form.reset();
    }
});
$btn_eliminar.addEventListener("click", async () => {
    listado.splice(buscarPorId(listado, _id), 1);
    // localStorage.setItem("Elementos", JSON.stringify(listado));
    await deleteAnunciosAjax(server, _id);
    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");
    unsetId();
});
$btn_cancelar.addEventListener("click", () => {
    unsetId();
    $form.reset();
});

$cbx_filtro.addEventListener("change", () => {
    const estaFiltrado = $cbx_filtro.value.toLowerCase() === "venta" || $cbx_filtro.value.toLowerCase() === "alquiler";
    
    let listaFiltrada = estaFiltrado ?
        listado.filter(el => el.transaccion.toString().toLowerCase() === $cbx_filtro.value || el.id == 0) :
        listado.map(el => el);
    
    actualizarTabla(listaFiltrada)
    .then(() => {
        $spinner.style.display = "none";
        $txt_promedio.value = estaFiltrado ? 
            obtenerPromedio(listaFiltrada) :
            "N/A";
    });    
});

function renderFiltros(vec) {
    return new Promise(res => {
        const cabeceras = [];
            Object.keys(vec[0]).forEach(key => {
                if (key !== "id") {
                    cabeceras.push(key);
                }
            });
    
        $campos.appendChild(crearFiltros(cabeceras));
        res();
    });
}

function actualizarTabla(vec) {
    return new Promise(res => {
        if ($tableContainer.contains(table)) {
            $tableContainer.removeChild(table);
            $spinner.style.display = "inherit";
        }
        
        table = crearTabla(vec);
        $tableContainer.appendChild(table);

        res();
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

function obtenerPromedio(listado) {
    let precios = listado.map(el => parseInt(el.precio));
    let sumatoria = precios.reduce((ant, act) => ant + act);
    if (sumatoria > 0) {
        return new Intl.NumberFormat("es-AR").format(parseInt(sumatoria / (precios.length - 1)));
    }
    return 0;
}
