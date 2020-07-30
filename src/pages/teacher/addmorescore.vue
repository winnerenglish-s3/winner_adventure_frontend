<template>
  <q-page
    class="row"
    :class="
      isLoadData
        ? 'bg5 justify-center items-center'
        : practiceWorld == 'Vocabulary'
        ? 'bg-vocabulary'
        : practiceWorld == 'Grammar'
        ? 'bg-grammar'
        : practiceWorld == 'Reading'
        ? 'bg-reading'
        : practiceWorld == 'Writing'
        ? 'bg-writing'
        : practiceWorld == 'Phonics'
        ? 'bg-phonics'
        : practiceWorld == 'Listening & Speaking'
        ? 'bg-listening'
        : ''
    "
  >
    <q-resize-observer @resize="onResize" />

    <div v-if="isLoadData">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <div class="col-12 row" v-if="!isLoadData">
      <div class="col relative-position" align="center">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <!-- NOTE  Type : Ready -->
          <div style="max-width:900px;width:95%;">
            <q-img
              :src="'../../statics/main/practice/score_finish.png'"
              style="max-width:1500px;width:100%;marginTop:70px"
            >
              <div class="absolute-center bg-transparent full-width q-mt-md">
                <div class="color3">
                  <span class="text-h1 text-bold">+10</span>
                  <span class="text-h2 text-bold q-px-lg">xp</span>
                </div>
              </div>
              <div
                class="absolute-bottom bg-transparent"
                style="height:calc(100% - 70%);transform:rotate(-.5deg)"
              >
                <span style="font-size:5vw;" class="text-bold">รางวัลพิเศษ</span>
              </div>
            </q-img>
          </div>
        </transition>

        <div style="height:230px;"></div>
      </div>
      <div class="self-end col-lg-4 col-xs-5">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div>
            <q-img src="../../statics/teacher-practice.png"></q-img>
          </div>
        </transition>
      </div>
      <div class="col-12 z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
        >
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <span
              class="q-pa-md"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
            >ขอบคุณแทนลูกเรือทุกคนครับกัปตัน กัปตันใจดีจังเลย</span>
            <div align="right" style="width:100%" class="q-px-lg q-py-lg">
              <q-btn
                icon="fas fa-star"
                label="ภารกิจถัดไป"
                class="bg6 color3 q-pa-xs shadow-5 text-h6 animated tada infinite"
                style="animation-duration:1.5s;"
                @click="nextLesson()"
                :disable="isClickNextLesson"
              ></q-btn>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      isClickNextLesson: false,
      level: this.decrypt(this.$q.localStorage.getItem("currentLevel"), 2),
      unit: this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2),
      practiceWorld: this.decrypt(
        this.$q.localStorage.getItem("currentWorld"),
        2
      ),
      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      isLoadData: false,
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentPractice: this.$q.localStorage.getItem("currentPractice")
    };
  },
  methods: {
    async nextLesson() {
      this.isClickNextLesson = true;
      let sendData = {
        currentPractice: this.currentPractice,
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear
      };
      this.goToNextLesson(sendData);
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {}
};
</script>
