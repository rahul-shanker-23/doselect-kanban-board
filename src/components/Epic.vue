<template>
  <h3>Epic</h3>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Reporter</th>
        <th scope="col">Assignee</th>
        <th scope="col">Priority</th>
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
        <td>{{ epic.reporter }}</td>
        <td>{{ epic.assignee }}</td>
        <td>{{ epic.priority }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { APIURL } from "../API_URL";

const epics = ref([]);
onMounted(async () => {
  const res = await axios.get(`${APIURL}issue?issueType=Epic`);
  epics.value = res.data;
});
</script>
