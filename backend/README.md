# Backend (Laravel 12 API)

## Endpoints

Public:

| Method | URL | Kaam |
|---|---|---|
| GET | `/api/projects?featured=1&limit=4` | projects (featured filter optional) |
| GET | `/api/posts?limit=3` | blog posts (newest first) |
| GET | `/api/posts/{slug}` | ek post |
| GET | `/api/testimonials` | testimonials |
| POST | `/api/contact` | contact form mail |

Admin (header: `Authorization: Bearer <token>`):

| Method | URL | Kaam |
|---|---|---|
| POST | `/api/admin/login` | `{email,password}` -> `{token}` (10 min me 5 koshish) |
| POST | `/api/admin/logout` | |
| GET | `/api/admin/stats` | dashboard counts |
| POST | `/api/admin/upload` | multipart `file` -> `{url}` (JPG/PNG/WEBP/AVIF, 5 MB) |
| GET/POST | `/api/admin/{projects\|posts\|testimonials}` | list / create |
| GET/PUT/DELETE | `/api/admin/{resource}/{id}` | ek item |

## Folder structure

```
app/
  Http/Controllers/
    PublicController.php        public GET endpoints
    ContactController.php       contact form mail
    Admin/AuthController.php    login / logout
    Admin/ResourceController.php  CRUD
    Admin/UploadController.php  image upload
  Http/Middleware/EnsureAdmin.php   Bearer token check
  Models/                       Project, Post, Testimonial
  Support/
    AdminToken.php              signed 7-din token
    Resources.php               fields + validation (frontend/lib/admin-config.ts ke saath match)
    Media.php                   upload save/delete, URL helpers
database/
  migrations/  seeders/  schema.sql (phpMyAdmin import)
routes/api.php
public/uploads/                 admin se upload hui images yahin aati hain
```

## Naya field jodna
`app/Support/Resources.php` (validation) + model `$fillable` + migration + `frontend/lib/admin-config.ts` (form) — chaaron me.

## Note
- Admin token stateless hai: logout par browser token hata deta hai, server pe token 7 din tak valid rehta hai. Password/`APP_KEY` badalne se saare purane token band ho jaate hain.
- Purani Hostinger DB me agar purani `projects/posts/testimonials` tables (data LONGTEXT wali) bani hon to pehle unhe DROP karo, kyunki ab proper columns wali tables bante hain.
