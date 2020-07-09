<template>
  <header id="blockHeader">
    <div class="userInfo">
      <span>
        Hoşgeldin,
        <strong>{{ userName }}!</strong>
      </span>
      <button @click="logOut">Çıkış yap</button>
    </div>
  </header>
</template>

<script>
export default {
  data: function() {
    return {
      userName: localStorage.username
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
header {
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    max-width: 90px;
    width: 100%;
  }
  .userInfo {
    display: flex;
    justify-content: center;
    font-size: 14px;
    width: 100%;
    max-width: 320px;
    text-transform: capitalize;
    span {
      width: 100%;
      display: block;
      max-width: 200px;
      border-radius: 5px;
      background-color: #2b2b2b;
      margin-right: 22px;
      text-align: center;
      padding: 5px 10px;
      color: #fff;
    }
    button {
      width: 100%;
      max-width: 100px;
      border-radius: 5px;
      background-color: #bd062c;
      text-align: center;
      padding: 5px 10px;
      border: none;
      color: #fff;
      &:hover {
        cursor: pointer;
        background-color: #9e1a35;
      }
    }
  }
}
</style>
