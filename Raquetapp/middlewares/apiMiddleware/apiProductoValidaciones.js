const { body } = require("express-validator");

const validarProductoCrear = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio"),

    body("descripcion")
        .notEmpty().withMessage("La descripción es obligatoria"),

    body("precio")
        .notEmpty().withMessage("El precio es obligatorio")
        .bail()
        .isNumeric().withMessage("El precio debe ser numérico"),

    body("categoria")
        .notEmpty().withMessage("La categoría es obligatoria")
        .bail()
        .isInt().withMessage("La categoría debe ser un número entero"),

    body("stock")
        .notEmpty().withMessage("El stock es obligatorio")
        .bail()
        .isInt().withMessage("El stock debe ser numérico y entero"),

    body("activo")
        .notEmpty().withMessage("El campo 'activo' es obligatorio")
        .bail()
        .isBoolean().withMessage("El campo 'activo' debe ser booleano"),
];

const validarProductoModificar = [
    body("nombre")
        .optional()
        .notEmpty().withMessage("El nombre no puede estar vacío"),

    body("descripcion")
        .optional()
        .notEmpty().withMessage("La descripción no puede estar vacía"),

    body("precio")
        .optional()
        .isNumeric().withMessage("El precio debe ser numérico"),

    body("categoria")
        .optional()
        .isInt().withMessage("La categoría debe ser un número entero"),

    body("stock")
        .optional()
        .isInt().withMessage("El stock debe ser un número entero"),

    body("activo")
        .optional()
        .isBoolean().withMessage("El campo 'activo' debe ser booleano"),
];

module.exports = { validarProductoCrear, validarProductoModificar };