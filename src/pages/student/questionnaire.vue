<template>
  <q-page class="bg-questionnair row relative-position">
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Logo -->
    <div align="center" class="col-12 q-pb-lg" :class="{'absolute-top':activeType != 'start'}">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-label"
        leave-active-class="animated fadeOutUp duration-label"
      >
        <img
          src="../../statics/questionnair/questionnair_logo.png"
          style="margin-top:-35px;width:400px;"
        />
      </transition>
    </div>

    <div class="col-4 self-end q-pt-xl q-px-md" align="right" v-if="activeType != 'start'">
      <transition
        appear
        enter-active-class="animated fadeIn duration-pirates-in"
        leave-active-class="animated fadeOut duration-pirates-out"
        v-if="isActiveMainCharactor"
      >
        <q-img src="../../statics/questionnair/king.png" style="width:50%;" />
      </transition>
    </div>
    <div class="col-8" v-if="activeType != 'start'"></div>

    <div class="col-12 absolute-bottom q-pa-md" style="overflow:hidden;">
      <transition
        appear
        enter-active-class="animated fadeInUp duration-boxtalk-in"
        leave-active-class="animated fadeOutDown duration-boxtalk-out"
        v-if="isActiveMainTalk"
      >
        <div class="relative-position">
          <div class="boxtalk bg1 color2 border3-lg br-a-lg q-pa-md">
            <span
              class="q-pa-md"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              v-html="activeType == 'ready' ? talking.ready : talking.finish"
            ></span>
          </div>
        </div>
      </transition>
    </div>

    <!-- SECTION  Main Practice  -->
    <div class="col-12 q-pa-md" v-if="activeType == 'start'">
      <transition
        appear
        enter-active-class="animated zoomIn duration-practice-start-in"
        leave-active-class="animated bounceOut duration-practice-start-out"
        v-if="isActivePractice"
      >
        <div class="row box-practice q-px-xl relative-position">
          <div class="col-6 relative-position" v-if="isLoad">
            <!-- NOTE  Number Question -->
            <transition
              appear
              enter-active-class="animated bounceIn duration-number-question-in"
              leave-active-class="animated bounceOut duration-number-question-out"
              v-if="isActivePracticeNumberQuestion"
            >
              <div
                class="absolute-bottom-left q-pb-sm"
                style="z-index:2"
                v-if="currentQuestion != questionnaireData.length"
              >
                <div
                  align="center"
                  class="bg5 q-py-md q-px-md br-a-sm text-h4 shadow-1"
                  style="width:200px;"
                >
                  <span>
                    ข้อ
                    {{ currentQuestion + 1 + "/" + questionnaireData.length }}
                  </span>
                </div>
              </div>
            </transition>
          </div>
          <div class="col-6 relative-position" v-if="isLoad"></div>

          <!-- NOTE  Practice Data : แบบฝึกหัด -->
          <div class="col-12" style="z-index:5" v-if="!finishPractice ">
            <div class="bg5 br-a-md q-px-xl q-py-lg shadow-1" v-if="isLoad">
              <div>
                <!-- NOTE  instruction : ชุดคำสั่ง -->
                <div
                  class="text-h5 q-py-lg q-pa-md q-mb-md br-a-xl"
                  style="border:1px dashed #000;border-width:2px;z-index:10;"
                >
                  <div>{{ questionnaireData[currentQuestion].question }}</div>
                </div>
                <!-- NOTE  choice : คำตอบ -->
                <q-btn
                  @click="answer(index)"
                  no-caps
                  dense
                  class="full-width color1 br-a-sm q-mt-md"
                  :class="{
                    bg7: index == 0,
                    bg8: index == 1,
                    bg9: index == 2,
                    bg10: index == 3,
                    bg3: index == 4
                  }"
                  align="left"
                  v-for="(item, index) in questionnaireData[currentQuestion].choices"
                  :key="index"
                  :disable="testShowAnswer"
                  :loading="testShowAnswer"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook size="3vw" />
                  </template>
                  <div class="row full-width">
                    <div class="col-2 self-center q-pa-md" style="width:100px">
                      <q-icon
                        :name="
                          index == 0
                            ? 'fas fa-spider'
                            : '' || index == 1
                            ? 'fas fa-fish'
                            : '' || index == 2
                            ? 'fas fa-dove'
                            : '' || index == 3
                            ? 'fas fa-frog'
                            : ''
                            || index == 4 ? 'fas fa-cat' : ''
                        "
                        size="45px"
                      ></q-icon>
                    </div>
                    <div class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm" align="left">
                      <div class="self-center q-px-md">
                        <span class="text-h5">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </q-btn>
              </div>
            </div>
          </div>

          <!-- NOTE  questionnair : ประเมินความพึงพอใจ -->
          <transition
            appear
            enter-active-class="animated fadeIn "
            leave-active-class="animated fadeOut "
            v-if="finishPractice"
          >
            <div class="col-12" style="z-index:5">
              <div class="bg5 br-a-md q-px-xl q-py-lg shadow-1">
                <div>
                  <div
                    class="text-h5 q-py-lg q-pa-md q-mb-md br-a-xl"
                    style="border:1px dashed #000;border-width:2px;z-index:10;"
                  >
                    <div>ข้อเสนอแนะ (ไม่บังคับ)</div>
                  </div>
                  <div>
                    <q-input
                      type="textarea"
                      rows="13"
                      class="bg1 q-px-md border3-sm rounded-borders"
                      v-model="suggest"
                    />
                  </div>
                  <div class="q-py-xl" align="center">
                    <q-btn
                      class="color1 bg3 q-px-lg text-h6 q-py-xs rounded-borders"
                      label="เสร็จสิ้น"
                      @click="saveSuggest()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
