function crearTarjeta(auto) {
    const $card = document.createElement("article");

    crearTitulos($card, auto);
    crearCaracteristicas($card, auto);

    const $button = document.createElement("button");
    $button.appendChild(document.createTextNode("Ver Vehiculo"));
    $button.classList = ["btn btn-danger"];
    $card.appendChild($button);

    $card.className = "card";

    return $card;
}

function crearTitulos(tarjeta, auto) {
    const titulo = document.createElement("h3");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const textPrecio = "$ " + new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(auto.precio);

    titulo.appendChild(document.createTextNode(auto.titulo));
    descripcion.appendChild(document.createTextNode(auto.descripcion));
    precio.appendChild(document.createTextNode(textPrecio));
    
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
}

function crearCaracteristicas(tarjeta, auto) {
    const caracteristicas = document.createElement("div");

    const puertas = document.createElement("div");
    const kms = document.createElement("div");
    const potencia = document.createElement("div");

    const puertas_icon = document.createElement("img");
    const kms_icon = document.createElement("img");
    const potencia_icon = document.createElement("img");

    const txt_puertas = document.createElement("p");
    const txt_kms = document.createElement("p");
    const txt_potencia = document.createElement("p");
    
    puertas_icon.src = "./assets/puertas-icon.svg";
    puertas_icon.className = "icon";
    kms_icon.src = "./assets/kms-icon.svg";
    kms_icon.className = "icon";
    potencia_icon.src = "./assets/potencia-icon.svg";
    potencia_icon.className = "icon";

    txt_puertas.appendChild(document.createTextNode(auto.num_puertas));
    txt_kms.appendChild(document.createTextNode(auto.num_KMs));
    txt_potencia.appendChild(document.createTextNode(auto.potencia));

    puertas.appendChild(puertas_icon);
    puertas.appendChild(txt_puertas);
    kms.appendChild(kms_icon);
    kms.appendChild(txt_kms);
    potencia.appendChild(potencia_icon);
    potencia.appendChild(txt_potencia);

    caracteristicas.appendChild(puertas);
    caracteristicas.appendChild(kms);
    caracteristicas.appendChild(potencia);

    caracteristicas.className = "caracteristicas";

    tarjeta.appendChild(caracteristicas);
}

export default crearTarjeta;