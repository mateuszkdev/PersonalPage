import { Server } from './api/server'
import { Router } from './api/router'

export class App {

    server: Server = new Server()
    router: Router

    constructor() {
        this.server.setup()
        this.autoExec()
    }

    public async autoExec(): Promise<void> {

        const serverStartUpResponse = await this.server.start
        console.log(`[App] Server startup response: ${serverStartUpResponse}`)

        this.router = new Router(this.server)

    }
    

}

export const app = new App()