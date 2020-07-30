<template>
  <div>
    <div class="row q-gutter-sm">
      <q-btn
        flat
        class="bg1 border3-xl q-py-sm q-px-xs br-a-md no-pointer-events"
        icon="far fa-clock"
        size="lg"
      >
        <span v-if="!isTimeOut" class="text-h5 q-pl-sm" style="width:100px;">{{ showPracticeTime }}</span>
        <span
          v-else
          class="text-h5 q-pl-sm animated flash infinite text-red"
          style="animation-duration:1.5s"
        >หมดเวลา</span>
      </q-btn>
    </div>

    <increase-time
      v-if="showCountdownDialog"
      :isShowDialog="showCountdownDialog"
      @emitShowDialog="getEmitData"
    ></increase-time>
  </div>
</template>

<script>
import increaseTime from "./increaseTime.vue";
export default {
  components: {
    increaseTime
  },
  props: {
    practiceTimeProps: {
      type: String,
      default: "00:00"
    },
    isExtraTime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isTimeOut: false,
      showPracticeTime: "--:--",
      countdownInterval: "",
      showCountdownDialog: false
    };
  },
  methods: {
    getEmitData(val) {
      this.showCountdownDialog = val;
    },
    countdownTimer() {
      this.isTimeOut = false;
      let min = this.$q.localStorage.has("countdownMin")
        ? this.$q.localStorage.getItem("countdownMin")
        : Number(this.practiceTimeProps.split(":")[0]);
      let second = this.$q.localStorage.has("countdownSec")
        ? this.$q.localStorage.getItem("countdownSec")
        : Number(this.practiceTimeProps.split(":")[1]);
      this.countdownInterval = setInterval(() => {
        if (this.isExtraTime) {
          // NOTE กรณีเป็นแบบฝึกหัดที่ต้องต่อเวลาได้
          min = this.$q.localStorage.has("countdownMin")
            ? this.$q.localStorage.getItem("countdownMin")
            : min;
          if (min <= 0 && second <= 0) {
            this.isTimeOut = true;
            clearInterval(this.countdownInterval);
            this.$emit("isTimeout", true);
          } else {
            if (second == 0) {
              min -= 1;
              second = 60;
            }
            second--;
          }

          if (!this.$q.localStorage.getItem("isExtraTime")) {
            // NOTE กรณียังไม่ต่อเวลา ให้ขึ้น dialog ต่อเวลาตอนเวลาเหลือ 30 วินาที
            if (min == 0 && second == 30) {
              this.showCountdownDialog = true;
            }
          }
        } else {
          if (second == 0) {
            second = 60;
            min -= 1;
          }
          second--;

          if (min <= 0 && second <= 0) {
            this.isTimeOut = true;
            clearInterval(this.countdownInterval);
            this.$emit("isTimeout", true);
          }
        }

        if (min < 0) {
          this.isTimeOut = true;
          clearInterval(this.countdownInterval);
          this.$emit("isTimeout", true);
        }

        this.$q.localStorage.set("countdownMin", min);
        this.$q.localStorage.set("countdownSec", second);

        let showMin = min < 10 ? `0${min}` : min;
        let showSec = second < 10 ? `0${second}` : second;
        this.showPracticeTime = `${showMin}:${showSec}`;
      }, 1000);
    }
  },
  mounted() {
    this.countdownTimer();
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  }
};
</script>

<style lang="scss" scoped>
.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 0.5s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}
</style>