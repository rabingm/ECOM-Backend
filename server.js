import express from "express";
const app = express()
import cors from "cors";
import morgan from "morgan";
const PORT = process.env.PORT || 6000

app.use (cors())
app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, error =>{
    if(error) console.log(error)

    console.log(`Server is running at http://localhost:${PORT}`)
})