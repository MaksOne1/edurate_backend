{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "test",
  "synchronize": false,
  "entities": [
    "src/**/entities/**/*.ts",
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "database/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "database/migrations",
    "subscribersDir": "src/subscriber"
  }
}