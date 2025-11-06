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
(1, 'RaquetPlusMega 1.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta1.webp', 58911, 1 , 91, 1),
(2, 'RaquetPlusMega 2.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta2.webp', 58912, 1 , 92, 1),
(3, 'RaquetPlusMega 3.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta3.webp', 58913, 1 , 93, 1),
(4, 'RaquetPlusMega 4.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta4.webp', 58914, 1 , 94, 1),
(5, 'RaquetPlusMega 5.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta5.webp', 58915, 1 , 95, 1),
(6, 'RaquetPlusMega 6.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta6.webp', 58916, 1 , 96, 1),
(7, 'RaquetPlusMega 7.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta7.webp', 58917, 1 , 97, 1),
(8, 'RaquetPlusMega 8.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta8.webp', 58918, 1 , 98, 1),
(9, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/raquetas/raqueta9.webp', 58919, 1 , 99, 1),
(10, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda.webp', 58919, 2 , 910, 1),
(11, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda2.webp', 58919, 2 , 920, 1),
(12, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda3.webp', 58919, 2 , 930, 1),
(13, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda4.webp', 58919, 2 , 940, 1),
(14, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda5.webp', 58919, 2 , 950, 1),
(15, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda6.webp', 58919, 2 , 960, 1),
(16, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda7.webp', 58919, 2 , 970, 1),
(17, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/public/datos_para_DB/productos/cuerdas/cuerda8.webp', 58919, 2 , 980, 1);



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--
DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE `Categoria` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`id`, `tipo`) VALUES
(1, 'raqueta'),
(2, 'cuerdas'),
(3, 'superRaquetas'),
(4, 'superCuerdas');

-- --------------------------------------------------------