exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.text("profile_image");
    table.string("school_name");
    table.string("grade_level");
  });
};

exports.down = function (knex) {};
