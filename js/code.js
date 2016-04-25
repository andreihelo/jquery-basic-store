$(document).ready(function() {
    $("#agregar").click(function() {
        var producto = crearProducto();

        if (typeof producto == "undefined") {
            return;
        }

        // Se agrega la fila.
        $("#tabla tbody")
            .append("<tr><td>" + producto.nombre +
                "</td><td>" + producto.precio + "</td><td>" +
                "<button class='eliminar btn btn-danger btn-xs'>Eliminar</button></td></tr>");

        total();
    });

    $("#tabla").on("click", "button.eliminar", function() {
        $(this).closest("tr").remove();

        total();
    });

    function crearProducto() {
        var producto = {
            nombre: null,
            precio: null
        };

        producto.nombre = window.prompt("Nombre del producto:");

        // Si se presiona el botón cancelar.
        if (producto.nombre === null) {
            return;
        } else {
            producto.nombre = producto.nombre.trim().toUpperCase();
        }

        if (producto.nombre && producto.nombre.length > 0) {
            producto.precio = window.prompt("Precio del producto:");
            var conversion = Number(producto.precio);

            // Si se presiona el botón cancelar.
            if (producto.precio === null) {
                return;
            }

            if (!conversion || isNaN(Number(conversion)) || conversion < 0) {
                window.alert("Aviso: ¡Debe capturar un precio válido!");
                return;
            } else {
                producto.precio = conversion.toFixed(2);
            }
        } else {
            window.alert("Aviso: ¡Debe capturar un celdaNombre!");
            return;
        }

        return producto;
    }

    function total() {
        var total = 0;

        // Se lee cada una de las filas.
        $("#tabla tbody tr").each(function() {
            total += Number($(this).find("td:nth-child(2)").text());
        });

        $("#tabla tfoot tr td:last").text(total.toFixed(2));
    }
});
