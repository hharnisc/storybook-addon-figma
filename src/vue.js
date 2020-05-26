import Vue from "vue";
import addons from "@storybook/addons";
import { EVENT_ID } from "./shared";

export const WithFigma = Vue.component("with-figma", {
  props: {
    url: { type: String, required: true },
    allowFullScreen: { type: Boolean, default: true },
    embedHost: { type: String, default: "storybook" }
  },
  render(el) {
    addons.getChannel().emit(EVENT_ID, {
      url: this.url,
      allowFullScreen: this.allowFullScreen,
      embedHost: this.embedHost
    });

    try {
      return this.$slots.default[0];
    } catch (e) {
      throw new Error("WithFigma can only render one child component.");
    }

    return null;
  }
});
