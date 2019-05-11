
<template>
  <div class="counter">
    <ps-button v-on:click="connect">{{isConnected?"Disconnect":"Connect"}}</ps-button>
     <ps-button v-on:click="test">Test</ps-button>
  </div>
</template>

<script>
import psButton from "./atoms/button";
import {bluetoothService} from "../services";

export default {
  name: "counter",
  components: { psButton },
  data() {
    return {
      isConnected: false
    };
  },
  methods: {
    connect() {
        bluetoothService.connect();
    },
    test(){
        bluetoothService.send("A");
    }
  }
};
</script>

<style scoped lang="scss">
.btn {
}
.counter {
}
</style>