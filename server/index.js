const express = require('express')
const app = express()
const port = process.env.PORT || 5000

//console log that server is running
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.use('/express_backend', require('./api'))

