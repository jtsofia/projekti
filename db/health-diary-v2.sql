-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE FoodEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    meal VARCHAR(50),
    calories INT,
    foodname TEXT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Insert sample data

INSERT INTO Users (username, password, email, user_level) VALUES
('johndoe', 'hashedpassword', 'johndoe@example.com', 'regular'),
('janedoe', 'hashedpassword', 'janedoe@example.com', 'admin'),
('alice_jones', 'hashedpassword', 'alice@example.com', 'regular'),
('bob_brown', 'hashedpassword', 'bob@example.com', 'regular');

INSERT INTO FoodEntries (user_id, entry_date, meal, calories, foodname, notes) VALUES
(1, '2024-01-10', 'Breakfast', '110', 'Porridge', 'Had a pretty good oatmeal porridge with cinnamon'),
(2,'2024-01-11', 'Lunch', '210', 'Taco', 'Met with friends, went to get tacos'),
(3, '2024-01-12', 'Dinner', '701', 'Pot roast', 'Work was demanding but had a pot roast at home'),
(4,'2024-01-13', 'Snack', '120', 'Banana', 'Got it from the store as quick snack')

