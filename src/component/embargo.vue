<template>
  <div class="embargo-total">
    <ul>
      <li v-for="list in lists" :key="list.id">
        <div class="embargo-compoent-one">
          <span>{{list.qname}}</span>
          <span>{{list.name}}</span>
        </div>
        <div class="embargo-compoent-two">
          <span>{{list.aname}}</span>
          <span>{{list.ansdow}}</span>
          <p>{{list.ansowTwo}}</p>
          <p>{{list.ansowThree}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "embargo",
    data() {
      return {
        lists: [
          { id: 1, qname: "Q:", aname: "A:", name: this.$t("embargo.WhatIs-Included-InThe-Freight"),
           ansdow: this.$t("embargo.ChinaFreighTtheCostOfShipping"), 
           ansowTwo: this.$t("embargo.InternationalFreight"), 
           ansowThree: this.$t("embargo.ValueAddedServiceFee") },
          { id: 2, qname: "Q:", aname: "A:", name: this.$t("embargo.IfTheGoodsIBoughtAre"), 
          ansdow: this.$t("embargo.ourTransportationCausesDamage") },
          { id: 3, qname: "Q:", aname: "A:", 
          name: this.$t("embargo.HowToPayTheFreightOfBuyder"),
           ansdow: this.$t("embargo.HowToPayTheFreightOfByderCan") },
          { id: 4, qname: "Q:", aname: "A:", 
          name: this.$t("embargo.HowLongCanIReceiveTheGoods"),
          ansdow: this.$t("embargo.AboutDaysAfterTheOrderPlaced") },
        ]
      }
    }
  };
</script>

<style scoped lang="less">
  .embargo-total {
    margin: 45px 0 0 100px;
    ul {
      li {    
        margin: 40px 0;
       font-size: 16px;
      color: gray;
        .embargo-compoent-one {
          margin: 15px 0;

          span {
            margin: 0 5px;
          }
        }
        .embargo-compoent-two {
          margin: 15px 0;
          span {
            margin: 0 5px;
          }
          p {
           margin: 15px 0 0 30px;
          }
        }
      }
    }
  }
</style>