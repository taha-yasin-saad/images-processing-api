import { promises as fs } from 'fs';
import File from '../../utilities/file';
import path from 'path';

describe('Test image processing with sharp api', (): void => {
  it('creates an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'max',
      width: '-100',
      height: '300'
    });
    expect(error).not.toBeNull();
  });

  it('creates an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'max',
      width: '100',
      height: '300'
    });
    expect(error).not.toBeNull();
  });

  // directory permissions test
  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumb({
      filename: 'encenadaport',
      width: '50',
      height: '50'
    });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      `encenadaport-50x50.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Delete files used on test
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'encenadaport-50x50.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // file not found something is wrong with the test
  }
});
