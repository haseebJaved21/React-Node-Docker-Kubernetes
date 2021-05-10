import express from 'express'
import cors from 'cors'
// import dotenv from 'dotenv'
import { importHandlers } from './lib/importHandlers'
let cookieParser = require('cookie-parser'); 

const routes = importHandlers(
  require.context('./handlers', true, /\.handler\.ts$/)
)

// dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use('/', routes)
// port is now available to the Node.js runtime
// as if it were an environment variable
export const port = process.env.PORT || 8080
export default app
