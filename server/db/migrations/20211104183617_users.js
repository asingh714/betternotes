exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("unique_id").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();

    table.text("profile_image");
    table.string("school_name");
    table.string("grade_level");
    table.text("user_description");
    table.date("user_created_date");
    table.string("verification_token");
    table.boolean("isVerified").defaultTo("false");
    table.date("verification_date");

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
