import { Request, Response } from 'express';

class UserController {
    async registration(req: Request, res: Response) {

    }

    async login(req: Request, res: Response) {

    }

    // проверяем авторизован ли пользователь
    async check(req: Request, res: Response) {
        res.json('Test')
    }
}

export default new UserController();
