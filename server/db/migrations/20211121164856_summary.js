exports.up = function (knex) {
  return knex.schema.createTable("summary", (table) => {
    table.increments();
    table.string("author").notNullable();
    table.string("title").notNullable();
    table.string("isbn").notNullable();
    table.string("summary_key").notNullable();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("summary");
};
