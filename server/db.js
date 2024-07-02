const { connect } = require("mongoose");
connect(process.env.DB_CONNECTION_URL).then(()=>console.log("Database connected successfully."))
.catch(()=> console.log("Unable to connect the database"));