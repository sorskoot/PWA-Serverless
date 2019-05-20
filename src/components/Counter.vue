
<template>
  <div class="counter">
    <div class="score">{{score}}</div>
    <div>
      <ps-button class="large" v-on:click="minus">-</ps-button>
      <ps-button class="large" v-on:click="plus">+</ps-button>
    </div>
    <div>
      <ps-button v-on:click="connect">{{isConnected?"Disconnect":"Connect"}}</ps-button>
      <ps-button v-on:click="test">Test</ps-button>
    </div>
  </div>
</template>

<script>
import psButton from "./atoms/button";
import { bluetoothService } from "../services";
import { scoreService } from "../services";

export default {
  name: "counter",
  components: { psButton },
  data() {
    return {
      isConnected: false,
      score: 15
    };
  },
  methods: {
    connect() {
      bluetoothService.connect();
    },
    test() {
      bluetoothService.send("A");
    },
    minus(){
      this.score--;
      scoreService.postScore({score:this.score, name:"Just a Name"}).then(e=>console.log(e));
    },
    plus(){
      this.score++;
      scoreService.postScore({score:this.score, name:"Just a Name"}).then(e=>console.log(e));
      var event = new Event('save');
      document.body.dispatchEvent(event);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.btn {
}
.counter {
  .score {
    font-family: $fontScore;
    font-size: 12em;
    color: $redcolor;
  }
  .large {
    font-size: 8em;
    line-height: 1;
    margin: 0;
    padding: 0 20px;
    width: 150px;
    background-color: $light-grey;
  }
}
</style>