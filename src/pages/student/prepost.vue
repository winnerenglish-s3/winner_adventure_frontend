<template>
  <q-page
    class="row relative-position"
    :class="practice.type == 'pretest' ? 'bg-pretest' : 'bg-posttest'"
  >
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Table & Bar -->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated slideOutLeft duration-slide-out"
      v-if="isActiveMain"
    >
      <div
        class="row self-end relative-position full-width"
        v-if="activeType != 'start'"
      >
        <div class="col" align="right">
          <div>
            <q-img
              v-if="practice.type == 'pretest'"
              src="../../statics/prepost/preChar.png"
              style="max-width:calc(350px + 8vw);width:100%;"
            ></q-img>

            <q-img
              v-if="practice.type == 'posttest'"
              src="../../statics/prepost/postChar.png"
              style="max-width:calc(550px + 9vw);width:100%;"
            ></q-img>

            <div
              :style="
                practice.type == 'pretest'
                  ? { height: '50px' }
                  : { height: '170px' }
              "
            ></div>
          </div>
        </div>
        <div class="col-4 relative-position">
          <q-img
            v-if="practice.type == 'pretest'"
            src="../../statics/prepost/preTest.png"
            style="left:-50px;top:50px;max-width:400px;width:100%;"
            class="absolute-top-left"
          ></q-img>

          <q-img
            v-if="practice.type == 'posttest'"
            src="../../statics/prepost/postTest.png"
            style="left:-50px;top:50px;max-width:400px;width:100%;"
            class="absolute-top-left"
          ></q-img>
        </div>
      </div>
    </transition>

    <!-- SECTION  Main Talking -->
    <div
      class="col-12 q-pa-md absolute-bottom"
      style="overflow:hidden;"
      v-if="activeType != 'start'"
    >
      <transition
        appear
        enter-active-class="animated fadeInUp duration-talk-in"
        leave-active-class="animated fadeOutDown duration-talk-out"
        v-if="isActiveMainTalk"
      >
        <div class="relative-position">
          <div class="boxtalk bg1 color2 border3-lg br-a-lg q-pa-md">
            <!-- NOTE  Active Type = Ready -->
            <span
              class="q-pa-sm"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              v-html="
                activeType == 'ready'
                  ? talking.ready
                  : '' || activeType == 'waitingfriend'
                  ? talking.waitingfriend
                  : '' || activeType == 'finish'
                  ? talking.finish
                  : ''
              "
            ></span>
          </div>
        </div>
      </transition>
    </div>

    <!-- SECTION  Main Practice  -->
    <div
      class="col-12 q-pa-md  relative-position"
      v-if="isLoadPractice && activeType == 'start'"
      style="overflow:hidden"
    >
      <div class="absolute-center" align="center" v-if="!isLoadData">
        <q-spinner-facebook color="deep-orange-10" size="100" />
      </div>

      <div v-if="isLoadData">
        <transition
          appear
          enter-active-class="animated zoomIn duration-practice-start-in"
          leave-active-class="animated bounceOut duration-practice-start-out"
          v-if="isActivePractice"
        >
          <div class="row box-practice q-px-xl relative-position">
            <div class="col-4 relative-position " style="width:200px;">
              <!-- NOTE  Number Question -->
              <transition
                appear
                enter-active-class="animated bounceIn duration-number-question-in"
                leave-active-class="animated bounceOut duration-number-question-out"
                v-if="isActivePracticeNumberQuestion"
              >
                <div class="absolute-bottom-left q-pb-sm" style="z-index:2">
                  <div
                    align="center"
                    class="bg5 q-py-md q-px-md br-a-sm text-h4 shadow-1"
                    style="width:200px;"
                  >
                    <span>
                      ข้อ
                      {{
                        "" +
                          (practice.currentQuestion + 1) +
                          "/" +
                          practice.answerData.length
                      }}
                    </span>
                  </div>
                </div>
              </transition>
            </div>
            <div class="col  relative-position">
              <!-- NOTE  Logo -->
              <div
                align="center"
                class="relative-position q-my-md"
                style="overflow:hidden;"
              >
                <transition
                  appear
                  enter-active-class="animated slideInDown duration-practice-logo-in"
                  leave-active-class="animated slideOutUp duration-practice-logo-in"
                  v-if="isActivePracticeLogo"
                >
                  <q-img
                    v-if="practice.type == 'pretest'"
                    src="../../statics/prepost/preTest.png"
                    style="max-width:420px;width:100%;"
                  ></q-img>

                  <q-img
                    v-if="practice.type == 'posttest'"
                    src="../../statics/prepost/postTest.png"
                    style="max-width:420px;width:100%;"
                  ></q-img>
                </transition>
              </div>
            </div>
            <div class="col-4 relative-position  " style="width:200px;"></div>

            <!-- NOTE  Practice Data : แบบฝึกหัด -->
            <div class="col-12" style="z-index:5">
              <div class="bg5 br-a-md q-px-xl q-py-lg">
                <div
                  class="row justify-center items-center box-progress-bar"
                  style="height:600px;"
                  v-if="!isLoadData"
                >
                  <q-spinner-hourglass color="deep-orange-10" size="100" />
                </div>

                <div v-if="isLoadData">
                  <!-- NOTE  instruction : ชุดคำสั่ง -->
                  <div
                    class="text-h6 q-pa-md br-a-md"
                    style="border:1px dashed #000;border-width:2px;"
                  >
                    <div>
                      <span
                        v-html="
                          practice.answerData[practice.currentQuestion]
                            .instructioneng
                        "
                      ></span>
                    </div>
                    <div>
                      <span
                        v-html="
                          practice.answerData[practice.currentQuestion]
                            .instructionthai
                        "
                      ></span>
                    </div>
                  </div>

                  <!-- NOTE  question : คำถาม -->
                  <div class="text-h5 q-py-lg q-px-lg">
                    <div
                      v-html="
                        practice.answerData[this.practice.currentQuestion]
                          .question
                      "
                    ></div>
                  </div>

                  <!-- NOTE  choice : คำตอบ -->
                  <q-btn
                    @click="answerBtn(item)"
                    no-caps
                    dense
                    class="full-width color1 br-a-sm q-mt-md"
                    :class="{
                      bg14: index == 0,
                      bg8: index == 1,
                      bg10: index == 2,
                      bg7: index == 3
                    }"
                    align="left"
                    v-for="(item, index) in practice.answerData[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                    :disable="isSaveData"
                    :loading="isSaveData"
                  >
                    <template v-slot:loading>
                      <q-spinner-facebook size="3vw" />
                    </template>
                    <div class="row full-width">
                      <div
                        class="col-2 self-center q-pa-md"
                        style="width:100px"
                      >
                        <q-icon
                          :name="
                            index == 0
                              ? 'fas fa-dove'
                              : '' || index == 1
                              ? 'fas fa-fish'
                              : '' || index == 2
                              ? 'fas fa-frog'
                              : '' || index == 3
                              ? 'fas fa-spider'
                              : ''
                          "
                          size="45px"
                        ></q-icon>
                      </div>
                      <div
                        class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm"
                        align="left"
                      >
                        <div class="self-center q-px-md">
                          <span class="text-h5">{{ item }}</span>
                        </div>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </div>
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
      studentPracticeData: {
        type: "",
        dataAnswerList: [],
        currentQuestion: 0,
        class: "",
        room: "",
        studentKey: "",
        studentName: "",
        studentNo: "",
        status: false,
        schoolKey: "",
        academicYear: "",
        timeStamp: ""
      },
      // SECTION  Data
      practice: {
        currentQuestion: 0,
        answerData: [],
        timer: "-- : --",
        key: "",
        type: "posttest", // เก็บข้อมูลประเภทแบบฝึกหัด
        startTimer: ""
      },

      // SECTION  Status Active
      activeType: "", // เก็บข้อมูลประเภท
      talking: {
        ready:
          "เจ้าพร้อมทดสอบความสามารถแล้วหรือยัง เจ้ามีเวลาเพียง 40 นาทีเท่านั้น อย่าลืม “ความซื่อสัตย์” เป็นสิ่งสำคัญที่สุด",
        waitingfriend:
          "เจ้าทำเสร็จแล้วหรอ เร็วกว่าที่ข้าคิดไว้อีก รอเพื่อนสักครู่นะ",
        finish:
          "เจ้าทำช้า หรือข้าให้เวลาเจ้าน้อยไปนะ ข้าคงต้องกลับไปคิดดูสักหน่อยแล้ว"
      },
      isActiveMain: false, // เปิดใช้งาน Animation : หน้าหลัก
      isActiveMainLogo: false, // เปิดใช้งาน Animation : โลโก้
      isActiveMainTalk: false, // เปิดใข้งาน Animation : แบบสนทนา

      isActivePractice: false, // เปิดใช้งาน Animation : แบบทดสอบ
      isActivePracticeLogo: false, // เปิดใช้งาน Animation : โลโก้
      isActivePracticeNumberQuestion: false, // เปิดใช้งาน Animation : แสดงจำนวนข้อแบบฝึกหัด

      isLoadData: false, // โหลดข้อมูล
      isTimeOut: false, // หมดเวลา
      isSaveData: false, // ปุ่มจะไม่สามารถกดได้เมื่อมีการเซฟข้อมูลอยู่
      isLoadPractice: false,

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight, // เก็บข้อมูลขนาดความสูง

      snapSync: ""
    };
  },
  methods: {
    // ปุ่มกดเลือกคำตอบ
    async answerBtn(answer) {
      this.isSaveData = true;

      // เก็บคำตอบของเด็กนักเรียน
      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practice.answerData[this.practice.currentQuestion].key;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correctAnswer = this.practice.answerData[
        this.practice.currentQuestion
      ].correctanswer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = answer;

      if (
        this.practice.answerData[this.studentPracticeData.currentQuestion]
          .correctanswer ==
        this.practice.answerData[
          this.studentPracticeData.currentQuestion
        ].defaultChoice.indexOf(answer)
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";

        this.studentPracticeData.correct++;
      } else {
        this.studentPracticeData.incorrect++;
      }

      let finishPractice = false;
      let setTime = 0;

      if (
        this.practice.currentQuestion + 1 !=
        this.practice.answerData.length
      ) {
        this.practice.currentQuestion++;
      } else {
        finishPractice = true;

        let currentDate = await this.getDateAndTime();

        let setSecondsToMinutes =
          (currentDate.microtime - this.$q.localStorage.getItem("useTime")) /
          1000;

        setTime = this.secondToMinutes(setSecondsToMinutes);
      }

      db.collection("studentprepostlog")
        .doc(this.practice.key)
        .update({
          dataAnswerList: this.studentPracticeData.dataAnswerList,
          status: finishPractice,
          currentQuestion: (this.studentPracticeData.currentQuestion += 1),
          useTime: setTime,
          correct: this.studentPracticeData.correct,
          incorrect: this.studentPracticeData.incorrect
        })
        .then(() => {
          if (finishPractice) {
            this.isLoadData = true;
            this.isActivePractice = false;
            this.isActivePracticeLogo = false;
            this.isActivePracticeNumberQuestion = false;

            setTimeout(() => {
              this.activeType = "waitingfriend";
              this.isActiveMain = true;
              this.isActiveMainLogo = true;
              this.isActiveMainTalk = true;
            }, 2000);
          }

          setTimeout(() => {
            this.isSaveData = false;
          }, 500);
        });
    },

    async loadPractice() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;

      // TODO :  Filter Data : ชั้น, ห้อง, เทอม, ปี, รหัสแบบฝึกหัด
      let filterStudent =
        this.studentData.classRoom +
        "-" +
        this.studentData.room +
        "-" +
        this.studentData.term +
        "-" +
        this.studentData.year +
        "-" +
        this.practice.type;

      // TODO : Load Question Pool
      db.collection("questionpool")
        .doc("server")
        .collection("practice")
        .where("level", "==", this.studentData.level.toString())
        .where(
          this.practice.type == "pretest" ? "preTest" : "postTest",
          "==",
          true
        )
        .get()
        .then(async doc => {
          let temp = [];
          if (doc.size) {
            doc.forEach(data => {
              let final = {
                key: data.id,
                ...data.data(),
                choices: data.data().choices,
                defaultChoice: data.data().choices
              };

              final.choices.sort(() => {
                return 0.5 - Math.random();
              });

              temp.push(final);
            });

            // TODO : Load Student Practice Log
            // TODO : ต้องแยก Type ว่าเป็น pretest หรือ posttest ตอนค้นหา
            db.collection("studentprepostlog")
              .where("filter", "==", filterStudent)
              .where("studentKey", "==", this.studentData.key)
              .get()
              .then(async checkData => {
                // TODO : กรณีมีข้อมูลแล้ว
                if (checkData.size > 0) {
                  this.studentPracticeData = checkData.docs[0].data();
                  this.practice.key = checkData.docs[0].id;

                  // TODO : กรณีมีแบบฝึกหัดแล้วและทำแบบฝึกหัดจบแล้ว
                  if (checkData.docs[0].data().status) {
                    this.isLoadData = true;
                    this.isActivePractice = false;
                    this.isActivePracticeLogo = false;
                    this.isActivePracticeNumberQuestion = false;

                    setTimeout(() => {
                      this.activeType = "finish";
                      this.isActiveMain = true;
                      this.isActiveMainLogo = true;
                      this.isActiveMainTalk = true;
                    }, 1000);
                    return;
                  }

                  // TODO : กรณีมีแบบฝึกหัดแล้วแต่ยังทำแบบฝึกหัดไม่เสร็จ
                  else {
                    this.practice.currentQuestion = checkData.docs[0].data().currentQuestion;

                    // TODO : หาข้อมูลแบบฝึกหัดที่ทำไปแล้วเป็น Array[]
                    let setQuestion = this.studentPracticeData.dataAnswerList.filter(
                      x => {
                        return x.key != "";
                      }
                    );

                    // TODO : หาข้อมูลที่เหมือนกันในแบบฝึกหัดจริงและตัดข้อมูลที่ทำไปแล้วออก
                    for (let i = 0; i < setQuestion.length; i++) {
                      let setIndex = temp
                        .map(x => {
                          return x.key;
                        })
                        .indexOf(setQuestion[i].key);

                      temp.splice(setIndex, 1); // ตัดข้อมูล
                    }

                    this.sortRandom(temp); // สุ่มแบบฝึกหัด

                    // TODO : เอาแบบฝึกหัดที่ทำไปแล้วก่อนหน้านี้กับแบบฝึกหัดที่เหลือมาร่วมกันให้มีจำนวนเท่ากับแบบฝึกหัดที่เหลือและแบบฝึกหัดที่ยังไม่ได้ทำ
                    this.practice.answerData = [...setQuestion, ...temp];

                    this.isActivePracticeNumberQuestion = true;
                    this.isLoadData = true;
                  }
                }
                // TODO : กรณียังไม่มีข้อมูล
                else {
                  db.collection("studentprepostlog")
                    .where("filter", "==", filterStudent)
                    .where("studentKey", "==", this.studentData.key)
                    .get()
                    .then(async checkSize => {
                      if (!checkSize.size) {
                        // NOTE เช็คซ้ำอีกรอบ ถ้ายังไม่มีข้อมูลให้แอดข้อมูลเข้า
                        this.sortRandom(temp); // สุ่มแบบฝึกหัด

                        this.practice.answerData = temp;
                        // TODO : เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                        for (let i = 0; i < temp.length; i++) {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: ""
                          };

                          this.studentPracticeData.dataAnswerList.push(newData);
                        }

                        this.studentPracticeData = {
                          // TODO : Filter Data
                          filter: filterStudent, // ชั้น, ห้อง, เทอม, ปี, รหัสแบบฝึกหัด
                          // Practice Answer Data
                          currentQuestion: 0, // แบบฝึกหัดข้อปัจจุบัน
                          dataAnswerList: this.studentPracticeData
                            .dataAnswerList, // ข้อมูลที่นักเรียนตอบแต่ละข้อเก็บเป็น Array[]
                          totalQuestion: temp.length, // จำนวนข้อทั่้งหมด
                          correct: 0, // ข้อที่ตอบถูก
                          incorrect: 0, // ข้อที่ตอบผิด
                          useTime: 0, // เวลาที่ใช้ในการทำแบบฝึกหัด
                          date: await this.getDateAndTime(), // วันที่และเวลาปัจจุบันที่ทำ
                          status: false, // สถานะ true ทำเสร็จแล้ว false ยังทำไม่เสร็จ
                          // TODO : School Data
                          schoolKey: this.studentData.schoolKey, // รหัสโรงเรียน
                          term: this.studentData.term, // เทอม
                          year: this.studentData.year, // ปี
                          class: this.studentData.classRoom, // ชั้น
                          room: this.studentData.room, // ห้อง
                          studentKey: this.studentData.key, // รหัส
                          studentNo: this.studentData.no, // เลขที่
                          studentName:
                            this.studentData.name +
                            " " +
                            this.studentData.surname, // ชื่อนาม-สกุล
                          type: this.practice.type
                        };

                        // TODO : Add Student Practice Log
                        db.collection("studentprepostlog")
                          .add(this.studentPracticeData)
                          .then(key => {
                            this.practice.key = key.id;

                            this.isActivePracticeNumberQuestion = true;
                            this.isLoadData = true;

                            this.activeType = "start";
                          });
                      }
                    });
                }
              });
          }
        });
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
          if (doc.size) {
            this.updateOnlineStudent();

            let page = doc.docs[0].data().currentPage;
            this.$q.localStorage.set(
              "useTime",
              doc.docs[0].data().date.microtime
            );

            if (page == "prepare-pretest" || page == "prepare-posttest") {
              this.practice.type = doc.docs[0].data().currentPage.substr(8);
              this.isActiveMain = true;
              this.isActiveMainTalk = true;
              this.isActiveMainLogo = true;

              this.activeType = "ready";
            } else if (page == "start-pretest" || page == "start-posttest") {
              this.practice.type = doc.docs[0].data().currentPage.substr(6);
              this.isActiveMain = false;
              this.isActiveMainTalk = false;
              this.isActiveMainLogo = false;

              setTimeout(() => {
                this.isActivePractice = true;
                this.isActivePracticeLogo = true;

                this.activeType = "start";

                if (!this.isLoadPractice) {
                  this.loadPractice();
                }
              }, 700);
            } else if (page == "finish-pretest" || page == "finish-posttest") {
              this.practice.type = doc.docs[0].data().currentPage.substr(7);

              if (this.activeType != "waitingfriend") {
                this.activeType = "finish";
              } else {
                this.activeType = "waitingfriend";
              }

              this.isActiveMain = true;
              this.isActiveMainLogo = true;
              this.isActiveMainTalk = true;
            }
          }
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    this.snapSync();
    this.$q.localStorage.remove("useTime");
  }
};
</script>

<style lang="scss" scoped>
.sticky-lighting {
  position: absolute;
  top: 0px;
  left: 450px;
  width: 350px;
}

.sticky-table {
  position: sticky;
  top: 100%;
}

.bartender {
  left: 50%;
  transform: translate(-50%, 0);
  min-height: calc(100vh - 150px);
}

.btn-active {
  transition-duration: 0.2s;
}

.btn-active:hover {
  background-color: #ffffffe3;
}

.btn-active:active {
  background-color: #ffffffaf;
}

.duration-practice-start-in {
  animation-duration: 0.6s;
}
.duration-practice-start-out {
  animation-duration: 0.6s;
  animation-delay: 0.5s;
}

.duration-practice-logo-in {
  animation-delay: 0.6s;
}

.duration-practice-logo-out {
  animation-delay: 0.2s;
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

.duration-slide-out {
  animation-duration: 0.5s;
}

.duration-talk-in {
  animation-delay: 0.5s;
}
.duration-talk-out {
  animation-delay: 0.3s;
}
</style>
