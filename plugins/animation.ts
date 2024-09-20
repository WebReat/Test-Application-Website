import type { DirectiveBinding } from "vue";

interface AnimationOperations {
  add?: string | string[];
  remove?: string | string[];
  toggle?: string | string[];
  onViewportChange?: (isInViewport: boolean, element: HTMLElement) => void;
}

interface AnimationState {
  inViewport: boolean;
  wasInViewport: boolean;
}

const animationState = new WeakMap<HTMLElement, AnimationState>();

const toArray = (input?: string | string[]): string[] =>
  Array.isArray(input) ? input : input ? [input] : [];

const updateClasses = (
  element: HTMLElement,
  { add, remove, toggle, onViewportChange }: AnimationOperations,
  isInViewport: boolean,
) => {
  const state = animationState.get(element) ?? {
    inViewport: false,
    wasInViewport: false,
  };

  if (isInViewport) {
    for (const className of toArray(add)) element.classList.add(className);
    for (const className of toArray(remove)) {
      element.classList.remove(className);
    }
    for (const className of toArray(toggle)) {
      element.classList.toggle(className);
    }
    state.inViewport = true;
    state.wasInViewport = true;
  } else {
    for (const className of toArray(toggle)) {
      element.classList.toggle(className);
    }
    state.inViewport = false;
  }

  animationState.set(element, state);
  onViewportChange?.(isInViewport, element);
};

const createObserver = (
  element: HTMLElement,
  options: AnimationOperations,
  rootMargin: string,
): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        updateClasses(element, options, entry.isIntersecting);
      }
    },
    { threshold: 0.5, rootMargin },
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("animation", {
    mounted(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      const { value } = binding;
      let observer = createObserver(element, value, "0px 0px -200px 0px");
      observer.observe(element);

      const updateObserver = () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        const rootMargin = isAtBottom
          ? "-100px 0px 0px 0px"
          : "0px 0px -200px 0px";

        observer.disconnect();
        observer = createObserver(element, value, rootMargin);
        observer.observe(element);
      };

      useEventListener("scroll", updateObserver, { passive: true });

      if (animationState.get(element)?.wasInViewport) {
        for (const className of toArray(value.add)) {
          element.classList.add(className);
        }
      }
    },
    updated(
      element: HTMLElement,
      binding: DirectiveBinding<AnimationOperations>,
    ) {
      if (animationState.get(element)?.wasInViewport) {
        const { add, remove, toggle } = binding.value;
        for (const className of toArray(add)) element.classList.add(className);
        for (const className of toArray(remove)) {
          element.classList.remove(className);
        }
        for (const className of toArray(toggle)) {
          element.classList.toggle(className);
        }
      }
    },
    unmounted(element: HTMLElement) {
      window.removeEventListener("scroll", () => {});
      animationState.delete(element);
    },
  });
});
