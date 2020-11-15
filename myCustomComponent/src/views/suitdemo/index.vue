<template>
  <div class="layout">
    <div class="section">
      <div style="background-color:coral;"></div>
      <div style="background-color:lightblue;"></div>
    </div>
  </div>
</template>
<style lang="scss">
.layout {
  /* width: 100%;
  height: 100px;
  border: 1px solid #c3c3c3;
  display: flex; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .section {
    width: 100%;
    display: flex;
    flex: 1;
    div:nth-of-type(1) {
      width: 360px;
    }
    div:nth-of-type(2) {
      flex-grow: 1;
    }
  }
}
</style>
