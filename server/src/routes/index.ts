import { Router } from 'express'
import { brandRouter } from './brandRouter'
import { deviceRouter } from './deviceRouter'
import { userRouter } from './userRouter'
import { typeRouter } from './typeRouter'

export const router = Router()

// APIs requests
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
