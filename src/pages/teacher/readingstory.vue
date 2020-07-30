<template>
  <q-page
    class="q-pa-md color3 bg-reading bg-blend-mode animated fadeIn"
    :class="isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <transition
      appear
      enter-active-class="animated fadeInDown "
      leave-active-class="animated fadeOutUp "
    >
      <div class="relative-position" align="center" v-if="!isLoadPractice">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="border-dashed br-a-sm q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)"
              >อ่านออกเสียง</span
            >
          </div>
        </div>
      </div>
    </transition>

    <transition
      appear
      enter-active-class="animated fadeIn duration-fade-in "
      leave-active-class="animated fadeOut duration-fade-out "
    >
      <div class="q-mt-md row justify-center" v-if="!isLoadPractice">
        <div class="col-lg-9 col-md-12 col-xs-12 relative-position">
          <div class="bg3 q-pa-md br-tl-sm br-tr-sm" align="center">
            <span
              class="color1"
              style="font-size:calc(16px + 1vw)"
              v-html="readingTitle.titleEng"
            ></span>
          </div>
          <div class="bg5 br-bl-sm br-br-sm q-px-lg q-pb-lg">
            <div class="border-dashed-sentence br-bl-md br-br-md">
              <div align="center" class="q-py-lg row">
                <div class="col-1" style="width:100px;"></div>
                <div class="col self-center">
                  <span class="text-h5">
                    ประโยคที่
                    {{ currentQuestion + 1 + "/" + readingData.length }}
                  </span>
                </div>
                <div class="col-1" style="width:100px;" align="center">
                  <q-btn
                    @click="playSound(readingData[currentQuestion].audioURL)"
                    icon="fas fa-volume-up"
                    round
                    size="md"
                    class="bg3 color6 q-mx-sm q-pa-xs"
                  ></q-btn>
                </div>
              </div>

              <div class="row q-py-xl q-px-sm">
                <div
                  class="col-1 self-center"
                  style="width:80px;"
                  align="center"
                >
                  <q-btn
                    @click="currentQuestion--, changeData()"
                    push
                    dense
                    style="height:150px"
                    icon="fas fa-chevron-left"
                    class="text-h6 br-a-xs"
                    :disable="currentQuestion == 0"
                    :class="{
                      'bg11 color1': currentQuestion == 0,
                      'bg3 color6': currentQuestion != 0
                    }"
                  ></q-btn>
                </div>
                <div class="col self-center q-py-xl row">
                  <div
                    class="q-px-md  row justify-center col-12"
                    align="center"
                  >
                    <div v-if="readingData.length > 0">
                      <div
                        style="font-size:calc(15px + 1vw)"
                        v-html="readingData[currentQuestion].sentenceEng"
                      ></div>
                      <br />
                      <div style="font-size:calc(15px + 1vw)" id="contentThai">
                        {{ readingData[currentQuestion].sentenceThai }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="col-1 self-center"
                  style="width:80px;"
                  align="center"
                >
                  <q-btn
                    dense
                    push
                    style="height:150px"
                    icon="fas fa-chevron-right"
                    class="text-h6 br-a-xs"
                    :class="{
                      'bg11 color1': currentQuestion + 1 == readingData.length,
                      'bg3 color6': currentQuestion + 1 != readingData.length
                    }"
                    @click="currentQuestion++, changeData()"
                    :disable="currentQuestion + 1 == readingData.length"
                  ></q-btn>
                </div>
              </div>

              <div align="center" class="q-pb-lg" v-show="showEndLesson">
                <q-btn
                  @click="finishReading()"
                  class="bg3 color6 text-h6"
                  push
                  label="จบภารกิจ"
                  :disable="isClickFinishMission"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { db, st } from "../../router/index.js";
export default {
  data() {
    return {
      isClickFinishMission: false,
      isShowFinishPractice: false,
      currentQuestion: 0, // ข้อที่ทำแบบฝึกหัดปัจจุบัน
      readingData: [],
      isLoadPractice: true,
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      readingTitle: "",
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      showEndLesson: false,
      currentUnit: this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear", 2))
    };
  },
  methods: {
    confirmDialog() {
      // ไปหน้าให้คะแนน
      this.finishReading();
    },
    cancleDialog(val) {
      this.isShowFinishPractice = false;
    },
    async finishReading() {
      this.isClickFinishMission = true;
      let date = await this.getDateAndTime();
      this.loadingShow();
      let useTime =
        date.microtime - this.$q.localStorage.getItem("enterPracticeTime");
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
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("schoolKey", "==", this.teacherData.schoolKey)
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
                // TODO : total student // online student
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
    async loadPractice() {
      let date = await this.getDateAndTime();
      let practiceKey = this.currentPractice.practiceKey;
      this.isLoadPractice = false;

      let findReadingPracticeKey = this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ).filter(x => {
        return (
          x.unit == this.currentUnit &&
          x.skill == "Reading" &&
          x.order > this.currentPractice.order
        );
      })[0].practiceKey;

      let readingContentData = await db
        .collection("readingcontent_server")
        .where("practicekey", "==", findReadingPracticeKey)
        .get();
      this.readingTitle = readingContentData.docs[0].data();
      let readingId = readingContentData.docs[0].id;
      // NOTE  Load Reading Speak
      db.collection("readingcontent_server")
        .doc(readingId)
        .collection("speakPractice")
        .get()
        .then(speakDoc => {
          if (speakDoc.size) {
            speakDoc.forEach(result => {
              let dataKey = {
                key: result.id,
                ...result.data(),
                audioURL: ""
              };

              st.child("/audio/reading/" + result.id + ".mp3")
                .getDownloadURL()
                .then(getURL => {
                  dataKey.audioURL = getURL;
                });

              this.readingData.push(dataKey);
            });

            this.readingData.sort((a, b) => {
              return Number(a.order) - Number(b.order);
            });
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                lessonIndex: 0,
                readingContentKey: findReadingPracticeKey,
                date: date
              })
              .then(() => {
                this.isLoadPractice = false;
              });
          }
        });
    },
    async changeData() {
      let date = await this.getDateAndTime();

      if (this.currentQuestion == this.readingData.length - 1) {
        this.showEndLesson = true;
      }
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          lessonIndex: this.currentQuestion,
          date: date
        });
    }
  },
  mounted() {
    this.loadPractice();
  }
};
</script>

<style lang="scss" scoped>
.border-dashed-sentence {
  border-right: 2px dashed #662707;
  border-left: 2px dashed #662707;
  border-bottom: 2px dashed #662707;
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.3s;
}
</style>
