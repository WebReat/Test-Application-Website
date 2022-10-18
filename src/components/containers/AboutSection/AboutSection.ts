import json from '@/assets/data/data.json';

import AirplaneDepartureIcon from '@/components/common/Icons/AirplaneDepartureIcon.vue';
import ArrowDownCircleIcon from '@/components/common/Icons/ArrowDownCircleIcon.vue';
import CalendarIcon from '@/components/common/Icons/CalendarIcon.vue';
import ChevronLeftForwardslashChevronRightIcon from '@/components/common/Icons/ChevronLeftForwardslashChevronRightIcon.vue';
import ChevronRightIcon from '@/components/common/Icons/ChevronRightIcon.vue';
import GearIcon from '@/components/common/Icons/GearIcon.vue';
import PersonCropSquareIcon from '@/components/common/Icons/PersonCropSquareIcon.vue';

import RibbonBar from '@/components/common/RibbonBar/RibbonBar.vue';
import ShareSheet from '@/components/common/ShareSheet/ShareSheet.vue';
import CardTile from '@/components/common/CardTile/CardTile.vue';
import ArticleItem from '@/components/common/ArticleItem/ArticleItem.vue';

export default {
  name: 'AboutSection',
  components: {
    AirplaneDepartureIcon,
    ArrowDownCircleIcon,
    CalendarIcon,
    ChevronLeftForwardslashChevronRightIcon,
    ChevronRightIcon,
    GearIcon,
    PersonCropSquareIcon,
    RibbonBar,
    ShareSheet,
    CardTile,
    ArticleItem,
  },
  data() {
    return {
      data: json,
      age: [] as number[],
    };
  },
  created() {
    console.log(this.data);
    // this.data.dates.forEach((item) => {
    //   const date = new Date(item.date);
    //   const difference = new Date(Date.now() - date.getTime());
    //   const age = Math.abs(difference.getUTCFullYear() - 1970);
    //   this.age.push(age);
    // });
  },
};