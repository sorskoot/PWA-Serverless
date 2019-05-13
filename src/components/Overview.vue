<template>
  <div class="hello">
    <h1>ScoreCounter</h1>
    <ul id="example-1">
      <li v-for="(score,index) in scores" :key="index">
        {{ score.date }}
        {{ score.name }}
        {{ score.score }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "overview",
  props: {
    msg: String
  },
  created() {
    this.$store.dispatch("getScores");
  },
  computed: {
    scores() {
      return this.$store.state.scores.scores;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/variables.scss";

.hello {
  h1 {
    color:$redcolor;
    margin: 40px 0 0;
  }
}
</style>
