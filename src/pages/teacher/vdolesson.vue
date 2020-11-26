<template>
  <q-page
    class="q-pa-md color3 bg-blend-mode animated fadeIn"
    :class="
      currentPractice.skill == 'Vocabulary'
        ? 'bg-vocabulary'
        : currentPractice.skill == 'Grammar'
        ? 'bg-grammar'
        : currentPractice.skill == 'Reading'
        ? 'bg-reading'
        : currentPractice.skill == 'Writing'
        ? 'bg-writing'
        : currentPractice.skill == 'Phonics'
        ? 'bg-phonics'
        : currentPractice.skill == 'Listening & Speaking'
        ? 'bg-listening'
        : ''
    "
  >
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
            <span class="text-bold" style="font-size:calc(20px + 1vw)">{{
              convertPracticeName(
                currentPractice.practicetype,
                currentPractice.skill
              )
            }}</span>
          </div>
        </div>
      </transition>
    </div>

    <div class="col-12 q-pa-md relative-position" v-if="isLoadLesson">
      <!-- NOTE  Timer : ตัวจับเวลา -->
      <div class="absolute-top-right" style="top:-95px;right:15px;">
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
      <div class="row">
        <div style="width:300px" class="col-4 bg3 q-pa-sm">
          <q-scroll-area style="height:550px;">
            <div
              class="q-py-xs"
              v-for="(item, index) in practiceData"
              :key="index"
            >
              <div
                v-ripple
                @click="showData(item, index)"
                align="left"
                class="q-pa-md row relative-position br-a-xs"
                style="width:100%"
                :class="[
                  isShowVideo ? 'no-pointer-events' : 'cursor-pointer',
                  activeIndex == index ? 'bg6' : null,
                  activeIndex != index ? 'bg5' : null
                ]"
              >
                <div class="self-start col-1 q-pr-sm" style="width:40px">
                  <q-icon
                    :class="{ color10: passedLessonMap.includes(item.key) }"
                    :name="
                      !item.type ? 'fas fa-play-circle' : 'fas fa-volume-up'
                    "
                    size="28px"
                  ></q-icon>
                </div>
                <div class="col self-start" align="left">{{ item.topic }}</div>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <div
          style="border-top-right-radius:5px;border-bottom-right-radius:5px"
          class="col bg5 q-pa-sm row"
        >
          <!-- รูปภาพ / VIDEO -->
          <div align="center" class="col-12 self-start">
            <q-img
              v-show="displayData.type"
              style="max-width:1000px;width:100%"
              :src="displayData.imgURL"
            ></q-img>

            <video
              id="myVideo"
              v-show="!displayData.type"
              style="max-width:1000px;width:100%"
              :src="displayData.vdoURL"
              :poster="displayData.imgURL"
              controls
            ></video>
          </div>
          <div class="row col-12 q-pa-md q-py-lg self-end">
            <div align="left" class="col">
              <q-btn
                v-if="!isPlay"
                :icon="displayData.type ? 'fas fa-volume-up' : 'fas fa-play'"
                class="text-h6 bg3 color6"
                :label="displayData.type ? 'เล่นเสียง' : 'เล่นวีดีโอ'"
                @click="playVideo()"
                :disable="displayData.type && isPlay"
              ></q-btn>
              <q-btn
                v-else
                icon="fas fa-pause"
                class="text-h6 bg3 color6"
                :label="displayData.type ? 'เล่นเสียง' : 'เล่นวีดีโอ'"
                @click="playVideo()"
                :disable="displayData.type && isPlay"
              ></q-btn>
            </div>
            <div align="right" class="col">
              <q-btn
                class="bg3 color6 text-h6"
                label="จบภารกิจ"
                @click="finishLesson()"
              ></q-btn>
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
      passedLesson: "",
      passedLessonMap: "",
      snapGetLesson: "",
      isPlay: false,
      practiceTimer: "",
      isTimeOut: false,
      timeInterval: "",
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
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
    closePopupFunction() {
      this.isDialogPopup = false;
    },
    async finishLesson() {
      this.$q.localStorage.set(
        "finishGrammarLessonVdo",
        this.practiceData.length - this.passedLessonMap.length
      );

      if (this.passedLessonMap.length != this.practiceData.length) {
        // NOTE เช็คก่อนว่า เรียน VDO ครบแล้วหรือไม่
        this.isDialogPopup = true;
        this.sendDataDialog.type = "languagetips";
        this.sendDataDialog.title = "ไม่สามารถจบภารกิจได้";
        this.sendDataDialog.btn1 = "ตกลง";
        this.sendDataDialog.icon = "fas fa-exclamation-circle";
        return;
      }

      let date = await this.getDateAndTime();
      // ปุ่มเสร็จสิ้น Flashcard
      let useTime =
        date.microtime - this.$q.localStorage.getItem("enterPracticeTime");
      // หน่วยวินาที
      useTime = useTime / 1000;
      useTime = this.secondToMinutes(useTime);

      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      db.collection("classroomPracticeLog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("filter", "==", filter)
        .get()
        .then(doc => {
          if (!doc.size) {
            db.collection("classroomPracticeLog")
              .add({
                practiceKey: this.currentPractice.practiceKey,
                date: date,
                useTime: useTime,
                class: this.currentClass,
                room: this.currentRoom,
                term: this.currentTerm,
                year: this.currentYear,
                filter: filter,
                timeIn: this.$q.localStorage.getItem("enterPracticeTime"),
                timeOut: date.microtime,
                skill: this.currentPractice.skill,
                order: this.currentPractice.order,
                practiceListName: this.$q.localStorage.getItem(
                  "practiceListName"
                ).name,
                practiceType: this.currentPractice.practicetype,
                level: this.currentPractice.level,
                unit: this.currentPractice.unit,
                schoolKey: this.teacherData.schoolKey
              })
              .then(() => {
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({
                    currentPage: "finish-waiting",
                    date: date
                  })
                  .then(() => {
                    this.loadingHide();
                    this.$router.push("/teacher/finishpractice/");
                  });
              });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentQuestion: 0,
                practiceKey: "",
                currentPage: "finish-waiting",
                date: date
              })
              .then(() => {
                this.loadingHide();
                this.$router.push("/teacher/finishpractice/");
              });
          }
        });
    },
    playVideo() {
      if (!this.practiceData[this.activeIndex].type) {
        // กรณีเป็นวีดีโอ
        let vid = document.getElementById("myVideo");
        if (this.isPlay) {
          this.isPlay = false;
          vid.pause();
        } else {
          this.isPlay = true;
          vid.play();
        }
      } else {
        // กรณีเป็นเสียง
        if (!this.isPlay) {
          let audio = new Audio(this.practiceData[this.activeIndex].audioURL);
          audio.play();
          this.isPlay = true;
          let _this = this;
          audio.addEventListener("ended", function() {
            _this.isPlay = false;
          });
        }
      }
    },
    loadLesson() {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          lessonIndex: 0
        });

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

          if (!dataTemp[0].type) {
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
                  // กร๊มีการเซฟ วีดีโอนี้ว่าเรียนไปแล้ว
                  // กรณียังไม่มีการเซฟว่า วีดีโอนี้ได้เรียนไปแล้ว
                  db.collection("classroomLessonLog").add({
                    lessonKey: dataTemp[0].key,
                    class: this.currentClass,
                    room: this.currentRoom,
                    term: this.currentTerm,
                    year: this.currentYear,
                    practiceKey: this.currentPractice.practiceKey,
                    schoolKey: this.teacherData.schoolKey,
                    isVdo: !dataTemp[0].type
                  });
                }
              });
          }

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
              x.forEach(element => {
                tempLog.push(element.data());
              });
              this.passedLesson = tempLog;

              this.passedLessonMap = tempLog.map(x => {
                return x.lessonKey;
              });

              if (this.passedLessonMap.length == this.practiceData.length) {
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
                      let practiceAddData = {
                        practiceType: this.currentPractice.practicetype,
                        filter: filter,
                        date: date,
                        practiceListName: "",
                        class: this.currentClass,
                        room: this.currentRoom,
                        term: this.currentTerm,
                        year: this.currentYear,
                        timeIn: this.$q.localStorage.getItem(
                          "enterPracticeTime"
                        ),
                        timeOut: date.microtime,
                        schoolKey: this.teacherData.schoolKey
                      };
                      let mergeData = {
                        ...practiceAddData,
                        ...this.currentPractice
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
            });
        });
    },
    showData(data, index) {
      this.isShowVideo = true;
      this.isPlay = false;
      this.activeIndex = index;
      this.displayData = data;
      this.loadingShow();

      // NOTE data.type == boolean เช็คว่าเป็นวีดีโอหรือไม่ true = vdo , false = audio
      //   Update Synchronize

      let isVdo = !data.type;
      // if (isVdo) {
      // NOTE กรณีเป็น VDO ทำการเซฟข้อมูลการดูวีดีโอเข้า DB
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
            // กรณียังไม่มีการเซฟว่า วีดีโอนี้ได้เรียนไปแล้ว
            db.collection("classroomLessonLog")
              .add({
                lessonKey: data.key,
                class: this.currentClass,
                room: this.currentRoom,
                term: this.currentTerm,
                year: this.currentYear,
                practiceKey: this.currentPractice.practiceKey,
                isVdo: isVdo,
                schoolKey: this.teacherData.schoolKey
              })
              .then(() => {
                this.isShowVideo = false;
              });
          } else {
            this.isShowVideo = false;
          }

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              lessonIndex: index
            })
            .then(() => {
              this.loadingHide();
            });
        });
      // }
    }
  },
  mounted() {
    this.loadLesson();
    // this.countdownTimer();
  },
  beforeDestroy() {
    this.snapGetLesson();
    clearInterval(this.timeInterval);
    this.$q.localStorage.remove("timerMinutes");
    this.$q.localStorage.remove("timerSeconds");
  }
};
</script>

<style lang="scss" scoped></style>
