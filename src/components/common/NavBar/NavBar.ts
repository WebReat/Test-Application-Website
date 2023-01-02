import { defineComponent } from "vue";
import useSectionStore from "@/stores/navbarSections";
import useAnimationStore from "@/stores/headerAnimations";

import LogoIcon from "@/components/common/Icons/LogoIcon.vue";

export default defineComponent({
  name: "NavBar",
  components: {
    LogoIcon,
  },
  data() {
    return {
      items: [
        { name: "About", route: "#about" },
        { name: "Sprachkenntnisse", route: "#languages" },
        { name: "Referenzen", route: "#references" },
        { name: "Anderes", route: "#other" },
        { name: "Technologien", route: "#technologies" },
        { name: "Projekte", route: "#projects" },
      ],
      themeDark: false,
      navOpen: false,
      navDisabled: false,
    };
  },
  computed: {
    currentSection(): number | null {
      return useSectionStore().currentSection;
    },

    headerAnimations(): {
      element: HTMLElement;
      class: string;
      timeout: number;
    }[] {
      useAnimationStore().setHeaderAnimation({
        element: this.$refs["ac-ln-background"] as HTMLElement,
        class: "ac-ln-background-transition" as string,
        timeout: 500 as number,
      });

      return useAnimationStore().headerAnimations;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);

    if (localStorage.getItem("theme") === null) {
      const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)");

      if (preferedTheme.matches) {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
    } else {
      if (localStorage.getItem("theme") === "dark") {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
    }

    this.devConfig();
  },
  methods: {
    changeTheme() {
      this.themeDark = !this.themeDark;
      if (this.themeDark) {
        this.storeTheme("dark");
      } else {
        this.storeTheme("light");
      }
      this.updateAnimations();
    },

    storeTheme(themeName: string): void {
      this.themeDark = themeName === "dark";
      localStorage.setItem("theme", themeName);
      document.documentElement.className = themeName;
    },

    toggleNav(): void {
      this.navOpen = !this.navOpen;
      this.checkboxTimeout();
    },

    checkboxTimeout(): void {
      this.navDisabled = true;
      setTimeout(() => {
        this.navDisabled = false;
      }, 1000);
    },

    handleScroll(): void {
      if ((this.navOpen = true && window.scrollY > 0)) {
        this.navOpen = false;
      }
    },

    updateAnimations(): void {
      this.headerAnimations.forEach((element) => {
        element.element.classList.remove(element.class);

        setTimeout(() => {
          element.element.classList.add(element.class);
        }, element.timeout);
      });
    },

    devConfig() {
      const Configs = [
        {
          colorName: "orange",
          colorVar: "var(--color-figure-orange)",
          colorHex: "f56300",
        },
        {
          colorName: "teal",
          colorVar: "var(--color-figure-teal)",
          colorHex: "00c2bb",
        },
        {
          colorName: "purple",
          colorVar: "var(--color-figure-purple)",
          colorHex: "a95ed2",
        },
      ];
      const devConfig = Configs[Math.floor(Math.random() * Configs.length)];

      // const devBadge = this.$refs["dev-badge"] as HTMLElement;
      // devBadge.style.color = devConfig.colorVar;

      // const devTouchIcon = this.$refs["dev-touch-icon"] as HTMLLinkElement;
      // devTouchIcon.href = `@/assets/img/dev/favicon-dev-${devConfig.colorName}.png`;

      // const devFavicon = this.$refs["dev-favicon"] as HTMLLinkElement;
      // devFavicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23${devConfig.colorHex}%22></rect><path fill=%22%23ffffff%22 d=%22M26.30 69.58Q21.90 69.58 18.71 68.09Q15.52 66.61 13.76 63.80L13.76 63.80L19.64 58.20Q22.17 62.27 26.41 62.27L26.41 62.27Q31.58 62.27 32.79 56.27L32.79 56.27L36.47 37.57L23.00 37.57L24.43 30.42L46.76 30.42L41.64 55.83Q40.21 63.20 36.47 66.39Q32.73 69.58 26.30 69.58L26.30 69.58ZM86.25 42.36Q86.25 47.75 83.33 51.59Q80.41 55.45 75.25 57.04L75.25 57.04L81.95 68.92L72.55 68.92L66.50 58.14L58.91 58.14L56.77 68.92L47.80 68.92L55.50 30.42L71.17 30.42Q78.32 30.42 82.28 33.55Q86.25 36.69 86.25 42.36L86.25 42.36ZM67.88 51.05Q72.33 51.05 74.78 49.01Q77.22 46.98 77.22 43.18L77.22 43.18Q77.22 40.43 75.35 39.06Q73.48 37.68 70.02 37.68L70.02 37.68L62.98 37.68L60.28 51.05L67.88 51.05Z%22></path></svg>`;
    },
  },
});
