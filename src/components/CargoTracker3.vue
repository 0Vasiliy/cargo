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
    
      <div class="form-input">
        <label for="status">Статус груза:</label>
        <select v-model="newCargo.status" required>
          <option value="В пути">В пути</option>
          <option value="Доставлен">Доставлен</option>
          <option value="Ожидается">Ожидается</option>
          <option value="Задержан">Задержан</option>
        </select>
      </div>
      <button type="submit">Добавить груз</button>
    </form>

    <!-- Фильтр по статусу груза -->
    <div class="status-filter">
      <label for="status">Фильтр по статусу:</label>
      <select v-model="selectedStatus" @change="filterCargo">
        <option value="">Все статусы</option>
        <option value="В пути">В пути</option>
        <option value="Доставлен">Доставлен</option>
        <option value="Ожидается">Ожидается</option>
        <option value="Задержан">Задержан</option>
      </select>
    </div>

    <ul>
      <li v-for="cargo in filteredCargo" :key="cargo.id">
        {{ cargo.name }} - {{ cargo.status }} - {{ cargo.departureDate }}
        <button @click="changeStatus(cargo)">Изменить статус</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Казань'], // пример городов
      newCargo: {
        name: '',
        origin: '',
        destination: '',
        departureDate: '',
        status: 'В пути',
      },
      selectedStatus: '',
      cargoList: [
          {
            id: "CARGO001",
            name: "Строительные материалы",
            status: "В пути",
            origin: "Москва",
            destination: "Казань",
            departureDate: "2024-16-24"
          },
          {
            id: "CARGO002",
            name: "Хрупкий груз",
            status: "Ожидает отправки",
            origin: "Санкт-Петербург",
            destination: "Екатеринбург",
            departureDate: "2024-11-26"
          },
          {
            id: "CARGO003",
            name: "Промышленные концентраты",
            status: "Доставлен",
            origin: "Владивосток",
            destination: "Екатеринбург",
            departureDate: "2024-11-25"
          },
          {
            id: "CARGO004",
            name: "Трактора",
            status: "Ожидает отправки",
            origin: "Санкт-Петербург",
            destination: "Омск",
            departureDate: "2024-11-26"
          },
          {
            id: "CARGO005",
            name: "Щебень",
            status: "Доставлен",
            origin: "Владивосток",
            destination: "Омск",
            departureDate: "2024-11-24"
          }
        ],
      filteredCargo: [], // отфильтрованный список грузов
    };
  },
  methods: {
    addCargo() {
      // Проверка на заполненность всех полей
      if (!this.newCargo.name || !this.newCargo.origin || !this.newCargo.destination || !this.newCargo.departureDate) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }
      
      // Добавление нового груза в список
      this.cargoList.push({ ...this.newCargo, id: Date.now() });

      // Сброс формы
      this.newCargo = {
        name: '',
        origin: '',
        destination: '',
        departureDate: '',
        status: 'В пути',
      };

      // Применение фильтра
      this.filterCargo();
    },
    filterCargo() {
      this.filteredCargo = this.selectedStatus 
        ? this.cargoList.filter(cargo => cargo.status === this.selectedStatus)
        : this.cargoList;
    },
    changeStatus(cargo) {
      // Проверка даты отправления
      const departureDate = new Date(cargo.departureDate);
      const currentDate = new Date();
      
      if (cargo.status === 'Доставлен' && departureDate > currentDate) {
        alert('Ошибка: Дата отправления не может быть в будущем для статуса "Доставлен".');
      } else {
        // Изменяем статус груза (может быть логика выбора нового статуса)
        cargo.status = cargo.status === 'В пути' ? 'Доставлен' : 'В пути'; // пример логики
      }
    }
  },
  mounted() {
    // Начальная фильтрация
    this.filteredCargo = this.cargoList;
  }
};
</script>

<style>
/* Добавьте стили, как вам нужно */
</style>
  
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

  