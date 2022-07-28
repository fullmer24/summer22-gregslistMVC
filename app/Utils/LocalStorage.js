import { ProxyState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { House } from "../Models/house.js";



export function saveCarState() {
  console.log('saving car');
  let carData = JSON.stringify(ProxyState.cars)
  localStorage.setItem('cars', carData)
}

export function saveHouseState() {
  console.log('saving house');
  let houseData = JSON.stringify(ProxyState.houses)
  localStorage.setItem('cars', houseData)
}

export function loadCarState() {
  console.log('loading')
  let rawCars = localStorage.getItem('cars')
  if (rawCars) {
    let carData = JSON.parse(rawCars)
    console.log(carData);
    ProxyState.cars = carData.map(c => new Car(c))
  }
}

export function loadHouseState() {
  let rawHouses = localStorage.getItem('houses')
  if (rawHouses) {
    let houseData = JSON.parse(rawHouses)
    ProxyState.houses = houseData.map(h => new House(h))
  }
}