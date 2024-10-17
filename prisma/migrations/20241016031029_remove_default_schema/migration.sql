-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Crawler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "schema" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Crawler_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Crawler" ("description", "id", "name", "schema", "url", "userId") SELECT "description", "id", "name", "schema", "url", "userId" FROM "Crawler";
DROP TABLE "Crawler";
ALTER TABLE "new_Crawler" RENAME TO "Crawler";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
