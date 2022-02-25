exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("unique_note_id").notNullable();
    table.string("note_name").notNullable();
    table.text("short_description").notNullable();
    table.text("long_description").notNullable();
    table.text("document").notNullable();
    table.string("created_date").notNullable();
    // table.text("note_image").notNullable();
    table.float("price").notNullable();
    table.string("pages").notNullable();
    table.string("year").notNullable();
    table.string("language").notNullable();
    // table.float("rating");
    // table.string("note_key");33
    // table.string("summary_key");
    table.string("subject").notNullable();
    table.string("school").notNullable();
    table.string("grade_level").notNullable();
    table.string("class_name").notNullable();
    table.string("teacher").notNullable();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id") // was id
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
