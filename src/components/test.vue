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

    <table>
      <thead>
        <tr>
          <th>Название груза</th>
          <th>Пункт отправления</th>
          <th>Пункт назначения</th>
          <th>Дата отправления</th>
          <th>Статус груза</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cargo in sortedCargo" :key="cargo.id">
          <td>{{ cargo.name }}</td>
          <td>{{ cargo.origin }}</td>
          <td>{{ cargo.destination }}</td>
          <td>{{ cargo.departureDate }}</td>
          <td>
            <select v-model="cargo.status" @change="checkStatusChange(cargo)">
              <option value="В пути">В пути</option>
              <option value="Доставлен">Доставлен</option>
              <option value="Ожидается">Ожидается</option>
              <option value="Задержан">Задержан</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCargo: {
        name: '',
        origin: '',
        destination: '',
        departureDate: '',
        status: 'В пути' // Начальное значение
      },
      cargos: [], // Здесь будут храниться все грузы
      cities: ['Город1', 'Город2', 'Город3'] // Пример списка городов
    };
  },
  computed: {
    sortedCargo() {
      return this.cargos.sort((a, b) => a.status.localeCompare(b.status));
    }
  },
  methods: {
    addCargo() {
      // Проверка заполненности всех полей
      if (!this.newCargo.name || !this.newCargo.origin || !this.newCargo.destination || !this.newCargo.departureDate) {
        alert("Пожалуйста, заполните все поля.");
        return;
      }

      // Добавление нового груза
      this.cargos.push({ ...this.newCargo, id: Date.now() });
      this.resetForm();
    },
    resetForm() {
      this.newCargo = {
        name: '',
        origin: '',
        destination: '',
        departureDate: '',
        status: 'В пути'
      };
    },
    checkStatusChange(cargo) {
      const today = new Date();
      const departureDate = new Date(cargo.departureDate);

      if (cargo.status === 'Доставлен' && departureDate > today) {
        alert("Ошибка: Невозможно установить статус 'Доставлен', дата отправления находится в будущем.");
        cargo.status = 'В пути'; // Возврат к предыдущему статусу
      }
    }
  }
};
</script>

<style scoped>
/* Ваши стили */
</style>