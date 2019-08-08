const express = require('express')

const port = 5454;
const app = express();

const authRoute = require('./routes/auth')

app.get('/api/user', authRoute)

app.listen(port, () => {
  console.log(`Development server available on http://localhost:${port}`)
})
