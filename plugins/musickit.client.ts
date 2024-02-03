import { listRepositoryTags } from "~/helpers/github-helper";
import { MusicKitHelper } from "../helpers/musickit-helper";

export default defineNuxtPlugin(async (nuxtApp) => {
  const tags = ref({ latest: undefined, previous: undefined }) as Ref<{
    latest: string | undefined;
    previous: string | undefined;
  }>;

  if (process.client) {
    await loadMusicKitSDK();

    try {
      const musicKitInstance = window.MusicKit.getInstance();
      const musicKitHelper = new MusicKitHelper(musicKitInstance);

      const developerToken = import.meta.env.VITE_APPLE_DEVELOPER_TOKEN;
      const appConfiguration = {
        name: "Application-Website",
        build: tags.value.latest || "1.0.0",
        version: tags.value.latest || "1.0.0",
        icon: "~/assets/img/favicon.png",
      };

      musicKitHelper.configureMusicKit(developerToken, appConfiguration);
    } catch (error) {
      console.error("MusicKit initialization error:", error);
    }
  }

  const fetchTags = async () => {
    const [latest, previous] = await listRepositoryTags({
      owner: "JonathanXDR",
      repo: "Application-Website-Frontend",
      perPage: 2,
    });

    tags.value = { latest: latest.name, previous: previous.name };
  };
});

async function loadMusicKitSDK() {
  return new Promise((resolve, reject) => {
    if (window.MusicKit) {
      resolve(window.MusicKit);
    } else {
      let script = document.createElement("script");
      script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
      script.async = true;
      script.onload = () => resolve(window.MusicKit);
      script.onerror = () =>
        reject(new Error("Failed to load MusicKit JS SDK"));
      document.head.appendChild(script);
    }
  });
}
