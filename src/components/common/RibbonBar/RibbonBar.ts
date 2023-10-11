import LinkCollection from '@/components/common/LinkCollection/LinkCollection.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner.vue'
import { fetchData } from '@/helpers/locale-helper'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RibbonBar',
  components: {
    LoadingSpinner,
    LinkCollection
  },
  data() {
    return {
      json: undefined as any
    }
  },
  watch: {
    '$i18n.locale': 'fetchLocalizedData'
  },
  methods: {
    async fetchLocalizedData() {
      try {
        const data = (await fetchData()) as any
        this.json = data.components.common.RibbonBar
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  created() {
    this.fetchLocalizedData()
  }
})
