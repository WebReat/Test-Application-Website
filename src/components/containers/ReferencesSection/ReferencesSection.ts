import CardItem from '@/components/common/CardItem/CardItem.vue'

import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue'
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue'
import TimeLine from '@/components/common/TimeLine/TimeLine.vue'
import type { CardItemType } from '@/types/common/CardItem'
import { computed, defineComponent, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ReferencesSection',
  components: {
    LoadingSpinner,
    RibbonBar,
    LinkCollection,
    ShareSheet,
    CardItem,
    TimeLine
  },
  props: {
    title: {
      type: String,
      required: true,
      default: undefined
    }
  },
  setup(props) {
    const { tm } = useI18n()
    const articles: Ref<CardItemType[]> = computed(() => tm('components.containers.references'))
    console.log(articles.value)

    return {
      props,
      tm,
      articles
    }
  }
})
