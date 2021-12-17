import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ConnectionOptions, connect } from 'mongoose'
import { Routes } from './routes/routes'
import config from './config'
import Providers from './providers'

class App {
  public app: express.Application = express()
  public routePrv: Routes = new Routes()
  public mongoUrl = config.databaseUrl

  constructor() {
    this.config()
    this.mongoSetup()
    this.routePrv.routes(this.app)
    this.providers()
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // serving static files
    this.app.use(express.static('public'))
    this.app.options('*', cors())
    this.app.use(cors())
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message)
      // Exit process with failure
      process.exit(1)
    }
  }

  private async providers(): Promise<void> {
    console.log('Waiting for network')
    const network = await Providers.Testnet.provider.detectNetwork()
    console.log(network)
  }
}

export default new App().app
