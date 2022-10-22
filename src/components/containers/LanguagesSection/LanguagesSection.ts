import LanguageBar from '@/components/common/LanguageBar/LanguageBar.vue';
import json from '@/assets/data/data.json';

export default {
  name: 'LanguagesSection',
  components: {
    LanguageBar,
  },
  data() {
    return {
      data: json.components[1].data[1].data,
    };
  },
};
