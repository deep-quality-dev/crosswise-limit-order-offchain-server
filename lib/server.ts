import app from './app'
// import * as https from 'https'
// import * as fs from 'fs'
import config from './config'

// const httpsOptions = {
//   key: fs.readFileSync(config.https.key),
//   cert: fs.readFileSync(config.https.cert),
// }

// https.createServer(httpsOptions, app).listen(config.https.port, () => {
//   console.log('Express server listening on port ' + config.https.port)
// })

app.listen(config.https.port, () => {
  console.log('Express server listening on port ' + config.https.port)
})
