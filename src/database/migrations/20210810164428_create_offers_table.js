exports.up = function up(knex) {
  return knex.schema.createTable('offers', function migrate(table) {
    table.increments('id')
    table.string('slug', 255).notNullable()
    table.string('type', 255).notNullable()
    table.json('offer').notNullable()
    table.unique('slug')
  })
}

exports.down = function down(knex) {
  return knex.schema.dropTable('offers')
}
