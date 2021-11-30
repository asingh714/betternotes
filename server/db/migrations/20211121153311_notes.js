exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("school").notNullable();
    table.string("grade_level").notNullable();
    table.string("class_name").notNullable();
    table.string("teacher").notNullable();
    table.string("note_key").notNullable();

    // table
    //   .string("product_id")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("product")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
