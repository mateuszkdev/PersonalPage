import ex, { Application } from 'express'
import session from 'express-session'
import randomString from '../utils/randomString'

export class Server {

    app: Application = ex()
    port: number = 8080

    public setup(): void {

        this.app.set('views', `${__dirname}/../../views`)
        this.app.set('view engine', 'pug')
        this.app.use(ex.static(`${__dirname}/../../public`))
        this.app.use(ex.json())
        this.app.use(ex.urlencoded({ extended: false }))

        const SESSION: typeof session = session

        this.app.use(SESSION({
            secret: `Tajny string ${randomString(30)}`, cookie: { maxAge: 6000000 }
        }))

    }

    public get start(): string {

        this.app.listen(this.port, () => console.log(`[ExpressApp] Successfully started HTTP server.`))
        return `[SERVER] Express app listening on port: ${this.port}`

    }

}