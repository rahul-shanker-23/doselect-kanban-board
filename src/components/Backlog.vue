<template>
  <h3>Backlog</h3>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Issue Type</th>
        <th scope="col">Reporter</th>
        <th scope="col">Assignee</th>
        <th scope="col">Priority</th>
        <th scope="col">Severity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="epic in epics" :key="epic.id">
        <td>
          <RouterLink :to="`/backlog/${epic.id}`">{{ epic.id }}</RouterLink>
        </td>
        <td>
          <RouterLink :to="`/backlog/${epic.id}`">{{ epic.title }}</RouterLink>
        </td>
        <td>{{ epic.issueType }}</td>
        <td>{{ epic.reporter }}</td>
        <td>{{ epic.assignee }}</td>
        <td>{{ epic.priority }}</td>
        <td>{{ epic.severity }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { APIURL } from "../API_URL";
import { RouterLink } from "vue-router";

const epics = ref([]);
onMounted(async () => {
  const res = await axios.get(`${APIURL}issue?issueType=Bug&issueType=Story`);
  epics.value = res.data;
});
</script>
<style></style>
