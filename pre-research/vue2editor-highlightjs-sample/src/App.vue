<template>
  <div>
    <div class="post">
      <!-- vue2-editor'ü ekrana yerleştirdik ve v-model ile post değişkenine bağladık. -->
      <vue-editor v-model="post"></vue-editor>
      <br />
      <!-- Editöre yazılan yazının çıktısını gösterip gizlemek için bir buton koyduk.
           Butona basılınca show metoduna gitmesini söyledik. -->
      <button @click="show">Göster</button>
    </div>
    <!-- Editöre yazılan yazının çıktısını göstermek için bir div açtık.
         Bu div'e main.js dosyasında tanımlamış olduğumuz highlightjs directive'ini verdik.
         v-model ile post değişkenine bağladık.
         showButton değişkenine göre gösterip gizlemek için v-if kullandık. -->
    <div class="content" v-highlightjs v-html="post" v-if="showButton"></div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  // import ettiğimiz vue2-editor'ü bir component olarak belirttik.
  components: {
    VueEditor
  },
  data() {
    return {
      post: "",
      showButton: false
    };
  },
  methods: {
    /* Göster butonuna tıklayınca çalışacak olan bu fonksiyonda,
         editörde yazılan yazıda bulunan kod kısımlarına (pre tag'ı içinde bulunan alanlar)
         replace ederek o kısımlara <code> tag'ı ekledik.
      */
    show() {
      var find = ['<pre class="ql-syntax" spellcheck="false">', "</pre>"];
      var replace = [
        '<pre class="ql-syntax" spellcheck="false"><code>',
        "</code></pre>"
      ];
      this.post = this.replaceArray(this.post, find, replace);
      this.showButton = !this.showButton;
    },
    // bir string içerisinde birden fazla replace işlemi yapmak için kullanılan fonksiyon
    replaceArray(text, find, replace) {
      var replaceString = text;
      var regex;
      for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
      }
      return replaceString;
    }
  }
};
</script>

<!-- Ufak stil düzenlemeleri yaptık. -->
<style>
.post {
  width: 850px;
  text-align: center;
}
.post button {
  padding: 10px;
  font-size: 15px;
}
.content {
  margin-top: 20px;
  padding: 10px;
  width: 850px;
  border: 1px solid #ff0000;
}
.ql-snow .ql-editor code {
  background-color: #23241f !important;
}
</style>
