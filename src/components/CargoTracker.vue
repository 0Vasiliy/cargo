<template>
    <div class="cargo-tracker">
      <h1>Отслеживание грузов</h1> 
      <form @submit.prevent="addCargo">
        <div class="form-input">
          <label for="name">Название груза:</label>
          <input v-model="newCargo.name" type="text" required />
        </div>
        <div class="form-input">
          <label for="origin">Пункт отправления:</label>
          <select v-model="newCargo.origin" required>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-input">
          <label for="destination">Пункт назначения:</label>
          <select v-model="newCargo.destination" required>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div class="form-input">
          <label for="departureDate">Дата отправления:</label>
          <input v-model="newCargo.departureDate" type="date" required />
        </div>
        <!-- Статус -->
        <div class="form-input">
        <label for="status">Статус груза:</label>
        <select v-model="newCargo.status" required>
          <option value="В пути">В пути</option>
          <option value="Ожидает отправки">Ожидает отправки</option>
          <option value="Доставлен">Доставлен</option>
          <option value="Задержан">Задержан</option>
        </select>
        </div>
        <!-- Фильтр по статусу -->
        <div class="filter">
            <label for="statusFilter">Фильтр по статусу:</label>
            <select v-model="selectedStatus" @change="filterCargo">
                <option value="">Все</option>
                <option value="В пути">В пути</option>
                <option value="Ожидает отправки">Ожидает отправки</option>
                <option value="Доставлен">Доставлен</option>
                <option value="Задержан">Задержан</option>
            </select>
        </div>    
        <button type="submit">Добавить груз</button>
      </form>
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
          <tr v-for="cargo in filteredCargoList" :key="cargo.id" >
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
  </template>
  
  <script>
  import {useCargosStore} from '../stores/CargosStore'

  export default {
   
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
      filterCargo() {
        // Фильтрация груза по статусу
        // computed filteredCargoList обновит список автоматически
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
  .form-input{
    padding:0 0 0 10px;
  }
  form{
    display: flex;
    padding: 0 0 20px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  label{
    color: #2F4F4F;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>

  