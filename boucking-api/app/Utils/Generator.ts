import { v4 as uuidv4 } from 'uuid';

export default class Generator {

  /**
   * 
   * @param {number} length - The length of the number you want to generate.
   * @returns A random number between 10^(length-1) and 10^(length) - 1
   */

    public static number(length: number): number {
      return Math.floor(
        Math.pow(10, length-1)+
          Math.random() * (Math.pow(10, length)- Math.pow(10, length-1) -1)
      )
    }

    /**
     * It returns a random string
     * @returns a promise that resolves to a string
     */

    public static async id(): Promise<String> {
      return await uuidv4()
    }

}