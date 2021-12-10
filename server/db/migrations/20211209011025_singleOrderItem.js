exports.up = function (knex) {
  return knex.schema.createTable("singleOrderItem", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("product_id");

    table
      .string("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("order")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("singleOrderItem");
};
