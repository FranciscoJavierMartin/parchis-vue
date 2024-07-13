import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    fill: {
      type: String,
      default: 'white',
    },
    strokeWidth: {
      type: Number,
      default: 1.5,
    },
  },
});
