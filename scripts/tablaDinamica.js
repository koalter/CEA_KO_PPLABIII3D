function crearFiltros([...columnas]) {
    const contenedor = document.createElement("div");
    contenedor.id = "columnas";

    for (const cabecera of columnas) {
        const name = "chk_" + cabecera;

        const div = document.createElement("div");
        div.className = "input";

        const label = document.createElement("label");
        label.setAttribute("for", name);
        label.textContent = cabecera.toUpperCase();

        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", name);
        input.setAttribute("id", name);
        input.checked = true;

        input.addEventListener("click", () => {
            const elementos = document.getElementsByClassName(name);
            for (const el of elementos) {
                el.style.display = input.checked ? "" : "none";
            }
        });

        div.appendChild(label);
        div.appendChild(input);
        contenedor.appendChild(div);
    }

    return contenedor;
}

function crearTabla(vec) {
    const tabla = document.createElement("table");

    tabla.appendChild(crearCabecera(vec[0]));
    tabla.appendChild(crearCuerpo(vec));

    return tabla;
}

function crearCabecera(elemento) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    tr.setAttribute("class", "cabecera");

    Object.keys(elemento).forEach(key => {
        if (key !== "id") {
            const th = document.createElement("th");
            th.textContent = key;
            th.className = "chk_" + key;
            tr.appendChild(th);
        }
    });

    thead.appendChild(tr);

    return thead;
}

function crearCuerpo(vec) {
    const tbody = document.createElement("tbody");

    for (let i = 1; i < vec.length; i++) {
        const tr = document.createElement("tr");

        for (const key in vec[i]) {
            if (key === "id") {
                tr.setAttribute("data-id", vec[i][key]);
            } else {
                const td = document.createElement("td");
                td.textContent = vec[i][key];
                td.className = "chk_" + key;
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }

    return tbody;
}

export { crearTabla, crearFiltros };