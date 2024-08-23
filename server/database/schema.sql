CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_connected BOOLEAN DEFAULT false
);

CREATE TABLE Skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE UserSkills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    level VARCHAR(50),
    experience_years INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE
);

CREATE TABLE Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    provider_id INT NOT NULL,
    requested_skill_id INT NOT NULL,
    provided_skill_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES Users(id),
    FOREIGN KEY (provider_id) REFERENCES Users(id),
    FOREIGN KEY (requested_skill_id) REFERENCES Skills(id),
    FOREIGN KEY (provided_skill_id) REFERENCES Skills(id)
);

CREATE TABLE Reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    reviewed_user_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES Transactions(id),
    FOREIGN KEY (reviewer_id) REFERENCES Users(id),
    FOREIGN KEY (reviewed_user_id) REFERENCES Users(id)
);

CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_content TEXT NOT NULL,
    sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES Users(id),
    FOREIGN KEY (receiver_id) REFERENCES Users(id)
);

CREATE TABLE Notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Credits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    last_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE SkillCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (skill_id) REFERENCES Skills(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

INSERT INTO Users (username, email, password_hash, profile_picture, bio, location) VALUES
('jean_dupont', 'jean.dupont@example.com', 'hashed_password1', 'https://randomuser.me/api/portraits/men/1.jpg', 'Jean Dupont est un passionné de technologie avec une expérience de plus de 10 ans dans le développement web et les systèmes d\'information. Il aime partager ses connaissances avec les autres et a participé à de nombreux projets open-source. En dehors de la programmation, Jean est un grand amateur de randonnée et de photographie, deux activités qui lui permettent de se ressourcer et de trouver de l\'inspiration pour ses projets personnels. Il est également actif dans les communautés locales de développeurs et organise régulièrement des ateliers pour aider les débutants à se lancer dans le codage.', 
'Paris, France'),
('marie_durand', 'marie.durand@example.com', 'hashed_password2', 'https://randomuser.me/api/portraits/women/12.jpg', 'Marie Durand est une éducatrice expérimentée, spécialisée dans l\'enseignement des langues étrangères. Avec une maîtrise en linguistique et plus de 15 ans d\'expérience, elle a aidé des centaines d\'élèves à maîtriser des langues comme l\'anglais, l\'espagnol et le chinois. Marie est également une fervente défenseuse de l\'apprentissage tout au long de la vie et croit fermement que chaque personne a le potentiel d\'apprendre et de s\'épanouir à tout âge. En dehors de son travail d\'enseignement, elle aime voyager et découvrir de nouvelles cultures, ce qui lui permet de rester à jour avec les dernières méthodes pédagogiques et de les intégrer dans ses cours.', 
'Lyon, France'),
('luc_martin', 'luc.martin@example.com', 'hashed_password3', 'https://randomuser.me/api/portraits/men/51.jpg', 'Luc Martin est un ingénieur en informatique avec une expertise en intelligence artificielle et en apprentissage automatique. Il a travaillé sur plusieurs projets innovants, dont des systèmes de recommandation et des applications de reconnaissance d\'image. Luc est également un conférencier régulier dans les conférences technologiques où il partage ses découvertes et ses perspectives sur l\'avenir de l\'IA. Lorsqu\'il ne travaille pas sur ses projets technologiques, Luc aime jouer de la guitare et explorer les dernières tendances en musique électronique. Sa curiosité insatiable pour les nouvelles technologies et son esprit créatif font de lui un leader d\'opinion respecté dans son domaine.', 
'Marseille, France'),
('sophie_legrand', 'sophie.legrand@example.com', 'hashed_password4', 'https://randomuser.me/api/portraits/women/90.jpg', 'Sophie Legrand est une designer graphique talentueuse avec un œil pour les détails et une passion pour l\'esthétique. Après avoir obtenu son diplôme en design graphique, Sophie a travaillé pour plusieurs agences renommées où elle a développé des campagnes visuelles pour des marques internationales. Son style unique, qui mélange modernité et élégance, lui a valu de nombreuses reconnaissances dans l\'industrie. En plus de son travail en design, Sophie est une artiste accomplie qui expose régulièrement ses œuvres dans des galeries d\'art. Elle est également impliquée dans des projets communautaires, où elle utilise ses compétences pour soutenir des causes sociales importantes.', 
'Toulouse, France'),
('paul_brun', 'paul.brun@example.com', 'hashed_password5', 'https://randomuser.me/api/portraits/men/41.jpg', 'Paul Brun est un écrivain et historien avec une passion pour les récits captivants et les faits historiques. Avec plusieurs livres publiés à son actif, Paul a su se faire un nom dans le monde littéraire grâce à son style d\'écriture clair et engageant. Il est également un conférencier recherché pour ses connaissances approfondies sur des sujets allant de l\'histoire médiévale à l\'évolution de la pensée moderne. En plus de ses activités littéraires, Paul est un fervent lecteur et collectionneur de livres anciens. Il passe également beaucoup de temps à voyager pour découvrir les lieux historiques qu\'il décrit dans ses œuvres, apportant ainsi une authenticité unique à ses récits.', 
'Bordeaux, France');
INSERT INTO Users (username, email, password_hash, profile_picture, bio, location, is_connected ) VALUES
('Lubin', 'lubin@example.com', 'hashed_password','https://media.licdn.com/dms/image/v2/D4E03AQFxdh1KYPWTKw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710069703213?e=1729728000&v=beta&t=1wDcQWGmCOxFL-7i3sBsTa9UZj2tOsfqh1x5p5tsVFY', 'Lubin est un développeur passionné par la technologie. Il possède une solide expérience en développement web et en intelligence artificielle. En plus de ses compétences techniques, Lubin s’intéresse aussi à la cybersécurité, où il commence à acquérir de l’expérience. Il est motivé par l’envie d’apprendre et de partager ses connaissances avec la communauté.', 'Bordeaux - France', true);

INSERT INTO Categories (name, description) VALUES
('Informatique', 'Tout ce qui concerne les technologies de l\'information, le développement de logiciels, l\'intelligence artificielle, et la sécurité informatique.'),
('Langues', 'Compétences linguistiques, y compris l\'apprentissage et l\'enseignement des langues étrangères, la traduction, et la linguistique.'),
('Design', 'Comprend le design graphique, le design UX/UI, et l\'illustration, couvrant tous les aspects de la création visuelle.'),
('Littérature', 'Inclut l\'écriture créative, la rédaction, l\'édition, et les études littéraires, englobant les œuvres de fiction et non-fiction.');

INSERT INTO Skills (name, description) VALUES
('Développement Web', 'Conception et développement de sites web dynamiques en utilisant HTML, CSS, JavaScript et frameworks modernes.'),
('Intelligence Artificielle', 'Création et mise en œuvre d\'algorithmes d\'apprentissage automatique et de modèles d\'intelligence artificielle.'),
('Cybersécurité', 'Protection des systèmes informatiques et des réseaux contre les cyberattaques et les violations de données.'),
('Réseaux Informatiques', 'Conception, mise en place, et gestion des réseaux informatiques pour assurer la connectivité et la sécurité des données.'),
('Bases de Données', 'Conception, gestion, et optimisation des bases de données relationnelles et NoSQL pour stocker et récupérer des données.'),
('Anglais', 'Enseignement de la langue anglaise, y compris la grammaire, la conversation, et la préparation aux examens.'),
('Espagnol', 'Enseignement de l\'espagnol pour débutants et avancés, y compris la conversation et la grammaire.'),
('Chinois', 'Enseignement du chinois mandarin, avec un accent sur la prononciation et l\'écriture des caractères.'),
('Traduction', 'Services de traduction professionnels pour divers types de documents, y compris techniques, légaux et créatifs.'),
('Design Graphique', 'Création de visuels pour les supports imprimés et numériques, y compris les logos, brochures, et affiches.'),
('Design UX/UI', 'Conception d\'interfaces utilisateur intuitives et d\'expériences utilisateur engageantes pour les applications et les sites web.'),
('Illustration', 'Création d\'illustrations pour des livres, magazines, et projets numériques.'),
('Écriture Créative', 'Écriture de récits de fiction, y compris les romans, nouvelles, et scripts.'),
('Rédaction Technique', 'Rédaction de documents techniques, y compris les manuels, guides, et spécifications de produit.'),
('Édition', 'Révision et correction de textes, ainsi que la gestion de la production de livres et d\'autres publications.');

INSERT INTO SkillCategories (skill_id, category_id) VALUES
(1, 1), /* Développement Web -> Informatique */
(2, 1), /* Intelligence Artificielle -> Informatique */
(3, 1), /* Cybersécurité -> Informatique */
(4, 1), /* Réseaux Informatiques -> Informatique */
(5, 1), /* Bases de Données -> Informatique */
(6, 2), /* Anglais -> Langues */
(7, 2), /* Espagnol -> Langues */
(8, 2), /* Chinois -> Langues */
(9, 2), /* Traduction -> Langues */
(10, 3), /* Design Graphique -> Design */
(11, 3), /* Design UX/UI -> Design */
(12, 3), /* Illustration -> Design */
(13, 4), /* Écriture Créative -> Littérature */
(14, 4), /* Rédaction Technique -> Littérature */
(15, 4); /* Édition -> Littérature */

INSERT INTO UserSkills (user_id, skill_id, level, experience_years) VALUES
(1, 1, 'Expert', 10), /* Jean Dupont -> Développement Web */
(1, 2, 'Avancé', 5), /* Jean Dupont -> Intelligence Artificielle */
(2, 6, 'Expert', 15), /* Marie Durand -> Anglais */
(2, 7, 'Avancé', 8), /* Marie Durand -> Espagnol */
(3, 3, 'Avancé', 7), /* Luc Martin -> Cybersécurité */
(3, 4, 'Expert', 10), /* Luc Martin -> Réseaux Informatiques */
(4, 10, 'Expert', 12), /* Sophie Legrand -> Design Graphique */
(4, 11, 'Avancé', 8), /* Sophie Legrand -> Design UX/UI */
(5, 13, 'Expert', 15), /* Paul Brun -> Écriture Créative */
(5, 14, 'Avancé', 10); /* Paul Brun -> Rédaction Technique */

-- Jean Dupont (User 1) compétences supplémentaires
INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES
(1, 3, 'Intermédiaire', 3), -- Cybersécurité
(1, 5, 'Avancé', 7); -- Bases de Données

-- Marie Durand (User 2) compétences supplémentaires
INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES
(2, 9, 'Expert', 12), -- Traduction
(2, 8, 'Intermédiaire', 4); -- Chinois

-- Luc Martin (User 3) compétences supplémentaires
INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES
(3, 1, 'Expert', 10), -- Développement Web
(3, 2, 'Avancé', 6), -- Intelligence Artificielle
(3, 5, 'Intermédiaire', 4); -- Bases de Données

-- Sophie Legrand (User 4) compétences supplémentaires
INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES
(4, 12, 'Avancé', 6), -- Illustration
(4, 13, 'Intermédiaire', 4); -- Écriture Créative

-- Paul Brun (User 5) compétences supplémentaires
INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES
(5, 15, 'Expert', 15), -- Édition
(5, 14, 'Avancé', 10); -- Rédaction Technique

-- Vérification et insertion de catégories manquantes
INSERT INTO SkillCategories (skill_id, category_id)
VALUES
(6, 2), -- Anglais -> Langues (Déjà existant)
(7, 2), -- Espagnol -> Langues (Déjà existant)
(8, 2), -- Chinois -> Langues (Déjà existant)
(9, 2), -- Traduction -> Langues (Déjà existant)
(10, 3), -- Design Graphique -> Design (Déjà existant)
(11, 3), -- Design UX/UI -> Design (Déjà existant)
(12, 3), -- Illustration -> Design (Déjà existant)
(13, 4), -- Écriture Créative -> Littérature (Déjà existant)
(14, 4), -- Rédaction Technique -> Littérature (Déjà existant)
(15, 4); -- Édition -> Littérature (Déjà existant)

INSERT INTO Credits (user_id, balance)
VALUES
(1, 100.00), -- Solde initial de 100.00 pour Jean Dupont
(2, 150.00), -- Solde initial de 150.00 pour Marie Durand
(3, 200.00), -- Solde initial de 200.00 pour Luc Martin
(4, 120.00), -- Solde initial de 120.00 pour Sophie Legrand
(5, 180.00); -- Solde initial de 180.00 pour Paul Brun

INSERT INTO UserSkills (user_id, skill_id, level, experience_years)
VALUES 
(6, 1, 'Avancé', 5),  -- Lubin -> Développement Web
(6, 2, 'Intermédiaire', 3), -- Lubin -> Intelligence Artificielle
(6, 3, 'Débutant', 1);  -- Lubin -> Cybersécurité

INSERT INTO Credits (user_id, balance)
VALUES (6, 150.00); -- Solde initial de 150.00 crédits pour Lubin
