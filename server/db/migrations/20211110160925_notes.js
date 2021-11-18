exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("school_name").notNullable();
    table.string("grade_level").notNullable();
    table.string("class_name").notNullable();
    table.string("teacher").notNullable();
    table.string("note_name").notNullable();
    table.string("document_type").notNullable();
    table.text("document").notNullable();
    table.float("price").notNullable();
    table.text("long_description").notNullable();
    table.text("short_description").notNullable();
    table.integer("average_rating");
    table.integer("number_of_reviews");
    table.string("language").notNullable();
    table.string("category");

    table
      .string("user_id")
      .unsigned()
      .notNullable()
      .references("unique_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .string("note_creator_name")
      .unsigned()
      .notNullable()
      .references("name")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .string("note_creator_username")
      .unsigned()
      .notNullable()
      .references("username")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
