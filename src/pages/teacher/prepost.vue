<template>
  <q-page
    class="row relative-position"
    :class="practice.type == 'pretest' ? 'bg-pretest' : 'bg-posttest'"
  >
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Table & Bar -->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated slideOutLeft duration-slide-out"
      v-if="isActiveMain"
    >
      <div class="row self-end relative-position full-width" v-if="activeType != 'start'">
        <div class="col" align="right">
          <div>
            <q-img
              v-if="practice.type == 'pretest'"
              src="../../statics/prepost/preChar.png"
              style="max-width:calc(350px + 9vw);width:100%;"
            ></q-img>

            <q-img
              v-if="practice.type == 'posttest'"
              src="../../statics/prepost/postChar.png"
              style="max-width:calc(550px + 9vw);width:100%;"
            ></q-img>

            <div
              :style="
                practice.type == 'pretest'
                  ? { height: '50px' }
                  : { height: '170px' }
              "
            ></div>
          </div>
        </div>
        <div class="col-4 relative-position">
          <q-img
            v-if="practice.type == 'pretest'"
            src="../../statics/prepost/preTest.png"
            style="left:-50px;top:50px;max-width:400px;width:100%;"
            class="absolute-top-left"
          ></q-img>

          <q-img
            v-if="practice.type == 'posttest'"
            src="../../statics/prepost/postTest.png"
            style="left:-50px;top:50px;max-width:400px;width:100%;"
            class="absolute-top-left"
          ></q-img>
        </div>
      </div>
    </transition>

    <!-- SECTION  Main Talking -->
    <div class="col-12 q-px-lg q-pb-md absolute-bottom" style="overflow:hidden;">
      <transition
        appear
        enter-active-class="animated fadeInUp duration-talk-in"
        leave-active-class="animated fadeOutDown duration-talk-out"
        v-if="isActiveMainTalk"
      >
        <div class="relative-position" v-if="activeType != 'start'">
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-pa-md">
            <div class="col q-pa-xs q-pr-md" align="left">
              <!-- NOTE  Type = Ready -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'ready'"
                v-html="talking.ready"
              ></span>

              <!-- NOTE  Active Type = Continue -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'continue'"
                v-html="talking.continue"
              ></span>

              <!-- NOTE  Active Type = finish -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'finish'"
                v-html="talking.finish"
              ></span>
            </div>
            <div
              class="col-3 self-end q-pr-md"
              style="width:400px;"
              :style="[
                activeType != 'finish' ? { width: '350px' } : { width: '200px' }
              ]"
              align="right"
            >
              <q-btn
                push
                v-if="activeType != 'finish'"
                class="bg6 color3 text-h6 q-my-md q-px-sm"
                label="เริ่มทดสอบ"
                @click="startPrepost()"
              />
              <q-btn
                v-else
                class="bg6 color3 text-h6 q-my-md q-px-sm"
                label="กลับหน้าหลัก"
                @click="backToMain()"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="col-12" v-if="activeType == 'start'">
      <!-- SECTION  Show Data -->
      <progress-data
        :collection="'studentprepostlog'"
        :practiceType="{ type: this.practice.type }"
        @finish="
          val => {
            nextStep(val.activeType);
          }
        "
      ></progress-data>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import progressData from "../../components/progress.vue";
