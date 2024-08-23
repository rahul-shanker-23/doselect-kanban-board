<template>
  <h3>Create Issue</h3>
  <form @submit.prevent="createIssue">
    <div class="row">
      <div class="col-md-2">
        <label for="issueType" class="form-label">Issue Type:</label>
      </div>
      <div class="col-md-4">
        <select name="issueType" v-model="issueType">
          <option value="Story">Story</option>
          <option value="Epic">Epic</option>
          <option value="Bug">Bug</option>
        </select>
      </div>
      <div class="col-md-2">
        <label for="reporter" class="form-label">Reporter:</label>
      </div>
      <div class="col-md-4">
        <select name="reporter" v-model="reporter" required>
          <option v-for="user in users" :value="user.name" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <label for="title" class="form-label">Title:</label>
      </div>
      <div class="col-md-4">
        <input type="text" v-model="title" required />
      </div>
      <div class="col-md-2">
        <label for="assignee" class="form-label">Assignee:</label>
      </div>
      <div class="col-md-4">
        <select name="assignee" v-model="assignee" required>
          <option v-for="user in users" :value="user.name" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <label for="priority" class="form-label">Priority:</label>
      </div>
      <div class="col-md-4">
        <select name="priority" v-model="priority">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
    <div class="row" v-if="issueType != 'Epic'">
      <div class="col-md-2">
        <label for="severity" class="form-label">Severity:</label>
      </div>
      <div class="col-md-4">
        <select name="severity" v-model="severity">
          <option value="Minor">Minor</option>
          <option value="Major">Major</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </div>
    <div class="row" v-if="issueType == 'Story'">
      <div class="col-md-2">
        <label for="epic" class="form-label">Epic:</label>
      </div>
      <div class="col-md-4">
        <select name="Epic" v-model="epic" required>
          <option v-for="epic in epicLink" :value="epic.title" :key="epic.id">{{ epic.title }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <label for="description" class="form-label">Description:</label>
      </div>
      <div class="col-md-4">
        <textarea name="description" cols="30" rows="4" v-model="description" required></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-sm btn-primary">Create</button>
  </form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { APIURL } from "../API_URL";
import { useRouter } from "vue-router";
const router = useRouter();

const issueType = ref("Story");
const epicLink = ref([]);
const users = ref([]);
const title = ref(null);
const reporter = ref(null);
const assignee = ref(null);
const description = ref(null);
const priority = ref("Low");
const severity = ref("Minor");
const epic = ref(null);

onMounted(async () => {
  const epicRes = await axios.get(`${APIURL}issue?issueType=Epic`);
  const usersRes = await axios.get(`${APIURL}users`);
  epicLink.value = epicRes.data;
  users.value = usersRes.data;
});

async function createIssue() {
  const data = {
    issueType: issueType.value,
    title: title.value,
    reporter: reporter.value,
    assignee: assignee.value,
    description: description.value,
    priority: priority.value,
    severity: severity.value,
    epic: epic.value,
    status: "Backlog",
  };
  const res = await axios.post(`${APIURL}issue`, data);
  if (res.status == 201) {
    alert("Issue created successfully");
    router.push(`/backlog/${res.data.id}`);
  }
}
</script>
<style>
select {
  width: 100px;
}
input {
  height: 25px;
}
textarea {
  min-height: 50px;
  max-height: 150px;
}
</style>
../API_URL
