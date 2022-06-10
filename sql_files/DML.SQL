-- User Pages -- 1x SELECT/1x INSERT/1x DELETE
SELECT * FROM Users

INSERT INTO Users (userEmail, userBirthday, userLocation)
VALUES (:userEmail, :userBirthday, :userLocation)

DELETE FROM Users WHERE id = :userID


-- Categories Pages 
SELECT * FROM Categories;

INSERT INTO Categories (categoryID, categoryName)
VALUES (:categoryID, :categoryName)

-- Reviews Page 1x SELECT/1x DYNAMIC SELECT/1X DELETE/1X INSERT
SELECT * FROM Reviews 
INNER JOIN USER ON Reviews.userID = user.userID;

SELECT * FROM Reviews WHERE Restaurants_restaurantID LIKE ":Restaurants_restaurantID"

INSERT INTO Reviews (reviewDate, reviewStar, reviewContent, Users_userID, Restaurants_restaurantID)
VALUES (:reviewDate, :reviewStar, :reviewContent, :Users_userID, :Restaurants_restaurantID)

DELETE FROM Reviews WHERE id = :reviewID

-- Restaurants 1X SELECT/1X DELETE/1X INSERT/1X UPDATE 
SELECT * FROM Restaurants 
LEFT JOIN coupons.couponID = Restaurants.couponID ;

INSERT INTO Restaurants (restaurantName, restaurantAddress, restaurantCity, restaurantPriceRange, restaurantHasNutritionInfo)
VALUES (:restaurantName, :restaurantAddress, :restaurantCity, :restaurantPriceRange, :restaurantHasNutritionInfo)

UPDATE Restaurants set couponID=:couponID WHERE Restaurant=:Restaurant

UPDATE Restaurants SET restaurantAddress=:restaurantAddress, restaurantCity=:restaurantCity, restaurantPriceRange=:restaurantPriceRange,
                    restaurantHasNutritionInfo=:restaurantHasNutritionInfo WHERE restaurantID=:restaurantID

-- RestaurantsWithCategories Page
SELECT * FROM RestaurantsWithCategories
INNER JOIN Restaurants ON Restaurants.restaurantID = RestaurantsWithCategories.RestaurantsWithCategoriesID
INNER JOIN Categories ON RestaurantsWithCategories.categoryID = Categories.categoryID;

INSERT INTO RestaurantsWithCategories (Restaurants.restaurantID, Caregories.categoryID)
VALUES( :Restaurants.restaurantID, Categories.categoryID)

DELETE FROM RestaurantsWithCategories WHERE
Restaurants.restaurantID = : Restaurants.restaurantID AND Categories.categoryID = : Categories_categoryID

-- Coupons Page
SELECT * FROM Coupons;

INSERT INTO Coupons (Coupons.couponDetails)
VALUES(: couponDetails);

DELETE FROM Coupons WHERE id = : couponID;