export default {
  components: {
    progressData
  },
  data() {
    return {
      // SECTION  Data
      practice: {
        type: this.$q.localStorage.getItem("prepostType") // เก็บข้อมูลประเภทแบบฝึกหัด
      },

      // SECTION  Status Active
      activeType: "", // เก็บข้อมูลประเภท
      talking: {
        ready:
          "กัปตัน ข้าจำเป็นต้องทดสอบความสามารถของลูกเรือ หากท่านเห็นสมควร จงสั่ง “เริ่มทดสอบ” ได้เลย",
        finish:
          "<span>ทดสอบเสร็จสิ้นแล้ว ท่านสามารถพาลูกเรือกลับสู่บทเรียนได้</span>"
      },
      isActiveMain: false, // เปิดใช้งาน Animation : หน้าหลัก
      isActiveMainLogo: false, // เปิดใช้งาน Animation : โลโก้
      isActiveMainTalk: false, // เปิดใข้งาน Animation : แบบสนทนา

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1)
    };
  },
  methods: {
    backToMain() {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "main"
        })
        .then(() => {
          this.$router.push("/teacher/main/");
        });
    },
    async skipPrePost() {
      let getTime = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "main",
          date: getTime
        })
        .then(() => {
          this.$router.push("/teacher/main");
        });
    },
    async startPrepost() {
      let getTime = await this.getDateAndTime();
      this.$q.localStorage.set("startPrepost", true);
      this.$q.localStorage.remove("timerSec");
      this.$q.localStorage.remove("timerMin");
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "start-" + this.$q.localStorage.getItem("prepostType"),
          date: getTime
        })
        .then(() => {
          this.isActiveMain = false;
          this.isActiveMainLogo = false;
          this.isActiveMainTalk = false;

          setTimeout(() => {
            this.activeType = "start";
          }, 1500);
        });
    },
    nextStep(type) {
      // Status : Ready
      if (type == "ready") {
        this.isActiveMain = false;
        this.isActiveMainLogo = false;
        this.isActiveMainTalk = false;

        setTimeout(() => {
          this.activeType = "start";
        }, 1500);
      }

      // Status : Start
      else if (type == "start") {
        setTimeout(() => {
          this.activeType = "finish";
          this.isActiveMain = true;
          this.isActiveMainLogo = true;
          this.isActiveMainTalk = true;
        }, 1500);
      }

      // Status : Finish
      else {
        this.activeType = "ready";
        this.isActiveMainTalk = false;

        setTimeout(() => {
          this.isActiveMainTalk = true;
        }, 500);
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    if (this.$q.localStorage.has("startPrepost")) {
      if (this.$q.localStorage.getItem("startPrepost") == true) {
        this.isActiveMain = false;
        this.isActiveMainLogo = false;
        this.isActiveMainTalk = false;

        setTimeout(() => {
          this.activeType = "start";
        }, 2000);
      }
    } else {
      this.activeType = "ready";

      this.isActiveMain = true;
      this.isActiveMainLogo = true;
      this.isActiveMainTalk = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.sticky-lighting {
  position: absolute;
  top: 0px;
  left: 450px;
  width: 350px;
}

.sticky-table {
  position: sticky;
  top: 100%;
}

.bartender {
  left: 50%;
  transform: translate(-50%, 0);
  min-height: calc(100vh - 150px);
}

.text-size-s {
  font-size: 24px;
}

.text-size-m {
  font-size: 27px;
}

.text-size-l {
  font-size: 30px;
}

.btn-active {
  transition-duration: 0.2s;
}

.btn-active:hover {
  background-color: #ffffffe3;
}

.btn-active:active {
  background-color: #ffffffaf;
}

.duration-practice-start-in {
  animation-duration: 0.6s;
}
.duration-practice-start-out {
  animation-duration: 0.6s;
  animation-delay: 0.5s;
}

.duration-practice-logo-in {
  animation-delay: 0.6s;
}

.duration-practice-logo-out {
  animation-delay: 0.2s;
}

.duration-number-question-in {
  animation-delay: 0.6s;
}

.duration-number-question-out {
  animation-delay: 0.2s;
}

.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 0.6s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}

.duration-slide-out {
  animation-duration: 0.5s;
}

.boxtalk {
  max-height: fit-content;
  min-height: 200px;
}

.sticky-boxtalk {
  position: sticky;
  top: 100%;
}

.duration-talk-in {
  animation-delay: 0.5s;
}
.duration-talk-out {
  animation-delay: 0.3s;
}
</style>
