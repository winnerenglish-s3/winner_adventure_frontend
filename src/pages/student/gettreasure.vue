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
        <div style="max-width:900px;width:85%;">
          <q-img
            src="../../statics/main/practice/score_upgrade.png"
            style="max-width:1500px;width:100%;"
          >
            <div
              class="absolute-bottom bg-transparent full-width"
              style="height:calc(100% - 37%);transform:rotate(-.5deg)"
            >
              <div
                class="color3"
                style="font-size:4.7vw"
                :class="{ 'q-pl-xl q-ml-lg': studentData.ship != null }"
              >
                <div>
                  <span class="text-bold absolute color10 slideDownAnimated">{{ "+ " + shipSkill }}</span>
                  <span class="text-bold">{{ "+ 100" + " คะแนน" }}</span>
                </div>
              </div>
            </div>
            <div
              class="relative-position absolute-bottom bg-transparent"
              style="height:calc(100% - 70%);transform:rotate(-.5deg)"
            >
              <div class="absolute-center full-width">
                <div>
                  <span
                    class="text-bold"
                    style="font-size:2.4vw;margin-left:60px;"
                  >+ คะแนนความสามารถสมบัติ</span>
                </div>
              </div>
            </div>

            <div
              class="absolute-bottom bg-transparent"
              style="height:calc(100% - 55%);width:calc(100% - 90%);"
            >
              <div class="absolute-left">
                <img
                  :src="
                    '../../statics/main/ship/sh' +
                      missionCurrent.level +
                      '_coin.png'
                  "
                  style="width:258.5%;"
                />
              </div>
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
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <div class="q-pa-md" style="font-size:calc(17px + .5vw)">
              <span
                class="q-pa-md"
                :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              >
                <span>เก่งมากทุกคน เตรียมตัวสำหรับภารกิจต่อไปกันเถอะ</span>
              </span>
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
      practiceWorld: "",
      practiceKey: "",
      practiceType: "",
      shipSkill: null,
      currentPage: null,
      scoreWorld: 0,
      score: 0,
      missionCurrent: this.decrypt(
        this.$q.localStorage.getItem("currentMission"),
        1
      ),

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
    loadScore() {
      if (this.isLoadData) {
        return;
      }

      this.isLoadData = true;

      if (this.$q.localStorage.has("lastPracticeLog")) {
        let getScore = this.$q.localStorage.has("lastPracticeLog")
          ? this.decrypt(this.$q.localStorage.getItem("lastPracticeLog"), 1)
              .correct
          : 0;

        if (this.practiceWorld == "Writing") {
          this.score = Math.ceil(getScore / 4);
        } else {
          this.score = getScore;
        }

        this.shipSkill =
          this.studentData.ship == null
            ? 0
            : Number(this.studentData.ship.skill);

        if (this.shipSkill != 0) {
          let finisScore = this.score + this.shipSkill;
          setTimeout(() => {
            for (let i = 0; i < this.shipSkill; i++) {
              this.score++;
            }
          }, 2150);
        }
      } else {
        this.score = 0;
      }
    },
    loadSynchronize() {
      this.snapSync = db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.practiceWorld = doc.docs[0].data().skill;
          this.currentPage = doc.docs[0].data().currentPage;
          this.practiceType = doc.docs[0].data().practicetype;

          if (this.currentPage == "finish-world") {
            this.scoreWorld = doc.docs[0].data().summaryWorld.filter(x => {
              return x.key == this.studentData.key;
            })[0].totalScore;
          }

          if (!this.isLoadData) {
            this.loadScore();
          }
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
    this.snapSync();
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
