import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes/routes'
import { ConnectionOptions, connect } from 'mongoose'

class App {
  public app: express.Application = express()
  public routePrv: Routes = new Routes()
  public mongoUrl =
    'mongodb://limitorder:123456789@localhost:27017/crosswise-offchain'

  constructor() {
    this.config()
    this.mongoSetup()
    this.routePrv.routes(this.app)
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // serving static files
    this.app.use(express.static('public'))
  }

  private async mongoSetup(): Promise<void> {
    try {
      const mongoURI: string = this.mongoUrl
      const options: ConnectionOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
      await connect(mongoURI, options)
      console.log('MongoDB Connected...')
    } catch (err) {
      console.error(err.message)
      // Exit process with failure
      process.exit(1)
    }
  }
}

export default new App().app
