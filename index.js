const express = require('express')

const port = 5454;
const app = express();

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(port, () => {
  console.log(`Development server available on http://localhost:${port}`)
})
