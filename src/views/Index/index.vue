<template>
  <div class="home-total">
    <div class="home-content">
      <Header />
      <Tabbar :tabs="tabs" />
    </div>
    <router-view></router-view>
    <Calculator />
    <Mailbox />
    <Online />
    <CommonFoot />
    <Foot />
  </div>
</template>

<script>
import Tabbar from "@/component/tabbar.vue";
import Header from "@/component/headerTop.vue";
import Foot from "@/component/foot.vue";
import Online from "@/component/online.vue";
import CommonFoot from "@/component/commonFoot.vue";
import Calculator from "@/component/calculator.vue";
import Mailbox from "@/component/mailbox.vue";
export default {
  name: "index",
  data() {
    return {
      tabs: [
        { id: 1, name: this.$t('main.Home'), href: "/home" },
        { id: 2, name: this.$t('main.code'), href: "/code" },
        //{ id: 3, name: this.$t('main.transportation'), href: "/set" },
        { id: 3, name: this.$t('main.Service_price'), href: "/serve" },
        { id: 4, name: this.$t('main.Novice_guide'), href: "/nav" },
        { id: 5, name: this.$t('main.Notice'), href: "/notice" }
      ]
    };
  },
  methods: {
    //服务与价格
    handleClick(tab, event) {
      //console.log(tab, event);
    }
  },
  components: {
    Tabbar,
    Header,
    Foot,
    Online,
    CommonFoot,
    Calculator,
    Mailbox
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.home-total {
  .home-content {
    height: 150px;
    border-bottom: 1px solid @home-logo;
    width: 100%;
  }
}
</style>

