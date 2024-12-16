import { defineStore } from "pinia";
import axios from 'axios'

export const useCargosStore = defineStore('cargosStore',{
state: () => ({
  cargoList: [],
}),
actions:{
  fetchCargos(){
        axios.get('../../db.json') //Deploy ../db.json
        .then(response => {
             this.cargoList = response.data;
            })
        .catch(error => {
             console.log(error); 
            });
    }
}
})
