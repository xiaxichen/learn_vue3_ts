<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  <h1>{{ onKeyPress }}</h1>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>{{ greetings }}</h1>
  <h1>{{ position.x }}</h1>
  <h1>{{ position.y }}</h1>
  <Suspense>
    <template #default>
      <div>
        <async-show/>
        <dog-show/>
      </div>
    </template>
    <template #fallback>
      <div>
        <h1>loading ! ...</h1>
      </div>
    </template>
  </Suspense>
  <button @click="increase">add</button>
  <button @click="updateGreeting">add title</button>
  <button @click="openModel">Open</button>
  <!--  <ul>
      <li v-for=" number in numbers" :key="number">
        <h1>{{ number }}</h1>
      </li>
    </ul>-->
  <h1>{{ person.name }}</h1>
  <h1 v-if="response.loading">Loading...</h1>
  <img v-if="response.loaded" :src="response.result.message">
  <h1 v-if="catResponses.loading">Loading...</h1>
  <img v-for="(cat,index) in catResponses.result" :key="index" :src="cat.url">


  <!--    <h1>{{ data.count }}</h1>-->
  <!--    <h1>{{ data.double }}</h1>-->
  <!--    <button @click="data.increase">add</button>-->
  <ModelTeleport :is-open="isOpen" @close-model="openModelClose">rewrite text</ModelTeleport>

</template>

<script lang="ts">
import {computed, defineComponent, onErrorCaptured,onMounted, onRenderTriggered, onUpdated, reactive, ref, toRefs, watch} from 'vue';
import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";
import useKeyPress from "@/hooks/useKeyPress";
import ModelTeleport from "./components/ModelTeleport.vue"
import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";

interface DataProps {
  count: number,
  double: number,
  increase: () => void;
  numbers: number[];
  person: { name?: string }
  isOpen: boolean
}

// import HelloWorld from './components/HelloWorld.vue';
export default defineComponent({
  name: 'App',
  components: {
    ModelTeleport,
    AsyncShow,
    DogShow
  },
  setup() {
    // const count = ref(0)
    // const double = computed(()=>{
    //   return count.value*2
    // })
    // const increase = () => {
    //   count.value++
    // }
    // return {
    //   count,
    //   double,
    //   increase
    // }
    onErrorCaptured((err, instance, info)=>{
      console.log("err:",err)
      console.log("instance:",instance)
      console.log("info:",info)
      return true
    })
    onMounted(() => {
      // console.log("mounted")
    })
    onUpdated(() => {
      // console.log("updated")
    })
    onRenderTriggered((event) => {
      // console.log(event)
    })
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(
          () => {
            return data.count * 2
          }
      ),
      numbers: [0, 1, 2],
      person: {name: "xiaxichen"},
      isOpen: false
    });

    const greetings = ref<string>("")
    const updateGreeting = () => {
      greetings.value += 'Hello! '
    }
    // watch(greetings, (new_value, old_value) => {
    //   console.log("new", new_value)
    //   console.log("old", old_value)
    //   document.title = 'updated' + greetings.value
    // })

    // watch([greetings, data], (new_value, old_value) => {
    //   console.log("new", new_value)
    //   console.log("old", old_value)
    //   document.title = 'updated' + greetings.value + data.count
    // })

    // let a = () => {return data.count}
    // console.log(a())

    watch([greetings, () => data.count
    ], (new_value, old_value) => {
      console.log("new", new_value)
      console.log("old", old_value)
      document.title = 'updated' + greetings.value + data.count
    })

    // data.numbers[0] = 5
    // data.person.name = "xiaxichen1"
    const refData = toRefs(data)
    // data.person.name = "xiaxichen2"
    // refData.numbers.value[1] = 4
    // return {
    //   data
    // }
    interface DogResponse {
      message: string,
      status: string
    }

    const openModel = () => {
      data.isOpen = true
    }

    const openModelClose = () => {
      data.isOpen = false
    }

    const {position} = useMousePosition();
    const {onKeyPress} = useKeyPress();
    const {response} = useURLLoader<DogResponse>("https://dog.ceo/api/breeds/image/random");

    watch(response, () => {
      if (response.result) {
        console.log('value', response.result.status)
      }
    })

    interface CatResponse {
      id: string,
      url: string,
      width: number,
      height: number
    }

    const {response: catResponses} = useURLLoader<Array<CatResponse>>("https://api.thecatapi.com/v1/images/search")
    console.log(catResponses)

    return {
      ...refData,
      greetings,
      position,
      response,
      catResponses,
      updateGreeting,
      openModel,
      openModelClose,
      onKeyPress
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
