// exports.up = function (knex) {
//   return knex.schema.createTable("products", (table) => {
//     table.increments();
//     table.string("unique_id").notNullable();
//     table.string("product_name").notNullable();
//     table.text("short_description").notNullable();
//     table.text("long_description").notNullable();
//     table.text("document").notNullable();
//     table.float("price").notNullable();
//     // table.float("rating");
//     table.string("pages").notNullable();
//     table.string("year").notNullable();
//     table.string("language").notNullable();
//     table.string("note_key");
//     table.string("summary_key");

//     table
//       .string("user_id")
//       .unsigned()
//       .notNullable()
//       .references("id") // was id
//       .inTable("users")
//       .onDelete("CASCADE")
//       .onUpdate("CASCADE");

//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("products");
// };
