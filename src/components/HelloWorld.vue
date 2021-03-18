<template>
  <div>
    <h2>Query</h2>
    <textarea v-model="query" rows="10" style="width:64em" placeholder="enter SQL query like: select * from `user`"></textarea>
    <br>
    <br>
    <button @click='send'> Send </button>
    &nbsp;
    <button @click='reset'> Reset </button>
    <br>
    <h2>Result</h2>
    <textarea v-model="result" rows="10" style="width:64em" :disabled="true"></textarea>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import * as axios from 'axios'

  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

  export default {
    setup () {
      const query = ref('')
      const result = ref('')

      const reset = (evt) => {
        query.value = ''
      }

      const send = (evt) => {
        // axios.get(`http://localhost:5000?q=${encodeURI(query.value)}`).then(res => {
        //   result.value = JSON.stringify(res.data);
        // });

        axios.post('http://localhost:5000', {query: query.value}).then(res => {
          result.value = JSON.stringify(res.data);
        });
      }

      return {
        reset,
        send,
        query,
        result,
      }
    }
  }
</script>

<style>
</style>
