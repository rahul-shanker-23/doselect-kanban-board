import { flushPromises, shallowMount } from "@vue/test-utils";
import Describe from "../src/components/Describe.vue";
import axios from "axios";
import data from "../db.json";
import { APIURL } from "../src/API_URL";
import { useRoute } from "vue-router";
jest.mock("axios");

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}));

beforeEach(async () => {
  axios.get.mockImplementation((req) => {
    if (req.includes("users")) {
      return { data: data.users };
    } else if (req.includes("issue")) {
      return { data: data.issue.filter((e) => e.id == 2)[0] };
    }
  });
  axios.put.mockResolvedValue({});
});

describe("Describe", () => {
  it("should describe issue", async () => {
    useRoute.mockReturnValue({
      params: {
        id: "2",
      },
    });
    const wrapper = shallowMount(Describe);
    await flushPromises();
    const title = wrapper.find("h3");
    expect(title.text()).toBe("Migrating Header");
    expect(wrapper.text()).toContain("2");
    expect(wrapper.text()).toContain("Backlog");
    expect(wrapper.text()).toContain("Story");
    expect(wrapper.text()).toContain("Beth");
    expect(wrapper.text()).toContain("Sara");
    expect(wrapper.text()).toContain("Low");
    expect(wrapper.text()).toContain("Minor");
    expect(wrapper.text()).toContain("Perl to Python");
    expect(wrapper.text()).toContain("Migrating Header Components");
  });
  it("should modify issue", async () => {
    useRoute.mockReturnValue({
      params: {
        id: "2",
      },
    });
    const wrapper = shallowMount(Describe);
    await flushPromises();
    const button = wrapper.find("button");
    button.trigger("click");
    await flushPromises();
    expect(axios.put).toHaveBeenCalledWith(`${APIURL}issue/2`, expect.any(Object));
  });
});
