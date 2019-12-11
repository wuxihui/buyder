<template>
  <div class="contraband-total">
    <h1>{{$t("nav.list_contraband")}}</h1>
    <ul>
      <li v-for="item in contrabands" :key="item.id">
        <h2><img :src="item.img" alt /></h2>
        <div class="contraband-content">
          <p>{{ item.title }}</p>
          <p>{{ item.style }}</p>
          <p>
            <el-popover placement="bottom" width="300" trigger="hover">
              <p>{{ item.details }}</p>
              <span slot="reference" v-if="item.details">{{$t("nav.Show_all")}}</span>
            </el-popover>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "contraband",
  data() {
    return {
      contrabands: [
        {
          id: 1,
          title: this.$t("nav.Weapons"),
          //"武器 军用物品",
          style: this.$t("nav.Weapons"),
          //"各类武器、弹药",
          details: this.$t("nav.bullets_shells"),
          //"如枪支、子弹、炮弹、手榴弹、地雷、炸弹等",
          img: require("@/img/shouqiang.jpg")
        },
        {
          id: 2,
          title: this.$t("nav.inflammable"),
          //"易燃爆炸性物品",
          style: this.$t("nav.explosives"),
          //"如雷管、炸药、火药、鞭炮等",
          details: "",
          img: require("@/img/bianpao.jpg")
        },
        {
          id: 3,
          title: this.$t("nav.kinds_combustibles"),
          //"易燃烧性物品",
          style: this.$t("nav.Including_liquid"),
          //"包括液体、气体和固体",
          details: this.$t("nav.liquor_gasoline"),
            //"如白酒、汽油、煤油、桐油、酒精、生漆、柴油、气雾剂、气体大火机、瓦斯气瓶、磷、硫磺、火柴等",
          img: require("@/img/meiqiguan.jpg")
        },
        {
          id: 4,
          title: this.$t("nav.corrosive_articles"),
          //"危险化学（化工）品",
          style: this.$t("nav.corrosive_articles"),
          //"各类易腐蚀性物品",
          details: this.$t("nav.hydrochloric_acid"),
          //"如火硫酸、盐酸、硝酸、有机溶剂、农药、双氧水、危险化学品等",
          img: require("@/img/nongyao.jpg")
        },
        {
          id: 5,
          title: this.$t("nav.radioactive_elements"),
          //"各类放射性无素及容器",
          style: this.$t("nav.as_uranium"),
          //"如铀、钴、镭、钚等",
          details: "",
          img: require("@/img/fangshe.jpg")
        },
        {
          id: 6,
          title: this.$t("nav.listed_poisons"), 
          //"各类列性毒药",
          style: this.$t("nav.thallium_oxide"),
          //"如铊、氧化物、砒霜等",
          details: "",
          img: require("@/img/pishuang.jpg")
        },
        {
          id: 7,
          title: this.$t("nav.cigarettes_narcotic"),
          //"香烟及麻醉药物",
          style: this.$t("nav.cigarettes_narcotic"),
          //"各类香烟及麻醉药物",
          details: this.$t("nav.organic_solvent"),
            //"如鸦片（包括罂粟壳、花、苞叶）、吗啡、可卡因、海洛因、大麻、冰毒、麻黄素及其他的制品等",
            img: require("@/img/xiangyan.jpg")
        },
        {
          id: 8,
          title: this.$t("nav.infectious_products"),
          //"各类生化制品和传染性物品",
          style: this.$t("nav.dangerous_bacteria"),
          //"如碳疽、危险性病菌、医药用废弃物等",
          details: "",
          img: require("@/img/yiliao.jpg")
        },
        {
          id: 9,
          title: this.$t("nav.endangered_national"),
          style: "",
          //"危害国家安全和社会政治稳定",
          details: this.$t("nav.publications_publicity"), 
            //"各种危害国家安全和社会政治稳定及淫秽的出版物、宣传品、印刷品、光盘、磁盘等",
            img: require("@/img/guangpan.jpg")
        },
        {
          id: 10,
          title: this.$t("nav.health_nuisance"),
          //"妨害公共卫生的物品",
          style: "",
          //"各种妨害公共卫生的物品",
          details: this.$t("nav.animal_organs"),
          //"如尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等",
          img: require("@/img/laohu.jpg")
        },
        {
          id: 11,
          title: this.$t("nav.Prohibited_articles"),
          //"禁止流通的物品",
          style: "",
          details: this.$t("nav.currency_forged"),
            //"国家法律、法规、行政规章明令禁止流通、寄递或进出境的物品。如国家秘密文件及资料、国家货币及伪造的",
            img: require("@/img/dangan.jpg")
        },
        {
          id: 12,
          title: this.$t("nav.personal_safety"),
          //"危害人身安全的物品",
          style: this.$t("nav.endanger_personal"),
          //"包装不妥，可能危害人身的安全、污染或者损毁其他寄递件、设备等",
          details: "",
            img: require("@/img/baoguo.jpg")
        },
        { 
          id: 13, title: this.$t("nav.Powder_articles"),
          //"难以辨别成分的粉末状物品", 
          style: "", 
          details: "", 
          img: require("@/img/fenmo.jpg") },
        
        {
          id: 14,
          title: this.$t("nav.Prohibited_goods"),
          //"禁止出货类物品",
          style: this.$t("nav.imitated_brand"),
          //"仿牌、汽车配件等",
          details: this.$t("nav.automobile_parts"),
            //"仿牌、汽车配件、摩托车配件、二手产品，植物种子，手机卡、银行卡等禁止出货",
            img: require("@/img/fangpai.jpg")
        },
        {
          id: 15,
          title: this.$t('nav.Other_prohibited_articles'),
          //"其他禁止寄递的物品",
          style: "",
          details: "",
          img: require("@/img/wenwu.jpg")
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.contraband-total {
  margin: 80px 0 0 110px;
  h1 {
    font-weight: 900;
    font-size: 20px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 800px;
    justify-content: space-between;
    margin-top: 10px;
    li {
      display: flex;
      //background: red;
      width: 390px;
      margin: 20px 0;
      h2 {
        width: 102px;
        height: 102px;
        border: 1px solid @ccc;
        border-radius: 5px;

        img {
          width: 102px;
          height: 102px;
          border-radius: 5px;
        }
      }
      .contraband-content {
        margin: 0 0 0 30px;
        p:nth-child(1) {
          font-size: 22px;
          color: @home-logo;
          margin: 3px 0 20px 0;
        }
        p:nth-child(2) {
          margin-bottom: 15px;
        }
        p:nth-child(3) {
          color: @home-login-btn;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
