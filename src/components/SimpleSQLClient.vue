<template>
<div class="text-3xl pb-10">Simple SQL Console</div>
  <div class="w-full">
    <h2 class="text-xl">Query</h2>
    <textarea v-model="query" id="query" rows="8" class="p-6 bg-blue-100 rounded-xl shadow-md  space-x-4 w-1/2" placeholder="enter SQL query like: select * from `user`"></textarea>
    <br>
    <br>
    <button @click='send' id="send" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"> Send </button>
    &nbsp;
    <button @click='reset' id="reset" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"> Reset </button>
    <br/><br/>
    <h2 class="text-xl">Result</h2>
    <textarea v-model="result" id="result" rows="8" class="p-6 bg-gray-100 rounded-xl shadow-md  space-x-4 w-1/2" :disabled="true"></textarea>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import * as axios from 'axios'

const translation_table = [{from: /select/,   to:"SELECT"},
                           {from: /from/,     to:"FROM"},
                           {from: /where/,    to:"WHERE"},
                           {from: /\*/,       to: "%"},
                           {from: /group by/, to:"GROUP BY"}
                          ];

  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

  export default {
    setup () {
      const query = ref('')
      const result = ref('')

      const reset = (evt) => {
        query.value = ''
      }

      const send = (evt) => {
       let post_query = query.value;
       // apply potential translations to query before sending to server
       translation_table.forEach((item) => {
           post_query = post_query.replace(item.from, item.to);
       });
       axios.post(`http://localhost:5000`, {query:post_query}).then(res => {
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
