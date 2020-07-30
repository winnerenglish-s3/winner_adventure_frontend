<template>
  <q-page class="q-pa-md color3 bg-grammar bg-blend-mode animated fadeIn">
    <div class="relative-position" align="center">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-slide-in"
        leave-active-class="animated fadeOutUp duration-slide-out"
      >
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="border-dashed br-a-sm q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">สอนไวยากรณ์</span>
          </div>
        </div>
      </transition>

      <!-- NOTE  Timer : ตัวจับเวลา -->
      <div class="absolute-bottom-right" style="bottom:15px;">
        <transition
          appear
          enter-active-class="animated bounceIn duration-timer-in"
          leave-active-class="animated bounceOut duration-timer-out"
        >
          <countdown-timer
            class="relative-position"
            style="top:20px"
            :practiceTimeProps="currentPractice.time"
          ></countdown-timer>
        </transition>
      </div>
    </div>

    <div class="col-12 q-mt-md" v-if="isLoadLesson">
      <div class="row">
        <div style="width:300px;" class="col-4 bg3 q-pa-md br-tl-md br-bl-md">
          <q-scroll-area style="height:550px;">
            <div class="q-py-xs" v-for="(item, index) in practiceData" :key="index">
              <div
                v-ripple
                @click="showData(item, index)"
                align="left"
                class="q-pa-md row relative-position br-a-xs"
                style="width:100%"
                :class="[isShowVideo ? 'no-pointer-events' : 'cursor-pointer',
                  activeIndex == index ? 'bg6' : null,
                  activeIndex != index ? 'bg5' : null
                ]"
              >
                <div class="self-center col-1 q-pr-sm" style="width:40px" v-if="item.isNew">
                  <q-icon
                    :class="{ color10: passedLessonMap.includes(item.key) }"
                    name="fas fa-play-circle"
                    size="28px"
                  ></q-icon>
                </div>
                <div class="self-center col-1 q-pr-md" style="width:40px" v-else>
                  <q-icon
                    :class="{ color10: passedLessonMap.includes(item.key) }"
                    name="fas fa-sticky-note"
                    size="28px"
                  ></q-icon>
                </div>
                <div class="col self-center" align="left">{{ item.slideName }}</div>
                <q-badge color="red" floating transparent v-show="item.isNew">new</q-badge>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <!--  -->

        <div
          class="row col bg5 q-pa-sm relative-position br-tr-md br-br-md"
          style="border-top-right-radius:5px;border-bottom-right-radius:5px"
        >
          <!-- รูปภาพ / VIDEO -->
          <div align="center" class="col-12 self-start">
            <q-img
              style="max-width:1000px;width:100%"
              :src="displayData.imgURL"
              v-show="!displayData.isNew"
            ></q-img>
            <video
              v-show="displayData.isNew"
              id="myVideo"
              style="max-width:1000px;width:100%;"
              :src="displayData.vdoURL"
              :poster="displayData.imgURL"
              controls
            ></video>
          </div>

          <div class="row col-12 q-pa-md q-pt-lg self-end">
            <div align="left" class="col">
              <q-btn
                style="width:150px"
                v-if="!isPlay"
                :class="
                  displayData.isNew ? 'bg3 color6' : 'bg11 text-white'
                "
                @click="playVideo()"
                :disable="!displayData.isNew"
                align="left"
              >
                <q-icon name="fas fa-play" class="q-mr-md"></q-icon>
                <span class="text-h6">เล่นวีดีโอ</span>
              </q-btn>

              <q-btn
                style="min-width:150px"
                v-else
                :class="
                  displayData.isNew ? 'bg3 color6' : 'bg11 text-h6 text-white'
                "
                @click="playVideo()"
                :disable="!displayData.isNew"
              >
                <q-icon name="fas fa-pause" class="q-pr-sm"></q-icon>
                <span class="text-h6">เล่นวีดีโอ</span>
              </q-btn>
            </div>

            <div align="right" class="col">
              <q-btn
                :disable="isClickFinishMission"
                class="bg3 color6"
                style="width:150px"
                @click="finishLesson()"
              >
                <span class="text-h6">จบภารกิจ</span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-check-login
      v-if="isDialogPopup"
      :propsData="sendDataDialog"
      @dataclose="val => closePopupFunction(val)"
    ></dialog-check-login>
  </q-page>
</template>

