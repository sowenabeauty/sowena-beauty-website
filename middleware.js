import { next } from '@vercel/functions';

const ACCESS_COOKIE = '__Host-sowena_device_access';
const ACCESS_QUERY = 'sowena_access';
const ACCESS_HASH = 'af21620e2bb5e5a559c4c7f0860165aa3212eab1438922f6a916e0a95f8d60bf';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const config = {
  matcher: '/(.*)',
};

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

function readCookie(request, name) {
  const cookies = request.headers.get('cookie') || '';
  const entry = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : '';
}

function blockedResponse() {
  return new Response(
    `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Access restricted | Sowena Beauty</title>
    <style>
      :root { color-scheme: dark; font-family: Arial, sans-serif; }
      * { box-sizing: border-box; }
      body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 24px; background: #033c38; color: #fffaf0; }
      main { width: min(100%, 520px); padding: 32px; border: 1px solid rgba(231, 189, 88, .55); border-radius: 8px; background: #042f2c; text-align: center; }
      h1 { margin: 0 0 12px; color: #e7bd58; font-size: clamp(26px, 7vw, 38px); }
      p { margin: 0; line-height: 1.65; }
    </style>
  </head>
  <body>
    <main>
      <h1>Access restricted</h1>
      <p>Website này hiện không khả dụng tại khu vực của bạn.</p>
    </main>
  </body>
</html>`,
    {
      status: 403,
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Type': 'text/html; charset=utf-8',
        Vary: 'X-Vercel-IP-Country, Cookie',
      },
    },
  );
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get(ACCESS_QUERY) || '';

  if (accessToken && (await sha256(accessToken)) === ACCESS_HASH) {
    url.searchParams.delete(ACCESS_QUERY);

    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
        'Set-Cookie': `${ACCESS_COOKIE}=${encodeURIComponent(accessToken)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Strict`,
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  }

  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  if (country !== 'VN') {
    return next();
  }

  const deviceToken = readCookie(request, ACCESS_COOKIE);
  if (deviceToken && (await sha256(deviceToken)) === ACCESS_HASH) {
    return next();
  }

  return blockedResponse();
}
