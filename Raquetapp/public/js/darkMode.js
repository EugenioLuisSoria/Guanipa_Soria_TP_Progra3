//BOTONES DE DARKMODE
function activarDarkMode() {
    document.body.classList.add("dark");

    // Guardar cookie por 5 minutos
    document.cookie = "theme=dark; max-age=300; path=/";
}

function desactivarDarkMode() {
    document.body.classList.remove("dark");

    document.cookie = "theme=light; max-age=300; path=/";
}


// AL LLAMAR A LA PAG PARA QUE LEA LA COOKIE
function aplicarTemaDesdeCookie() {
    const cookies = document.cookie.split(";").reduce((acum, cookie) => {
        const [clave, valor] = cookie.trim().split("=");
        acum[clave] = valor;
        return acum;
    }, {});

    if (cookies.theme === "dark") {
        document.body.classList.add("dark");
    }
}

aplicarTemaDesdeCookie();