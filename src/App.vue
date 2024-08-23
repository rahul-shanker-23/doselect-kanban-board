<template>
  <Header />
  <Sidebar />
  <div class="main">
    <RouterView />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
</script>
<style>
.main {
  margin-top: 10px;
  margin-left: 260px;
  margin-right: 60px;
}
</style>
