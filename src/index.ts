require('dotenv').config();
import { buildServer } from './buildServer';

const app = buildServer();

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
