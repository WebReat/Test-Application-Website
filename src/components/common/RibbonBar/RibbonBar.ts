import { defineComponent } from "vue";
import useAnimationStore from "@/stores/headerAnimations";
import json from "@/assets/lang/de.json";

import LinkCollection from "@/components/common/LinkCollection/LinkCollection.vue";

export default defineComponent({
  name: "RibbonBar",
  components: {
    LinkCollection,
  },
  data() {
    return {
      json: json.components.common.RibbonBar,
    };
  },
  mounted() {
    const elements = [
      {
        element: this.$refs["ribbon-content-wrapper"] as HTMLElement,
        class: "ribbon-content-wrapper-animation" as string,
        timeout: 1 as number,
      },
      {
        element: this.$refs["ribbon-content"] as HTMLElement,
        class: "ribbon-content-animation" as string,
        timeout: 1 as number,
      },
      {
        element: (this.$refs["ribbon-link"] as any).$el as HTMLElement,
        class: "ribbon-link-animation" as string,
        timeout: 1 as number,
      },
    ];

    elements.forEach((element) => {
      useAnimationStore().setHeaderAnimation(element);
    });
  },
});
