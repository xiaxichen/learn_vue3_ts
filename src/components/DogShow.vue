<template>
  <div>  <img :src="dogData && dogData.message"></div>

</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from 'vue';

interface DogResponse {
  message: string,
  status: string
}

export default defineComponent({
  name: "DogShow",
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/random")
    const dogData:DogResponse = rawData.data
    return {dogData}
  }
})
</script>

<style scoped>

</style>
