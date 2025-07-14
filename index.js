const app = require("./src/app.js");
const dbConnection = require("./src/config/db.js");
require('dotenv').config();
const PORT = process.env.PORT || 1000;

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log('err', err)
})