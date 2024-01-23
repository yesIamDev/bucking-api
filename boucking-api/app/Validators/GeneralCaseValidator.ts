import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GeneralCaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({})

  public v_delete = schema.create({
    id: schema.string([rules.uuid()]),
  })

  public v_id_param = schema.create({
    id: schema.string([rules.uuid()]),
  })

  public v_sign = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(4), rules.confirmed()])
  })

  public messages: CustomMessages = {}
}
