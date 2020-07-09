<template>
  <div id="app">
    <div class="appContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
import "./style/main.scss";
export default {
  name: "App"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Asap:500,600,700&display=swap&subset=latin-ext");
* {
  font-family: "Asap", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 13px;
}
img {
  display: block;
  max-width: 100%;
}
li {
  list-style-type: none;
}
body,
html,
#root {
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: auto;
  .appContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
