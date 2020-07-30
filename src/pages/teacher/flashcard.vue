<template>
  <q-page class="bg-vocabulary bg-blend-mode q-pa-md color3">
    <div>
      <div class="relative-position q-mb-md" align="center" v-if="isLoading">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="br-a-sm border-dashed q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">การ์ดคำศัพท์</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-center full-width" v-if="isLoading">
      <div
        class="col-12 bg5 br-a-xl q-pa-sm relative-position"
        style="max-width:1400px;width:100%;"
      >
        <div class="absolute-right" style="top:-100px">
          <countdown-timer
            class="relative-position"
            style="top:12px"
            :practiceTimeProps="currentPractice.time"
          ></countdown-timer>
        </div>

        <div class="row q-px-sm" style="min-height:calc(100vh - 300px);">
          <div class="row col-12 q-pb-md">
            <div class="row col-12 self-start q-my-lg q-py-sm">
              <div class="col-1 self-center q-py-md" style="width:80px;" align="center"></div>
              <div class="col row self-center relative-position" align="right">
                <div
                  class="col-3 border-dashed q-px-xs q-py-md"
                  style="max-width:200px;width:100%;border-radius:35px;height:fit-content"
                >
                  <div align="center" class="self-start">
                    <span class="color3" style="font-size:22px;">
                      คำศัพท์ที่ {{ currentVocab + 1 }}/{{
                      flashcardData.length
                      }}
                    </span>
                  </div>
                </div>
                <div class="col self-center">
                  <q-btn
                    @click="playSound(flashcardData[currentVocab].soundSpell)"
                    class="bg3 color6 q-mr-md br-a-sm q-pa-xs"
                    style="width:200px;font-size:18px;"
                    align="left"
                  >
                    <q-icon name="fas fa-volume-up" class="q-mr-md" size="md"></q-icon>
                    <span>เสียงคำสะกด</span>
                  </q-btn>
                  <q-btn
                    rounded
                    class="bg3 color6 br-a-sm q-pa-xs"
                    @click="playSound(flashcardData[currentVocab].soundMain)"
                    style="width:200px;font-size:18px;"
                    align="left"
                  >
                    <q-icon name="fas fa-volume-up" class="q-mr-md" size="md"></q-icon>
                    <span>เสียงอ่าน</span>
                  </q-btn>
                </div>
              </div>
              <div class="col-1 self-center q-py-md" style="width:80px;" align="center"></div>
            </div>

            <div class="col-1 self-center q-py-md" style="width:80px;" align="left">
              <q-btn
                style="height:180px"
                @click="changeFlashcard('previous')"
                icon="fas fa-chevron-left"
                class="text-h5"
                dense
                push
                :class="{
                  'bg3 color6': currentVocab > 0,
                  'bg11 color1': currentVocab == 0
                }"
                :disable="currentVocab == 0 || disableClick"
              ></q-btn>
            </div>

            <div class="row col border3-xl br-a-xl bg1 self-center" style="height:450px;">
              <!-- TODO : กรณีมีรูปภาพ -->
              <div
                class="col-5 self-center"
                align="center"
                v-if="flashcardData[currentVocab].isShowImage"
              >
                <q-img
                  :src="flashcardData[currentVocab].imgURL"
                  class="q-my-sm"
                  style="max-width:300px;width:90%;"
                >
                  <div class="absolute-bottom-right bg-transparent">
                    <q-btn push round class="bg3" @click="showImage = true">
                      <q-icon name="fas fa-search-plus"></q-icon>
                    </q-btn>
                  </div>
                </q-img>
              </div>
              <div class="col self-center q-px-sm" align="center">
                <div class>
                  <span style="font-size:42px" class="text-bold">
                    {{
                    flashcardData[currentVocab].vocabulary
                    }}
                  </span>
                </div>
                <div class="q-mt-md">
                  <span style="font-size:38px" class="text-h3">
                    {{
                    flashcardData[currentVocab].meaning
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="col-1 self-center q-py-md" style="width:80px;" align="right">
              <q-btn
                style="height:180px"
                @click="changeFlashcard('next')"
                icon="fas fa-chevron-right"
                class="text-h5"
                dense
                push
                :class="{
                  'bg3 color6': currentVocab + 1 < flashcardData.length,
                  'bg11 color1': currentVocab + 1 == flashcardData.length
                }"
                :disable="
                  currentVocab + 1 == flashcardData.length || disableClick
                "
              ></q-btn>
            </div>
            <div class="col-12 q-mt-md" align="center">
              <q-btn
                v-show="showFinishBtn"
                @click="finishFlashcard()"
                label="จบภารกิจ"
                class="bg3 color6 text-h6"
                style="width:200px"
                :disable="isClickFinishFlashcard"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="showImage" v-if="isLoading" content-class="backdrop">
      <q-card style="width: 100%; max-width: 500px;">
        <q-img :src="flashcardData[currentVocab].imgURL" style="width:100%">
          <div class="absolute-top-right bg-transparent">
            <q-btn push round class="bg3" @click="showImage = false">
              <q-icon name="fas fa-times"></q-icon>
            </q-btn>
          </div>
        </q-img>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import countdownTimer from "../../components/countdownTimer";
export default {
  components: {
    countdownTimer
  },
  data() {
    return {
      isClickFinishFlashcard: false,
      showImage: false,
      flashcardData: [],
      currentVocab: 0,
      isLoading: false,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      disableClick: true,
      showFinishBtn: false,
      enterPageMicrotime: "",
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      practiceListName: this.$q.localStorage.getItem("practiceListName"),
      practiceTimer: "",
      timeInterval: "",
      isTimeOut: false
    };
  },
  methods: {
    async finishFlashcard() {
      this.isClickFinishFlashcard = true;
      this.loadingShow();
      clearInterval(this.timeInterval);
      let date = await this.getDateAndTime();
      // ปุ่มเสร็จสิ้น Flashcard
      let useTime = date.microtime - this.enterPageMicrotime;
      // หน่วยวินาที
      useTime = useTime / 1000;
      useTime = this.secondToMinutes(useTime);

      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      // เช็คว่าเคยเซฟเข้าไปแล้วหรือยัง
      db.collection("classroomPracticeLog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("filter", "==", filterWhere)
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
                timeIn: this.enterPageMicrotime,
                timeOut: date.microtime,
                skill: this.currentPractice.skill,
                order: this.currentPractice.order,
                practiceListName: this.practiceListName.name,
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
                    this.isClickFinishFlashcard = false;
                    this.$router.push("/teacher/finishpractice/");
                  });
              });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentQuestion: 0,
                currentVocabKey: "",
                practiceKey: "",
                currentPage: "finish-waiting",
                date: date
              })
              .then(() => {
                this.loadingHide();
                this.isClickFinishFlashcard = false;
                this.$router.push("/teacher/finishpractice/");
              });
          }
        });
    },
    async changeFlashcard(event) {
      let datatime = await this.getDateAndTime();

      this.disableClick = true;
      let currentVocab = this.currentVocab;
      currentVocab =
        event == "next" ? (currentVocab += 1) : (currentVocab -= 1);

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentQuestion: currentVocab,
          currentVocabKey: this.flashcardData[currentVocab].key,
          date: datatime
        })
        .then(() => {
          event == "next" ? (this.currentVocab += 1) : (this.currentVocab -= 1);
          this.disableClick = false;
          if (this.currentVocab == this.flashcardData.length - 1) {
            this.showFinishBtn = true;
          }
        });
    },
    async loadFlashcard() {
      this.loadingShow();
      let flashcardKey = this.currentPractice.practiceKey;
      let date = await this.getDateAndTime();
      db.collection("practicepool_server")
        .where("practicekey", "==", flashcardKey)
        .get()
        .then(doc => {
          this.enterPageMicrotime = this.$q.localStorage.getItem(
            "enterPracticeTime"
          );
          let dataTemp = [];
          doc.forEach(element => {
            let elementData = element.data();
            delete elementData.imgURL;
            delete elementData.soundMain;
            delete elementData.soundSpell;
            let imgURL =
              this.serverPath +
              "pic_flashcard/" +
              element.id.toLowerCase() +
              ".jpg";

            dataTemp.push({
              key: element.id,
              imgURL: imgURL,
              soundMain:
                this.serverPath +
                "sound_flashcard/" +
                element.id.toLowerCase() +
                ".mp3",
              soundSpell:
                this.serverPath +
                "sound_flashcard/" +
                element.id.toLowerCase() +
                "-spell.mp3",
              ...elementData
            });
          });

          dataTemp.sort((a, b) => {
            return a.order - b.order;
          });
          this.flashcardData = dataTemp;

          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              currentQuestion: 0,
              currentVocabKey: this.flashcardData[this.currentVocab].key,
              practiceKey: flashcardKey
            })
            .then(() => {
              this.isLoading = true;
              this.disableClick = false;
              this.loadingHide();
            });
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
          seconds = 0;
        }
        if (seconds == 0 && !this.isTimeOut) {
          seconds = 60;
          minutes--;
        }

        seconds--;
        this.$q.localStorage.set("timerMinutes", minutes);
        this.$q.localStorage.set("timerSeconds", seconds);
        let showMin = minutes < 10 ? "0" + minutes : minutes;
        let showSec = seconds < 10 ? "0" + seconds : seconds;
        this.practiceTimer = showMin + " : " + showSec;
      }, 1000);
    }
  },
  mounted() {
    this.loadFlashcard();
    this.countdownTimer();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
    this.$q.localStorage.remove("timerMinutes");
    this.$q.localStorage.remove("timerSeconds");
  }
};
</script>

<style lang="scss">
.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 0.5s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}
</style>
