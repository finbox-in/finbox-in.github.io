(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{298:function(e,t,a){"use strict";a.r(t);var s={props:{name:{type:String,default:"default"},isolated:{type:Boolean,default:!1},languages:Object},data(){return{selectedLanguage:Object.keys(this.languages)[0]}},computed:{root(){let e,t=this;for(;e=t.$parent;)t=e;return t},localStorageKey(){return"vuepress-plugin-code-switcher@"+this.name}},methods:{switchLanguage(e){if(this.isolated)return this.selectedLanguage=e;"undefined"!=typeof localStorage&&localStorage.setItem(this.localStorageKey,e),this.root.$emit("change",{name:this.name,value:e})}},created(){if(!this.isolated){if("undefined"!=typeof localStorage){let e=localStorage.getItem(this.localStorageKey);e&&-1!==Object.keys(this.languages).indexOf(e)&&(this.selectedLanguage=e)}this.root.$on("change",({name:e,value:t})=>{e===this.name&&(this.selectedLanguage=t)})}}},n=a(7),l=Object(n.a)(s,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"code-switcher"},[t("div",{staticClass:"tab-header"},[t("ul",e._l(e.languages,(function(a,s){return t("li",{key:s,class:{active:e.selectedLanguage===s},on:{click:function(t){return e.switchLanguage(s)}}},[e._v(" "+e._s(a)+"\n            ")])})),0)]),e._v(" "),e._l(e.languages,(function(a,s){return t("div",{directives:[{name:"show",rawName:"v-show",value:s===e.selectedLanguage,expression:"shorthand === selectedLanguage"}],key:s,staticClass:"tab-content"},[e._t(s)],2)}))],2)}),[],!1,null,null,null);t.default=l.exports}}]);