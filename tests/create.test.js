import { flushPromises, shallowMount } from "@vue/test-utils";
import Create from "../src/components/Create.vue";
import axios from "axios";
import data from "./mock.json";
import { APIURL } from "../src/API_URL";
import router from "../src/router";

jest.mock("axios");

const options = {
  global: {
    plugins: [router],
  },
};

beforeEach(() => {
  axios.get.mockImplementation((req) => {
    if (req.includes("users")) {
      return { data: data.users };
    } else if (req.includes("issue?issueType=Epic")) {
      return { data: data.issue.filter((e) => e.issueType == "Epic") };
    }
  });
  axios.post.mockResolvedValue({});
});

describe("Create", () => {
  it("should change the form according to issue type", async () => {
    const wrapper = shallowMount(Create, options);
    await flushPromises();
    const issueType = wrapper.find("select[name='issueType']");
    let severity = wrapper.find("select[name='severity']");
    let epic = wrapper.find("select[name='epic']");
    expect(issueType.element.value).toBe("Story");
    expect(epic.exists()).toBe(true);
    expect(severity.exists()).toBe(true);
    issueType.setValue("Bug");
    await flushPromises();
    epic = wrapper.find("select[name='epic']");
    expect(epic.exists()).toBe(false);
    expect(severity.exists()).toBe(true);
    issueType.setValue("Epic");
    await flushPromises();
    epic = wrapper.find("select[name='epic']");
    severity = wrapper.find("select[name='severity']");
    expect(epic.exists()).toBe(false);
    expect(severity.exists()).toBe(false);
  });
  it("should have default value for priority and severity", async () => {
    const wrapper = shallowMount(Create, options);
    await flushPromises();
    let severity = wrapper.find("select[name='severity']");
    let priority = wrapper.find("select[name='priority']");
    expect(severity.element.value).toBe("Minor");
    expect(priority.element.value).toBe("Low");
  });

  it("should have epic name list if issue type is story", async () => {
    const wrapper = shallowMount(Create, options);
    await flushPromises();
    const issueType = wrapper.find("select[name='issueType']");
    issueType.setValue("Story");
    await flushPromises();
    let epic = wrapper.find("select[name='epic']");
    const option = epic.findAll("option");
    expect(option.length).toBe(1);
    expect(option.at(0).element.value).toBe("Perl to Python");
    expect(option.at(0).text()).toBe("Perl to Python");
  });

  it("should create issue", async () => {
    const wrapper = shallowMount(Create, options);
    await flushPromises();
    const issueType = wrapper.find("select[name='issueType']");
    issueType.setValue("Bug");
    await flushPromises();
    const title = wrapper.find("input");
    title.setValue("Testing");
    const description = wrapper.find("textarea");
    description.setValue("Testing");
    const reporter = wrapper.find("select[name='reporter']");
    reporter.setValue("Jake");
    const assignee = wrapper.find("select[name='assignee']");
    assignee.setValue("Jake");
    await flushPromises();
    const button = wrapper.find("button");
    button.trigger("submit");
    await flushPromises();
    const expectedData = expect.objectContaining({
      assignee: "Jake",
      description: "Testing",
      issueType: "Bug",
      priority: "Low",
      reporter: "Jake",
      severity: "Minor",
      status: "Backlog",
      title: "Testing",
    });
    expect(axios.post).toHaveBeenCalledWith(`${APIURL}issue`, expectedData);
  });
});
