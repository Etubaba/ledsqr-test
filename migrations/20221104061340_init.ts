import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('token').nullable();
      table.integer('wallet_balance').defaultTo(0);
      table.timestamps(true, true);
    })

    .createTable('wallets', (table) => {
      table.increments('id').primary();
      table.string('user_email').notNullable;
      table.integer('amount').defaultTo(0);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users').dropTable('wallets');
}
