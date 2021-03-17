import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { version } from "uuid";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class SendMailController {

    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});

        if (!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id});

        if(!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!",
            });
        }

        //It will be necessary to carry two procedures
        //First: To save as information in table surveyUser

        const surveyUser = surveyUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });
        await surveyUsersRepository.save(surveyUser);
        //Send e-mail to user

        return response.json(surveyUser);
    }
}

export {SendMailController};
