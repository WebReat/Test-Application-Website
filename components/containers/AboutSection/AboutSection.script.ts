import {
  computed,
  defineComponent,
  onMounted,
  ref,
  type PropType,
  type Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import CardItem from "~/components/common/CardItem/CardItem.vue";
import LinkCollection from "~/components/common/LinkCollection/LinkCollection.vue";
import LoadingSpinner from "~/components/common/LoadingSpinner/LoadingSpinner.vue";
import RibbonBar from "~/components/common/RibbonBar/RibbonBar.vue";
import ShareSheet from "~/components/common/ShareSheet/ShareSheet.vue";
import TimeLine from "~/components/common/TimeLine/TimeLine.vue";
import type { DateItemType } from "~/types/common/DateItem";
import type { LinkType } from "~/types/common/Link";

export default defineComponent({
  name: "AboutSection",
  components: {
    LoadingSpinner,
    RibbonBar,
    CardItem,
    LinkCollection,
    ShareSheet,
    TimeLine,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      default: undefined,
    },
  },
  setup(props) {
    const { tm } = useI18n();
    const links: Ref<LinkType[]> = computed(() =>
      tm("components.containers.about.links")
    );
    const dateItems: Ref<DateItemType[]> = computed(() =>
      tm("components.containers.about.dates")
    );
    const dates: Ref<{
      age: number | undefined;
      apprenticeshipYear: number | undefined;
    }> = ref({
      age: undefined,
      apprenticeshipYear: undefined,
    });

    const calculateYears = (date: string) => {
      const currentDate = new Date(Date.now());
      const birthDate = new Date(date);
      const difference = new Date(currentDate.getTime() - birthDate.getTime());
      const years = Math.abs(difference.getUTCFullYear() - 1970);
      return years;
    };

    onMounted(async () => {
      dateItems.value.forEach((item: DateItemType) => {
        if (item.key in dates.value) {
          dates.value[item.key as keyof typeof dates.value] = calculateYears(
            item.date
          );
        }
      });
    });

    return {
      window,
      props,
      tm,
      links,
      dates,
      calculateYears,
    };
  },
});
