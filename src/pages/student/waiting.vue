<template>
  <q-page
    class="row justify-center items-center bg-cloud items-center relative-position animated fadeIn"
  >
    <div align="center" class="col-12 q-pa-md z-top">
      <q-img
        src="../../statics/paper_map.png"
        class="relative-position"
        style="max-width:1000px;width:55vw"
      >
        <div class="absolute-center full-width bg-transparent">
          <div>
            <img src="../../statics/island.png" alt style="width:18vw" />
          </div>
          <div class="q-py-md">
            <span class="color3 text-bold" style="font-size:3vw">รอกัปตันก่อนนะ</span>
          </div>
        </div>
      </q-img>
    </div>
    <waterWave></waterWave>
  </q-page>
</template>

<script>
import waterWave from "../../components/waterWave.vue";
export default {
  components: {
    waterWave
  },
  data() {
    return {};
  }
};
</script>
