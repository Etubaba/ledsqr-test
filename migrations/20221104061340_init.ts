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
      table.integer('wallet_number').unique();
      table.string('user_email').notNullable().unique();
      table.integer('amount').defaultTo(0);
      table.timestamps(true, true);
    })

    .createTable('transactons', (table) => {
      table.increments('id').primary();
      table.string('sender_email').notNullable();
      table.string('action').notNullable();
      table.string('receiver_email').nullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users')
    .dropTable('wallets')
    .dropTable('transaction');
}
