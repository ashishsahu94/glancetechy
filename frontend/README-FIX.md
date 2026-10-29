# Build me 404 aa raha tha - kya mila aur kya karna hai

## Kya fix hua (frontend zip)
1. `app/blog/[slug]/page.tsx` - har blog post page par `gdg` likha aa raha tha (stray text). Hata diya.
2. `lib/api.ts` - error me ab status + URL dikhta hai; non-JSON 404 (server-level) ko build me retry karta hai.
3. `scripts/check-api.mjs` (+ `prebuild` in package.json) - `npm run build` se pehle 4 API URLs check karta hai
   aur batata hai kaun sa URL fail hua aur kyun. Build ko rokta nahi, sirf warn karta hai.
4. Lint errors: `Header.tsx` (setState in effect), `PostContent.tsx` (prefer-const), `Trustedby.tsx` (unused import).
   Ab `tsc` aur `eslint` me 0 errors.

## 404 ka asli karan (code ka bug nahi lagta)
Build log me message sirf "API request failed." tha. Laravel jab 404 deta hai to JSON me `message` ya `error`
hota hai. Matlab jawab JSON nahi tha -> request Laravel tak pahunchi hi nahi, live server (Apache/Hostinger)
ne 404 diya. Backend code check kiya: PHP syntax sahi hai aur routes `/api/posts`, `/api/agency` maujood
hain. To problem LIVE server ke deploy me hone ki sambhavna sabse zyada hai:

1. Live `backend/routes/api.php` purana hai -> **naya backend zip upload karo**.
2. Live server par route cache atka hai -> `backend/bootstrap/cache/` me `routes-v7.php`, `config.php`,
   `packages.php`, `services.php` delete karo (`.gitignore` rehne do).
3. `backend/public/.htaccess` galat / missing hai -> is zip wala use karo.

## Pehle ye 3 URL browser me kholo
- https://glancetechy.com/backend/public/index.php/api/ping          -> `{"ok":true,...}` (naya route, backend upload ke baad)
- https://glancetechy.com/backend/public/index.php/api/posts         -> posts ki JSON list
- https://glancetechy.com/backend/public/index.php/api/agency -> `{"data":[...]}`

Agar `ping` bhi HTML 404 de to server config / folder path ka issue hai. Agar `ping` chale par `posts` /
`agency` 404 de to routes purane hain.

## Build
```
npm run build   # pehle check-api chalega; FAIL dikhe to backend theek karo, phir build karo
```
Sab `[check-api] OK` dikhe tabhi `dist/` upload karo, warna agency pages khaali ban jayenge.

## Backend zip me kya badla
- `routes/api.php`: `/api/ping` health route add hua.
- Hata diya: `public/diag.php` (admin email + password length dikhata tha), `.env` (asli passwords; live .env
  overwrite na ho), `storage/logs/laravel.log`, `bootstrap/cache/*.php` (local cache), aur galti se rakhi
  `.env.production` / `.env.development`.
- Zaroori: `.env` is chat me upload ho chuki hai, isliye DB password, Gmail App Password aur ADMIN_PASSWORD badal dena.
