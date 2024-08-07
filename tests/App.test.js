import { shallowMount } from "@vue/test-utils";
import App from "../src/App.vue";

describe("App", () => {
  const wrapper = shallowMount(App);

  it("should have text 'Hello from vue'", () => {
    expect(wrapper.text()).toContain("Hello from Vue");
  });
});
