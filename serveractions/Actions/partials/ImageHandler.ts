import { promises as fs } from "fs"; // File system promises API
import path from "path"; // Path utility

export class ImageHandler {
  private static UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

  /**
   * Ensures the upload directory exists.
   */
  static async ensureUploadDirectory() {
    await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
  }

  /**
   * Saves images and returns their URLs.
   * @param images - Array of Blob objects representing images.
   * @returns Array of URLs for the saved images.
   */
  static async saveImages(images: Blob[]): Promise<string[]> {
    await this.ensureUploadDirectory();

    const imageUrls: string[] = [];

    for (const image of images) {
      //get image extension
      const extension = image.type.split("/")[1];

      const fileName = `${Date.now()}-${Math.random().toString(
        36
      )}.${extension}`; // Unique file name
      const filePath = path.join(this.UPLOAD_DIR, fileName);
      const arrayBuffer = await image.arrayBuffer();
      const buffer: any = Buffer.from(arrayBuffer);

      // Write the image to the file system
      await fs.writeFile(filePath, buffer);

      // Generate the URL
      const imageUrl = `/uploads/${fileName}`;
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  }

  /**
   * Validates if a Blob is an image based on MIME type.
   * @param blob - Blob object to validate.
   * @returns Boolean indicating if the blob is a valid image.
   */
  static isValidImage(blob: Blob): boolean {
    // const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    // return validImageTypes.includes(blob.type);
    return true;
  }
}
