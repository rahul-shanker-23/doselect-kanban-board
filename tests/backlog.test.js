import { flushPromises, shallowMount } from "@vue/test-utils";
import Backlog from "../src/components/Backlog.vue";
import axios from "axios";
import data from "./mock.json";
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

describe("Backlog", () => {
  it("should request backlog list from server", async () => {
    const wrapper = shallowMount(Backlog, options);
    await flushPromises();
    expect(wrapper.find("h3").text()).toBe("Backlog");
    expect(axios.get).toHaveBeenCalledWith(`${APIURL}issue?issueType=Bug&issueType=Story`);
  });

  it("should display backlog list", async () => {
    const wrapper = shallowMount(Backlog, options);
    await flushPromises();
    const row = wrapper.findAll("tbody tr");
    expect(row.length).toBe(2);
    const column = row.at(0).findAll("td");
    expect(column.length).toBe(7);
    expect(column.at(0).text()).toBe("2");
    expect(column.at(1).text()).toBe("Migrating header api");
    expect(column.at(2).text()).toBe("Story");
    expect(column.at(3).text()).toBe("Beth");
    expect(column.at(4).text()).toBe("Sara");
    expect(column.at(5).text()).toBe("Low");
    expect(column.at(6).text()).toBe("Minor");
    const column1 = row.at(1).findAll("td");
    expect(column1.length).toBe(7);
    expect(column1.at(0).text()).toBe("3");
    expect(column1.at(1).text()).toBe("bug in header");
    expect(column1.at(2).text()).toBe("Bug");
    expect(column1.at(3).text()).toBe("Emma");
    expect(column1.at(4).text()).toBe("Sara");
    expect(column1.at(5).text()).toBe("Low");
    expect(column1.at(6).text()).toBe("Critical");
  });
});
