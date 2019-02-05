CREATE TABLE recipe_ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    recipeId VARCHAR(255) NOT NULL,
    ingredientId VARCHAR(255) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    
    createdTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(id),
    INDEX(recipeId),

    FOREIGN KEY (recipeId)
        REFERENCES recipe(id)
        ON DELETE CASCADE,

    FOREIGN KEY (ingredientId)
        REFERENCES ingredient(id)
);