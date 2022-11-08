// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      // host: '0.0.0.0',
      host: '127.0.0.1',
      // user: 'root',
      user: 'etubaba',
      // password: 'aKnxzB9qGnpJ6UJpqVwZ',
      password: 'mun2la@@',
      // database: 'railway',
      database: 'lendsqr',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      // host: '6856',
      host: 'containers-us-west-116.railway.app',
      port: 6856,
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
