import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const calculateSelectionPosition = (
  segmentNav: HTMLUListElement | null,
  selectedIndex: number,
  selectionDimensions: { width: number; x: number }
) => {
  if (segmentNav) {
    const segmentNavItems = segmentNav.querySelectorAll('.segmentnav-item')
    const { offsetWidth, offsetLeft } = segmentNavItems[selectedIndex] as HTMLElement
    selectionDimensions.width = offsetWidth
    selectionDimensions.x = offsetLeft
  }
}

export default defineComponent({
  name: 'SegmentNav',
  setup() {
    const { tm } = useI18n()
    const items = computed(() => tm('components.common.SegmentNav') as TabItemType[])
    const selectedIndex = ref(0)
    const segmentNav = ref<HTMLUListElement | null>(null)
    const selectionDimensions = reactive({ width: 0, x: 0 })

    const selectionStyle = computed(() => ({
      width: `${selectionDimensions.width}px`,
      transform: `translateX(${selectionDimensions.x}px)`
    }))

    watch(selectedIndex, () => {
      calculateSelectionPosition(segmentNav.value, selectedIndex.value, selectionDimensions)
    })

    onMounted(() => {
      calculateSelectionPosition(segmentNav.value, selectedIndex.value, selectionDimensions)
    })

    return {
      items,
      selectedIndex,
      selectionStyle,
      segmentNav
    }
  }
})
