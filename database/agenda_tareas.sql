-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2025 a las 00:04:21
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
(1, 'Trabajo', 5, '2025-11-21 19:29:46'),
(3, 'Estudio', 5, '2025-11-25 21:28:17'),
(5, 'Shopping', 5, '2025-11-25 21:28:48');

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
(3, 'Comprar frutas y verduras', 'Agregar tomates y bananas', '2025-12-01', 'en_progreso', 'alta', 1, 5, '2025-11-25 21:11:02', NULL);

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
(1, 'Sofi', 'sofi@example.com', '$2b$10$YI3XrCILC62aPd5RpEObT.sdr5KjjzhaJpqimGeuT4bEDIObnqFGK', 0, '1e013f59f58b397a495fc04f4c40783ba133e64f3ee17a72b2eccb463b98595e', '2025-11-21 17:11:03', '2025-11-20 20:11:03'),
(2, 'Sofi 2', 'sofi2@example.com', '$2b$10$G3CLKtvzFY8CDBQ2NfreJeq3gNvm27xUHx86S9NVdAXyzh5iNdk7m', 0, '21bce0e14803abfa501f6cf1364346b62d41920845e9d652944aafb90d0e0213', '2025-11-21 18:22:04', '2025-11-20 21:22:04'),
(3, 'Sofi 3', 'sofi3@example.com', '$2b$10$SKgvaySXwyLw/GV9JcEu9ehyI3miZMZ7/dIRdGvySDSJauiBkD9/.', 0, '3d398b1d7702ee3b756952cc29dd81b3a30a8e4e9c5268a5da36c6f2c65996dc', '2025-11-21 18:24:42', '2025-11-20 21:24:42'),
(4, 'Sofia gonzalez', 'sofi4@example.com', '$2b$10$OySGKDWC5bDjzKamD1KbEe.42NQPB7qlNpJE665Yo9GRCVlvXPokG', 0, '5e9cbc59e0bc55e8a0e7688a431556565a2f086ba5831cdfe3f883510fc74589', '2025-11-22 00:25:10', '2025-11-21 03:25:10'),
(5, 'Sofia verify', 'sofiverify@example.com', '$2b$10$tIphrFrSf7G/GtTH4MPMZOr618YmLqQafPl/gHLniquFj6vw.oP72', 1, NULL, NULL, '2025-11-21 03:35:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
