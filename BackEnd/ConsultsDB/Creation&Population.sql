-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2022 a las 06:13:58
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `xfifa_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fasestournament`
--

CREATE TABLE `fasestournament` (
  `_idTournament` int(255) NOT NULL,
  `fase` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fasestournament`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matchs`
--

CREATE TABLE `matchs` (
  `_id` int(100) NOT NULL,
  `data` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `fase` varchar(30) NOT NULL,
  `team1` varchar(30) NOT NULL,
  `team2` varchar(30) NOT NULL,
  `place` varchar(30) NOT NULL,
  `_idtournament` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `localTeam` varchar(35) NOT NULL,
  `selecTeam` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`_id`, `name`, `lastname`, `localTeam`, `selecTeam`) VALUES
('[value-1]', 'Esteban ', 'Alvarado', 'Heredia', 'Costa Rica'),
('[value-1]', 'Keylor', 'Navas', 'None', 'Costa Rica'),
('[value-1]', 'Douglas ', 'Lopez', 'Heredia', 'Costa Rica'),
('[value-1]', 'Keysher', 'Fuller', 'Heredia', 'Costa Rica'),
('[value-1]', 'Carlos', 'Mora', 'Alajuela', 'Costa Rica'),
('[value-1]', 'Kendall', 'Watson', 'Saprisa', 'Costa Rica'),
('[value-1]', 'Celso', 'Borges', 'Alajuela', 'Costa Rica'),
('[value-1]', 'Johan ', 'Venegas', 'Alajuela', 'Costa Rica'),
('[value-1]', 'Alvaro', 'Zamora', 'Saprisa', 'Costa Rica'),
('[value-1]', 'Christopher', 'Meneses', 'Heredia', 'Costa Rica'),
('[value-1]', 'Aaron ', 'Suarez', 'Alajuela', 'Costa Rica'),
('[value-1]', 'Anthony', 'Contreras', 'Heredia', 'Costa Rica'),
('[value-1]', 'Bryan ', 'Ruiz', 'Alajuela', 'Costa Rica'),
('[value-1]', 'Joel ', 'Campbell', 'None', 'Costa Rica'),
('[value-1]', 'Daniel', 'Chacon', 'Cartago', 'Costa Rica'),
('[value-1]', 'Orlando', 'Galo', 'Heredia', 'Costa Rica'),
('[value-1]', 'Carlos ', 'Marinez', 'None', 'Costa Rica'),
('[value-1]', 'Francisco', 'Calvo', 'None', 'Costa Rica'),
('[value-1]', 'Brandon', 'Aguilera', 'None', 'Costa Rica'),
('[value-1]', 'Roan', 'Wilson', 'None', 'Costa Rica'),
('[value-1]', 'Robert ', 'Sanchez', 'None', 'España'),
('[value-1]', 'David', 'Raya', 'None', 'España'),
('[value-1]', 'Unai', 'Simon', 'None', 'España'),
('[value-1]', 'Cesar ', 'Azpilicueta', 'None', 'España'),
('[value-1]', 'Eric', 'Garcia', 'None', 'España'),
('[value-1]', 'Pau', 'Torres', 'None', 'España'),
('[value-1]', 'Sergi ', 'Roberto', 'None', 'España'),
('[value-1]', 'Hugo', 'Guillamon', 'None', 'España'),
('[value-1]', 'Sergio', 'Busquets', 'None', 'España'),
('[value-1]', 'Marcos', 'Llorente', 'None', 'España'),
('[value-1]', 'Pablo', 'Gavira', 'None', 'España'),
('[value-1]', 'Rodri', 'Hernandez', 'None', 'España'),
('[value-1]', 'Carlos', 'Soler', 'None', 'España'),
('[value-1]', 'Koke', 'Koke', 'None', 'España'),
('[value-1]', 'Nico ', 'Williams', 'None', 'España'),
('[value-1]', 'Borja', 'Iglesias', 'None', 'España'),
('[value-1]', 'Alvaro', 'Morata', 'None', 'España'),
('[value-1]', 'Abel', 'Ruiz', 'None', 'España'),
('[value-1]', 'Marco', 'Asensio', 'None', 'España'),
('[value-1]', 'Yeremy', 'Pino', 'None', 'España'),
('[value-1]', 'Leroy', 'Sane', 'None', 'Alemania'),
('[value-1]', 'Timo', 'Werner', 'None', 'Alemania'),
('[value-1]', 'Lukas', 'Nmecha', 'None', 'Alemania'),
('[value-1]', 'Thomas', 'Muller', 'None', 'Alemania'),
('[value-1]', 'Julian', 'Brandt', 'None', 'Alemania'),
('[value-1]', 'Nico', 'Schulz', 'None', 'Alemania'),
('[value-1]', 'Serge', 'Gnabry', 'None', 'Alemania'),
('[value-1]', 'Kai', 'Havertz', 'None', 'Alemania'),
('[value-1]', 'Florian', 'Neuhaus', 'None', 'Alemania'),
('[value-1]', 'Joshua', 'Kimmich', 'None', 'Alemania'),
('[value-1]', 'Bnejamin', 'Henrichs', 'None', 'Alemania'),
('[value-1]', 'Niklas', 'Sule', 'None', 'Alemania'),
('[value-1]', 'Thilo', 'Kehrer', 'None', 'Alemania'),
('[value-1]', 'Mattias', 'Ginter', 'None', 'Alemania'),
('[value-1]', 'David', 'Raum', 'None', 'Alemania'),
('[value-1]', 'Antonio', 'Rudiger', 'None', 'Alemania'),
('[value-1]', 'Ter', 'Stegen', 'None', 'Alemania'),
('[value-1]', 'Sven ', 'Ullrich', 'None', 'Alemania'),
('[value-1]', 'Kevin', 'Trapp', 'None', 'Alemania'),
('[value-1]', 'Oliver', 'Baumann', 'None', 'Alemania'),
('[value-1]', 'Wissan', 'Ben', 'None', 'Francia'),
('[value-1]', 'Randal', 'Muani', 'None', 'Francia'),
('[value-1]', 'Ousmane', 'Dembele', 'None', 'Francia'),
('[value-1]', 'Kylian', 'Mbappe', 'None', 'Francia'),
('[value-1]', 'Olivier', 'Giroud', 'None', 'Francia'),
('[value-1]', 'Jordan', 'Veretout', 'None', 'Francia'),
('[value-1]', 'Thomas', 'Lemer', 'None', 'Francia'),
('[value-1]', 'Antonie', 'Griezmann', 'None', 'Francia'),
('[value-1]', 'Paul', 'Pogba', 'None', 'Francia'),
('[value-1]', 'Eduardo', 'Camavinga', 'None', 'Francia'),
('[value-1]', 'Dayot', 'Upamecano', 'None', 'Francia'),
('[value-1]', 'Clement', 'Lenglet', 'None', 'Francia'),
('[value-1]', 'Leo', 'Dubois', 'None', 'Francia'),
('[value-1]', 'Lucas', 'Digne', 'None', 'Francia'),
('[value-1]', 'William', 'Saliba', 'None', 'Francia'),
('[value-1]', 'Benjamin', 'Pavard', 'None', 'Francia'),
('[value-1]', 'Alphonse', 'Areola', 'None', 'Francia'),
('[value-1]', 'Mike', 'Maignan', 'None', 'Francia'),
('[value-1]', 'Steve', 'Mandanda', 'None', 'Francia'),
('[value-1]', 'Alban', 'Lafont', 'None', 'Francia'),
('[value-1]', 'Mitchell', 'Duke', 'None', 'Australia'),
('[value-1]', 'Matthew', 'Leckie', 'None', 'Australia'),
('[value-1]', 'Jamie', 'Maclaren', 'None', 'Australia'),
('[value-1]', 'Jason', 'Cummings', 'None', 'Australia'),
('[value-1]', 'Denis', 'Genreau', 'None', 'Australia'),
('[value-1]', 'Ajdin ', 'Hrustic', 'None', 'Australia'),
('[value-1]', 'Martin', 'Moyle', 'None', 'Australia'),
('[value-1]', 'Keanu', 'Kole', 'None', 'Australia'),
('[value-1]', 'Ryan', 'Strain', 'None', 'Australia'),
('[value-1]', 'Joel', 'King', 'None', 'Australia'),
('[value-1]', 'Trent', 'Sainsbury', 'None', 'Australia'),
('[value-1]', 'Harrison', 'Delbridge', 'None', 'Australia'),
('[value-1]', 'Conner', 'Mecalfe', 'None', 'Australia'),
('[value-1]', 'Thomas', 'Deng', 'None', 'Australia'),
('[value-1]', 'Bailey', 'Wright', 'None', 'Australia'),
('[value-1]', 'Fran', 'Karacic', 'None', 'Australia'),
('[value-1]', 'Milos', 'Degenek', 'None', 'Australia'),
('[value-1]', 'Mitchell', 'Langerak', 'None', 'Australia'),
('[value-1]', 'Mathew', 'Ryan', 'None', 'Australia'),
('[value-1]', 'Andrew', 'Redmayne', 'None', 'Australia'),
('[value-1]', 'Kasper', 'Schmeichel', 'None', 'Dinamarca'),
('[value-1]', 'Oliver', 'Christensen', 'None', 'Dinamarca'),
('[value-1]', 'Frederik', 'Ronnow', 'None', 'Dinamarca'),
('[value-1]', 'Joachinm', 'Andersen', 'None', 'Dinamarca'),
('[value-1]', 'Victor', 'Nelsson', 'None', 'Dinamarca'),
('[value-1]', 'Simon', 'Kjaer', 'None', 'Dinamarca'),
('[value-1]', 'Jonas', 'Knudsen', 'None', 'Dinamarca'),
('[value-1]', 'Jens', 'Larsen', 'None', 'Dinamarca'),
('[value-1]', 'Mathias', 'Jensen', 'None', 'Dinamarca'),
('[value-1]', 'Christian', 'Eriksen', 'None', 'Dinamarca'),
('[value-1]', 'Mikkel', 'Damsgaard', 'None', 'Dinamarca'),
('[value-1]', 'Anders', 'Dreyer', 'None', 'Dinamarca'),
('[value-1]', 'Phillip', 'Billing', 'None', 'Dinamarca'),
('[value-1]', 'Daniel', 'Wass', 'None', 'Dinamarca'),
('[value-1]', 'Martin', 'Braitwaite', 'None', 'Dinamarca'),
('[value-1]', 'Skov', 'Olsen', 'None', 'Dinamarca'),
('[value-1]', 'Kasper', 'Dolberg', 'None', 'Dinamarca'),
('[value-1]', 'Jesper', 'Lindstrom', 'None', 'Dinamarca'),
('[value-1]', 'Rasmus', 'Hojlund', 'None', 'Dinamarca'),
('[value-1]', 'Yussuf', 'Poulsen', 'None', 'Dinamarca'),
('[value-1]', 'Mohamend', 'Sedki', 'None', 'Tunez'),
('[value-1]', 'Aymen', 'Dahmen', 'None', 'Tunez'),
('[value-1]', 'Bechir', 'Ben', 'None', 'Tunezw'),
('[value-1]', 'Adam', 'Ben', 'None', 'Tunez'),
('[value-1]', 'Bilel', 'Ifa', 'None', 'Tunez'),
('[value-1]', 'Montassar', 'Talbi', 'None', 'Tunez'),
('[value-1]', 'Ali', 'El', 'None', 'Tunez'),
('[value-1]', 'Dylan', 'Bronn', 'None', 'Tunez'),
('[value-1]', 'Ali', 'Maaloul', 'None', 'Tunez'),
('[value-1]', 'Nader', 'Ghandri', 'None', 'Tunez'),
('[value-1]', 'Ferjani', 'Sassi', 'None', 'Tunez'),
('[value-1]', 'Hannibal', 'Mejbri', 'None', 'Tunez'),
('[value-1]', 'Ellyes', 'Skhiri', 'None', 'Tunez'),
('[value-1]', 'Mohamed', 'Drager', 'None', 'Tunez'),
('[value-1]', 'Youssef', 'Msakni', 'None', 'Tunez'),
('[value-1]', 'Anis', 'Ben', 'None', 'Tunez'),
('[value-1]', 'Issam', 'Jebali', 'None', 'Tunez'),
('[value-1]', 'Seifeddine', 'Jaziri', 'None', 'Tunez'),
('[value-1]', 'Adem', 'Bellamine', 'None', 'Tunez'),
('[value-1]', 'Sayfallah', 'Ltaief', 'None', 'Tunez'),
('[value-1]', 'Eiji', 'Kawashima', 'None', 'Japon'),
('[value-1]', 'Daniel', 'Yabuki', 'None', 'Japon'),
('[value-1]', 'Kosei', 'Tani', 'None', 'Japon'),
('[value-1]', 'Yuto', 'Nagatomo', 'None', 'Japon'),
('[value-1]', 'Miki', 'Yamane', 'None', 'Japon'),
('[value-1]', 'Naomichi', 'Ueda', 'None', 'Japon'),
('[value-1]', 'Takehiro', 'Tomiyasu', 'None', 'Japon'),
('[value-1]', 'Ayumu', 'Seko', 'None', 'Japon'),
('[value-1]', 'Shogo', 'Taniguchi', 'None', 'Japon'),
('[value-1]', 'Wataru', 'Endo', 'None', 'Japon'),
('[value-1]', 'Gaku', 'Shibasaki', 'None', 'Japon'),
('[value-1]', 'Genki', 'Haraguchi', 'None', 'Japon'),
('[value-1]', 'Kyogo', 'Furuhashi', 'None', 'Japon'),
('[value-1]', 'Kaoru', 'Mitoma', 'None', 'Japon'),
('[value-1]', 'Shoya', 'Nakajima', 'None', 'Japon'),
('[value-1]', 'Takumi', 'Minamino', 'None', 'Japon'),
('[value-1]', 'Junya ', 'Ito', 'None', 'Japon'),
('[value-1]', 'Yuki', 'Soma', 'None', 'Japon'),
('[value-1]', 'Shuto', 'Machino', 'None', 'Japon'),
('[value-1]', 'Ao', 'Tanaka', 'None', 'Japon'),
('[value-1]', 'Aaron', 'Cruz', 'Saprisa', 'None'),
('[value-1]', 'Pablo', 'Arboine', 'Saprisa', 'None'),
('[value-1]', 'Fidel', 'Escobar', 'Saprisa', 'None'),
('[value-1]', 'Gerald', 'Taylor', 'Saprisa', 'None'),
('[value-1]', 'Ryan', 'Bolaños', 'Saprisa', 'None'),
('[value-1]', 'Ricardo', 'Blanco', 'Saprisa', 'None'),
('[value-1]', 'Sergio ', 'Cespedes', 'Saprisa', 'None'),
('[value-1]', 'Youstin', 'Salas', 'Saprisa', 'None'),
('[value-1]', 'Mariano', 'Torres', 'Saprisa', 'None'),
('[value-1]', 'Ulises', 'Segura', 'Saprisa', 'None'),
('[value-1]', 'Marvin', 'Angulo', 'Saprisa', 'None'),
('[value-1]', 'Christian', 'Bolaños', 'Saprisa', 'None'),
('[value-1]', 'Luis', 'Paradela', 'Saprisa', 'None'),
('[value-1]', 'Andy', 'Reyes', 'Saprisa', 'None'),
('[value-1]', 'Orlando', 'Sinclair', 'Saprisa', 'None'),
('[value-1]', 'Ariel', 'Rodriguez', 'Saprisa', 'None'),
('[value-1]', 'Javon', 'East', 'Saprisa', 'None'),
('[value-1]', 'Andy', 'Reyes', 'Saprisa', 'None'),
('[value-1]', 'Isaac', 'Paris', 'Cartago', 'None'),
('[value-1]', 'Kevin', 'Briceño', 'Cartago', 'None'),
('[value-1]', 'Darryl', 'Parker', 'Cartago', 'None'),
('[value-1]', 'Marco', 'Cubillo', 'Cartago', 'None'),
('[value-1]', 'Kevin', 'Espinoza', 'Cartago', 'None'),
('[value-1]', 'José', 'Vargas', 'Cartago', 'None'),
('[value-1]', 'William', 'Quieros', 'Cartago', 'None'),
('[value-1]', 'Brandon', 'Bonilla', 'Cartago', 'None'),
('[value-1]', 'Mikel', 'Gonzalez', 'Cartago', 'None'),
('[value-1]', 'Jose', 'Quiros', 'Cartago', 'None'),
('[value-1]', 'Diego ', 'Sanchez', 'Cartago', 'None'),
('[value-1]', 'Victor', 'Murillo', 'Cartago', 'None'),
('[value-1]', 'Mauricio', 'Montero', 'Cartago', 'None'),
('[value-1]', 'Michael', 'Barrantes', 'Cartago', 'None'),
('[value-1]', 'Allen ', 'Guevara', 'Cartago', 'None'),
('[value-1]', 'Marcel ', 'Hernandez', 'Cartago', 'None'),
('[value-1]', 'Marcos ', 'Ureña', 'Cartago', 'None'),
('[value-1]', 'Dylan ', 'Flores', 'Cartago', 'None'),
('[value-1]', 'Kenneth', 'Cerdas', 'Cartago', 'None'),
('[value-1]', 'Leonel', 'Moreira', 'Alajuela', 'None'),
('[value-1]', 'Byron', 'Mora', 'Alajuela', 'None'),
('[value-1]', 'Alexis', 'Gamboa', 'Alajuela', 'None'),
('[value-1]', 'Pipo', 'Gonzalez', 'Alajuela', 'None'),
('[value-1]', 'Audrey', 'David', 'Alajuela', 'None'),
('[value-1]', 'Ian', 'Smith', 'Alajuela', 'None'),
('[value-1]', 'Yael', 'Lopez', 'Alajuela', 'None'),
('[value-1]', 'Bernal ', 'Afaro', 'Alajuela', 'None'),
('[value-1]', 'Alexander', 'Lopez', 'Alajuela', 'None'),
('[value-1]', 'Freddy', 'Gondola', 'Alajuela', 'None'),
('[value-1]', 'Josimar', 'Alcocer', 'Alajuela', 'None'),
('[value-1]', 'Doryan', 'Venegas', 'Alajuela', 'None'),
('[value-1]', 'Jose', 'Cubero', 'Alajuela', 'None'),
('[value-1]', 'Bryan', 'Feliz', 'Alajuela', 'None'),
('[value-1]', 'Erick', 'Cabalceta', 'Alajuela', 'None'),
('[value-1]', 'Jose', 'Ortiz', 'Heredia', 'None'),
('[value-1]', 'John', 'Ruiz', 'Heredia', 'None'),
('[value-1]', 'Luis', 'Franco', 'Heredia', 'None'),
('[value-1]', 'Jordy', 'Hernandez', 'Heredia', 'None'),
('[value-1]', 'Jeferson', 'Brenes', 'Heredia', 'None'),
('[value-1]', 'Yeltsin', 'Tejeda', 'Heredia', 'None'),
('[value-1]', 'Rawy', 'Rodriguez', 'Heredia', 'None'),
('[value-1]', 'Diego', 'Gonzalez', 'Heredia', 'None'),
('[value-1]', 'Keyner', 'Brown', 'Heredia', 'None'),
('[value-1]', 'Ariel', 'Soto', 'Heredia', 'None'),
('[value-1]', 'Aaron', 'Salazar', 'Heredia', 'None'),
('[value-1]', 'Miguel', 'Basulto', 'Heredia', 'None'),
('[value-1]', 'Carlos', 'Umaña', 'Heredia', 'None'),
('[value-1]', 'Bryan', 'Segura', 'Heredia', 'None');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

CREATE TABLE `teams` (
  `_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`_id`, `name`, `type`) VALUES
(1, 'Costa Rica', 'Seleccion'),
(2, 'España', 'Seleccion'),
(3, 'Japon', 'Seleccion'),
(4, 'Alemania', 'Seleccion'),
(5, 'Francia', 'Seleccion'),
(6, 'Australia', 'Seleccion'),
(7, 'Dinamarca', 'Seleccion'),
(8, 'Tunez', 'Seleccion'),
(9, 'Alajuela', 'Local'),
(10, 'Heredia', 'Local'),
(11, 'Saprisa', 'Local'),
(12, 'Cartago', 'Local');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teamstournament`
--

CREATE TABLE `teamstournament` (
  `_idTournament` int(255) NOT NULL,
  `team` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournament`
--

CREATE TABLE `tournament` (
  `_id` int(255) NOT NULL,
  `name` varchar(40) NOT NULL,
  `startDate` varchar(30) NOT NULL,
  `endDate` varchar(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `birthday` varchar(30) NOT NULL,
  `isAdmin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fasestournament`
--
ALTER TABLE `fasestournament`
  ADD KEY `fasetournament` (`_idTournament`);

--
-- Indices de la tabla `matchs`
--
ALTER TABLE `matchs`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `matchtournament` (`_idtournament`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `teamstournament`
--
ALTER TABLE `teamstournament`
  ADD KEY `teamstournament` (`_idTournament`);

--
-- Indices de la tabla `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fasestournament`
--
ALTER TABLE `fasestournament`
  ADD CONSTRAINT `fasetournament` FOREIGN KEY (`_idTournament`) REFERENCES `tournament` (`_id`);

--
-- Filtros para la tabla `matchs`
--
ALTER TABLE `matchs`
  ADD CONSTRAINT `matchtournament` FOREIGN KEY (`_idtournament`) REFERENCES `tournament` (`_id`);

--
-- Filtros para la tabla `teamstournament`
--
ALTER TABLE `teamstournament`
  ADD CONSTRAINT `teamstournament` FOREIGN KEY (`_idTournament`) REFERENCES `tournament` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
