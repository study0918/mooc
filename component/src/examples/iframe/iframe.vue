<template>
  <div>
    <iframe
      id="color"
      :src="
        `http://www.php.com/1.html?id=${this.assid}&access_tokin=${this.tokin}`
      "
      frameborder="0"
    ></iframe>
  </div>
</template>
<style scoped></style>
<script>
export default {
  computed: {},
  props: ["assid", "tokin"],
  data() {
    return {};
  },
  methods: {
    changecolor() {
      var dd = document.querySelector("#color");
      var tt = `https:www.baidu.com?id=${this.assid}&access_tokin=${this.tokin}`;
      //dd.setAttribute('src',tt)
      dd.innerHTML = tt;
    }
  },
  mounted() {
    window.onload = function() {
      var iframe = document.getElementById("color");
      var targetOrigin = "http://www.php.com";
      var dite = "qwe";
      iframe.contentWindow.postMessage(dite, targetOrigin);
    };
    //this.changecolor();
  }
};
</script>
