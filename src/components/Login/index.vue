<template>
  <div class="login" v-if="login">
    <Button :clicked="backTo" label="Back To Home" />
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Kullanıcı Adı:" label-for="input-1">
        <b-form-input
          id="input-2"
          v-model="form.username"
          required
          placeholder="Kullanıcı adınızı giriniz"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Şifre:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Şifrenizi giriniz"
        ></b-form-input>
      </b-form-group>
      <b-button v-if="!isSubmit" type="submit" variant="primary">Giriş Yap</b-button>
      <b-button v-else type="submit" variant="primary">
        <b-icon icon="circle-fill" style="margin-right: 5px" animation="throb" font-scale="2"></b-icon>
        <span style="padding: 3px 0">İşlem Yapılıyor...</span>
      </b-button>
    </b-form>
    <p class="help is-danger" v-show="error" v-text="error"></p>
    <div v-for="(i, f) in errorMessage.errors" :key="i[f]">
      <div v-for="x in i" :key="x">
        <p class="help is-danger" v-show="x" v-text="x"></p>
      </div>
    </div>
    <p class="help is-danger" v-show="errorMessage.message" v-text="errorMessage.message"></p>
  </div>
</template>

<script>
import { API_BASE } from "../../config";
import axios from "axios";
import Button from "../Button";
export default {
  components: {
    Button
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      login: true,
      error: false,
      isSubmit: false,
      errorMessage: {}
    };
  },
  methods: {
    backTo() {
      this.$router.push("/");
    },
    onSubmit(evt) {
      evt.preventDefault();
      const username = this.form.username;
      const password = this.form.password;
      if (username && username !== "" && password && password !== "") {
        this.isSubmit = true;
        const loginUrl = `${API_BASE}/login?`;

        const username = this.form.username;
        const password = this.form.password;

        const params = JSON.stringify({
          email: username,
          password: password
        });
        axios
          .post(loginUrl, params, {
            headers: {
              "content-type": "application/json"
            }
          })
          .then(res => {
            const loginDataParse = res.data;
            const { user } = loginDataParse;
            const loginDataToken = loginDataParse.token;
            const loginDataRefreshToken = loginDataParse.refresh_token;

            localStorage.token = loginDataToken;
            localStorage.refreshToken = loginDataRefreshToken;
            localStorage.username = user.name;
            localStorage.isLogin = true;
            this.$router.push("/main");
          })
          .catch(err => {
            this.isSubmit = false;
            this.errorMessage = err.response.data;
          });
      }
    }
  }
};
</script>
<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  width: 100%;
  img {
    width: 270px;
    margin-bottom: 50px;
  }
  form {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border: 1px #ededed solid;
    background-color: #f7f7f7;
    border-radius: 5px;
    .form-group {
      label {
        color: #667e96 !important;
        font-weight: 700;
      }
    }
  }
}
</style>
