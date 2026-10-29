# GlanceTechy

Do alag projects, ek hi repo me:

```
glancetechy/
├── backend/     Laravel 12 REST API  (MySQL, admin login, image upload, contact mail)
└── frontend/    Next.js website + admin panel  (static export -> shared hosting pe chalta hai)
```

Frontend sirf `backend` ki API se baat karta hai. Database, login aur uploads ab poori tarah Laravel ke paas hain.

## Local pe chalana

**Backend** (PHP 8.2+, Composer, MySQL chahiye)

```bash
cd backend
composer install
cp .env.example .env          # phir .env me DB_*, ADMIN_*, MAIL_* bharo
php artisan key:generate
php artisan migrate --seed    # tables + starting content
php artisan serve             # http://localhost:8000
```

**Frontend** (Node 20+)

```bash
cd frontend
cp .env.example .env.local    # NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm install
npm run dev                   # http://localhost:3000
```

Admin panel: `http://localhost:3000/admin/login` (email/password wahi jo backend `.env` me `ADMIN_EMAIL` / `ADMIN_PASSWORD` me daale).

## Shared hosting (Hostinger) pe deploy

### 1) Backend  ->  api.tumhara-domain.com
1. hPanel me subdomain `api` banao aur uska document root `.../backend/public` rakho.
2. Apne PC pe `composer install --no-dev --optimize-autoloader` chalao, phir poora `backend/` folder (vendor samet) FTP se upload karo. `.env` server pe banao (`.env.example` se) aur `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://api.tumhara-domain.com`, `CORS_ALLOWED_ORIGINS=https://tumhara-domain.com,https://www.tumhara-domain.com`, `DB_HOST=localhost` set karo.
3. Tables banane ke do tareeke (koi ek):
   - SSH ho to: `php artisan key:generate` aur `php artisan migrate --seed --force`
   - SSH na ho to: phpMyAdmin me `backend/database/schema.sql` import karo, aur `APP_KEY` ke liye apne PC pe `php artisan key:generate --show` chalake value `.env` me daalo.
4. Check: `https://api.tumhara-domain.com/api/posts` JSON dikhna chahiye.
5. `public/uploads` aur `storage` folders writable (755/775) hone chahiye.

### 2) Frontend  ->  tumhara-domain.com
1. `frontend/.env.local` me `NEXT_PUBLIC_API_URL=https://api.tumhara-domain.com/api`
2. `npm run build`  ->  `frontend/dist/` folder banta hai.
3. `dist/` ke **andar ka content** `public_html` me upload karo (Node.js ki zaroorat nahi).

## Purane Next.js-only project se kya badla
- `lib/db.ts`, `lib/auth.ts`, `lib/uploads.ts`, `app/api/*`, `app/uploads/*`  ->  Laravel (`backend/app/...`, `backend/routes/api.php`)
- `data/*.json` aur `.sql`  ->  `backend/database/seeders/data/` + `backend/database/migrations/`
- `/blog/[slug]`  ->  `/blog/read/?slug=...` (static hosting pe naye slugs ke folder nahi ban sakte)
- `/admin/[resource]/[id]`  ->  `/admin/[resource]/edit/?id=...` (wahi wajah)
