-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "preferences" JSONB
);
INSERT INTO "new_users" ("email", "id", "name", "password", "preferences") SELECT "email", "id", "name", "password", "preferences" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
