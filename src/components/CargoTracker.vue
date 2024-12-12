<template>
  <div class="cargo-tracker">
    <div class="container">
      <div class="row">
        <h1>Отслеживание грузов</h1>
        <CargoForm :cities="cities" :cargo="newCargo" @add-cargo="addCargo" />
        <StatusFilter :selectedStatus="selectedStatus" @filter-cargo="filterCargo"/>
        <table>
            <thead>
              <tr>
                <th>Номер груза</th>
                <th>Название груза</th>
                <th>Статус груза</th>
                <th>Пункт отправления</th>
                <th>Пункт назначения</th>
                <th>Дата отправления</th>
                <th>Изменить статус</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cargo in filteredCargoList" :key="cargo.id" :style="getStatusStyle(cargo.status)">
                <td>{{ cargo.id }}</td>
                <td>{{ cargo.name }}</td>
                <td>{{ cargo.status }}</td>
                <td>{{ cargo.origin }}</td>
                <td>{{ cargo.destination }}</td>
                <td>{{ cargo.departureDate }}</td>
                <td>
                  <select v-model="cargo.status" @change="updateStatus(cargo)">
                    <option value="Ожидает отправки">Ожидает отправки</option>
                    <option value="В пути">В пути</option>
                    <option value="Доставлен">Доставлен</option>
                    <option value="Задержан">Задержан</option>
                  </select>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import {useCargosStore} from '../stores/CargosStore'
import CargoForm from './CargoForm.vue';
import StatusFilter from './StatusFilter.vue';

export default {
  components: {
    CargoForm,
    StatusFilter
  },
  data() {
    return {
      selectedStatus: '',    
      cities: ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Владивосток", "Омск"],
      newCargo: {
        name: "",
        origin: "",
        destination: "",
        departureDate: "",
        status: "Ожидает отправки"
      }, 
    };
  },
  computed: {
      filteredCargoList() {
          if (!this.selectedStatus) {
              return this.cargosStore.cargoList; // Если статус не выбран, возвращаем все грузы
          }
          return this.cargosStore.cargoList.filter(cargo => cargo.status === this.selectedStatus);
      }
    },
  methods: {
    addCargo() {
         // Проверка на заполненность всех полей
        if (!this.newCargo.name || !this.newCargo.origin || !this.newCargo.destination || !this.newCargo.departureDate) {
          alert('Пожалуйста, заполните все поля.');
          return;
        }
        const newId = `CARGO00${this.cargosStore.cargoList.length + 1}`;
        this.cargosStore.cargoList.push({ ...this.newCargo, id: newId });
        this.newCargo = { name: "", origin: "", destination: "", departureDate: "", status: "Ожидает отправки" };
      },   
    updateStatus(cargo) {       
        const today = new Date();
      
        const departureDate = new Date(cargo.departureDate);
        if (cargo.status === 'Доставлен' && departureDate > today) {
          alert("Ошибка: Невозможно установить статус 'Доставлен', дата отправления находится в будущем.");
          cargo.status = 'В пути'; // Возврат к предыдущему статусу
        }
        console.log(`Статус груза ${cargo.id} обновлён на ${cargo.status}`);
      },
    filterCargo(status) {
        this.selectedStatus = status;
        // Фильтрация груза по статусу
        // computed filteredCargoList обновит список автоматически
      },
    getStatusStyle(status) {
      switch (status) {
        case 'Доставлен':
          return { background: 'green' };
        case 'Задержан':
          return { background: 'red' };
        case 'В пути':
          return { background: 'yellow' };
        case 'Ожидает отправки':
          return { background: 'white' };
        default:
          return {};
      }
      }
  },
    setup(){  
      const cargosStore = useCargosStore();
      cargosStore.fetchCargos();
      return {
        cargosStore 
      }
    },
};
</script>

<style scoped>
 .cargo-tracker{
    padding: 20px;
    border: 15px solid rgba(112, 128, 144, .3);
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 2px solid #ddd;
    /* padding: 5px; */
  }
  select{
    padding: 10px;
    width: 100%;
  }
  @media (min-width: 1400px) {
    .container {
        max-width: 1920px;
    }
}
@media(max-width: 800px) {
    table thead {
        left: -9999px;
        position: absolute;
        visibility: hidden;
    }
    table tr {
        border-bottom: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }
    table td {
        border: 1px solid;
        margin: 0 -1px -1px 0;
        padding-top: 35px; /* дополнительный отступ для предотвращения склеивания заголовков */
        position: relative;
        width: 50%;
    }
    /* Отображение span заголовков */
    table td span {
        display: block;
    }
    th, td{
      font-size: 14px;
    }
    h1{
      font-size: 24px;
    }
}
@media(max-width: 400px){
  h1{
      font-size: 20px;
    }
}
</style>