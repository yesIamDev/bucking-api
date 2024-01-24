import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/Services/User.service";
import UserValidator from "App/Validators/UserValidator";
import Logger from "@ioc:Adonis/Core/Logger";

@inject()
export default class UsersController extends UserValidator {
  constructor(private readonly user: UserService) {
    super();
  }

  /**
   * It gets all users in the dataBase and return them in the response
   * @param {HttpContextContract} -page- the page number to return.
   * @returns The response object
   */

  public async index({ request, response }: HttpContextContract) {
    try {
      const {
        page = 1,
        limit = 100,
        status = true,
        orderBy = "createdAt",
      } = request.qs();
      const data = await this.user.getAll({ page, limit, status, orderBy });
      return response.ok({ status: true, data });
    } catch (error: any) {
      Logger.error(error.message);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  /**
   * It fetches the user's data from the database using the users id
   * @returns the user object
   */

  public async show({}: HttpContextContract) {
    
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
