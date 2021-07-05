import querystring from 'query-string';

const redirect_uri = 'http://localhost:3000';
const client_id = process.env.DISCORD_CLIENT_ID;
const client_secret = process.env.DISCORD_CLIENT_SECRET;
const grant_type = 'authorization_code';
const response_type = 'code';
const scope = ['identify'];

const tokenUrl = 'https://discord.com/api/oauth2/token';
const revokeUrl = 'https://discord.com/api/oauth2/token/revoke';

export async function authorize() {
  const res = await fetch(``, {
    method: 'post',
  });
}

export async function token(code: string) {
  const query = querystring.stringify({
    client_id,
    client_secret,
    grant_type,
    code,
    redirect_uri,
  });
  const res = await fetch(`${tokenUrl}?${query}`, {
    method: 'post',
  });
}
