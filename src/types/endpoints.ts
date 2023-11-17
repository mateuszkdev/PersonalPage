import { Request, Response, NextFunction } from 'express'

export type execType = {
    req: Request
    res: Response
    next?: NextFunction
}

export type endpoint = {
    method: 'GET' | 'POST'
    type: 'public' | 'private'
    endpoint: string | string[]
    execute: (req: Request, res: Response, next?: NextFunction) => Promise<any>
}