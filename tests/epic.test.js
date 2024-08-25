import { flushPromises, shallowMount } from "@vue/test-utils";
import Epic from "../src/components/Epic.vue";
import axios from "axios";
import data from "../db.json";
import { APIURL } from "../src/API_URL";
import router from "../src/router";
jest.mock("axios");

const options = {
  global: {
    stubs: {
      RouterLink: { template: "<a><slot /></a>" },
    },
  },
};
beforeEach(() => {
  axios.get.mockResolvedValue({ data: data.issue.filter((e) => e.issueType == "Epic") });
});

describe("Epic", () => {
  it("should request epic list from server", async () => {
    const wrapper = shallowMount(Epic, options);
    await flushPromises();
    expect(wrapper.find("h3").text()).toBe("Epic");
    expect(axios.get).toHaveBeenCalledWith(`${APIURL}issue?issueType=Epic`);
  });

  it("should display epic list", async () => {
    const wrapper = shallowMount(Epic, options);
    await flushPromises();
    const row = wrapper.findAll("tbody tr");
    expect(row.length).toBe(1);
    const column = row.at(0).findAll("td");
    expect(column.length).toBe(5);
    expect(column.at(0).text()).toBe("1");
    expect(column.at(1).text()).toBe("Perl to Python");
    expect(column.at(2).text()).toBe("Bob");
    expect(column.at(3).text()).toBe("Eric");
    expect(column.at(4).text()).toBe("Medium");
  });
});
