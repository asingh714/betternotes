exports.up = function (knex) {
  return knex.schema.createTable("singleOrderItem", (table) => {
    table.increments();
    table.string("unique_single_id").notNullable();
    table.string("note_id");

    table
      .string("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("singleOrderItem");
};
