import express from "express";
import cors from "cors";
import { dal } from "./utils/dal";
import { appConfig } from "./utils/app-config";
import helmet from "helmet";
import { productController } from "./controller/product-controller";
import fileUpload from "express-fileupload";
import path from "path";
import { errorMiddleware } from "./middleware/error-middleware";


const server = express();

    server.use(cors());
    server.use(helmet());
    server.use(express.json());

    server.use(fileUpload({
        limits: {
            fileSize: 5 * 1024 * 1024 //5Mb
        },
        abortOnLimit: true
    }))

    server.use("/api/images/products", express.static(path.join(process.cwd(), "uploads", "products")))


    server.use(productController.router);

    // Route not found:
    server.use(errorMiddleware.routeNotFound);

    // Catch all errors:
    server.use(errorMiddleware.catchAll);


    async function main(): Promise<void> {

        await dal.connect();

        server.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`);
        });
    }

main();