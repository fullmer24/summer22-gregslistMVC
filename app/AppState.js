import { Car } from "./Models/Car.js"
import { House } from "./Models/house.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []

  /** @type {import('./Models/Car').Car[]} */
  cars = [
    new Car({ make: 'Honda', model: 'CRV3-XL PLUS', year: 2023, price: 100000, img: 'https://static01.nyt.com/images/2020/05/22/business/21wheels3-print/merlin_9261190_cdd1e166-951d-4bd4-b4be-26f41a5dcd96-articleLarge.jpg?quality=75&auto=webp&disable=upscale', description: 'driven only once, car of the future' }),
    new Car({ make: 'Tesla', model: 'Cyber truck', year: 3000, price: 5, img: 'https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/1975/09/22153103/al-yandacropped.jpg', description: 'state of the art, nothing like it, this is also technically just a pre-order, you\'ll get it in the year 3056.' })
  ]

  /** @type {import('./Models/House').House[]} */
  houses = [
    new House({ style: 'Ranch', bdrm: 4, bath: 3, sqft: 3000, price: 670000, img: 'https://images.unsplash.com/photo-1573208078429-16e423f5f1e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80', description: 'Nice ranch home' }),
    new House({ style: 'Cabin', bdrm: 3, bath: 2.5, sqft: 1500, price: 250000, img: 'https://images.unsplash.com/photo-1598210817770-76b744913f56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', description: 'Beautiful cabin in the woods' })
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
