// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'etubaba',
      password: 'mun2la@@',
      database: 'lendsqr',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: '6856',
      database: 'railway',
      user: 'root',
      password: 'aKnxzB9qGnpJ6UJpqVwZ',
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    // migrations: {
    //   tableName: 'knex_migrations',
    // },
  },
};
