import sharp from 'sharp';

// Sharp Resizing interface
interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

// Processing image with sharp

const ProcessImage = async (
  sharpParams: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(sharpParams.source)
      .resize(sharpParams.width, sharpParams.height)
      .toFormat('jpeg')
      .toFile(sharpParams.target);
    return '';
  } catch {
    return "Image couldn't be resized";
  }
};

export default ProcessImage;
