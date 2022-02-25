import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.use('/api/images', images);

routes.get('/', (request: express.Request, response: express.Response) => {
  const link1 = `/api/images?filename=icelandwaterfall`;

  const link2 = `/api/images?filename=icelandwaterfall&width=200&height=200`;

  const msg = `
    <h2>Welcome to image processing handleing Api</h2>
    <ul>
    <li><p>You can access the image without changing from this link : <a href="${link1}" target="_blank">Full sized image</a></p></li>
    <li><p>You can access the the processed image throw this link : <a href="${link2}" target="_blank">processed image</a></p></li>
    </ul>`;
  response.send(msg);
});

export default routes;
