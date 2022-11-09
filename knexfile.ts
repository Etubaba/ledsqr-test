// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  production: {
    client: 'mysql2',
    connection: {
      // host: '6856',
      host: 'containers-us-west-100.railway.app',
      port: 5591,
      database: 'railway',
      user: 'root',
      password: 'ikPjB7bhCCuRg8zEtGTD',
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    // migrations: {
    //   tableName: 'knex_migrations',
    // },
  },

  development: {
    client: 'mysql2',
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
};
