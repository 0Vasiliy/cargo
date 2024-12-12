<template>
  <div class="filter"> 
      <label for="statusFilter" style='margin-right: 20px;margin-left: 20px;'>Фильтр по статусу:</label>
      <select :value="selectedStatus" @change="filterCargo">
        <option value="">Все</option>
        <option value="В пути">В пути</option>
        <option value="Ожидает отправки">Ожидает отправки</option>
        <option value="Доставлен">Доставлен</option>
        <option value="Задержан">Задержан</option>
      </select>
    </div>
</template>

<script>
export default {
  props: ['selectedStatus'],
  methods: {
    filterCargo(event) {
      const newStatus = event.target.value; // Получаем новое значение
      this.$emit('update:selectedStatus', newStatus); // Эвент для изменения статуса
      this.$emit('filter-cargo', newStatus); // Эвент для фильтрации
    }
  }
};
</script>
<style scoped>
  .filter{
    padding-bottom: 20px;
  }
  select{
    padding: 5px;
  }
  @media (max-width: 1400px){
    input, select{
      width: 150px;
      height: 28px;
    }
  }
  @media (max-width: 400px){
    .filter{
      margin-right: auto;
    }
  }
</style>