<script>
import { db } from "../../router";
import dialogCheckLogin from "../../components/dialogchecklogin.vue";
import countdownTimer from "../../components/countdownTimer";
export default {
  components: {
    dialogCheckLogin,
    countdownTimer
  },
  data() {
    return {
      isClickFinishMission: false,
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      practiceData: [],
      displayData: "",
      isAllowEndPractice: false,
      isLoadLesson: false,
      activeIndex: 0,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentLevel: this.decrypt(
        this.$q.localStorage.getItem("currentLevel"),
        2
      ),
      passedLesson: "",
      passedLessonMap: "",
      snapGetLesson: "",
      isPlay: false,
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      isTimeOut: false,
      practiceTimer: "10 : 00",
      timeInterval: "",
      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      isDialogPopup: false,
      isShowVideo: false
    };
  },
  methods: {
    closePopupFunction(val) {
      this.isDialogPopup = false;
      this.isClickFinishMission = false;
    },
    async finishLesson() {
      this.isClickFinishMission = true;
      let countPassedVdoLesson = this.passedLesson.filter(x => x.isVdo);
      let countTotalVdoInLesson = this.practiceData.filter(x => x.isNew).length;

      console.log(countTotalVdoInLesson);

      this.$q.localStorage.set(
        "finishGrammarLessonVdo",
        countTotalVdoInLesson - countPassedVdoLesson.length
      );

      if (countPassedVdoLesson.length != countTotalVdoInLesson) {
        // NOTE เช็คก่อนว่า เรียน VDO ครบแล้วหรือไม่
        this.isDialogPopup = true;
        this.sendDataDialog.type = "grammarLesson";
        this.sendDataDialog.title = "ไม่สามารถจบภารกิจได้";
        this.sendDataDialog.btn1 = "ตกลง";
        this.sendDataDialog.icon = "fas fa-exclamation-circle";
        return;
      }

      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear,
        currentPractice: this.currentPractice
      };

      this.goToNextLesson(sendData);
    },
    playVideo() {
      let vid = document.getElementById("myVideo");
      if (this.isPlay) {
        this.isPlay = false;
        vid.pause();
      } else {
        this.isPlay = true;
        vid.play();
      }
    },
    loadLesson() {
      console.log("LOADLESSON");
      this.loadingShow();
      db.collection("practicepool_server")
        .where("practicekey", "==", this.currentPractice.practiceKey)
        .get()
        .then(doc => {
          let dataTemp = [];
          doc.forEach(element => {
            let dataKey = {
              key: element.id
            };
            let merge = {
              ...dataKey,
              ...element.data()
            };
            dataTemp.push(merge);
          });
          dataTemp.sort((a, b) => {
            return Number(a.order) - Number(b.order);
          });
          this.practiceData = dataTemp;
          this.displayData = dataTemp[0];

          if (dataTemp[0].isNew) {
            // กรณีตัวแรกเป็นเนื้อหาใหม่ ให้ save ไปเลยว่าดูแล้ว
            db.collection("classroomLessonLog")
              .where("lessonKey", "==", dataTemp[0].key)
              .where("class", "==", this.currentClass)
              .where("room", "==", this.currentRoom)
              .where("term", "==", this.currentTerm)
              .where("year", "==", this.currentYear)
              .where("schoolKey", "==", this.teacherData.schoolKey)
              .get()
              .then(doc => {
                if (!doc.size) {
                  // กรณีมีการเซฟ วีดีโอนี้ว่าเรียนไปแล้ว
                  // กรณียังไม่มีการเซฟว่า วีดีโอนี้ได้เรียนไปแล้ว
                  db.collection("classroomLessonLog").add({
                    lessonKey: dataTemp[0].key,
                    class: this.currentClass,
                    room: this.currentRoom,
                    term: this.currentTerm,
                    year: this.currentYear,
                    practiceKey: this.currentPractice.practiceKey,
                    schoolKey: this.teacherData.schoolKey,
                    isVdo: dataTemp[0].isNew
                  });
                }
              });
          }

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              lessonIndex: 0
            });

          this.snapGetLesson = db
            .collection("classroomLessonLog")
            .where("class", "==", this.currentClass)
            .where("room", "==", this.currentRoom)
            .where("term", "==", this.currentTerm)
            .where("year", "==", this.currentYear)
            .where("practiceKey", "==", this.currentPractice.practiceKey)
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .onSnapshot({ includeMetadataChanges: true }, async x => {
              let tempLog = [];
              x.forEach(async element => {
                tempLog.push(element.data());
              });

              this.passedLesson = tempLog;
              this.passedLessonMap = tempLog.map(x => {
                return x.lessonKey;
              });
              let countNewLesson = this.practiceData.filter(e => {
                return e.isNew == true;
              }).length;

              if (this.passedLessonMap.length == countNewLesson) {
                this.loadingShow();
                this.isAllowEndPractice = true;
                let filter =
                  this.currentClass +
                  "-" +
                  this.currentRoom +
                  "-" +
                  this.currentTerm +
                  "-" +
                  this.currentYear;
                let date = await this.getDateAndTime();
                db.collection("classroomPracticeLog")
                  .where("practiceKey", "==", this.currentPractice.practiceKey)
                  .where("schoolKey", "==", this.teacherData.schoolKey)
                  .where("filter", "==", filter)
                  .get()
                  .then(doc => {
                    // เช็คว่าเคยมีการบันทึกข้อมูลแบบฝึกหัดนี้ไปแล้วหรือไม่
                    if (!doc.size) {
                      // กรณียังไม่มีการบันทึกแบบฝึกหัดเข้าไป

                      let totalStudent = this.decrypt(
                        this.$q.localStorage.getItem("totalStudent")
                      );
                      let totalOnlineStudent = this.$q.localStorage.getItem(
                        "totalOnlineStudent"
                      );

                      let useTime =
                        date.microtime -
                        this.$q.localStorage.getItem("enterPracticeTime");
                      useTime = useTime / 1000;
                      useTime = this.secondToMinutes(useTime);
                      let practiceAddData = {
                        filter: filter,
                        date: date,
                        practiceListName: this.$q.localStorage.getItem(
                          "practiceListName"
                        ).name,
                        class: this.currentClass,
                        room: this.currentRoom,
                        term: this.currentTerm,
                        year: this.currentYear,
                        timeIn: this.$q.localStorage.getItem(
                          "enterPracticeTime"
                        ),
                        timeOut: date.microtime,
                        level: this.currentLevel,
                        unit: this.currentUnit,
                        schoolKey: this.teacherData.schoolKey,
                        onlineStudent: totalOnlineStudent,
                        totalStudent: totalStudent,
                        useTime: useTime
                      };
                      let practiceTypecopy = { ...this.currentPractice };
                      practiceTypecopy.practiceType =
                        practiceTypecopy.practicetype;
                      delete practiceTypecopy.practicetype;
                      let mergeData = {
                        ...practiceAddData,
                        ...practiceTypecopy
                      };
                      delete mergeData.name;
                      db.collection("classroomPracticeLog")
                        .add(mergeData)
                        .then(() => {
                          this.loadingHide();
                        });
                    } else {
                      this.loadingHide();
                    }
                  });
              }
              this.isLoadLesson = true;

              this.loadingHide();
            });
        });
    },
    showData(data, index) {
      this.isShowVideo = true;
      this.isPlay = false;
      this.activeIndex = index;
      this.displayData = data;
      let isVdo = data.isNew;
      db.collection("classroomLessonLog")
        .where("lessonKey", "==", data.key)
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          if (!doc.size) {
            // กร๊มีการเซฟ วีดีโอนี้ว่าเรียนไปแล้ว
            // กรณียังไม่มีการเซฟว่า วีดีโอนี้ได้เรียนไปแล้ว
            db.collection("classroomLessonLog")
              .add({
                lessonKey: data.key,
                class: this.currentClass,
                room: this.currentRoom,
                term: this.currentTerm,
                year: this.currentYear,
                practiceKey: this.currentPractice.practiceKey,
                schoolKey: this.teacherData.schoolKey,
                isVdo: isVdo
              })
              .then(() => {
                this.isShowVideo = false;
              });
          } else {
            this.isShowVideo = false;
          }
        });
      // }

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          lessonIndex: index
        })
        .then(() => {
          this.loadingHide();
        });
    }
    // countdownTimer() {
    //   this.practiceTimer = this.currentPractice.time;
    //   let minutes = this.$q.localStorage.has("timerMinutes")
    //     ? this.$q.localStorage.getItem("timerMinutes")
    //     : Number(this.practiceTimer.split(":")[0]);
    //   let seconds = this.$q.localStorage.has("timerSeconds")
    //     ? this.$q.localStorage.getItem("timerSeconds")
    //     : Number(this.practiceTimer.split(":")[1]);
    //   this.timeInterval = setInterval(() => {
    //     if (minutes == 0) {
    //       clearInterval(this.timeInterval);
    //       this.isTimeOut = true;
    //       return;
    //     }
    //     if (seconds == 0) {
    //       seconds = 60;
    //       minutes--;
    //     }
    //     seconds--;
    //     this.$q.localStorage.set("timerMinutes", minutes);
    //     this.$q.localStorage.set("timerSeconds", seconds);
    //     let showMin = minutes < 10 ? "0" + minutes : minutes;
    //     let showSec = seconds < 10 ? "0" + seconds : seconds;
    //     this.practiceTimer = showMin + " : " + showSec;
    //   }, 1000);
    // }
  },
  mounted() {
    this.loadLesson();
    // this.countdownTimer();
  },
  beforeDestroy() {
    this.snapGetLesson();
    // clearInterval(this.timeInterval);
    // this.$q.localStorage.remove("timerMinutes");
    // this.$q.localStorage.remove("timerSeconds");
  }
};
</script>

<style lang="scss" scoped></style>
