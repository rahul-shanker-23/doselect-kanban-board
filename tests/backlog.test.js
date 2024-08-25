import { flushPromises, shallowMount } from "@vue/test-utils";
import Backlog from "../src/components/Backlog.vue";
import axios from "axios";
import data from "../db.json";
import { APIURL } from "../src/API_URL";

jest.mock("axios");

const options = {
  global: {
    stubs: {
      RouterLink: { template: "<a><slot /></a>" },
    },
  },
};
beforeEach(() => {
  axios.get.mockResolvedValue({ data: data.issue.filter((e) => e.issueType == "Story" || e.issueType == "Bug") });
});

describe("Epic", () => {
  it("should request epic list from server", async () => {
    const wrapper = shallowMount(Backlog, options);
    await flushPromises();
    expect(wrapper.find("h3").text()).toBe("Backlog");
    expect(axios.get).toHaveBeenCalledWith(`${APIURL}issue?issueType=Bug&issueType=Story`);
  });

  it("should display backlog list", async () => {
    const wrapper = shallowMount(Backlog, options);
    await flushPromises();
    const row = wrapper.findAll("tbody tr");
    expect(row.length).toBe(3);
    const column = row.at(0).findAll("td");
    expect(column.length).toBe(7);
    expect(column.at(0).text()).toBe("2");
    expect(column.at(1).text()).toBe("Migrating Header");
    expect(column.at(2).text()).toBe("Story");
    expect(column.at(3).text()).toBe("Beth");
    expect(column.at(4).text()).toBe("Sara");
    expect(column.at(5).text()).toBe("Low");
    expect(column.at(6).text()).toBe("Minor");
  });
});
