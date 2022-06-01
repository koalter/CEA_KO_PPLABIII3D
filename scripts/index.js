import crearTarjeta from "./card.js";

const listado = JSON.parse(localStorage.getItem("Elementos"));
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
        }, 3000);
    });
}