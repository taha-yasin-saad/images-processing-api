import express from 'express';
import File from '../../utilities/file';

// Image Query interface
interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

// validating the image query
const valitation = async (imageQuery: ImageQuery): Promise<null | string> => {
  // checking the file availabilty
  if (!(await File.isImageAvailable(imageQuery.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    return `Please put a valid filename. Available filenames : ${availableImageNames}.`;
  }

  if (!imageQuery.width && !imageQuery.height) {
    return null; // size values not found
  }

  // Check for width value valitation
  const width: number = parseInt(imageQuery.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please put a positive numerical value for 'width' param";
  }

  // Check for height value valitation
  const height: number = parseInt(imageQuery.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please put a positive numerical value for 'height' param";
  }

  return null;
};

const images = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check the request
    const validationMsg: null | string = await valitation(request.query);
    if (validationMsg) {
      response.send(validationMsg);
      return;
    }
    let error: null | string = '';

    // Creating thumbnail if not yet there
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // get right image path and display it
    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('the path is not right please check');
    }
  }
);

export default images;
