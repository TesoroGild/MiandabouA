-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 15 août 2022 à 03:22
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `miandaboudb`
--

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` char(10) NOT NULL COMMENT 'identifiant de commande',
  `customer` char(100) NOT NULL COMMENT 'Références à username de la table users',
  `total` char(10) NOT NULL,
  `timecreated` int DEFAULT NULL,
  `items` text NOT NULL COMMENT 'références aux produits commandés',
  PRIMARY KEY (`id`),
  KEY `customer` (`customer`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `customer`, `total`, `timecreated`, `items`) VALUES
(1, 'hermione', 60130, 1659548776, '1, 6, 11');

-- --------------------------------------------------------

--
-- Structure de la table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` char(10) NOT NULL,
  `name` char(100) NOT NULL,
  `category` enum('dev','infra','sc','fc') NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `picture` char(128) DEFAULT NULL COMMENT 'nom deonné par l''utilisateur au fichier photo du produit',
  `contenthash` char(40) DEFAULT NULL COMMENT 'sha1 de la photo du produit. C''est nom  sous lequel sera enregistré la photo',
  `video` char(255) DEFAULT NULL,
  `price` char(10) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `timecreated` int NOT NULL,
  `timemodified` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `items`
--

INSERT INTO `items` (`id`, `name`, `category`, `description`, `picture`, `contenthash`, `video`, `price`, `quantity`, `timecreated`, `timemodified`) VALUES
(1, 'Logiciel', 'dev', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'dev2.png', '05abc924f950ce495cdeacd487b0d1e9803adc4d', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112331, 1659729603),
(2, 'Site Web', 'dev', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'dev3.png', '3610382170bdfe87d067a892d3e8d7bac2d1e1c7', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112383, 1659112383),
(3, 'Application Mobile', 'dev', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'dev1.jpg', '1231c91d1a7517681f7e4ef159b5ad03e5079f29', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112437, 1659112437),
(4, 'Jeux Vidéos', 'dev', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'dev4.webp', '4fd480565535364f37bee90e9629b697a44cc7bd', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112471, 1659112471),
(5, 'Cyber-Sécurité', 'infra', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'res1.jpg', 'f8b4756e2b97da8af2a33460f2d15f2cdff7d3ef', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112539, 1659112539),
(6, 'Administrateur de Base de Données', 'infra', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'res2.png', '7240b52faa7df142335eb2e6522df0b27d98fdf8', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112578, 1659729699),
(7, 'Architecte Réseau', 'infra', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'res3.webp', 'f58a4747cb2e569aec228cb5fa481a36862f255c', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112648, 1659112648),
(8, 'Analyste Fonctionnel', 'infra', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'res4.png', '2dd1e2054d3246f6cc4c1c109a908b097474519a', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659112699, 1659112699),
(9, 'Courriels', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons1.jpg', '2498f73c5477529c69c632ab0e9a0b4a173d13b4', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659112988, 1659112988),
(10, 'Bien débuter en C', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons2.jpg', 'c3efd06d1fba442bc89c81e700603d43c0bc0e4e', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659113020, 1659113020),
(11, 'Choix d\'une Infrastructure réseaux', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons1.jpg', '2498f73c5477529c69c632ab0e9a0b4a173d13b4', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659113102, 1659729716),
(12, 'Langage C', 'fc', 'Lorem ipsum dolor sit amet.', 'form1.jpg', 'fd9e26d2d0b29ad4bb5519df3ef677d34ed9fb4e', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659113135, 1659113135),
(13, 'Java', 'fc', 'Lorem ipsum dolor sit amet.', 'form2.png', '719af02a31ffd92df3960fe2c14bfac35b69fb96', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659113335, 1659113335),
(14, 'Programmation Web', 'fc', 'Lorem ipsum dolor sit amet.', 'form3.jpg', 'c2f8a5a70df024be8493137bebff5801647b7eb8', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659113368, 1659113368),
(15, 'Télé-Informatique', 'fc', 'Lorem ipsum dolor sit amet.', 'form4.gif', 'ba5ad7fa188c35091f80dbbf50df3eda142edb6b', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659113435, 1659113435),
(16, 'Intelligence Artificielle', 'fc', 'Lorem ipsum dolor sit amet.', 'form5.jpg', 'c3713892f7bd67d265675e954d158f5bd2c09aa5', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659113476, 1659113476),
(17, 'Logiciels de sécurité', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons1.jpg', '2498f73c5477529c69c632ab0e9a0b4a173d13b4', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114036, 1659114036),
(18, 'Firewall', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons1.jpg', '2498f73c5477529c69c632ab0e9a0b4a173d13b4', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114069, 1659114069),
(19, 'Sauvergardes', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons1.jpg', '2498f73c5477529c69c632ab0e9a0b4a173d13b4', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114099, 1659114099),
(20, 'Choix d\'un langage', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons2.jpg', 'c3efd06d1fba442bc89c81e700603d43c0bc0e4e', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114144, 1659114144),
(21, 'Vous cherchez du travail?', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons3.png', '9bd24bb3496631f59de7cd70b2445880112ec51a', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114176, 1659114176),
(22, 'Apprendre en codant, pas en lisant!', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons2.jpg', 'c3efd06d1fba442bc89c81e700603d43c0bc0e4e', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 130, 1, 1659114213, 1659114213),
(23, 'DEMANDEZ DE L\'AIDE', 'sc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'cons4.jpeg', '73407ce8ea87853cb7001b2149863d191f2e814c', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 30000, 1, 1659114252, 1659114252),
(24, 'Programmation C#', 'fc', 'Lorem ipsum dolor sit amet.', 'form6.jpg', '9ca1952a62dd56a8c920db25e992d49e402066a6', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659114323, 1659114323),
(28, 'Cryptographie', 'fc', 'Lorem ipsum dolor sit amet. Qui fugiat quia rem placeat reprehenderit et distinctio sunt ad corrupti nulla.', 'tof9.jpg', 'd711e375a3d81252f1a3ad0f7709ebd5d680e306', 'https://www.youtube.com/watch?v=JNljLQDYNSw&ab_channel=AnatoleBelliard', 2500, 1, 1659665197, 1659665197);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(10) NOT NULL,
  `username` char(100) NOT NULL COMMENT 'Nom d''utilisateur',
  `password` char(255) NOT NULL,
  `fistname` char(100) NOT NULL,
  `lastname` char(100) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `picture` char(128) DEFAULT NULL COMMENT 'Nom que l''utilisateur avait donné au fichier photo',
  `contenthash` char(40) DEFAULT NULL COMMENT 'sha1 du contenu du fichier photo. C''est le nom que portera le fichier enregistré sur le serveur.',
  `email` char(100) NOT NULL,
  `status` enum('customer','employee') NOT NULL COMMENT 'Status de la personne.',
  `dateOfBirth` int DEFAULT NULL COMMENT 'Date de naissance',
  `tel` char(20) DEFAULT NULL COMMENT 'Téléphone',
  `department` enum('dev','infra','sc','fc') DEFAULT NULL COMMENT 'Département',
  `timecreated` int DEFAULT NULL COMMENT 'timestamp de la date création du compte',
  `timemodified` int DEFAULT NULL COMMENT 'timestamp de la date modification du compte',
  `lastlogin` int DEFAULT NULL COMMENT 'timestamp de la date de dernière connexion de l''utilisateur',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fistname`, `lastname`, `role`, `picture`, `contenthash`, `email`, `status`, `dateOfBirth`, `tel`, `department`, `timecreated`, `timemodified`, `lastlogin`) VALUES
(1, 'admin', 'c620ca92831a71e13a03d7d293efaa33', 'Administrator', 'System', 'admin', NULL, NULL, 'admin@inf3190.test.web', 'employee', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'client1', '2f4fa55339d7cb2bebb325742f3d54c9', 'Client', 'Usager', 'user', NULL, NULL, 'client1@inf3190.test.web', 'customer', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'vito', '$argon2i$v=19$m=65536,t=4,p=1$UjFZcktNVzh4Y1JLOUIxZg$GhUMG+XCVE8VsgkdIf3XrQvw5rVmqgOON8LD+Sww+e0', 'Robert', 'De Niro', 'user', 'vito1.png', '19171d4754ec41cd996b8628afc0dd4a57fe4cd7', 'vito@corleone.tg', 'employee', 0, '', 'fc', 1659139583, 1659139583, 1659884869),
(6, 'stephen', '$argon2i$v=19$m=65536,t=4,p=1$RmJIUUw3TmdxalNxY1ZabQ$+xa6/bxH2bYVfIf4n+L3lAF5T4mvDWrgS3CF9ANoQmg', 'Stephen', 'CURRY', 'user', 'steph1.png', 'fee3cdc682e7973a78e94af434c969321c47df61', 'baby@face.gsw', 'employee', 19880314, '', 'infra', 1659139692, 1659139692, NULL),
(8, 'nicky', '$argon2i$v=19$m=65536,t=4,p=1$OE1IbUptM2VJaDRRQlgvOQ$nc3n8i3Sl4l5rEqhfqEI893AV/A4CL+9WUglHaR9U0U', 'Ryo', 'SAEBA', 'user', NULL, NULL, 'city@hunter.ch', 'customer', 0, '', '', NULL, NULL, 1659884532),
(9, 'prince', '$argon2i$v=19$m=65536,t=4,p=1$ZlplMzc0aGJ2dDVLcTJCUg$53LyBV6Ew686v9s5UkM0BGob0c57CeseTOdmW7BhXiw', 'Sanji', 'VINSMOK', 'user', NULL, NULL, 'jambe@noire.mgw', 'customer', 0, '', '', NULL, NULL, NULL),
(10, 'corason', '$argon2i$v=19$m=65536,t=4,p=1$a3VaOUZOVWU3Q2pPYjVTTg$qfhPKNPHoxlSor+8FizhdzsrZGGbjJxNDkD8adMYuDA', 'Corason', 'DONQUIJOTE', 'user', NULL, NULL, 'cora@san.djf', 'customer', 0, '', '', NULL, NULL, NULL),
(11, 'hermione', '$argon2i$v=19$m=65536,t=4,p=1$LkszUlVRd3p1RGNXSS5kUA$GRGktim/OwpRlQPbB0882QkeDrH+tn0AS3CrblBIjwk', 'Emma', 'WATSON', 'admin', 'emma1.png', 'cc10c56252465ab3c4f255ed375fd65c560e70f9', 'hermione@granger.hp', 'employee', 19900415, '0000000000', 'sc', 1659322540, 1659322540, 1659548651);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
