<template>
  <div class="standby-total">
    <p>
      <span>{{ $t("set.link") }}:</span>
      <span>http</span>
    </p>
    <p>
      <span>{{ $t("set.commodity price") }}:</span>
      <input type="text" v-model="inputPrice" />
    </p>
    <p>
      <span>{{ $t("set.Buying commission") }}:</span>
      <input type="text" v-model="inputFormal" />
    </p>
    <p>
      <span>{{ $t("set.platform freight") }}:</span>
      <input type="text" v-model="inputPlatform" />
    </p>
    <p>
      <span>{{ $t("set.specifications") }}:</span>
      <input
        type="text"
        v-model="inputRuler"
        :placeholder="$t('box.PleaseInput')"
      />
    </p>
    <p>
      <span>{{ $t("details.number") }}:</span>
      <span>888</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      inputPrice: "",
      inputFormal: "",
      inputPlatform: "",
      inputRuler: ""
    };
  }
};
</script>

<style scoped lang="less">
.standby-total {
    width: 1200px;
    margin: 0 auto;
}
</style>
