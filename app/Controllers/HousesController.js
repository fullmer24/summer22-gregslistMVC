import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";
import { loadHouseState, saveHouseState } from "../Utils/LocalStorage.js";


// NOTE finished
function _drawHouses() {
  let template = ''
  let houses = ProxyState.houses
  houses.forEach(h => template += h.Template)
  // console.log('drawing houses', template);
  // @ts-ignore
  document.getElementById('listings').innerHTML = template
  _drawHousesForm()
}

function _drawHousesForm() {
  // @ts-ignore
  document.getElementById('form').innerHTML = `
  <form class="col-10 bg-white p-3 elevation-2" onsubmit="app.houseController.createHouse()">
          <h3 class="text-primary">List Your House</h3>
          <div class="row">
            <div class="col-4">
              <label class="form-label" for="style">Style</label>
              <input class="form-control" type="text" minlength="5" id="style" name="style">
            </div>
            <div class="col-4">
              <label class="form-label" for="bdrm">Bedroom</label>
              <input class="form-control" type="number" id="bdrm" name="bdrm">
            </div>
            <div class="col-4">
              <label class="form-label" for="bath">Bath</label>
              <input class="form-control" type="number" id="bath" name="bath">
            </div>
            <div class="col-2">
              <label class="form-label" for="price">Price</label>
              <input class="form-control" type="number" min="1" id="price" name="price">
            </div>
            <div class="col-2">
              <label class="form-label" for="sqft">SqFt</label>
              <input class="form-control" type="number" id="sqft" name="sqft">
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
  console.log(`listener triggered`);
}

export class HousesController {
  constructor() {
    console.log('house controller');
    ProxyState.on('houses', _drawHouses)
    ProxyState.on('houses', saveHouseState)
    ProxyState.on('houses', test)
    loadHouseState()
  }


  viewHouses() {
    _drawHouses()
    // swap out car form with house form
    _drawHousesForm
  }


  createHouse() {
    console.log('house form submitted');
    window.event.preventDefault()
    let form = window.event.target
    console.log(form);

    let newHouse = {
      style: form.style.value,
      bdrm: form.bdrm.value,
      bath: form.bath.value,
      sqft: form.sqft.value,
      price: form.price.value,
      img: form.img.value,
      description: form.description.vale,
    }

    housesService.createHouse(newHouse)
    form.reset()
  }

  deleteHouse(id) {
    housesService.deleteHouse(id)
  }






}