<template>
    <form @submit.prevent="addCargo" class="cargo-form">
      <div class="form-input">
        <label for="name">Название груза:</label>
        <input v-model="cargo.name" type="text" required />
      </div>
      <div class="form-input">
        <label for="origin">Пункт отправления:</label>
        <select v-model="cargo.origin" required>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-input">
        <label for="destination">Пункт назначения:</label>
        <select v-model="cargo.destination" required>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-input">
        <label for="departureDate">Дата отправления:</label>
        <input v-model="cargo.departureDate" type="date" required />
      </div>
      <div class="form-input">
        <label for="status">Статус груза:</label>
        <select v-model="cargo.status" required>
          <option value="В пути">В пути</option>
          <option value="Ожидает отправки">Ожидает отправки</option>
          <option value="Доставлен">Доставлен</option>
          <option value="Задержан">Задержан</option>
        </select>
      </div>
      <button type="submit">Добавить груз</button>
    </form>
  </template>
  
  <script>
  export default {
    props: ['cities', 'cargo'],
    methods: {
      addCargo() {
        this.$emit('add-cargo', this.cargo);
      }
    }
  };
  </script>

<style scoped>
  .cargo-form {
    display: flex;
    flex-direction: row;
    /* max-width: 500px; */
  }
  .form-input{
    padding:0 0 0 15px;
  }
  form{
    flex-direction: row;
    padding: 0 0 20px 0;
  }
  label{
    color: #2F4F4F;
  }
  button{
    margin-left: 20px;
    background: teal;
    border-radius: 2px;
    padding: 0 20px 0 20px;

  }
  input, select{
    padding: 5px;
  }
</style>