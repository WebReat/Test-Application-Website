import type { LanguageBarType } from '@/types/common/LanguageBar'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'LanguageBarV2',
  props: {
    language: {
      type: Object as PropType<LanguageBarType>,
      required: true,
      default: () => ({})
    }
  },
  setup() {
    const status = ['Order Placed', 'Processing', 'Preparing to Ship', 'Shipped', 'Delivered']

    return {
      status
    }
  }
})
