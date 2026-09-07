import express from "express";
import cors from "cors";
import { dal } from "./utils/dal";
import { appConfig } from "./utils/app-config";
import helmet from "helmet";
import { productController } from "./controller/product-controller";
import fileUpload from "express-fileupload";
import path from "path";
import { errorMiddleware } from "./middleware/error-middleware";
import { authController } from "./controller/auth-controller";
import { orderController } from "./controller/order-controller";


const server = express();

    server.use(cors());
    server.use(helmet({
          crossOriginResourcePolicy: {
            policy: "cross-origin"
        }
    }));
    server.use(express.json());

    server.use(fileUpload({
        limits: {
            fileSize: 5 * 1024 * 1024 //5Mb
        },
        abortOnLimit: true
    }))

    server.use("/api/images/products", express.static(path.join(process.cwd(), "uploads", "products")))

    //Controllers
    server.use(productController.router);
    server.use(authController.router);
    server.use(orderController.router);

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