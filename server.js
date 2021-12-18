require("dotenv").config

const app = require('./app');


app.listen(process.env.PORT || 5000, () => console.log('Server is running in http://localhost:5000'));