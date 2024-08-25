<template>
  <div class="sidenav">
    <RouterLink to="/create">Create</RouterLink>
    <RouterLink to="/backlog">Backlog</RouterLink>
    <RouterLink to="/epic">Epic</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
<style>
.sidenav {
  height: 100vh;
  width: 200px;
  background-color: #111;
  overflow: hidden;
  padding: 14px 16px;
  position: absolute;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}
</style>
