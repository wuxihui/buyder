<template>
  <div class="nav-total">
    <div class="nav-course">
      <div class="nav-course-list">
        <div class="nav-course-link">
          <p v-show="isLink"></p>
          <h1 @click="handleCourse(1)">{{$t("nav.Buyer_tutorial")}}</h1>
        </div>
        <ul>
          <li
            v-for="list in buyNavs"
            :key="list.id"
            @click="handleColor(list.id)"
            :style="{ color: isColor == list.id ? '#d33319' : '' }"
          >
            {{ list.name }}
          </li>
        </ul>
        <div class="nav-problem">
          <div class="nav-problem-list">
            <div class="nav-problem-link">
              <p v-show="!isLink"></p>
              <h1 @click="handleProblem(1)">
                {{ $t("nav.Kelp treasure tutorial") }}
              </h1>
            </div>
            <ul>
              <li
                v-for="list in lists"
                :key="list.id"
                @click="handleColorProblem(list.id)"
                :style="{ color: isColorProblem == list.id ? '#d33319' : '' }"
              >
                {{ list.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Trans v-if="isIndex === 1" />
      <Shopping v-if="isIndex === 2" />
      <Embargo v-if="isIndex === 3" />
      <Procurement v-if="iscCourseIndex == 1" />
      <Contraband v-if="iscCourseIndex == 2" />
    </div>
  </div>
</template>

<script>
import Trans from "@/component/RegActives.vue";
import Shopping from "@/component/shopping.vue";
import Embargo from "@/component/embargo.vue";
import Contraband from "@/component/contraband.vue";
import Procurement from "@/component/procurement.vue";
export default {
  name: "Nav",
  data() {
    return {
      isLink: true, //控制左边的边框
      isColor: 1,
      isColorProblem: 0,
      isIndex: 0,
      iscCourseIndex: 1,
      buyNavs: [
        { id: 1, name: this.$t("nav.Shopping") },
        { id: 2, name: this.$t("nav.cargo") }
      ],
      lists: [
        { id: 1, name: this.$t("nav.OrderIssue") },
        { id: 2, name: this.$t("nav.UsageProblems") },
        { id: 3, name: this.$t("nav.ContainerProblem") }
      ]
    };
  },
  methods: {
    //buyder教程小标题
    handleColor(id) {
      this.isColor = id;
      this.isLink = true;
      this.isColorProblem = 0;
      this.isIndex = 0;
      //this.isIndex = id;
      //console.log(666, id);
      this.iscCourseIndex = id;
    },
    //buyder教程大标题
    handleCourse(zero) {
      this.handleColor(zero);
    },
    //常见问题小标题
    handleColorProblem(id) {
      this.isColorProblem = id;
      this.isColor = 0;
      // console.log(888, id);
      this.isLink = false;
      this.isIndex = id;
      this.iscCourseIndex = 0;
    },
    //常见问题小标题
    handleProblem(one) {
      this.handleColorProblem(one);
    }
  },
  components: {
    Trans,
    Shopping,
    Embargo,
    Contraband,
    Procurement
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

.nav-total {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
  .nav-course {
    display: flex;
    .nav-course-link {
      display: flex;
      margin-top: 30px;

      p {
        width: 8px;
        height: 30px;
        background: @home-logo;
        margin-right: 10px;
      }

      h1 {
        height: 30px;
        margin: 8px 0 0 10px;
        font-size: 14px;
        font-weight: 900;
        cursor: pointer;
      }
    }

    ul {
      margin-left: 45px;

      li {
        margin: 18px 0;
        cursor: pointer;
        min-width: 170px;
      }

      li:hover {
        color: @home-logo;
      }
    }

    .nav-problem {
      .nav-problem-link {
        display: flex;
        margin-top: 30px;

        p {
          width: 8px;
          height: 30px;
          background: @home-logo;
          margin-right: 10px;
        }

        h1 {
          height: 30px;
          margin: 8px 0 0 10px;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          min-width: 170px;
        }
      }

      ul {
        margin-left: 45px;

        li {
          margin: 18px 0;
          min-width: 170px;
          cursor: pointer;
        }

        li:hover {
          color: @home-logo;
        }
      }
    }
  }
}
</style>
