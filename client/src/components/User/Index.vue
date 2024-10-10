<template>
  <div class="container-1">
    <h1>จัดการผู้ใช้งาน</h1>
    <div class="header">
      <button class="btn primary" v-on:click="navigateTo('/user/create')">+ สร้างผู้ใช้ใหม่</button>
    </div>
    <hr>
    <div v-if="users.length" class="user-list">
      <div class="user-count">
        <b>จำนวนผู้ใช้งานทั้งหมด:</b> {{ users.length }} คน
      </div><br>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>รหัสผู้ใช้ (ID):</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>สถานะ:</b> {{ user.status }}</div>
        <!-- <div><b>ประเภทผู้ใช้:</b> {{ user.type }}</div> -->
        <div class="action-buttons">
          <button class="btn secondary" v-on:click="navigateTo('/user/' + user.id)">ดูข้อมูล</button>
          <button class="btn warning" v-on:click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
          <button class="btn danger" v-on:click="deleteUser(user)">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <!-- <div><button v-on:click="logout">Logout</button></div> -->
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.container-1 {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
}

.primary {
  background-color: #4CAF50;
  color: white;
}

.secondary {
  background-color: #008CBA;
  color: white;
}

.warning {
  background-color: #FFC107;
  color: white;
}

.danger {
  background-color: #F44336;
  color: white;
}

.user-list {
  margin-top: 20px;
}

.user-card {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 15px;
}

.user-card div {
  margin-bottom: 5px;
}

.action-buttons {
  margin-top: 10px;
}

.action-buttons .btn {
  margin-right: 10px;
}
</style>
