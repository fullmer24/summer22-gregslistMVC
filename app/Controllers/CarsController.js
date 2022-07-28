import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";
import { loadCarState, saveCarState } from "../Utils/LocalStorage.js";



function _drawCars() {
  let template = ''
  let cars = ProxyState.cars
  cars.forEach(c => template += c.Template)
  // console.log('drawing cars', template)
  // @ts-ignore
  document.getElementById('listings').innerHTML = template
  _drawCarsForm()
}

function _drawCarsForm() {
  // @ts-ignore
  document.getElementById('form').innerHTML = `
  <form class="col-10 bg-white p-3 elevation-2" onsubmit="app.carsController.createCar()">
    <h3 class="text-primary">List Your Car</h3>
    <div class="row">
      <div class="col-4">
        <label class="form-label" for="make">Make</label>
        <input class="form-control" type="text" minlength="5" id="make" name="make">
      </div>
      <div class="col-4">
        <label class="form-label" for="model">Model</label>
        <input class="form-control" type="text" id="model" name="model">
      </div>
      <div class="col-4">
        <label class="form-label" for="year">Year</label>
        <input class="form-control" type="number" id="year" name="year">
      </div>
      <div class="col-4">
        <label class="form-label" for="price">Price</label>
        <input class="form-control" type="number" min="1" id="price" name="price">
      </div>
      <div class="col-8">
        <label class="form-label" for="img">Image</label>
        <input class="form-control" type="text" id="img" name="img">
      </div>
      <div class="col-12">
        <label class="form-label" for="description">Description</label>
        <textarea class="w-100 form-control" name="description" id="description" rows="5"></textarea>
        <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light">Submit</button>
      </div>
    </div>
  </form>
    `

}

function test() {
  console.log('listener triggered');
}


export class CarsController {
  constructor() {
    console.log('cars controller loaded');
    // NOTE register a listener. below is listens to 'cars' on the proxystate, and when triggerd runs '_drawCars'
    ProxyState.on('cars', _drawCars)
    ProxyState.on('cars', saveCarState)
    ProxyState.on('cars', test)
    loadCarState()
    // _drawCars()
  }

  viewCars() {
    _drawCars()
    _drawCarsForm
  }

  createCar() {
    console.log('car form submitted');
    // NOTE window.event.preventDefault grabs the submit event from the form submit and keeps the page from refreshing
    window.event.preventDefault()
    let form = window.event.target
    console.log(form);

    let newCar = {
      make: form.make.value,
      model: form.model.value,
      year: form.year.value,
      price: form.price.value,
      img: form.img.value,
      description: form.description.value,
    }
    carsService.createCar(newCar)
    form.reset()
    // NOTE replaced by listeners in constructor
    // _drawCars()
  }

  deleteCar(id) {
    console.log('deleteing', id);
    carsService.deleteCar(id)
  }
}