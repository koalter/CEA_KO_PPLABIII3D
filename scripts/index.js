import crearTarjeta from "./card.js";
import { getAnunciosAjax } from "./controller.js";

const server = "http://localhost:3000/anuncios";

const listado = await getAnunciosAjax(server);
const $tableContainer = document.getElementById("tarjetas");
const $spinner = document.getElementById("spinner");

if (listado) {
    generarTarjetas(listado)
        .then(() => $spinner.style.display = "none");
} else {
    $spinner.style.display = "none";
}

function generarTarjetas(vec) {
    return new Promise(res => {
        setTimeout(() => {
            listado.forEach(auto => {
                if (auto.id > 0) {
                    let $tarjeta = crearTarjeta(auto);
                    $tableContainer.appendChild($tarjeta);
                }
            });
            res();
        });
    });
}