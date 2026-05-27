-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2026 a las 19:46:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `user_id`, `created_at`) VALUES
(3, 'Estudio', 5, '2025-11-25 21:28:17'),
(5, 'Shopping', 5, '2025-11-25 21:28:48'),
(10, 'trabajo', 6, '2026-04-28 18:39:40'),
(11, 'trabajo', 5, '2026-04-28 18:40:04'),
(12, 'censs', 5, '2026-04-29 18:57:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('pendiente','en_progreso','completada') DEFAULT 'pendiente',
  `priority` enum('baja','media','alta') DEFAULT 'media',
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `due_date`, `status`, `priority`, `category_id`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'Comprar frutas y verduras', 'Agregar tomates y bananas', '2025-12-01', 'en_progreso', 'alta', 3, 5, '2025-11-25 21:11:02', NULL),
(6, 'prueba', NULL, '2026-04-30', 'pendiente', 'alta', 3, 5, '2026-04-29 18:51:11', NULL),
(7, 'kk', NULL, '2026-04-30', 'pendiente', 'baja', 5, 5, '2026-04-29 18:53:41', NULL),
(8, 'assd', NULL, '2026-05-13', 'pendiente', 'alta', NULL, 12, '2026-05-16 19:39:16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `verification_token_expires` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `is_verified`, `verification_token`, `verification_token_expires`, `created_at`) VALUES
(5, 'Sofia verify', 'sofiverify@example.com', '$2b$10$tIphrFrSf7G/GtTH4MPMZOr618YmLqQafPl/gHLniquFj6vw.oP72', 1, NULL, NULL, '2025-11-21 03:35:31'),
(6, 'Test', 'test@mail.com', '$2b$10$qWMj/KXa81hALktVdimgX.GMxh9xcZwobphHBBHNZuEmBVOBUNfJy', 1, NULL, NULL, '2026-03-05 00:20:31'),
(11, 'so', 'sofimacag@gmail.com', '$2b$10$zfjsSrQ.IyUOcrhF000BFOUxZWs9ReaZeysCZt.zB9PTrxceKNZoy', 0, '7d83cc4bcd890cca11ed10176a542a18c8c4dd24930861651969d5507e6bf162', '2026-04-30 20:57:56', '2026-04-29 23:57:56'),
(12, 'maru', 'mlt36.maru@gmail.com', '$2b$10$OCc1HLz9IcvOjPxIXGblN.MNPUJJlacUCxCY3LLXkMd67VMt9t5e2', 1, NULL, NULL, '2026-04-30 00:03:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_user_unique` (`name`,`user_id`),
  ADD KEY `fk_categories_users` (`user_id`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tasks_user` (`user_id`),
  ADD KEY `fk_tasks_category` (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_categories_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `fk_tasks_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tasks_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;