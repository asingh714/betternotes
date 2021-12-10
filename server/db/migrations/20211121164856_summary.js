exports.up = function (knex) {
  return knex.schema.createTable("summary", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("author").notNullable();
    table.string("title").notNullable();
    table.string("isbn").notNullable();
    table.string("summary_key").notNullable();

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("summary");
};
