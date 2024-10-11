<template>
  <div>

    <!-- new navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand navbar-link" href="#" v on:click.prevent="navigateTo('/dashboard')">
            <img src="../assets/smartphone.png" id="logo"> 
          </a>
          <span class="navbar-text fw-bold">PhoneList</span>
          <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
          </button>
        
        </div>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav navbar-right">
            <li role="presentation"><router-link :to="{ name: 'blogs' }">Product</router-link></li>
            <!-- <li role="presentation"><router-link :to="{ name: 'comments' }">Add Product</router-link></li> -->
            <li role="presentation"><router-link :to="{ name: 'users' }">Users</router-link></li>
            <li role="presentation"><router-link :to="{ name: 'login' }">Login</router-link></li>
            <li role="presentation"><a href="#" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.navbar-brand>img {
  width: 36px;
  padding: 12px 0;
  margin-top: -20px;
}

a.router-link-active {
  color: yellowgreen !important;
}

.navbar-text{
  
}
</style>
