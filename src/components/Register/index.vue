<template>
  <div class="register" v-if="register">
    <Button :clicked="backTo" label="Back To Home" />
    <b-form class="registerForm" @submit="onSubmit">
      <b-form-group id="input-group-1" label="Adınız:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.name" required placeholder="Adınız"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Soyadınız:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.last_name" required placeholder="Soyadınız"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="e-Mail:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.email" required type="email" placeholder="e-Mail"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Şifre:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="password"
          v-model="form.password"
          required
          placeholder="Şifreniz"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Şifre Doğrulama:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="password"
          v-model="form.passwordConfirmation"
          required
          placeholder="Şifrenizi Doğrulayın"
        ></b-form-input>
      </b-form-group>
      <div
        v-if="form.password !== '' && passwordValidation.errors.length > 0 && !isSubmit"
        class="rules"
      >
        <p v-for="error in passwordValidation.errors" :key="error">{{ error }}</p>
      </div>
      <div class="matches" v-if="notSamePasswords">
        <p>Şifre Eşleşmiyor..</p>
      </div>

      <b-button v-if="!isSubmit" type="submit" variant="primary">Kayıt Ol</b-button>
      <b-button v-else type="submit" variant="primary">
        <b-icon icon="circle-fill" style="margin-right: 5px" animation="throb" font-scale="2"></b-icon>
        <span style="padding: 3px 0">İşlem Yapılıyor...</span>
      </b-button>
    </b-form>
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
      created_date: null,
      updated_date: null,
      form: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      confirmWarning: "",
      register: true,
      isSubmit: false,
      errorMessage: {},
      rules: [
        { message: "Bir Küçük", regex: /[a-z]+/ },
        { message: "Bir Büyük", regex: /[A-Z]+/ },
        { message: "8 Karakter", regex: /.{8,}/ },
        { message: "Özel Karakter", regex: /[!@#\$%\^\&*\)\(+=._-]+/ }, //eslint-disable-line
        { message: "Rakam.", regex: /[0-9]+/ }
      ]
    };
  },
  computed: {
    notSamePasswords() {
      if (this.passwordsFilled) {
        return this.form.password !== this.form.passwordConfirmation;
      } else {
        return false;
      }
    },
    passwordsFilled() {
      return this.form.password !== "" && this.form.passwordConfirmation !== "";
    },
    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.form.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    }
  },
  methods: {
    backTo() {
      this.$router.push("/");
    },
    onSubmit(evt) {
      evt.preventDefault();
      const name = this.form.name;
      const last_name = this.form.last_name;
      const email = this.form.email;
      const password = this.form.password;
      const passwordConfirmation = this.form.passwordConfirmation;
      const registerUrl = `${API_BASE}/register`;

      this.isSubmit = true;
      this.register = true;
      const randomNumber = Math.floor(Math.random() * 1000);
      const params = JSON.stringify({
        name: name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        cloud_account_name: `testtt${randomNumber}`,
        privacy_policy: "true",
        terms_and_conditions: "true"
      });

      axios
        .post(registerUrl, params, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(res => {
          const loginDataParse = res.data;
          const { user } = loginDataParse;
          this.created_date = user.created_at;
          this.updated_date = user.updated_at;
          this.email = user.email;
          localStorage.username = user.name;
          localStorage.mail = user.email;
          localStorage.isRegister = true;
          localStorage.isLogin = true;
          this.$router.push("/main");
        })
        .catch(errors => {
          this.isSubmit = false;
          this.errorMessage = errors.response.data;
        });
    }
  }
};
</script>
<style lang="scss">
.register {
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
    .rules {
      p {
        margin: 0;
        color: #cc716c;
      }
    }
    .matches {
      color: #6cb1cc;
    }
  }
}
</style>
