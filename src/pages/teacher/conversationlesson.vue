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
            <span class="text-bold" style="font-size:calc(20px + 1vw)">
              {{
              convertPracticeName(
              currentPractice.practicetype,
              currentPractice.skill
              )
              }}
            </span>
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

    <div class="col-12 q-pa-md" v-if="isLoad" style="max-width:1200px;width:95%;margin:auto;">
      <div class="bg5 br-a-md">
        <div class="row q-pa-md">
          <video
            :poster="vdoCover"
            controls
            class="br-a-sm"
            :src="vdoURL"
            style="width:97%;margin:auto;"
          ></video>
        </div>
        <div align="center" class="q-py-md">
          <q-btn
            label="จบภารกิจ"
            push
            @click="finishLesson()"
            class="bg3 text-h6 color6"
            style="width:150px"
          ></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
import countdownTimer from "../../components/countdownTimer";
export default {
  components: {
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
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      isTimeOut: false,
      practiceTimer: "10:00",
      timeInterval: "",
      vdoURL: "",
      vdoCover: "",
      isLoad: false,
      totalOnlineStudent: 0,
      totalStudent: this.decrypt(
        this.$q.localStorage.getItem("totalStudent"),
        3
      )
    };
  },
  methods: {
    getOnlineStudent() {
      this.snapGetOnlineStudent = db
        .collection("student")
        .where(
          "classRoom",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentClass"), 2)
        )
        .where(
          "room",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
        )
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.totalOnlineStudent = doc.size;
        });
    },
    async finishLesson() {
      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear,
        currentPractice: this.currentPractice
      };

      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      let date = await this.getDateAndTime();

      let useTime =
        date.microtime - this.$q.localStorage.getItem("enterPracticeTime");
      useTime = useTime / 1000;
      useTime = this.secondToMinutes(useTime);

      this.loadingShow();
      db.collection("classroomPracticeLog")
        .where("filter", "==", filterWhere)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("status", "==", false)
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
                filter: filterWhere,
                timeIn: this.$q.localStorage.getItem("enterPracticeTime"),
                timeOut: date.microtime,
                practiceName: this.$q.localStorage.getItem("practiceListName")
                  .name,
                order: this.currentPractice.order,
                skill: this.currentPractice.skill,
                practiceType: this.currentPractice.practicetype,
                level: this.currentPractice.level,
                unit: this.currentPractice.unit,
                schoolKey: this.teacherData.schoolKey,
                onlineStudent: this.totalOnlineStudent,
                totalStudent: this.totalStudent
              })
              .then(() => {
                this.goToNextLesson(sendData);
              });
          } else {
            this.goToNextLesson(sendData);
          }
        });
    },
    loadConversationVDO() {
      db.collection("conversationVdo")
        .where("practicekey", "==", this.currentPractice.practiceKey)
        .get()
        .then(doc => {
          this.vdoURL = doc.docs[0].data().vdoURL;
          this.vdoCover = doc.docs[0].data().imageURL;
          this.isLoad = true;
        });
    },

    countdownTimer() {
      this.practiceTimer = this.currentPractice.time;
      let minutes = this.$q.localStorage.has("timerMinutes")
        ? this.$q.localStorage.getItem("timerMinutes")
        : Number(this.practiceTimer.split(":")[0]);
      let seconds = this.$q.localStorage.has("timerSeconds")
        ? this.$q.localStorage.getItem("timerSeconds")
        : Number(this.practiceTimer.split(":")[1]);
      this.timeInterval = setInterval(() => {
        if (minutes == 0) {
          clearInterval(this.timeInterval);
          this.isTimeOut = true;
          return;
        }
        if (seconds == 0) {
          seconds = 60;
          minutes--;
        }
        seconds--;
        this.$q.localStorage.set("timerMinutes", minutes);
        this.$q.localStorage.set("timerSeconds", seconds);
        let showMin = minutes < 10 ? "0" + minutes : minutes;
        let showSec = seconds < 10 ? "0" + seconds : seconds;
        this.practiceTimer = showMin + ":" + showSec;
      }, 1000);
    }
  },
  mounted() {
    this.loadConversationVDO();
    this.getOnlineStudent();

    // this.countdownTimer();
  },
  beforeDestroy() {
    // this.snapGetLesson();
    // clearInterval(this.timeInterval);
  }
};
</script>

<style lang="scss" scoped></style>
