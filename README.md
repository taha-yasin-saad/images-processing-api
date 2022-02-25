#### Brief instructions
This is an Api processing image engine that can process an image and resize it using the link : http://localhost:3000/

### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Start server: ```npm run start```
- Run unit tests: ```npm run test```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```

#### Endpoint to resize images
http://localhost:3000/api/images

Expected arguments are:
- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

### Usage
The server will listen on port 3000:

#### #1
http://localhost:3000/api/images
This link will show a list of the images available on the system.

#### #2
http://localhost:3000/api/images?filename=palmtunnel
This will show the palmtunnel image with full size with out processing it.

#### #3
http://localhost:3000/api/images?filename=palmtunnel&width=300&height=300
This will resize the palmtunnel image with resolution 300X300 and store the thumbnail for later use.

#### #4
http://localhost:3000/api/images?filename=palmtunnel&width=-300&height=300
This will test if the user added an invalid width parameter and will give a message to resolve the issue.

#### #5
http://localhost:3000/api/images?filename=palmtunnel&width=300
This will hint the user that there is a missing height parameter.

### Notes
- Images with full size gets from `assets/images/full`. Further images with the extension can be put there in theory but the filetype is not checked ( not required ).

- Image thumbnails that had been processed will be stored in `assets/images/thumbnail` for later use and can be deleted but that will results creating a new image.
