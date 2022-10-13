require("dotenv").config()
const express = require("express")
const path = require("path")
const allRoutes = require("./src/routes/User")
const app = express()
const { db } = require("./src/config/Db.config")
db()

app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use("/", allRoutes)

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on\nhttp://localhost:${PORT}`);
})