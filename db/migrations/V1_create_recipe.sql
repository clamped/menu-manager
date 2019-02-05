CREATE TABLE recipe (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    preparationTime INT NOT NULL,
    cookingTime INT NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    
    createdTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(id)
);