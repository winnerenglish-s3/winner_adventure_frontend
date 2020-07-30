<template>
  <q-page
    class="row"
    :class="
      isLoadData
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

    <div v-if="isLoadData">
      <q-spinner-facebook color="deep-orange-10" size="100" />
    </div>

    <!-- SECTION  score 1 -->
    <div class="col-12 row" v-if="!isLoadData">
      <div class="col self-center relative-position" align="center">
        <div style="max-width:900px;width:85%;">
          <q-img
            src="../../statics/main/practice/score_finish.png"
            style="max-width:1500px;width:100%;"
          >
            <div
              class="absolute-bottom-right bg-transparent"
              style="right:15px;width:calc(100% - 20%);height:calc(100% - 40%);transform:rotate(-.5deg);"
            >
              <div class="color3" style="font-size:3.5vw;width:calc(100% - 90px);">
                <div class="border3-md bg1 br-a-sm q-py-xs" align="center">
                  <span class="text-bold"></span>
                  {{
                  currentMission.name +
                  (currentMission.name != "สมบัติ"
                  ? " ระดับ "
                  : " ชิ้นที่ ") +
                  currentMission.level
                  }}
                </div>
              </div>
            </div>
            <div
              class="relative-position absolute-bottom bg-transparent"
              style="height:calc(100% - 67%);transform:rotate(-.5deg)"
            >
              <div class="absolute-center full-width" style>
                <div>
                  <span class="text-bold" style="font-size:5vw">ภารกิจสำเร็จ</span>
                </div>
              </div>
            </div>

            <div
              class="absolute-bottom bg-transparent"
              style="height:calc(100% - 25%);width:calc(100% - 87%);"
            >
              <div class="absolute-left">
                <img
                  :src="
                    '../../statics/coins/sh' + currentMission.level + '.png'
                  "
                  style="width:258.5%;"
                  v-if="currentMission.name == 'เรือ'"
                />
                <img
                  :src="'../../statics/coins/f' + currentMission.level + '.png'"
                  style="width:258.5%;"
                  v-if="currentMission.name == 'คู่หู'"
                />
                <img
                  :src="'../../statics/coins/t' + currentMission.level + '.png'"
                  style="width:258.5%;"
                  v-if="currentMission.name == 'สมบัติ'"
                />
              </div>

              <!-- <div class="absolute-left">
                <img
                  :src="
                    '../../statics/main/ship/sh' +
                      currentMission.level +
                      '_coin.png'
                  "
                  style="width:258.5%;"
                />
              </div>-->
            </div>
          </q-img>
        </div>

        <div style="height:230px;"></div>
      </div>

      <div class="self-end col-lg-4 col-xs-5">
        <div align="center">
          <q-img :src="'../../statics/teacher-practice.png'" style="max-width:700px;width:80%;"></q-img>
          <div style="height:100px;"></div>
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
            <div class="q-pa-md relative-position col-8" style="font-size:calc(17px + .5vw)">
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
            <div class="col self-end q-pa-md" align="right">
              <q-btn
                label="เลือกภารกิจ"
                @click="vote()"
                class="bg6 color3"
                style="font-size:18px;width:215px"
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
      practiceWorld: "",
      practiceKey: "",
      practiceType: "",
      shipSkill: null,
      currentPage: null,
      scoreWorld: 0,
      score: 0,
      isActiveMainTalk: true,
      isLoadData: false,
      isLoadScore: true,

      snapSync: "",
      setCount: "",

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      currentMission: ""
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

      this.isLoadScore = false;
    },
    async vote() {
      // คลิกเพื่อไปโหวต
      let date = await this.getDateAndTime();
      db.collection("classroomMission")
        .doc(this.currentMission.missionKey)
        .update({
          status: "finish"
        })
        .then(() => {
          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({ currentPage: "vote", date: date })
            .then(() => {
              this.loadingHide();
              this.$router.push("/teacher/vote");
            });
        });
    },

    getMissionScore(id) {
      let currentClass = this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      );
      let currentRoom = this.decrypt(
        this.$q.localStorage.getItem("currentRoom"),
        2
      );
      let currentTerm = this.decrypt(
        this.$q.localStorage.getItem("currentTerm"),
        2
      );
      let currentYear = this.decrypt(
        this.$q.localStorage.getItem("currentYear")
      );
      return new Promise((a, b) => {
        db.collection("studentpracticelog")
          .where("missionKey", "==", id)
          .where("class", "==", currentClass)
          .where("room", "==", currentRoom)
          .where("year", "==", currentYear)
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .get()
          .then(doc => {
            let tempScore = 0;
            doc.forEach(element => {
              if (element.data().practiceType == "translation") {
                if (typeof element.data().correct == "number") {
                  tempScore += Math.round(element.data().correct / 4);
                }
              } else {
                if (typeof element.data().correct == "number") {
                  tempScore += element.data().correct;
                }
              }
            });

            let classroomDocName = `${currentClass}-${currentRoom}-${currentTerm}-${currentYear}-${this.teacherData.schoolKey}`;

            db.collection("classroomScoreBalance")
              .doc(classroomDocName)
              .get()
              .then(balance => {
                if (balance.exists) {
                  a(tempScore + balance.data().scoreBalance);
                } else {
                  a(tempScore);
                }
              });
          });
      });
    },
    async buddyDiscount() {
      // ฟังก์ชันหาส่วนลด
      return new Promise((a, b) => {
        let buddyDiscount = 0;
        let totalStudent = this.decrypt(
          this.$q.localStorage.getItem("totalStudent"),
          2
        );

        let currentClass = this.decrypt(
          this.$q.localStorage.getItem("currentClass"),
          2
        );
        let currentRoom = this.decrypt(
          this.$q.localStorage.getItem("currentRoom"),
          2
        );

        let currentYear = this.decrypt(
          this.$q.localStorage.getItem("currentYear")
        );

        db.collection("classroomMission")
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("class", "==", currentClass)
          .where("room", "==", currentRoom)
          .where("year", "==", currentYear)
          .where("status", "==", "finish")
          .get()
          .then(doc => {
            let allMission = this.decrypt(
              this.$q.localStorage.getItem("allMission"),
              1
            );
            let passedMission = [];
            doc.forEach(element => {
              passedMission.push(element.data());
            });

            let passedMissionMap = passedMission.map(x => x.currentMissionKey);
            let finishBuddyArr = [];
            allMission.forEach(mission => {
              if (
                passedMissionMap.includes(mission.key) &&
                mission.name == "คู่หู"
              ) {
                finishBuddyArr.push(mission);
              }
            });

            finishBuddyArr.sort((a, b) => Number(b.level) - Number(a.level));
            let lastBuddy = finishBuddyArr[0];
            if (finishBuddyArr.length) {
              buddyDiscount = Number(lastBuddy.status) * totalStudent;
            } else {
              buddyDiscount = 0;
            }
            if (!buddyDiscount) {
              buddyDiscount = 0;
            }
            a(buddyDiscount);
          });
      });
    },
    async setInitialData() {
      // NOTE ต้องเช็คสิทธิ์ในการเข้าถึงหน้านี้ เช่น ต้องส่ง local อะไรสักอย่างมา เพื่อให้หน้านี้ทำงาน
      // หากไม่มีค่านั้นต้องไม่ทำงาน
      this.practiceWorld = this.currentPractice.skill;
      // this.practiceWorld = "Vocabulary";

      let scoreMission = 0;

      let currentClass = this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      );
      let currentRoom = this.decrypt(
        this.$q.localStorage.getItem("currentRoom"),
        2
      );
      let currentTerm = this.decrypt(
        this.$q.localStorage.getItem("currentTerm"),
        2
      );
      let currentYear = this.decrypt(
        this.$q.localStorage.getItem("currentYear")
      );

      let allMission = this.decrypt(
        this.$q.localStorage.getItem("allMission"),
        1
      );

      db.collection("classroomMission")
        .where("class", "==", currentClass)
        .where("room", "==", currentRoom)
        // .where("term", "==", currentTerm)
        .where("year", "==", currentYear)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("status", "==", "current")
        .get()
        .then(async doc => {
          let filterMission = allMission.filter(
            x => x.key == doc.docs[0].data().currentMissionKey
          );

          let missionKey = doc.docs[0].id;
          this.currentMission = { ...filterMission[0], missionKey: missionKey };

          // NOTE คะแนนภารกิจทั้งหมดของลูกเรือทำ
          let missionScore = await this.getMissionScore(
            doc.docs[0].data().currentMissionKey
          );

          let discount = await this.buddyDiscount();
          console.log("ส่วนลด", discount);

          console.log("missionScore", missionScore);

          let totalStudent = this.decrypt(
            this.$q.localStorage.getItem("totalStudent"),
            2
          );

          let currentMissionScore =
            Number(this.currentMission.goal) * totalStudent;
          currentMissionScore = currentMissionScore - discount;

          console.log("currentMissionScore", currentMissionScore);

          let balanceScore = missionScore - currentMissionScore;

          let classroomDocName = `${currentClass}-${currentRoom}-${currentTerm}-${currentYear}-${this.teacherData.schoolKey}`;

          if (balanceScore < 0) {
            balanceScore = 0;
          }
          console.log("balanceScore", balanceScore);

          db.collection("classroomMission")
            .doc(missionKey)
            .update({
              status: "finish"
            })
            .then(() => {
              db.collection("classroomScoreBalance")
                .doc(classroomDocName)
                .set({
                  scoreBalance: balanceScore
                })
                .then(() => {
                  db.collection("synchronize")
                    .doc(this.teacherData.key)
                    .update({
                      missionScore: balanceScore
                    })
                    .then(() => {
                      this.$q.localStorage.set("missionScore", balanceScore);
                    });
                });
            });
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  created() {
    this.setInitialData();
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
