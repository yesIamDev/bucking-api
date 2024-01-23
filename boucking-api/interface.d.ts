/**
 *  - ALL -
 */

export interface IFindByKeyValue {
     key: string
     value: string
}

export interface IQuery {
    page: number
    limit: number
    status?: boolean
    orderBy: string
}

/**
 *  - User -
 */

export interface IUser {
    email: string
    password: string
}