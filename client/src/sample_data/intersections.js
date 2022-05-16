// When we pull from the actual DB this may be a messy multi join statement
// Inner join restaurants PK to intersectionTable FK, then join categories PK to intersectionTable FK
// Ultimate goal is to replace the ID's with the actual name of the restaurant and category

// Sample data is representative of AFTER multi inner join
export const sample_intersections = [
  {
    restaurantsWithCategoriesID: 1,
    category: "American",
    restaurant: "Hugo's Cellar",
  },
  {
    restaurantsWithCategoriesID: 2,
    category: "Romantic",
    restaurant: "Hugo's Cellar",
  },
  {
    restaurantsWithCategoriesID: 3,
    category: "American",
    restaurant: "Cheesecake Factory",
  },
  {
    restaurantsWithCategoriesID: 4,
    category: "Japanese",
    restaurant: "JJanga AYCE Sushi",
  },
];
