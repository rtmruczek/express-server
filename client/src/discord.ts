import querystring from 'query-string';

const redirect_uri = 'http://localhost:3000';
const client_id = process.env.DISCORD_CLIENT_ID;
const response_type = 'code';
const scope = ['identify'];

const authorizeQuery = querystring.stringify({
  redirect_uri,
  client_id,
  response_type,
  scope: scope.join(' '),
});

const authorizeUrl = `https://discord.com/api/oauth2/authorize?redirect_uri=${authorizeQuery}`;

export { authorizeUrl };
