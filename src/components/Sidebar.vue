<template>
  <div class="sidenav">
    <RouterLink to="/">Dashboard</RouterLink>
    <RouterLink to="/backlog">Backlog</RouterLink>
    <RouterLink to="/issues">Issues</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
<style>
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  background-color: #111;
  overflow-x: hidden;
  padding: 14px 16px;
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
