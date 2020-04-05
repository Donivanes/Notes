const withDbConnection = require("../lib/withDbConnection");
const Course = require("../models/Course");

withDbConnection(
  async () =>
    await Course.create({
      Primero: [],
      Segundo: [],
      Tercero: [],
      Cuarto: [],
      Quinto: [],
      Sexto: [],
    })
);
