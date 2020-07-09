<template>
  <Register />
</template>

<script>
import Register from "../../components/Register";
export default {
  components: {
    Register
  },
  data() {
    return {
      register: false
    };
  },
  methods: {
    isRegister() {
      const isRegister = localStorage.isRegister;
      if (isRegister == "true") {
        this.register = true;
      }
    }
  },
  mounted() {
    this.isRegister();
  },
  watch: {
    register() {
      this.register === true
        ? this.$router.push("/main")
        : this.$router.push("/register");
    }
  }
};
</script>

<style>
</style>