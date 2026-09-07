import dotenv from "dotenv"; // npm i dotenv

// Loads .env file into process.env object: 
dotenv.config();

class AppConfig {

    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isTest = process.env.ENVIRONMENT === "test";
    public readonly isStage = process.env.ENVIRONMENT === "stage";
    public readonly isProduction = process.env.ENVIRONMENT === "production";

    public readonly productsImagesPath =
    process.env.PRODUCTS_IMAGES_PATH || "uploads/products";

    
    public readonly port = process.env.PORT;
    public readonly mongodbConnectionString = process.env.MONGO_CONNECTION_STRING!;
    public readonly imagesUrl = process.env.IMAGES_URL;
    public readonly hashSalt = process.env.HASH_SALT;
}

export const appConfig = new AppConfig();
