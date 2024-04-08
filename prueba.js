document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var documento = document.getElementById("documento").value;
    if (documento.trim() === "") {
        mostrarError("Por favor, ingrese un número de documento.");
        return;
    }

    var url = "https://api.talentotech.cymetria.com/api/v1/blockchain/obtener-estudiantes-aprobados" + documento;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo completar la solicitud.");
            }
            return response.json();
        })
        .then(data => {
            mostrarResultado(data);
        })
        .catch(error => {
            mostrarError(error.message);
        });
});

function mostrarResultado(data) {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";
    if (data.length === 0) {
        resultadoDiv.textContent = "No se encontraron resultados para el número de documento proporcionado.";
        return;
    }

    var estudiante = data[0]; 
    var resultadoHTML = `
        <h2>Información del estudiante:</h2>
        <p><strong>Nombre completo:</strong> ${estudiante.nombre}</p>
        <p><strong>Número de documento:</strong> ${estudiante.documento}</p>
        <p><strong>Correo electrónico:</strong> ${estudiante.correo}</p>
        <p><strong>Nombre del curso:</strong> ${estudiante.curso}</p>
    `;
    resultadoDiv.innerHTML = resultadoHTML;
}

function mostrarError(mensaje) {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";
    var errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.textContent = mensaje;
    resultadoDiv.appendChild(errorDiv);
}