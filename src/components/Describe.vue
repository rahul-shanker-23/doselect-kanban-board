<template>
  <h3>{{ data.title }}</h3>

  <div class="details">
    <b>Details</b>
    <div class="row mb-2">
      <div class="col-2">Id</div>
      <div class="col-2">{{ data.id }}</div>
      <div class="col-2">Status</div>
      <div class="col-2">
        <select name="status" v-model="data.status">
          <option value="Backlog">Backlog</option>
          <option value="In Progress">In Progress</option>
          <option value="Testing">Testing</option>
          <option value="In Review">In Review</option>
          <option value="Closed">Closed</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-2">Issue Type:</div>
      <div class="col-2">{{ data.issueType }}</div>
      <div class="col-2">Reporter:</div>
      <div class="col-2">
        <select name="reporter" v-model="data.reporter" required>
          <option v-for="user in users" :value="user.name" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-2">Priority:</div>
      <div class="col-2">
        <select name="priority" v-model="data.priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div class="col-2">Assignee:</div>
      <div class="col-2">
        <select name="assignee" v-model="data.assignee" required>
          <option v-for="user in users" :value="user.name" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>

    <div class="row mb-2" v-if="data.issueType != 'Epic'">
      <div class="col-2">Severity:</div>
      <div class="col-2">
        <select name="severity" v-model="data.severity">
          <option value="Minor">Minor</option>
          <option value="Major">Major</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </div>

    <div class="row mb-2" v-if="data.issueType == 'Story'">
      <div class="col-2">Epic Name:</div>
      <div class="col-2">{{ data.epic }}</div>
    </div>
  </div>

  <div class="description">
    <b>Description</b>
    <div class="row">
      <div class="col-8">{{ data.description }}</div>
    </div>
  </div>

  <button class="btn btn-sm btn-primary mt-5" @click="save">Save</button>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { APIURL } from "../API_URL";
const route = useRoute();
const data = ref({});
const users = ref([]);
onMounted(async () => {
  const res = await axios.get(`${APIURL}issue/${route.params.id}`);
  const usersRes = await axios.get(`${APIURL}users`);
  data.value = res.data;
  users.value = usersRes.data;
});

async function save() {
  const res = await axios.put(`${APIURL}issue/${route.params.id}`, data.value);
  if (res.status == 200) {
    alert("Saved successfully");
  }
}
</script>
<style>
.details {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
