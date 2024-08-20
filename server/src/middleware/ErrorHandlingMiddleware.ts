import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

export default (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(Number(err.status)).json({
            status: err.status,
            message: err.message,
        })
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})

}
