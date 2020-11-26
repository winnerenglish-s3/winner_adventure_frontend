<template>
  <q-page
    class="row"
    :class="
      !isLoadData
        ? 'bg5 flex flex-center'
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

    <div v-if="!isLoadData">
      <q-spinner-facebook color="deep-orange-10" size="100" />
    </div>

    <!-- SECTION  score 1 -->
    <div class="col-12 row" v-if="isLoadData">
      <div class="col self-center relative-position" align="center">
        <div style="max-width:900px;width:95%;">
          <q-img
            src="../../statics/main/practice/score_finish.png"
            style="max-width:1500px;width:100%;"
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

        <div style="height:230px;"></div>
      </div>

      <div class="self-end col-lg-4 col-xs-5">
        <div align="center">
          <q-img
            src="../../statics/buddy/friend0.png"
            style="max-width:700px;width:80%;"
            v-if="studentData.buddy == null"
          ></q-img>

          <q-img
            :src="
              '../../statics/buddy/friend' + studentData.buddy.level + '.png'
            "
            style="max-width:700px;width:80%;"
            v-else
          ></q-img>

          <div class="q-mb-md" style="height:70px;"></div>
        </div>
      </div>
      <div class="col-12 z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div
            class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md"
            align="left"
          >
            <span
              class="q-pa-lg"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
            >
              <span>{{
                charTalking(
                  currentPage,
                  practiceType,
                  studentData.buddy == null ? "0" : studentData.buddy.level
                )
              }}</span>
            </span>
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
      currentPage: "",
      practiceWorld: "",
      practiceType: "",
      practiceKey: "",

      isActiveMainTalk: true,
      isLoadData: false,

      snapSync: "",
      setCount: "",

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    async loadSynchronize() {
      let dateTime = await this.getDateAndTime();

      this.snapSync = db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .where("currentDate", "==", dateTime.date)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.practiceWorld = doc.docs[0].data().skill;
          this.currentPage = doc.docs[0].data().currentPage;
          this.practiceType = doc.docs[0].data().practicetype;

          this.isLoadData = true;
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    if (typeof this.snapSync == "function") {
      this.snapSync();
    }
  }
};
</script>

<style lang="scss" scoped>
.duration-talk-in {
  animation-duration: 0.5s;
}

.duration-talk-out {
  animation-duration: 1s;
}

.slideDownAnimated {
  animation-name: slideDown;
  animation-delay: 1.5s;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
  top: 0%;
  left: 32.5%;
  transform: translate(-7%, -60%);
  -webkit-transform: translate(-7%, -60%);
  opacity: 0;
}

@keyframes slideDown {
  0% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0;
  }

  10% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 0.5;
  }

  40% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }

  50% {
    top: 0%;
    transform: translate(-7%, -60%);
    -webkit-transform: translate(-7%, -60%);
    opacity: 1;
  }
  90% {
    top: 0%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 1;
  }

  99% {
    opacity: 0.5;
  }

  100% {
    top: 0%;
    transform: translate(-7%, -0%);
    -webkit-transform: translate(-7%, -0%);
    opacity: 0;
  }
}
</style>
