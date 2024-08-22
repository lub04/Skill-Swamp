CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    FOREIGN KEY (skill_id) REFERENCES Skills(id)
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
    FOREIGN KEY (skill_id) REFERENCES Skills(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);
