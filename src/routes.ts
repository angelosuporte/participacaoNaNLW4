import {Router} from 'express';
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController"

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

router.post("/", userController.create);
router.post("/surveys", surveysController.create)

export {router};