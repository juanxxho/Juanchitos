    function actualizarFechaHora() {
        const fechaHora = new Date().toLocaleString();
        document.getElementById("fecha-hora").innerText = `📅 ${fechaHora}`;
    }
    setInterval(actualizarFechaHora, 1000);
    actualizarFechaHora();