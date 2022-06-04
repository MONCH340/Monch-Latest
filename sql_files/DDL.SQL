SET FOREIGN_KEY_CHECKS=0;

-- DROP ON START UP
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Restaurants;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS RestaurantsWithCategories;
DROP TABLE IF EXISTS Coupons;

CREATE TABLE IF NOT EXISTS Categories
(
    `categoryID`   int NOT NULL AUTO_INCREMENT,
    `categoryName` varchar(255) DEFAULT NULL,
    PRIMARY KEY (categoryID)

);
-- Dumping data for table `Categories`
INSERT INTO Categories (`categoryID`, `categoryName`)
VALUES (1, 'American'),
       (2, 'Japanese'),
       (3, 'Romantic'),
       (4, 'Dessert');
----------------------------------------------------------
-- Table structure for table `Users`
CREATE TABLE IF NOT EXISTS Users
(
    `userID`       int NOT NULL AUTO_INCREMENT,
    `userEmail`    varchar(45) NOT NULL,
    `userBirthday` date        NOT NULL,
    `userLocation` varchar(45) NOT NULL,
    PRIMARY KEY(userID)
);
-- Dumping data for table `Users`
INSERT INTO `Users` (`userEmail`, `userBirthday`, `userLocation`)
VALUES ('richie@lam.com', '1996-10-10', 'San Francisco'),
       ('nathan@perkins.com', '1800-06-05', 'San Francisco'),
       ('kevin@luk.com', '1800-01-04', 'Las Vegas');
----------------------------------------------------------
-- Table structure for table `Coupon`
CREATE TABLE IF NOT EXISTS Coupons
(   `couponID`                  int(11) NOT NULL AUTO_INCREMENT,
    `couponDetails` 		    varchar(45) NOT NULL,
    PRIMARY KEY(couponID)
);
INSERT INTO Coupons (`couponDetails`)
VALUES ("15% TOTAL ORDER"),
       ("FREE ADDONS WITH ORDER"),
       ("BUY ONE GET ONE FREE");
----------------------------------------------------------
-- Table structure for table `Restaurants`
CREATE TABLE IF NOT EXISTS Restaurants
(
    `restaurantID`               int NOT NULL AUTO_INCREMENT,
    `restaurantName`             varchar(45) NOT NULL,
    `restaurantAddress`          varchar(45) NOT NULL,
    `restaurantCity`             varchar(45) NOT NULL,
    `restaurantPriceRange`       int NOT NULL,
    `restaurantHasNutritionInfo` boolean DEFAULT FALSE,
    `couponID`                   int DEFAULT NULL,
    PRIMARY KEY (restaurantID),
    FOREIGN KEY (couponID) REFERENCES Coupons (couponID)

);
-- Dumping data for table `Restaurants`
INSERT INTO Restaurants (`restaurantName`, `restaurantAddress`, `restaurantCity`,
                         `restaurantPriceRange`, `restaurantHasNutritionInfo`)
VALUES ('Hugos Cellar', '202 Fremont Street Experience', 'Las Vegas', 3, 0),
       ('Cheesecake Factory', '251 Geary St, San Francisco', 'San Francisco', 2, 1),
       ('Jjanga AYCE Sushi', '6125 S Fort Apache Rd', 'Las Vegas', 2, 0);
----------------------------------------------------------
-- Table structure for table `Reviews`
CREATE TABLE IF NOT EXISTS Reviews
(
    `reviewID`                 int NOT NULL AUTO_INCREMENT,
    `reviewDate`               date     NOT NULL,
    `reviewStar`               int NOT NULL,
    `reviewContent`            longtext NOT NULL,
    `userID`                   int NOT NULL,
    `restaurantID`             int NOT NULL,
    PRIMARY KEY (reviewID, userID, restaurantID),
    FOREIGN KEY (restaurantID) REFERENCES Restaurants(restaurantID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Dumping data for table `Reviews`
INSERT INTO Reviews (`reviewDate`, `reviewStar`, `reviewContent`, `userID`,
                     `restaurantID`)
VALUES ('2012-01-01', 5, 'Wow, really good', 1, 1),
       ('2022-05-04', 4, 'Great!', 2, 2),
       ('2004-01-03', 1, 'Tastes like my dry elbow', 3, 2);

----------------------------------------------------------
-- Table structure for table `RestaurantsWithCategories`
CREATE TABLE IF NOT EXISTS RestaurantsWithCategories
(   `restaurantsWithCategoriesID`   int(11) NOT NULL AUTO_INCREMENT,
    `restaurantID` 				    int(11) NOT NULL,
    `categoryID`    			    int(11) NOT NULL,
    Primary Key (restaurantsWithCategoriesID),
    FOREIGN KEY (restaurantID) REFERENCES Restaurants (restaurantID) ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Categories (categoryID) ON DELETE CASCADE

);
-- Dumping data for table `RestaurantsWithCategories`
INSERT INTO RestaurantsWithCategories (`restaurantID`, `categoryID`)
VALUES (1, 1),
       (1, 3),
       (2, 1),
       (3, 4);
-- Add constraints --
ALTER TABLE restaurantsWithCategories ADD CONSTRAINT restaurantsWithCategories_uniqueconstraint UNIQUE(restaurantID, categoryID);