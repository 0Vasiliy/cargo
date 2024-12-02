import { defineStore } from "pinia";
import axios from 'axios'

export const useCargosStore = defineStore('cargosStore',{
state: () => ({
  cargoList: [],
  // statusList: [],
}),
actions:{
  fetchCargos(){
        axios.get('../../db.json')
        .then(response => {
             this.cargoList = response.data;
            //  this.statusList = response.data.status; 
            })
        .catch(error => {
             console.log(error); 
            });
    }
}
})
