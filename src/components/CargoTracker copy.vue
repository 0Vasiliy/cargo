<!-- <template>
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
          <tr v-for="cargo in cargosStore.cargoList" :key="cargo.id" :cargoList = "cargoList">
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
    methods: {
      addCargo() {
        const newId = `CARGO00${this.cargosStore.cargoList.length + 1}`;
        this.cargosStore.cargoList.push({ ...this.newCargo, id: newId });
        this.newCargo = { name: "", origin: "", destination: "", departureDate: "", status: "Ожидает отправки" };
      },
      updateStatus(cargo) {
        
        console.log(`Статус груза ${cargo.id} обновлён на ${cargo.status}`);
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
  </style> -->