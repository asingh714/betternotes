exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("reviewer").notNullable();
    table.string("review").notNullable();
    table.integer("rating").notNullable();

    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
