-- GlanceTechy: phpMyAdmin se import karne ke liye (jab SSH/artisan na ho).
-- Ye `php artisan migrate --seed` ke barabar hai. Dono mat chalana: ya ye file, ya artisan.
-- Pehle apna database chuno phir Import dabao. Purani `projects/posts/testimonials` tables ho to pehle DROP kar do.

SET NAMES utf8mb4;

CREATE TABLE `projects` (
  `id` char(36) NOT NULL,
  `title` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `href` varchar(300) NOT NULL,
  `bg` varchar(7) NOT NULL DEFAULT '',
  `img` varchar(300) NOT NULL DEFAULT '',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `posts` (
  `id` char(36) NOT NULL,
  `slug` varchar(80) NOT NULL,
  `title` varchar(140) NOT NULL,
  `category` varchar(80) NOT NULL,
  `date` date NOT NULL,
  `excerpt` varchar(300) NOT NULL,
  `art` varchar(20) NOT NULL DEFAULT 'seo',
  `image` varchar(300) NOT NULL DEFAULT '',
  `content` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_date_index` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `testimonials` (
  `id` char(36) NOT NULL,
  `name` varchar(80) NOT NULL,
  `role` varchar(100) NOT NULL,
  `quote` varchar(500) NOT NULL,
  `avatar` varchar(300) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `testimonials_created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2026_10_05_000001_create_projects_table', 1),
('2026_10_05_000002_create_posts_table', 1),
('2026_10_05_000003_create_testimonials_table', 1);

INSERT INTO `projects` (`id`,`title`,`category`,`href`,`bg`,`img`,`featured`,`created_at`,`updated_at`) VALUES
('ad63d5eb-c9bd-4af1-b8f3-e79afa0f055c', 'Business Website', 'Corporate Website Design', 'https://example.com/business', '#0f1d3a', '/assets/project/project01.webp', 1, '2026-10-05 12:00:00', '2026-10-05 12:00:00'),
('036a1c01-be27-4567-a38e-ad966b16f94f', 'Food Delivery App', 'Website Design & Development', 'https://example.com/food', '#2a1408', '/assets/project/project02.webp', 1, '2026-10-05 11:59:59', '2026-10-05 11:59:59'),
('c98e34b8-156f-42e5-bf97-cfc117d81583', 'E-commerce Website', 'Web Development', 'https://example.com/store', '#e9e3d8', '/assets/project/project03.webp', 1, '2026-10-05 11:59:58', '2026-10-05 11:59:58'),
('dd036625-c2eb-4577-b3e7-b343b3f4d0fa', 'Marketing Agency', 'Website Design & Development', 'https://example.com/agency', '#1a1038', '/assets/project/project04.webp', 1, '2026-10-05 11:59:57', '2026-10-05 11:59:57'),
('285a17cc-f544-4a08-94d6-33321d40ee5e', 'Real Estate Portal', 'Web Development', 'https://example.com/realestate', '#10231c', '/assets/project/project05.webp', 0, '2026-10-05 11:59:56', '2026-10-05 11:59:56'),
('ca2e2c76-1c15-4b77-a191-0c4e6d556487', 'Fitness Studio', 'Website Design & Development', 'https://example.com/fitness', '#1f1a0e', '/assets/project/project06.webp', 0, '2026-10-05 11:59:55', '2026-10-05 11:59:55'),
('19d7bb64-2e26-40f6-81f4-ae07fad26c83', 'Education Platform', 'Web Application', 'https://example.com/edu', '#13203a', '/assets/project/project07.webp', 0, '2026-10-05 11:59:54', '2026-10-05 11:59:54'),
('844bcc4c-08b8-4873-b2e3-e1ae172906a0', 'Restaurant Website', 'Corporate Website Design', 'https://example.com/restaurant', '#2b1410', '/assets/project/project08.webp', 0, '2026-10-05 11:59:53', '2026-10-05 11:59:53');

INSERT INTO `posts` (`id`,`slug`,`title`,`category`,`date`,`excerpt`,`art`,`image`,`content`,`created_at`,`updated_at`) VALUES
('89c3929e-42e1-44bb-8147-2c4f270a4afb', 'seo-basics', 'SEO Basics: How to Rank Higher on Google in 2026', 'SEO & Content', '2026-09-28', 'The simple foundations that move your site up the search results.', 'seo', '', '["Ranking starts with understanding what your customers search for. Build pages around those questions and answer them clearly.", "Fast loading, clean structure and useful content do more for your rankings than any trick."]', '2026-10-05 12:00:00', '2026-10-05 12:00:00'),
('ba831411-bf1c-4771-92eb-0a2ea4bb1864', 'website-speed', 'Website Speed vs Conversions: Why Every Second Counts', 'Web Design & Development', '2026-09-22', 'Slow pages lose visitors. Here is what to fix first.', 'speed', '', '["Visitors leave slow websites quickly. Even a one second delay can reduce sign-ups and sales.", "Compress images, reduce scripts and use a fast host. Measure again after every change."]', '2026-10-05 11:59:59', '2026-10-05 11:59:59'),
('60962e45-b599-43db-b9f2-89fc45aafac6', 'ppc-budgeting', 'PPC Budgeting for Small Businesses: Where to Spend First', 'Paid Ads & Marketing', '2026-09-15', 'Start small, test fast and put money behind what works.', 'ppc', '', '["Begin with one clear goal and a small daily budget. Test a few ads before you scale anything.", "Track cost per lead, not clicks. Move budget to the campaigns that bring real customers."]', '2026-10-05 11:59:58', '2026-10-05 11:59:58'),
('f0bd8566-181f-46a8-9f2e-ce8862b89fc0', 'social-media-content-plan', 'A Simple Social Media Content Plan You Can Actually Follow', 'Social Media', '2026-09-08', 'Plan a month of posts without burning out.', 'social', '', '["Pick two or three content themes and post on a steady schedule rather than every day.", "Reuse your best posts in new formats, and reply to every comment in the first hour."]', '2026-10-05 11:59:57', '2026-10-05 11:59:57'),
('02938e39-9eac-4eba-856d-a5c8e96a3d90', 'email-marketing-basics', 'Email Marketing Basics: Turn Subscribers into Loyal Customers', 'Email Marketing', '2026-08-30', 'The emails every small business should send first.', 'email', '', '["Start with a welcome email, then share useful tips before you ask for a sale.", "Keep subject lines short and honest, and clean your list every few months."]', '2026-10-05 11:59:56', '2026-10-05 11:59:56'),
('6530f151-072d-413a-93f4-3ef9c82977d5', 'write-copy-that-converts', 'Write Website Copy That Speaks to Your Audience and Converts', 'Content Writing', '2026-08-21', 'Clear words beat clever ones, every time.', 'content', '', '["Lead with the benefit to the reader. Say what you do, who it is for and what to do next.", "Use short sentences and one clear call to action on every page."]', '2026-10-05 11:59:55', '2026-10-05 11:59:55');

INSERT INTO `testimonials` (`id`,`name`,`role`,`quote`,`avatar`,`created_at`,`updated_at`) VALUES
('bac05886-5dfb-43af-85ea-1f1beac199a8', 'Neha Kapoor', 'CEO, E-Commerce Ventures', 'From strategy to execution, GlanceTechy made everything simple. They didn''t just build a website—they built a solution tailored to our business model. Within 6 months, our online revenue doubled. They''re now our trusted partner for all things digital.', '', '2026-10-05 12:00:00', '2026-10-05 12:00:00'),
('ae3d07dc-78fc-486d-9d11-30d389f6fb77', 'Priya Sharma', 'Founder, Trendy Store', 'GlanceTechy completely transformed our online presence. Within 3 months of launching the new website, we saw a 45% increase in qualified inquiries. The team was professional, responsive, and truly understood our business goals. They didn''t just build a website—they built a lead generation machine for us.', '', '2026-10-05 11:59:59', '2026-10-05 11:59:59'),
('2312cc42-1e4a-4a38-99dc-53cd7c3736ce', 'Rohit Verma', 'CEO, Foodie Hub', 'We''ve worked with several agencies before, but GlanceTechy stands out in every way. Their team delivered on time, communicated clearly throughout the project, and the final website exceeded our expectations. They truly understood our brand and translated it beautifully online. Highly recommended.', '', '2026-10-05 11:59:58', '2026-10-05 11:59:58'),
('14709da6-cb3e-46fe-a69a-6f62a102c9aa', 'Neha Gupta', 'Marketing Head, FitLife', 'The SEO work they did for our business has been incredible. We''re now ranking for all our target keywords, and we''re seeing real ROI from organic search. This is a team that actually cares about results and isn''t just checking boxes. Transparent, professional, and highly effective.', '', '2026-10-05 11:59:57', '2026-10-05 11:59:57');
