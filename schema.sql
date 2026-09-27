-- ============================================================
-- SevenKNC Global Exim — Database Schema
-- Target: MySQL 5.7+ / MariaDB 10.4+
-- Database: sevenknc  (utf8mb4)
--
-- Upload this file to production (phpMyAdmin / mysql CLI) to
-- create or update all required tables:
--   mysql -u <user> -p <database> < schema.sql
-- ============================================================

-- ------------------------------------------------------------
-- Admin users — credentials for the /admin portal.
-- Passwords are stored as scrypt hashes:
--   scrypt$<N>$<r>$<p>$<saltHex>$<hashHex>
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email         VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(120) NOT NULL DEFAULT 'Admin',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Admin sessions — ONE row per user (UNIQUE user_id).
-- On every login the row is replaced; on every authenticated
-- request last_seen_at is updated and expires_at slides forward
-- (+7 days). Expired rows are deleted lazily on lookup.
--
-- token_hash is SHA-256 of the cookie token — the raw token is
-- never stored, so a DB leak does not expose live sessions.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_sessions (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id      INT UNSIGNED NOT NULL,
  token_hash   CHAR(64) NOT NULL,
  ip           VARCHAR(45) NULL,
  user_agent   VARCHAR(255) NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at   TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_sessions_user (user_id),
  UNIQUE KEY uq_admin_sessions_token (token_hash),
  KEY idx_admin_sessions_expires (expires_at),
  CONSTRAINT fk_admin_sessions_user
    FOREIGN KEY (user_id) REFERENCES admin_users (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Inquiries — website contact / quote form submissions.
-- `payload` keeps the full form JSON so nothing is lost even
-- when the form gains new fields later.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(190) NOT NULL,
  company    VARCHAR(190) NULL,
  email      VARCHAR(190) NOT NULL,
  phone      VARCHAR(60)  NULL,
  country    VARCHAR(120) NULL,
  product    VARCHAR(190) NULL,
  subject    VARCHAR(255) NULL,
  message    TEXT NULL,
  payload    JSON NULL,
  status     ENUM('New','In Progress','Resolved') NOT NULL DEFAULT 'New',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
             ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inquiries_status (status),
  KEY idx_inquiries_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Seed admin account (created only if the table is empty).
--
--   Email:    admin@sevenknc.com
--   Password: Admin@123
--
-- !! Change this password immediately after first login. !!
-- To add/change admins you can re-hash a password with the
-- app's scrypt format and INSERT/UPDATE the row manually.
-- ------------------------------------------------------------
INSERT INTO admin_users (email, password_hash, name)
SELECT 'sevenknc.globalexim@gmail.com',
       'scrypt$16384$8$1$5703b5f12f1c2bde53fda698a107aeb4$4272f423a64bef8771c170a50146140956c2c9229d67bc5c8a55460f3a0d62b2f05ac77bd6d52937ac796bcf89a74e117d7a0c537ac561f5e64d5c346f07ed17',
       'Administrator'
WHERE NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1);
