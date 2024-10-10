<template>
  <div class="login-container">
    <div class="login-box">
      <h1>User Login</h1>
      <form v-on:submit.prevent="onLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.login-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 24px;
  font-size: 30px;
  color: #333;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

input {
  width: 100%;
  /* Set input width to 100% to make all input fields the same length */
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 16px;
  color: red;
  font-size: 14px;
}

.input-group #email{
  width: 105%;
}
</style>
