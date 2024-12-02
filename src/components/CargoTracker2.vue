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
                    <option value="Ожидает отправки">Ожидает отправки</option>
                    <option value="Доставлен">Доставлен</option>
                    <option value="Задержан">Задержан</option>
                </select>
            </div>
            <button type="submit">Добавить груз</button>
        </form>

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
        <div class="cargo-list">
            <h2>Список грузов</h2>
            <ul>
                <li v-for="cargo in filteredCargoList" :key="cargo.id">
                    {{ cargo.name }} - {{ cargo.origin }} - {{ cargo.destination }} - {{ cargo.departureDate }} - {{ cargo.status }}
                </li>
            </ul>
        </div>
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
                status: 'В пути'
            },
            selectedStatus: '',
            cities: ['Москва', 'Санкт-Петербург', 'Казань'], // Пример списка городов
            cargoList: [], // Список всех грузов
               // cargoList: [
      //     {
      //       id: "CARGO001",
      //       name: "Строительные материалы",
      //       status: "В пути",
      //       origin: "Москва",
      //       destination: "Казань",
      //       departureDate: "2024-16-24"
      //     },
      //     {
      //       id: "CARGO002",
      //       name: "Хрупкий груз",
      //       status: "Ожидает отправки",
      //       origin: "Санкт-Петербург",
      //       destination: "Екатеринбург",
      //       departureDate: "2024-11-26"
      //     },
      //     {
      //       id: "CARGO003",
      //       name: "Промышленные концентраты",
      //       status: "Доставлен",
      //       origin: "Владивосток",
      //       destination: "Екатеринбург",
      //       departureDate: "2024-11-25"
      //     },
      //     {
      //       id: "CARGO004",
      //       name: "Трактора",
      //       status: "Ожидает отправки",
      //       origin: "Санкт-Петербург",
      //       destination: "Омск",
      //       departureDate: "2024-11-26"
      //     },
      //     {
      //       id: "CARGO005",
      //       name: "Щебень",
      //       status: "Доставлен",
      //       origin: "Владивосток",
      //       destination: "Омск",
      //       departureDate: "2024-11-24"
      //     }
      //   ],
        };
    },
    computed: {
        filteredCargoList() {
            if (!this.selectedStatus) {
                return this.cargoList; // Если статус не выбран, возвращаем все грузы
            }
            return this.cargoList.filter(cargo => cargo.status === this.selectedStatus);
        }
    },
    methods: {
        addCargo() {
            // Добавление нового груза в cargoList
            this.cargoList.push({ ...this.newCargo, id: this.cargoList.length + 1 });
            this.newCargo = {
                name: '',
                origin: '',
                destination: '',
                departureDate: '',
                status: 'В пути'
            };
        },
        filterCargo() {
            // Фильтрация груза по статусу
            // computed property filteredCargoList обновит список автоматически
        }
    }
};
</script>

<style scoped>
/* Добавьте сюда стили */
</style>