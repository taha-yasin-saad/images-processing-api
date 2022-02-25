import { promises as fs } from 'fs';
import path from 'path';
import processImage from './image-processing'; // Image processing

// Image Query interface
interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

// File class
export default class File {
  // Default paths
  static imagesFullPath = path.resolve(__dirname, '../../assets/images/full');
  static imagesThumbPath = path.resolve(
    __dirname,
    '../../assets/images/thumbnail'
  );

  // Find image path.
  static async getImagePath(params: ImageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    // create path
    const filePath: string =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}X${params.height}.jpg`
          )
        : path.resolve(File.imagesFullPath, `${params.filename}.jpg`);

    // check if the file exists
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  // Check if an image is available.
  static async isImageAvailable(filename: string = '') {
    if (!filename) {
      return false; // image not found
    }

    return (await File.getAvailableImageNames()).includes(filename);
  }

  // get available image names.
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  // checking if the thumbnail is already available
  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; // image not found
    }

    // set right path
    const filePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  // Create thumbnail path

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath); // Path already available
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }

  // Create thumbnail file

  static async createThumb(params: ImageQuery): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; // do Nothing
    }

    const fileFullSizePath: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );

    const fileThumbSizePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating thumbnail with path ${fileThumbSizePath}`);

    return await processImage({
      source: fileFullSizePath,
      target: fileThumbSizePath,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
