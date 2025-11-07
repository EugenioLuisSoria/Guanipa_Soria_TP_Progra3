SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS raquetapp;
CREATE DATABASE raquetapp;
USE raquetapp;

--
-- Base de datos: `raquetapp`
--

-- --------------------------------------------------------


--
-- Estructura de tabla para la tabla `Producto`
--
DROP TABLE IF EXISTS `Producto`;
CREATE TABLE `Producto` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `precio` int(10) UNSIGNED NOT NULL,
  `categoria` bigint(20) UNSIGNED DEFAULT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `activo` TINYINT(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Producto`
--

INSERT INTO `Producto` (`id`, `nombre`, `descripcion`,`imagen`, `precio`, `categoria`,`stock`, `activo`) VALUES
(1, 'RaquetPlusMega 1.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta1.webp', 58911, 1 , 91, 1),
(2, 'RaquetPlusMega 2.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta2.webp', 58912, 1 , 92, 1),
(3, 'RaquetPlusMega 3.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta3.webp', 58913, 1 , 93, 1),
(4, 'RaquetPlusMega 4.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta4.webp', 58914, 1 , 94, 1),
(5, 'RaquetPlusMega 5.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta5.webp', 58915, 1 , 95, 1),
(6, 'RaquetPlusMega 6.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta6.webp', 58916, 1 , 96, 1),
(7, 'RaquetPlusMega 7.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta7.webp', 58917, 1 , 97, 1),
(8, 'RaquetPlusMega 8.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta8.webp', 58918, 1 , 98, 1),
(9, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta9.webp', 58919, 1 , 99, 1),
(10, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda.webp', 58919, 2 , 910, 1),
(11, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda2.webp', 58919, 2 , 920, 1),
(12, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda3.webp', 58919, 2 , 930, 1),
(13, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda4.webp', 58919, 2 , 940, 1),
(14, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda5.webp', 58919, 2 , 950, 1),
(15, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda6.webp', 58919, 2 , 960, 1),
(16, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda7.webp', 58919, 2 , 970, 1),
(17, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda8.webp', 58919, 2 , 980, 1);



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--
DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE `Categoria` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` TINYINT(1) UNSIGNED NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`id`, `tipo`) VALUES
(1, 'raqueta'),
(2, 'cuerda'),
(3, 'superRaqueta'),
(4, 'superCuerda');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `Usuarios`
--
DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `nombre`, `mail`, `password`, `tipo`) VALUES
(1,'Pepe', 'pepe@gmail.com', '1234',0),
(2,'Fulano', 'fulano@gmail.com', '1234',0),
(3,'admin', 'admin@gmail.com', 'admin',1);

-- --------------------------------------------------------


--
-- Estructura de tabla para la tabla `Ventas`
--
DROP TABLE IF EXISTS `Ventas`;
CREATE TABLE `Ventas` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `producto` bigint(20) UNSIGNED NOT NULL,
  `fecha` DATE NOT NULL,
  `medio` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`producto`) REFERENCES `Producto`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Ventas`
--

INSERT INTO `Ventas` (`id`, `producto`, `fecha`, `medio`) VALUES
(1, 9, '2025-2-5', 'tarjeta'),
(2, 9, '2025-2-5', 'tarjeta'),
(3, 9, '2025-2-5', 'tarjeta');


-- --------------------------------------------------------

CREATE TABLE VentaProducto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id BIGINT UNSIGNED,
  producto_id BIGINT UNSIGNED,
  cantidad INT,
  FOREIGN KEY (venta_id) REFERENCES Ventas(id),
  FOREIGN KEY (producto_id) REFERENCES Producto(id)
);
--
-- Volcado de datos para la tabla `VentaProducto`
--

INSERT INTO `VentaProducto` (`id`, `venta_id`,`producto_id`, `cantidad`) VALUES
(1,1,9,1),
(2,2,9,1),
(3,3,9,1);

-- --------------------------------------------------------


COMMIT;