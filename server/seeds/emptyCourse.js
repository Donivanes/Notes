const withDbConnection = require("../lib/withDbConnection");
const Course = require("../models/Course");

withDbConnection(
  async () =>
    await Course.create([
      { name: "Primero" },
      { name: "Segundo" },
      { name: "Tercero" },
      { name: "Cuarto" },
      { name: "Quinto" },
      { name: "Sexto" },
    ])
);
