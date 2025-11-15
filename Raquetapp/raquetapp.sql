-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 15-11-2025 a las 17:04:16
-- Versión del servidor: 5.7.39
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `raquetapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--

CREATE TABLE `Categoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`id`, `tipo`) VALUES
(1, 'raquetas'),
(2, 'cuerdas'),
(3, 'superRaquetas'),
(4, 'superCuerdas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Producto`
--

CREATE TABLE `Producto` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `precio` int(10) UNSIGNED NOT NULL,
  `categoria` bigint(20) UNSIGNED DEFAULT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `activo` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Producto`
--

INSERT INTO `Producto` (`id`, `nombre`, `descripcion`, `imagen`, `precio`, `categoria`, `stock`, `activo`) VALUES
(1, 'RaquetPlusMega 1.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta1.webp', 58911, 1, 91, 1),
(2, 'RaquetPlusMega 2.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta2.webp', 58912, 1, 92, 1),
(3, 'RaquetPlusMega 3.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta3.webp', 58913, 1, 93, 1),
(4, 'RaquetPlusMega 4.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta4.webp', 58914, 1, 94, 1),
(5, 'RaquetPlusMega 5.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta5.webp', 58915, 1, 95, 1),
(6, 'RaquetPlusMega 6.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta6.webp', 58916, 1, 96, 1),
(7, 'RaquetPlusMega 7.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta7.webp', 58917, 1, 97, 1),
(8, 'RaquetPlusMega 8.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta8.webp', 58918, 1, 98, 1),
(9, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/raquetas/raqueta9.webp', 58919, 1, 99, 1),
(10, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda1.webp', 58919, 2, 910, 1),
(11, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda2.webp', 58919, 2, 920, 1),
(12, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda3.webp', 58919, 2, 930, 1),
(13, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda4.webp', 58919, 2, 940, 1),
(14, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda5.webp', 58919, 2, 950, 1),
(15, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda6.webp', 58919, 2, 960, 1),
(16, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda7.webp', 58919, 2, 970, 1),
(17, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerdas/cuerda8.webp', 58919, 2, 980, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id`, `nombre`, `mail`, `password`, `tipo`) VALUES
(1, 'Pepe', 'pepe@gmail.com', '1234', 0),
(2, 'Fulano', 'fulano@gmail.com', '1234', 0),
(3, 'admin', 'admin@gmail.com', 'admin', 1),
(4, 'Tester', 'tester@tester.com', '$2b$10$CGxn5oomNgo5ppbNG2TISO1c3ztH8xIZHoUUEIqVZvifaaTElo7r6', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Venta`
--

CREATE TABLE `Venta` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `producto` bigint(20) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL,
  `medio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `VentaProducto`
--

CREATE TABLE `VentaProducto` (
  `id` int(11) NOT NULL,
  `venta_id` bigint(20) UNSIGNED DEFAULT NULL,
  `producto_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `VentaProducto`
--

INSERT INTO `VentaProducto` (`id`, `venta_id`, `producto_id`, `cantidad`) VALUES
(1, 1, 9, 1),
(2, 2, 9, 1),
(3, 3, 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ventas`
--

CREATE TABLE `Ventas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `producto` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `medio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Ventas`
--

INSERT INTO `Ventas` (`id`, `producto`, `fecha`, `medio`) VALUES
(1, 9, '2025-02-05', 'tarjeta'),
(2, 9, '2025-02-05', 'tarjeta'),
(3, 9, '2025-02-05', 'tarjeta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Producto`
--
ALTER TABLE `Producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Venta`
--
ALTER TABLE `Venta`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `VentaProducto`
--
ALTER TABLE `VentaProducto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venta_id` (`venta_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto` (`producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Producto`
--
ALTER TABLE `Producto`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Venta`
--
ALTER TABLE `Venta`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `VentaProducto`
--
ALTER TABLE `VentaProducto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `VentaProducto`
--
ALTER TABLE `VentaProducto`
  ADD CONSTRAINT `ventaproducto_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `Ventas` (`id`),
  ADD CONSTRAINT `ventaproducto_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`);

--
-- Filtros para la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `Producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
