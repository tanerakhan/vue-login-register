<template>
  <ul class="home_group">
    <li v-for="i in items" :key="i.url">
      <router-link :to="`${i.url}`">{{ i.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          url: "login",
          name: "Login"
        },
        {
          url: "register",
          name: "Register"
        },
        {
          url: "updatepassword",
          name: "Update Password"
        },
        {
          url: "forgotPassword",
          name: "Forgot Password"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home_group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  li {
    position: relative;
    width: 100%;
    text-align: center;
    a {
      color: #33747b;
      font-weight: 900;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 20px;
      background-color: #59b2e654;
    }
    &:last-child {
      &:after {
        width: 0;
      }
    }
  }
}
</style>