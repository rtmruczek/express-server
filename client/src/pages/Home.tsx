import * as React from 'react';

import { authorizeUrl } from '../discord';

const Home = () => (
  <div>
    Hi, <a href={authorizeUrl}>Login</a>
  </div>
);

export default Home;
