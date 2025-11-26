const { body } = require("express-validator");

const validarVentaCrear = [

    body("fecha")
        .notEmpty().withMessage("La fecha es obligatoria")
        .bail()
        .isISO8601().withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),

    body("medio")
        .notEmpty().withMessage("El medio de pago es obligatorio"),

    body("nombre")
        .notEmpty().withMessage("El nombre del cliente es obligatorio"),

    // ITEMS: debe ser un array válido
    body("items")
        .notEmpty().withMessage("El campo 'items' es obligatorio")
        .bail()
        .isArray().withMessage("El campo 'items' debe ser un array"),

    // PRODUCTO_ID dentro de items
    body("items.*.producto_id")
        .notEmpty().withMessage("Cada item debe tener un producto_id")
        .bail()
        .isInt().withMessage("El producto_id debe ser un número entero"),

    // CANTIDAD dentro de items
    body("items.*.cantidad")
        .notEmpty().withMessage("Cada item debe tener una cantidad")
        .bail()
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un entero mayor o igual a 1"),
];



const validarVentaModificar = [

    body("fecha")
        .optional()
        .isISO8601().withMessage("La fecha debe tener formato válido (YYYY-MM-DD)"),

    body("medio")
        .optional()
        .notEmpty().withMessage("El medio no puede estar vacío"),

    body("nombre")
        .optional()
        .notEmpty().withMessage("El nombre no puede estar vacío"),

    // Si envían items → debe ser array
    body("items")
        .optional()
        .isArray().withMessage("El campo 'items' debe ser un array"),

    // Validar producto_id si viene
    body("items.*.producto_id")
        .optional()
        .isInt().withMessage("El producto_id debe ser un número entero"),

    // Validar cantidad si viene
    body("items.*.cantidad")
        .optional()
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un entero mayor o igual a 1"),
];


module.exports = { validarVentaCrear, validarVentaModificar };