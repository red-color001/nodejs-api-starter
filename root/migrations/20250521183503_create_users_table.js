/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.bigIncrements('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('email', 255).notNullable().unique();
        table.string('password_hash', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.bigInteger('created_by').nullable();
        table.bigInteger('updated_by').nullable();
        

        table.index('id');
        table.index('username');
        table.index('email');
        table.index('created_at');
        table.index('updated_at');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
