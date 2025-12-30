import { NOMEM } from "dns"

export default class Client {
  #id: string | undefined
  #name: string
  #age: number

  constructor(name: string, age: number, id?: string) {
    this.#name = name
    this.#age = age
    this.#id = id
  }

  static void(){
    return new Client('', 0, undefined)
  }

  get id(){
    return this.#id
  }

  get name(){
    return this.#name
  }

  get age(){
    return this.#age
  }
}