import { shallowMount } from "@vue/test-utils";
import Home from "../src/components/HomeView.vue";

describe("App", () => {
  const wrapper = shallowMount(Home);

  it("should have text 'Home Page'", () => {
    expect(wrapper.text()).toContain("Home Page");
  });
});
