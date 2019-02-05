CREATE TABLE recipe_method (
    recipeId VARCHAR(255) NOT NULL,
    step INT NOT NULL,
    description TEXT NOT NULL,
    
    createdTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(recipeId, step),
    INDEX(recipeId),

    FOREIGN KEY (recipeId)
        REFERENCES recipe(id)
        ON DELETE CASCADE
);