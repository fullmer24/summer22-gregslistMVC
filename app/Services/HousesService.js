import { ProxyState } from "../AppState.js";
import { House } from "../Models/house.js";

class HousesService {

    createHouse(newHouse) {
        console.log('creating house in service', newHouse);
        ProxyState.houses = [...ProxyState.houses, new House(newHouse)]
        console.log('current houses', ProxyState.houses);
    }

    deleteHouse(id) {
        ProxyState.houses = ProxyState.houses.filter(h => h.id != id)
    }

}


export const housesService = new HousesService()