import { Request, Response, NextFunction } from 'express'
import { Application } from 'express'
import { Server } from './server'
import log from '../utils/routerLogs'
import { readdirSync } from 'fs'
import { Endpoint } from '../types/endpoints'

export class Router {

    server: Server

    constructor(server: Server) {

        this.server = server

        log.info('Loading endpoints')
        log.br()

        readdirSync(`${__dirname}/../endpoints`)
            .filter((f: string) => f.endsWith('.js') && !f.startsWith('--'))
            .forEach((n: string) => {

                const point: Endpoint = require(`${__dirname}/../endpoints/${n}`).default

                if (!this.validateResponse(point)) return
                this.validateEndpointType(point, n)

            })

        log.br()
        log.info('Endpoints loading success!')

    }

    private validateResponse(point: Endpoint): boolean {

        return !(!point.method || !point.endpoint || !point.execute || !point.type)

    }

    private validateEndpointType(point: Endpoint, fileName: string): void {

        if (typeof point.endpoint === 'string') return this.setter(point.endpoint, point.execute, fileName, point.method)
        else if (Array.isArray(point.endpoint)) return point.endpoint.forEach((e: string) => this.setter(e, point.execute, fileName, point.method))

    }

    private setter(url: string, execute: Endpoint['execute'], name: string, method: Endpoint['method']): void {

        switch (method) {

            case 'GET':
                this.server.app.get(url, async (req: Request, res: Response, next: NextFunction) => {
                    const response = await execute({ req, res, next })

                    if (response.render) {
                        res.render(response.render.file, response.render.data)
                    }
                });
                break;

            case 'POST':
                this.server.app.post(url, (req: Request, res: Response, next: NextFunction) => execute({ req, res, next })); break;

            default:
                log.error(`Skipped ${name} file. Invalid endpoint method "${method}"!`); break;

        }

        this.server.endpoints.push({ url, method, execute })
        log.success(`Loaded ${method}${url} [${name.replace('.js', '.ts')}]`)

    }

}