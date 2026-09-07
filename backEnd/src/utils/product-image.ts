import { UploadedFile } from "express-fileupload";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ClientError } from "../model/client-error";
import { StatusCode } from "../model/enums";

class ProductImage {

    private readonly folder =
        path.join(process.cwd(), "uploads", "products");

    public async save(image: UploadedFile): Promise<string> {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(image.mimetype)) {
            throw new ClientError(
                StatusCode.BadRequest,
                "Image must be JPG, PNG or WEBP"
            );
        }

        await fs.mkdir(this.folder, { recursive: true });

        const extension = path.extname(image.name).toLowerCase();

        const imageName =
            crypto.randomUUID() + extension;

        const imagePath =
            path.join(this.folder, imageName);

        await image.mv(imagePath);

        return imageName;
    }


    public async delete(imageName?: string): Promise<void> {

        if (!imageName) return;

        const imagePath =
            path.join(this.folder, imageName);

        try {
            await fs.unlink(imagePath);
        }
        catch {
            // File doesn't exist - ignore.
        }
    }

}

export const productImage = new ProductImage();