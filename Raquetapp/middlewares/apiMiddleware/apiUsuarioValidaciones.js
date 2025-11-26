const { body } = require("express-validator");

const validarUsuarioCrear = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio"),

    body("mail")
        .notEmpty().withMessage("El mail es obligatorio")
        .bail()
        .isEmail().withMessage("El formato del mail es inválido"),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .bail()
        .isLength({ min: 4 }).withMessage("La contraseña debe tener mínimo 4 caracteres"),

    body("tipo")
        .notEmpty().withMessage("El tipo es obligatorio")
        .bail()
        .isInt().withMessage("El tipo debe ser un número entero"),
];


const validarUsuarioModificar = [
    body("nombre")
        .optional()
        .notEmpty().withMessage("El nombre no puede estar vacío"),

    body("mail")
        .optional()
        .isEmail().withMessage("El formato del mail es inválido"),

    body("password")
        .optional()
        .isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres"),

    body("tipo")
        .optional()
        .isInt().withMessage("El tipo debe ser un número entero"),
];

module.exports = { validarUsuarioCrear, validarUsuarioModificar };