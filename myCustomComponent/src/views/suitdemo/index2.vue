<template>
  <div class="wn-qc-layout">
    <header class="wn-qc-layout-header">
      <slot name="header"></slot>
    </header>
    <section class="wn-qc-layout-section">
      <multipane
        class="multipane"
        @paneResizeStart="onResizeStart"
        @paneResizeStop="onResizeStop"
      >
        <div class="wn-qc-issues">
          <el-button @click="hiddenPdf">隐藏pdf</el-button>
          <slot name="issues"></slot>
        </div>
        <multipane-resizer class="wn-qc-issues-resizer"></multipane-resizer>
        <div class="wn-qc-form">
          <slot name="form"></slot>
        </div>
        <multipane-resizer class="wn-qc-form-resizer"></multipane-resizer>
        <div :class="{ 'wn-qc-pdf': true, modal: false }" v-if="isShow">
          <slot name="pdf"></slot>
        </div>
        <multipane-resizer class="wn-qc-pdf-resizer"></multipane-resizer>
      </multipane>
      <div v-show="getModel" class="modal"></div>
    </section>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from "vue-multipane";
export default {
  name: "wn-qc-layout",
  components: {
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      getModel: false,
      isShow: true
    };
  },
  methods: {
    hiddenPdf() {
      this.isShow = !this.isShow;
    },
    onResizeStart() {
      this.getModel = true;
    },
    onResizeStop() {
      this.getModel = false;
      this.$emit("resizeStop");
    }
  }
};
</script>

<style lang="scss">
.wn-qc-layout {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  &.no-issues {
    .wn-qc-layout-section {
      // justify-content: center;
      .wn-qc-issues {
        display: none;
        &-resizer {
          display: none;
        }
      }
      .wn-qc-form {
        margin-left: 0;
      }
    }
  }
  &.no-pdf {
    .wn-qc-layout-section {
      // justify-content: center;
      .wn-qc-pdf {
        display: none;
        &-resizer {
          display: none;
        }
      }
    }
  }
  .wn-qc-layout-section {
    // height: 100%;
    display: flex;
    flex: 1;
    // justify-content: center;
    overflow-y: hidden;
    // overflow-x: scroll;
    overflow-x: auto;
    .multipane {
      flex: 1;
    }
  }

  .wn-qc-issues {
    // flex-grow: 1;
    // margin-right: 10px;
    width: 360px;
    min-width: 360px;
    max-width: 500px;
    position: relative;
    background-color: blue;
  }
  .wn-qc-form {
    flex-grow: 1;
    width: 800px;
    min-width: 794px;
    max-width: 1900px;
    margin-left: 10px;
    position: relative;
    // margin: 0 10px;
    background-color: green;
  }
  @media screen and (min-width: 1024px) and (max-width: 1366px) {
    .wn-qc-pdf {
      margin-left: 10px;
      width: 220px;
      min-width: 220px;
      max-width: 1000px;
      position: relative;
      background-color: red;
      overflow: hidden;
    }
  }
  @media screen and (min-width: 1367px) and (max-width: 1680px) {
    .wn-qc-pdf {
      margin-left: 10px;
      width: 440px;
      min-width: 440px;
      max-width: 1000px;
      position: relative;
      background-color: red;
      overflow: hidden;
    }
  }
  @media screen and (min-width: 1681px) and (max-width: 1920px) {
    .wn-qc-pdf {
      margin-left: 10px;
      width: 740px;
      min-width: 740px;
      max-width: 1000px;
      position: relative;
      background-color: red;
      overflow: hidden;
    }
  }
  // .wn-qc-pdf {
  //   // flex-grow: 1;
  //   margin-left: 10px;
  //   width: 740px;
  //   min-width: 740px;
  //   max-width: 1000px;
  //   position: relative;
  //   background-color: #fff;
  //   overflow: hidden;
  //   // &.model::before {
  //   //   content: "";
  //   //   position: absolute;
  //   //   top: 0;
  //   //   left: 0;
  //   //   background-color: red;
  //   //   z-index: 1000;
  //   // }
  // }
  .modal {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: transparent;
    cursor: col-resize;
  }
}

@media screen and (max-width: 1024px) {
  .wn-qc-layout {
    .wn-qc-issues {
      width: 320px;
      min-width: 320px;
    }
    .wn-qc-form {
      width: 780px;
      min-width: 780px;
      // max-width: 780px;
    }
  }
}
@media screen and (min-width: 1280px) and (max-width: 1366px) {
}
@media screen and (min-width: 1367px) and (max-width: 1920px) {
}
@media screen and (min-width: 1921px) {
  .wn-qc-layout {
    .wn-qc-form {
      width: 950px;
      min-width: 950px;
      // max-width: 1100px;
    }
  }
}
// // 收起 pdf 和 issues 时，form 的最大值
// @media screen and (min-width: 1024px) {
//   .wn-qc-layout.no-pdf.no-issues {
//     .wn-qc-layout-section {
//       justify-content: center;
//     }
//   }
// }

// // 大于 issues + form 最大值 1024 + 500
// @media screen and (min-width: 1524px) {
//   .wn-qc-layout.no-pdf {
//     .wn-qc-layout-section {
//       justify-content: center;
//     }
//   }
// }

// // 大于 form + pdf 最大值 1024 + 1000
// @media screen and (min-width: 2024px) {
//   .wn-qc-layout.no-issues {
//     .wn-qc-layout-section {
//       justify-content: center;
//     }
//   }
// }
</style>
