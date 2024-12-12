<template>
    <form @submit.prevent="addCargo">
      <div class="form-input">
        <label for="name" style='margin-right: 10px;'>Название груза:</label>
        <input v-model="cargo.name" type="text" required/>
      </div>
      <div class="form-input">
        <label for="origin" style='margin-right: 10px;'>Пункт отправления:</label>
        <select v-model="cargo.origin" required>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-input">
        <label for="destination" style='margin-right: 10px;'>Пункт назначения:</label>
        <select v-model="cargo.destination" required>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="form-input form-data">
        <label for="departureDate" style='margin-right: 10px;'>Дата отправления:</label>
        <input v-model="cargo.departureDate" type="date" required />
      </div>
      <div class="form-input">
        <label for="status" style='margin-right: 10px;'>Статус груза:</label>
        <select v-model="cargo.status" required>
          <option value="В пути">В пути</option>
          <option value="Ожидает отправки">Ожидает отправки</option>
          <option value="Доставлен">Доставлен</option>
          <option value="Задержан">Задержан</option>
        </select>
      </div>
      <div class="btn_form">
        <button type="submit">Добавить груз</button>
      </div>
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
 
  .form-input{
    padding:0 0 0 15px;
  }
  form{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0 0 20px 0;
  }
  label{
    color: #2F4F4F;
  }
  button{
    margin-left: 20px;
    background: teal;
    border-radius: 2px;
    padding: 0 30px 0 30px;
    font-size: 12px;
    line-height: 12px;
    height: 28px;
  }
  input, select{
    width: 150px;
    height: 28px;
  }
 @media (max-width: 1400px){
  form{
    max-width: 320px;
    flex-direction: column;
    padding: 0;
   }
   input, select{
    padding: 0;
  }
  .form-input{
    display: flex;
    margin-top: 10px;
    margin-right: 0;
  }
  .btn_form{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  button{
    margin: none;
    padding: 0 50px 0 50px;
    font-size: 14px;
  }
   }
   @media (max-width: 768px){
    label{
      font-size: 10px;
    }
   }
   @media (max-width: 600px){
    button{
      font-size: 12px;
      padding: 0 30px 0 30px;
    }
   }
   @media (max-width: 400px){
    .form-input{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      padding: 0;
    }
    button{
      margin-top: 10px;
      width: 150px;
      margin-left: 0;
    }
   }
</style>