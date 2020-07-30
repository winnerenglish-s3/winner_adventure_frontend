<template>
  <div>
    <q-resize-observer @resize="onResize" />
    <!-- SECTION  Main Practice  -->
    <div class="q-pa-md">
      <transition
        appear
        enter-active-class="animated zoomIn duration-practice-start-in"
        leave-active-class="animated bounceOut duration-practice-start-out"
        v-if="isActivePractice"
      >
        <div class="row box-practice q-px-xl relative-position">
          <div class="col-12" style="z-index:5">
            <div class="bg5 br-a-md q-pa-md">
              <div>
                <div
                  class="text-h6 q-pa-md br-a-md"
                  style="border:1px dashed #000;border-width:2px;"
                >
                  <!-- NOTE  Body Content : แเสดงข้องมูลการทำแบบฝึกหัด -->
                  <div class="row justify-center items-center box-timer" v-if="isLoadData">
                    <q-spinner-hourglass color="deep-orange-10" size="100" />
                  </div>

                  <div class="row justify-center items-center box-timer" v-if="!isLoadData">
                    <transition
                      appear
                      enter-active-class="animated bounceIn duration-timer-in"
                      leave-active-class="animated bounceOut duration-timer-out"
                      v-if="isActivePracticeTimer"
                    >
                      <!-- NOTE  Timer : แสดงข้อมูลเวลา -->
                      <div class="col-md-9 col-lg-9 col-xs-10" align="center">
                        <div class="row bg1 q-py-xl border3-xxl br-a-lg">
                          <div
                            class="col-2"
                            align="right"
                            :style="[innerWidth > 1280 ? {width:'250px'} : {width:'200px'}]"
                          >
                            <q-icon
                              name="far fa-clock"
                              class="q-pr-md"
                              size="200px"
                              v-if="innerWidth > 1280"
                            ></q-icon>
                            <q-icon
                              name="far fa-clock"
                              class="q-pr-md"
                              size="150px"
                              v-if="innerWidth < 1281"
                            ></q-icon>
                          </div>
                          <div class="col self-center relative-position">
                            <span
                              v-if="!isTimeOut"
                              class="text-h5 q-pl-sm absolute"
                              :style="[innerWidth > 1280 ? {fontSize:'150px'} : {fontSize:'100px'}]"
                              style="left:50%;top:50%;transform:translate(-50%,-50%)"
                            >
                              <span>{{practice.timer}}</span>
                            </span>
                            <span
                              v-if="isTimeOut"
                              class="animated flash infinite duration-timeout text-red"
                              :style="[innerWidth > 1280 ? {fontSize:'100px'} : {fontSize:'70px'}]"
                            >หมดเวลา</span>
                          </div>
                        </div>

                        <!-- NOTE  Student Data : แสดงข้อมูลเด็กนักเรียน -->
                        <div class="row justify-between bg1 q-py-md border3-xl br-a-lg q-mt-md">
                          <div class="col q-pa-sm self-center q-pl-lg" align="left">
                            <span
                              :class="{'text-h3':innerWidth > 1280,'text-h4':innerWidth > 1200 && innerWidth < 1281,'text-h5':innerWidth < 1201}"
                            >จำนวนนักเรียนที่ทำเสร็จ</span>
                          </div>
                          <div class="col-2 self-center" style="width:70px;">
                            <q-icon name="fas fa-user" size="70px"></q-icon>
                          </div>
                          <div class="col-3 self-center" style="width:200px;">
                            <span class="text-h4">{{ finishStudent }} / {{totalStudent}} คน</span>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>

                  <!-- NOTE  Footer Content : แสดงข้อมูลล่างสุด -->
                  <div align="center" class="q-mt-md" v-if="!isLoadData">
                    <q-btn
                      label="เสร็จสิ้น"
                      class="q-py-xs q-px-lg bg3 color6"
                      style="font-size:18px;"
                      @click="finishBtn()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  props: ["practiceType", "finishStudent", "totalStudent"],
  data() {
    return {
      student: {
        finish: 0, // ข้อมูลนักเรียนที่ทำเสร็จแล้ว
        data: []
      },

      // SECTION  Data
      practice: {
        type: this.practiceType.type, // ประเภทแบบฝึกหัด
        timer: "00:00"
      },

      setTimer: "",

      isArrowLeft: false, // เปิดใช้งานปุ่ม : กดเปลื่ยนรูปแบบ
      isArrowRight: true, // เปิดใช้งานปุ่ม : กดเปลื่ยนรูปแบบ

      isActivePractice: true, // เปิดใช้งาน Animation : เปิดใช้งานแบบฝึกหัด
      isActivePracticeTimer: true, // เปิดใช้งาน Animation : ตัวจับเวลา
      isActivePracticeLogo: true,
      isLoadData: true, // เปิดใช้งานโหลดข้อมูล
      isTimeOut: false,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    finishBtn() {
      clearInterval(this.setTimer);
      this.isActivePractice = false;
      this.isActivePracticeTimer = false;
      this.$emit("finish", {
        activeType: "start"
      });
    },
    timer() {
      let min = this.$q.localStorage.has("timerMin")
        ? this.$q.localStorage.getItem("timerMin")
        : 2;
      let sec = this.$q.localStorage.has("timerSec")
        ? this.$q.localStorage.getItem("timerSec")
        : 0;

      this.setTimer = setInterval(() => {
        if (min == 0 && sec == 0) {
          clearInterval(this.setTimer);
          this.isTimeOut = true;
        } else {
          if (sec == 0) {
            min--;
            sec = 60;
          }
          sec--;
          this.$q.localStorage.set("timerMin", min);
          this.$q.localStorage.set("timerSec", sec);
        }
        let showSec = sec < 10 ? "0" + sec : sec;
        let showMin = min < 10 ? "0" + min : min;
        this.practice.timer = showMin + ":" + showSec;
      }, 1000);
    },
    handleSwipe({ evt, ...info }) {
      if (this.isArrowRight) {
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
        this.showProgress = "two";
      } else {
        this.showProgress = "one";
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoadData = false;
      this.timer();
    }, 800);
  },
  beforeDestroy() {
    clearInterval(this.setTimer);
    this.$q.localStorage.remove("timerMin");
    this.$q.localStorage.remove("timerSec");
  }
};
</script>

<style lang="scss" scoped>
// Progress
.box-timer {
  height: fit-content;
  min-height: calc(100vh - 340px);
}

// Duration

.duration-practice-start-in {
  animation-duration: 0.6s;
}
.duration-practice-start-out {
  animation-duration: 0.6s;
  animation-delay: 0.5s;
}

.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 0.5s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}
.duration-timeout {
  animation-duration: 2s;
}
</style>