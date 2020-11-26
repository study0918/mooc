import {
  addResizeListener,
  removeResizeListener,
} from "../../../utils/resize-event";
import scrollbarWidth from "../../../utils/scrollbar-width";
import { toObject } from "../../../utils/util";
import Bar from "./bar";

export default {
  name: "ElScrollbar",
  components: { Bar },
  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    tag: {
      type: String,
      default: "div",
    },
  },
  data() {
    return {
      sizeWidth: "0",
      sizeHeight: "0",
      moveX: 0,
      moveY: 0,
    };
  },
  computed() {
    wrap() {
      return this.$refs.wrap;
    }
  },
  render(h) {
    let gutter=scrollbarWidth() ;
    let style = this.wrapStyle;

    if(gutter) {
      const gutterWidth = `-${gutter}px`;
      const gutterStyle = `margin-bottom:${gutterWidth};margin-right:${gutterWidth};`;

      if(Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWidth;
      }else if(typeof this.wrapStyle==='string') {
        style+=gutterStyle;
      }else {
        style=gutterStyle;
      }
    }
  }
};
