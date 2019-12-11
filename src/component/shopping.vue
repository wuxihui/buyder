<template>
  <div class="shopping-total">
    <ul>
      <li v-for="list in lists" :key="list.id">
        <p>
          <span>{{list.qname}}</span>
          <span>{{list.name}}</span>
        </p>
        <p>
          <span>{{list.aname}}</span>
          <span>{{list.ansdow}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "shopping",
  data() {
    return {
      lists: [
        {
          id: 1,
          qname: "Q:",
          aname: "A:",
          name: this.$t("shopping.shoppingQ1"),
          ansdow: this.$t("shopping.shoppingA1")
        },
        {
          id: 2,
          qname: "Q:",
          aname: "A:",
          name: this.$t("shopping.shoppingQ2"),
          ansdow: this.$t("shopping.shoppingA2")
        },
        {
          id: 3,
          qname: "Q:",
          aname: "A:",
          name: this.$t("shopping.shoppingQ3"),
          ansdow: this.$t("shopping.shoppingA3")
        },
        {
          id: 4,
          qname: "Q:",
          aname: "A:",
          name: this.$t("shopping.shoppingQ4"),
          ansdow: this.$t("shopping.shoppingA4")
        },
        {
          id: 5,
          qname: "Q:",
          aname: "A:",
          name: this.$t("shopping.shoppingQ5"),
          ansdow: this.$t("shopping.shoppingA5")
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.shopping-total {
  margin: 45px 0 0 100px;

  ul {
    li {
      margin: 40px 0;
      font-size: 16px;
      color: gray;
      p {
        margin: 15px 0;
        span {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>