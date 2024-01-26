import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/Services/User.service";
import UserValidator from "App/Validators/UserValidator";
import Logger from "@ioc:Adonis/Core/Logger";
import Hash from "@ioc:Adonis/Core/Hash";

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

  /**
   * A function that create a new user
   * @param param0
   */

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.v_create,
    });
    try {
      const result = await this.user.register(payload);
      response.created({ status: true, data: result });
    } catch (error: any) {
      Logger.error(error.message);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  /**
   * It fetches the user's data from the database using the user's id
   * @param {HttpContextContract} -HttpContextContract- This is the context of the request.
   * It contains the request, response, and auth object
   * @returns the user object
   */

  public async show({ response, auth }: HttpContextContract) {
    try {
      const user = auth.user;
      if (user && user.id) {
        const { id } = user;
        const data = await this.user.find({ key: "id", value: id });
        return response.ok({ status: true, data });
      } else {
        return response.expectationFailed({
          status: false,
          data: null,
          message: "User Id not found",
        });
      }
    } catch (error: any) {
      Logger.error(error.message);
      return response.expectationFailed({
        status: false,
        data: null,
        message: error.message,
      });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    //1

    const { email, password } = await request.validate({
      schema: this.v_sign,
    });

    //2

    try {
      const userFind = await this.user.signin(email);
      if (!userFind)
        return response.unprocessableEntity({
          errors: [
            { rule: "-", field: "email", message: "Identifiants Incorect." },
          ],
        });

      //3

      if (!(await Hash.verify(userFind.password, password)))
        return response.unprocessableEntity({
          errors: [
            {
              rule: "-",
              field: "password",
              message: `Identifiants inccorect.`,
            },
          ],
        });

      //4
      const token = await auth.use("api").generate(userFind);
      return response.created({
        status: true,
        token,
        data: { user: userFind },
      });
    } catch (error) {
      Logger.error(error);
      return response.expectationFailed({
        status: false,
        message: error.message,
      });
    }
  }

/**
 * It logs out the user
 * @param param0 
 * @returns The response object will be returned.
 */

  public async logOut({response, auth}:HttpContextContract){
    try{

      auth.logout()
      return response.ok({
        status: true,
        message: "User logOut"
      })

    }catch(error){
      Logger.error(error);
      return response.expectationFailed({
        status: false,
        message: error.message,
      });
    }
  }

}