export default {
  data() {
    return {
      // SECTION  Data
      currentQuestion: 0,
      questionnaireKey: "",

      // SECTION  Status Active
      activeType: "", // เก็บข้อมูลประเภท
      finishPractice: false,
      talking: {
        ready:
          "เจ้ามีเวลาเพียง 10 นาที ในการทำแบบประเมิน มีข้อเสนอแนะอะไร บอกข้าได้เต็มที่เลย ",
        finish: " ขอบคุณสำหรับการทำแบบประเมิน เจ้าสามารถกลับสู่บทเรียนได้ "
      },

      practice: {},
      isActiveMainTalk: false, // เปิดใข้งาน Animation : แบบสนทนา
      isActiveMainCharactor: false, //เปิดใช้งาน Animation : รูปโจรสลัด

      isActivePractice: false, // เปิดใช้งาน Animation : เปิดใช้งานแบบฝึกหัด
      isActivePracticeTimer: false, // เปิดใช้งาน Animation : ตัวจับเวลา
      isActivePracticeNumberQuestion: false, // เปิดใช้งาน Animation : แสดงจำนวนข้อแบบฝึกหัด

      isTimeOut: false,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง
      questionnaireData: [],
      isLoad: false,
      testShowAnswer: false,
      answerData: [],
      questionnaireLogKey: "",
      isEnableSuggest: false,
      suggest: "",
      setTimer: "",
      snapSync: ""
    };
  },
  methods: {
    saveSuggest() {
      this.loadingShow();
      db.collection("studentquestionnairelog")
        .doc(this.questionnaireLogKey)
        .update({
          suggest: this.suggest,
          finishSuggest: true
        })
        .then(() => {
          this.loadingHide();
          this.isActivePractice = false;
          this.isActivePracticeTimer = false;
          this.isActivePracticeNumberQuestion = false;
          setTimeout(() => {
            this.activeType = "finish";
            this.isActiveMainTalk = true;
            this.isActiveMainCharactor = true;
          }, 1500);
        });
    },
    answer(index) {
      let stuAnswer = index + 1;

      this.answerData[this.currentQuestion] = stuAnswer;
      this.testShowAnswer = true;

      if (this.currentQuestion + 1 == this.questionnaireData.length) {
        this.finishPractice = true;
      }

      db.collection("studentquestionnairelog")
        .doc(this.questionnaireLogKey)
        .update({
          answer: this.answerData,
          currentQuestion: this.currentQuestion + 1,
          finish: this.finishPractice
        })
        .then(() => {
          if (this.currentQuestion < this.questionnaireData.length - 1) {
            setTimeout(() => {
              this.currentQuestion++;
              this.testShowAnswer = false;
            }, 500);
          } else {
            // กรณีข้อสุดท้าย
            if (this.isEnableSuggest) {
              this.finishPractice = true;
            } else {
              this.finishPractice = false;
            }
          }
        });
    },
    loadQuestionnaire() {
      this.loadingShow();
      db.collection("questionnaire")
        .where("set", "==", this.questionnaireKey)
        .get()
        .then(async qdoc => {
          let qtemp = [];
          qdoc.forEach(element => {
            let data = {
              key: element.id
            };
            let finalData = { ...data, ...element.data() };
            qtemp.push(finalData);
          });

          qtemp.sort((a, b) => {
            return Number(a.order) - Number(b.order);
          });

          this.questionnaireData = qtemp;

          let getSuggest = await db
            .collection("questionnaireset")
            .doc(this.questionnaireKey)
            .get();

          this.isEnableSuggest = getSuggest.data().suggest ? true : false;

          db.collection("studentquestionnairelog")
            .where("studentkey", "==", this.studentData.key)
            .where(
              "term",
              "==",
              this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2)
            )
            .where(
              "year",
              "==",
              this.decrypt(this.$q.localStorage.getItem("currentYear"), 2)
            )
            .get()
            .then(quData => {
              if (!quData.size) {
                db.collection("studentquestionnairelog")
                  .add({
                    class: this.studentData.classRoom,
                    room: this.studentData.room,
                    studentkey: this.studentData.key,
                    studentNo: this.studentData.no,
                    studentName:
                      this.studentData.name + " " + this.studentData.surname,
                    currentQuestion: 0,
                    questionSet: this.questionnaireKey,
                    term: this.decrypt(
                      this.$q.localStorage.getItem("currentTerm"),
                      2
                    ),
                    year: this.decrypt(
                      this.$q.localStorage.getItem("currentYear"),
                      2
                    ),
                    schoolKey: this.studentData.schoolKey,
                    totalQuestion: this.questionnaireData.length,
                    answer: []
                  })
                  .then(addData => {
                    this.questionnaireLogKey = addData.id;
                    this.loadingHide();

                    this.isLoad = true;
                  });
              } else {
                this.currentQuestion = quData.docs[0].data().currentQuestion;
                this.questionnaireLogKey = quData.docs[0].id;
                this.answerData = quData.docs[0].data().answer;

                this.suggest = quData.docs[0].data().suggest;
                if (this.currentQuestion == this.questionnaireData.length) {
                  if (this.isEnableSuggest) {
                    this.finishPractice = true;
                    if (quData.docs[0].data().finishSuggest) {
                      // กรณีแบบประเมินนี้มีการเปิดให้กรอกข้อเสนอแนะ และ กรณีเด็กกรอกไปแล้ว
                      this.isActivePractice = false;
                      this.isActivePracticeTimer = false;
                      this.isActivePracticeNumberQuestion = false;
                      setTimeout(() => {
                        this.activeType = "finish";
                        this.isActiveMainTalk = true;
                        this.isActiveMainCharactor = true;
                      }, 1500);
                    } else {
                      this.finishPractice = true;
                    }
                  } else {
                    this.finishPractice = false;
                  }
                }

                this.loadingHide();

                this.isLoad = true;
              }
            });
        });
    },
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
          if (doc.size) {
            this.questionnaireKey =
              doc.docs[0].data().questionnaireKey != undefined
                ? "muJO9yz8qWlkTh3HrEnl"
                : null;
            let currentPage = doc.docs[0].data().currentPage;

            if (currentPage == "prepare-questionnaire") {
              this.activeType = "ready";
              this.isActiveMainTalk = true;
              this.isActiveMainCharactor = true;
            } else if (currentPage == "start-questionnaire") {
              this.isActiveMainTalk = false;
              this.isActiveMainCharactor = false;

              setTimeout(() => {
                this.activeType = "start";
                this.isActivePractice = true;
                this.isActivePracticeTimer = true;
                this.isActivePracticeNumberQuestion = true;
              }, 1500);

              if (!this.isLoad) {
                this.$q.localStorage.set(
                  "useTime",
                  doc.docs[0].data().date.microtime
                );
                this.loadQuestionnaire();
              }
            }
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
    if (typeof this.snapSync == "function") {
      this.snapSync();
    }
    this.$q.localStorage.remove("useTime");
  }
};
</script>

<style lang="scss" scoped>
.btn-active {
  transition-duration: 0.2s;
}
.btn-active:hover {
  background-color: #ffffffe3;
}

.btn-active:active {
  background-color: #ffffffaf;
}

.duration-label {
  animation-delay: 0.3s;
}

.duration-practice-start-in {
  animation-duration: 0.6s;
}
.duration-practice-start-out {
  animation-duration: 0.6s;
  animation-delay: 0.5s;
}

.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 1s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}

.duration-number-question-in {
  animation-delay: 0.6s;
}

.duration-number-question-out {
  animation-delay: 0.2s;
}

.duration-pirates-in {
  animation-delay: 0.2s;
}
.duration-pirates-out {
  animation-delay: 0.5s;
}

.duration-boxtalk-in {
  animation-delay: 0.5s;
}
.duration-boxtalk-out {
  animation-delay: 0.3s;
}
</style>
