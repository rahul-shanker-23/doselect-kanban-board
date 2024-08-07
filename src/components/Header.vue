<template>
  <div class="topnav" id="myTopnav">
    <a href="#home" class="active">Kanban Board</a>
  </div>
</template>

<script setup></script>
<style>
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  width: 160px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}
</style>
