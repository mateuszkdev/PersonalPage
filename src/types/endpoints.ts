import { Request, Response, NextFunction } from 'express'

export type ExecType = {
    req: Request
    res: Response
    next?: NextFunction
}

export type EndpointReturn = {
    render: {
        file: string,
        data?: {
            [x: string]: any
        }
    }
}

export type Endpoint = {
    method: 'GET' | 'POST'
    type: 'public' | 'private'
    endpoint: string | string[]
    execute: (data: ExecType) => Promise<EndpointReturn>
}