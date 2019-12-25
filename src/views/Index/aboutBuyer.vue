<template>
  <div class="aboutBuyer-content">
    <h1>{{ $t("main.Company_profile") }}</h1>
    <div class="aboutBuyer-container">
      <h2>{{ $t("main.company_profile") }}</h2>
      <div class="aboutBuyer-details">
        {{ $t("main.professional_international") }}
      </div>
    </div>
    <div class="aboutBuyer-link">
      <ul>
        <li>{{ $t("main.Contact_information") }}</li>
        <li>
          <span>{{ $t("main.Contact_number") }}</span>
          <span><a href="tel:024 36414833">{{ mainPhone }}</a></span>
        </li>
        <li>
          <span>{{ $t("main.e_mail") }}:</span>
          <span><a href="mailto:contact@buyder.com">{{ email }}</a></span>
        </li>
        <li>
          <span>{{ $t("main.office_main_address") }}:</span>
          <span>{{ $t("main.mainAddress") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mainPhone, email } from "@/entry/index";
export default {
  name: "aboutBuyer",
  data() {
    return {
      mainPhone: "",
      email: ""
    };
  },
  created() {
    this.mainPhone = mainPhone;
    this.email = email;
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.aboutBuyer-content {
  width: 1200px;
  margin: 0 auto;
  h1 {
    text-align: center;
    font-size: 22px;
    font-weight: 900;
    color: @home-logo;
    margin-top: 50px;
  }
  .aboutBuyer-container {
    margin-top: 30px;
    h2 {
      font-size: 16px;
      font-weight: 900;
    }
    .aboutBuyer-details {
      margin-top: 20px;
      line-height: 30px;
    }
  }
  .aboutBuyer-link {
    margin-top: 20px;
    li {
      line-height: 30px;
    }
    li:nth-child(1) {
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 15px;
    }
    li:nth-child(2) {
      span:nth-child(1) {
          margin-right: 10px;
      }
    }
     li:nth-child(3) {
      span:nth-child(1) {
          margin-right: 10px;
      }
    }
     li:nth-child(4) {
      span:nth-child(1) {
          margin-right: 10px;
      }
    }
  }
}
</style>
