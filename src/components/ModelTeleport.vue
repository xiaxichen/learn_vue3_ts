<template>
  <teleport to="#model">
    <div id="center" v-if="isOpen">
      <h2>
        <slot> this is model</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

interface payLoad {
  type: string
}

export default defineComponent({
  name: 'ModelTeleport',
  props: {
    isOpen: Boolean
  },
  emits: {
    // 'close-model': (payload: payLoad) => {
    //   console.log(payload)
    //   return payload.type === 'close'
    // }
    'close-model': null
  },
  setup(props, context) {
    const buttonClick = () => {
      // context.emit("close-model", {
      //   type: 'close'
      // })
      // 激活
      context.emit("close-model", {
      })

    }
    return {buttonClick}
  }
})
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
