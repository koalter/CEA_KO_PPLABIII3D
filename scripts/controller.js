import Anuncio_Auto from './models/Anuncio_Auto.js';

async function getAnunciosAsync(url) {
    try {
        
        const response = await fetch(url);

        if (!response.ok) {
            throw Promise.reject(response);
        }

        return await response.json();
    } catch (error) {

        console.error(error, error.statusText);
        return [new Anuncio_Auto(0, 0, 0, 0, 0, 0, 0, 0)];
    }
}

function getAnunciosAjax(url) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
    
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
    
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject({ status: xhr.status, statusText: xhr.statusText });
                }
            }
        });
    
        xhr.open("GET", url);
        xhr.send();
    });
}

function postAnunciosAjax(url, anuncio) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                } else {
                    console.error(xhr.status, xhr.statusText);
                }
    
                resolve(data);
            } else {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }
        });
    
        xhr.open("POST", url);
    
        // seteo HEADERS siguiendo el estándar de los tipos MIME
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(anuncio));
    });
}

async function postAnuncioAsync(url, anuncio) {
    try {
        
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(anuncio)
        }

        const response = await fetch(url, request);

        if (!response.ok) {
            throw Promise.reject(response);
        }

        return true;
    } catch (error) {
        console.error(error);
    }
}

function putAnunciosAjax(url, id, anuncio) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                } else {
                    console.error(xhr.status, xhr.statusText);
                }
    
                resolve(data);
            } else {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }
        });
    
        xhr.open("PUT", url + `/${id}`);
    
        // seteo HEADERS siguiendo el estándar de los tipos MIME
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(JSON.stringify(anuncio));
    });
}

function deleteAnunciosAjax(url, id) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                } else {
                    console.error(xhr.status, xhr.statusText);
                }
    
                resolve(data);
            } else {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }
        });
    
        xhr.open("DELETE", url + `/${id}`);
    
        // seteo HEADERS siguiendo el estándar de los tipos MIME
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send();
    });
}

export { getAnunciosAsync, postAnuncioAsync, getAnunciosAjax, postAnunciosAjax, putAnunciosAjax, deleteAnunciosAjax };