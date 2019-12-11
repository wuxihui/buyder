<template>
  <div class="regActives-total">
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
    name: "RegActives",
    data() {
      return {
        lists: [
          { id: 1, qname: "Q:", aname: "A:", name: this.$t('regActives.shoulIwriteDownTheAddress'), ansdow: this.$t('regActives.weUseSunshineCustomsClearance') },
          { id: 2, qname: "Q:", aname: "A:", name: this.$t('regActives.shipped_together'), ansdow: this.$t('regActives.that_you_check') },
        ]
      }
    },
  };
</script>

<style scoped lang="less">
  .regActives-total {
    margin: 45px 0 0 110px;
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