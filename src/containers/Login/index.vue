<template>
  <Login v-if="!login" />
</template>

<script>
import Login from "../../components/Login";
export default {
  components: {
    Login
  },
  data() {
    return {
      login: false
    };
  },
  methods: {
    isLogin() {
      const logins = localStorage.isLogin;
      const token = localStorage.token;
      if (logins == "true" && (token !== null || token !== "")) {
        this.login = true;
      }
    }
  },
  mounted() {
    this.isLogin();
  },
  watch: {
    login() {
      this.login === true && this.$router.push("/main");
    }
  }
};
</script>

<style>
</style>