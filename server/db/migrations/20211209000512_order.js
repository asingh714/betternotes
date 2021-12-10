exports.up = function (knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments();
    table.float("total");
    table
      .enu("status", ["pending", "failed", "paid", "delivered", "canceled"])
      .defaultTo("pending")
      .notNullable();
    table.date("purchase_date");
    table
      .string("user_id")
      .unsigned()
      .notNullable()
      .references("id") // was id
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("order");
};
