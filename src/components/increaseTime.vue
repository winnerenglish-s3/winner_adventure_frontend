<template>
  <q-dialog v-model="isShowDialog" content-class="backdrop" persistent>
    <q-card class="q-pa-md bg-transparent no-shadow">
      <q-card-section align="center" class="bg5 q-pa-md">
        <q-btn
          class="absolute-top-right text-h6 bg7 color1"
          round
          icon="fas fa-times"
          style="top:-15px;right:-15px"
          @click="closePopup()"
        ></q-btn>
        <div class="row items-center q-pa-md" style="border:1px dashed #662707;border-width:2px">
          <div align="center" class="col-12">
            <div class="q-pa-md">
              <div class="text-h5 color3">เวลาใกล้หมด ต้องการต่อเวลาเพิ่มไหม?</div>
            </div>
          </div>
          <div class="q-pa-md text-h2 col-12" align="center">
            <div
              class="bg-white flex flex-center"
              style="border-radius:10px;border:8px solid #662707;width:400px;height:120px"
            >
              <span
                style="color:#81161E;letter-spacing:3px"
                class="row items-center justify-center"
              >
                <span class="q-pr-md">
                  <q-icon size="65px" name="far fa-clock"></q-icon>
                </span>
                <span class="self-end">{{ showTime }}</span>
              </span>
            </div>
          </div>

          <div align="center" class="q-pt-sm col-12">
            <q-btn
              push
              label="ต่อเวลาเพิ่ม 2 นาที"
              style="height:80px"
              icon="fas fa-clock"
              class="bg3 text-h5 color6"
              @click="increaseTime()"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ["isShowDialog"],
  data() {
    return {
      timInterval: "",
      showTime: ""
    };
  },
  methods: {
    closePopup() {
      this.$emit("emitShowDialog", false);
      this.$q.localStorage.set("isExtraTime", true);
    },
    increaseTime() {
      this.$q.localStorage.set("timerMin", 2);
      this.$q.localStorage.set("countdownMin", 2);
      this.$q.localStorage.set("isExtraTime", true);
      this.$emit("emitShowDialog", false);
    },
    runInterval() {
      let sec = this.$q.localStorage.getItem("countdownSec");
      this.timInterval = setInterval(() => {
        if (sec == 0) {
          clearInterval(this.timInterval);
        } else {
          sec--;
        }
        let showSec = sec >= 10 ? sec : "0" + sec;
        this.showTime = "00:" + showSec;
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timInterval);
  },
  mounted() {
    this.runInterval();
  }
};
</script>

<style lang="scss" scoped>
</style>