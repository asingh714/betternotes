exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments();
    table.string("unique_order_id").notNullable();
    table.float("total");

    table
      .enu("status", ["pending", "failed", "paid", "delivered", "cancelled"])
      .defaultTo("pending")
      .notNullable();
    table.string("purchase_date");

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
  return knex.schema.dropTableIfExists("orders");
};
