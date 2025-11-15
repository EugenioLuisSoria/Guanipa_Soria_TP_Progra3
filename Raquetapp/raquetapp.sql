-- phpMyAdmin SQL Dump
-- versión 5.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS raquetapp;
CREATE DATABASE raquetapp;
USE raquetapp;

-- ===========================================
-- ===============  TABLA Categoria ==========
-- ===========================================

CREATE TABLE `Categoria` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Categoria` (`id`, `tipo`) VALUES
(1, 'raquetas'),
(2, 'cuerdas'),
(3, 'superRaquetas'),
(4, 'superCuerdas');

-- ===========================================
-- ===============  TABLA Producto ===========
-- ===========================================

CREATE TABLE `Producto` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `precio` int(10) UNSIGNED NOT NULL,
  `categoria` bigint(20) UNSIGNED DEFAULT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `activo` tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria` (`categoria`),
  CONSTRAINT `producto_categoria_fk`
    FOREIGN KEY (`categoria`) REFERENCES `Categoria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `Producto` (`id`, `nombre`, `descripcion`, `imagen`, `precio`, `categoria`, `stock`, `activo`) VALUES
(1, 'RaquetPlusMega 1.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta1.webp', 58911, 1, 91, 1),
(2, 'RaquetPlusMega 2.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta2.webp', 58912, 1, 92, 1),
(3, 'RaquetPlusMega 3.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta3.webp', 58913, 1, 93, 1),
(4, 'RaquetPlusMega 4.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta4.webp', 58914, 1, 94, 1),
(5, 'RaquetPlusMega 5.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta5.webp', 58915, 1, 95, 1),
(6, 'RaquetPlusMega 6.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta6.webp', 58916, 1, 96, 1),
(7, 'RaquetPlusMega 7.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta7.webp', 58917, 1, 97, 1),
(8, 'RaquetPlusMega 8.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta8.webp', 58918, 1, 98, 1),
(9, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/raqueta9.webp', 58919, 1, 99, 1),
(10, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda1.webp', 58919, 2, 910, 1),
(11, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda2.webp', 58919, 2, 920, 1),
(12, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda3.webp', 58919, 2, 930, 1),
(13, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda4.webp', 58919, 2, 940, 1),
(14, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda5.webp', 58919, 2, 950, 1),
(15, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda6.webp', 58919, 2, 960, 1),
(16, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda7.webp', 58919, 2, 970, 1),
(17, 'RaquetPlusMega 9.0', 'No vas a poder creer lo que hace ', '/images/productos/cuerda8.webp', 58919, 2, 980, 1);

-- ===========================================
-- ================ TABLA Usuario ============
-- ===========================================

CREATE TABLE `Usuario` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Usuario` (`id`, `nombre`, `mail`, `password`, `tipo`) VALUES
(1, 'Pepe', 'pepe@gmail.com', '1234', 0),
(2, 'Fulano', 'fulano@gmail.com', '1234', 0),
(3, 'admin', 'admin@gmail.com', 'admin', 1),
(4, 'Tester', 'tester@tester.com', '$2b$10$CGxn5oomNgo5ppbNG2TISO1c3ztH8xIZHoUUEIqVZvifaaTElo7r6', 1);

-- ===========================================
-- ================ TABLA Ventas =============
-- ===========================================

CREATE TABLE `Ventas` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `medio` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- ============= TABLA VentaProducto =========
-- ===========================================

CREATE TABLE `VentaProducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` bigint(20) UNSIGNED DEFAULT NULL,
  `producto_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cantidad` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `ventaproducto_venta_fk`
    FOREIGN KEY (`venta_id`) REFERENCES `Ventas` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `ventaproducto_producto_fk`
    FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;