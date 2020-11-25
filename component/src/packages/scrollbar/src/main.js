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
};
