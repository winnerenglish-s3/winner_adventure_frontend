<template>
  <q-page class="bg-placement row relative-position animated fadeIn">
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Logo -->
    <div
      align="center"
      class="col-12"
      style="height:180px;"
      :class="{ 'absolute-top': activeType != 'start' }"
    >
      <transition
        appear
        enter-active-class="animated fadeInDown duration-label"
        leave-active-class="animated fadeOutUp duration-label"
      >
        <img
          class
          src="../../statics/placement/placement_label.png"
          style="max-width:350px;width:95%;"
        />
      </transition>

      <div :style="activeType != 'start' ? '' : { height: '80px' }"></div>
    </div>

    <div class="col-8" v-if="activeType != 'start'"></div>
    <div
      class="col-4 self-end q-pt-xl"
      align="center"
      v-if="activeType != 'start'"
    >
      <transition
        appear
        enter-active-class="animated fadeIn duration-pirates-in"
        leave-active-class="animated fadeOut duration-pirates-out"
        v-if="isActiveMainCharactor"
      >
        <q-img
          src="../../statics/placement/pirates_captain.png"
          style="width:84%;"
        ></q-img>
      </transition>
    </div>

    <!-- SECTION  Main Practice  -->
    <div class="col-12 q-pa-md relative-position" v-if="activeType == 'start'">
      <div align="center" v-if="!isLoadData">
        <q-spinner-facebook color="white" size="100" />
      </div>

      <div v-if="isLoadData">
        <transition
          appear
          enter-active-class="animated zoomIn duration-practice-start-in"
          leave-active-class="animated bounceOut duration-practice-start-out"
          v-if="isActivePractice"
        >
          <div class="row box-practice q-px-md relative-position">
            <div class="col-6 relative-position">
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

            <!-- NOTE  Practice Data : แบบฝึกหัด -->
            <div class="col-12" style="z-index:5">
              <div class="bg5 br-a-lg q-px-xl q-py-lg">
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
                    class="text-h6 q-pa-md br-a-xl"
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
                  <div class="text-h5 q-pt-lg q-pb-sm q-px-lg">
                    <div
                      v-html="
                        practice.answerData[practice.currentQuestion].question
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
                      bg7: index == 0,
                      bg8: index == 1,
                      bg9: index == 2,
                      bg10: index == 3
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
                              ? 'fas fa-spider'
                              : '' || index == 1
                              ? 'fas fa-fish'
                              : '' || index == 2
                              ? 'fas fa-dove'
                              : '' || index == 3
                              ? 'fas fa-frog'
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
                          <span class="text-h5" v-html="item"></span>
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

    <div
      class="col-12 q-px-lg q-pb-md absolute-bottom"
      style="overflow:hidden;"
    >
      <transition
        appear
        enter-active-class="animated fadeInUp duration-boxtalk-in"
        leave-active-class="animated fadeOutDown duration-boxtalk-out"
        v-if="isActiveMainTalk"
      >
        <div class="relative-position">
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-pa-md">
            <span
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              v-html="
                activeType == 'ready'
                  ? talking.ready
                  : '' || activeType == 'continue'
                  ? talking.continue
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
        answerData: [],
        timer: "-- : --",
        key: "",
        startTimer: "",
        currentQuestion: 0
      },

      // SECTION  Status Active
      activeType: "", // เก็บข้อมูลประเภท
      talking: {
        continue:
          "เรือของเจ้ายังไม่พร้อมออกเดินทาง ข้ากำลังเตรียมเรือให้เจ้าอยู่",
        ready:
          "ข้ามีเวลาให้เจ้าเพียง 40 นาที เท่านั้น หากเจ้าอยากได้เรือเพื่อออกผจญภัย จงเตรียมตัวให้พร้อมสำหรับการทดสอบ และรอฟังคำสั่งจากกัปตันของเจ้า",
        waitingfriend:
          "เจ้าทำเสร็จแล้วหรอ เร็วกว่าที่ข้าคิดไว้อีก รอเพื่อนสักครู่นะ",
        finish:
          "พวกเจ้าทำได้ดีมาก ข้าจะเตรียมเรือในการออกพจญภัยเอาไว้ให้ หลังจากนี้ให้รอฟังคำสั่งจากกัปตันของพวกเจ้า"
      },
      isActiveMainTalk: false, // เปิดใข้งาน Animation : แบบสนทนา
      isActiveMainCharactor: false, //เปิดใช้งาน Animation : รูปโจรสลัด

      isActivePractice: false, // เปิดใช้งาน Animation : เปิดใช้งานแบบฝึกหัด
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
      ].correctAnswer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].level = this.practice.answerData[this.practice.currentQuestion].level;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = answer;

      let finishPractice = false;
      let setTime = "";

      if (
        this.practice.answerData[this.studentPracticeData.currentQuestion]
          .correctAnswer ==
        this.practice.answerData[
          this.studentPracticeData.currentQuestion
        ].defaultChoice.indexOf(answer)
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";

        this.studentPracticeData.levelSet.filter(x => {
          if (
            x.level ==
            this.practice.answerData[this.practice.currentQuestion].level
          ) {
            x.summary++;
          }
        });

        this.studentPracticeData.correct++;
      } else {
        this.studentPracticeData.incorrect++;
      }

      if (
        this.practice.currentQuestion + 1 !=
        this.practice.answerData.length
      ) {
        this.practice.currentQuestion++;
      } else {
        finishPractice = true;
        this.studentPracticeData.status = true;
      }

      let currentTime = await this.getDateAndTime();

      let secondToMinutes =
        (currentTime.microtime - this.$q.localStorage.getItem("useTime")) /
        1000;

      this.studentPracticeData.useTime = this.secondToMinutes(secondToMinutes);

      this.studentPracticeData.currentQuestion += 1;

      db.collection("studentplacementlog")
        .doc(this.practice.key)
        .update(this.studentPracticeData)
        .then(() => {
          if (finishPractice) {
            this.isActivePractice = false;
            this.isActivePracticeNumberQuestion = false;

            setTimeout(() => {
              this.activeType = "waitingfriend";
              this.isActiveMainTalk = true;
              this.isActiveMainCharactor = true;
            }, 1000);
          } else {
            setTimeout(() => {
              this.isSaveData = false;
            }, 500);
          }
        });
    },

    // โหลดข้อมูล Practice Placment
    async loadPractice() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;

      // NOTE  Filter Data : ชั้น, ห้อง, เทอม, ปี, รหัสแบบฝึกหัด
      let filterStudent =
        this.studentData.classRoom +
        "-" +
        this.studentData.room +
        "-" +
        this.studentData.term +
        "-" +
        this.studentData.year;

      let newClass = this.studentData.classRoom;

      newClass = newClass.replace("ป.", "p").replace("ม.", "m");

      // TODO : Load Question Pool
      db.collection("placement")
        .doc("server")
        .collection("practice")
        .where("classRoom", "array-contains", newClass)
        .get()
        .then(async doc => {
          let setLevel = [];

          if (doc.size) {
            let temp = [];
            let newArr = [];
            let setLevel = [];
            doc.forEach(result => {
              let setData = {
                key: result.id,
                ...result.data(),
                choices: result.data().choices,
                defaultChoice: result.data().choices,
                level: result.data().level.toString()
              };

              this.sortRandom(setData.choices);

              setLevel.push(Number(result.data().level));
              newArr.push(setData);
            });

            setLevel = [...new Set(setLevel)];

            setLevel.sort((a, b) => {
              return a - b;
            });

            newArr.sort((a, b) => {
              return Number(a.level) - Number(b.level);
            });

            for (let i = 0; i < setLevel.length; i++) {
              let setSort = newArr.filter(x => {
                return x.level == setLevel[i];
              });

              this.sortRandom(setSort);

              temp.push(...setSort);
            }

            let newSetArray = [];
            setLevel.some(x => {
              let newData = {
                level: x,
                summary: 0
              };
              newSetArray.push(newData);
            });

            // เก่า

            // doc.forEach(data => {
            //   let final = {
            //     key: data.id,
            //     ...data.data(),
            //     choices: data.data().choices,
            //     defaultChoice: data.data().choices,
            //     level: data.data().level.toString()
            //   };

            //   final.choices.sort(() => {
            //     return 0.5 - Math.random();
            //   });

            //   temp.push(final);
            //   setLevel.push(Number(data.data().level));
            // });

            // setLevel = [...new Set(setLevel)];

            // setLevel.sort((a, b) => {
            //   return a - b;
            // });

            db.collection("studentplacementlog")
              .where("year", "==", this.studentData.year)
              .where("term", "==", this.studentData.term)
              .where("class", "==", this.studentData.classRoom)
              .where("room", "==", this.studentData.room)
              .where("studentKey", "==", this.studentData.key)
              .where("schoolKey", "==", this.studentData.schoolKey)
              .get()
              .then(async checkData => {
                if (checkData.size > 0) {
                  this.studentPracticeData = checkData.docs[0].data();
                  this.practice.key = checkData.docs[0].id;

                  if (checkData.docs[0].data().status) {
                    this.isLoadData = true;
                    this.isActivePractice = false;
                    this.isActivePracticeNumberQuestion = false;

                    setTimeout(() => {
                      this.activeType = "finish";
                      this.isActiveMainTalk = true;
                      this.isActiveMainCharactor = true;
                    }, 1000);

                    return;
                  } else {
                    this.practice.currentQuestion = checkData.docs[0].data().currentQuestion;

                    let setQuestion = this.studentPracticeData.dataAnswerList.filter(
                      x => {
                        return x.key != "";
                      }
                    );

                    for (let i = 0; i < setQuestion.length; i++) {
                      let setIndex = temp
                        .map(x => {
                          return x.key;
                        })
                        .indexOf(setQuestion[i].key);

                      temp.splice(setIndex, 1);
                    }

                    this.practice.answerData = [...setQuestion, ...temp];

                    this.isActivePracticeNumberQuestion = true;
                    this.isLoadData = true;

                    this.isLoadPractice = true;
                  }
                } else {
                  db.collection("studentplacementlog")
                    .where("year", "==", this.studentData.year)
                    .where("term", "==", this.studentData.term)
                    .where("class", "==", this.studentData.classRoom)
                    .where("room", "==", this.studentData.room)
                    .where("studentKey", "==", this.studentData.key)
                    .where("schoolKey", "==", this.studentData.schoolKey)
                    .get()
                    .then(async checkSize => {
                      if (!checkSize.size) {
                        this.practice.answerData = temp;

                        for (let i = 0; i < temp.length; i++) {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: "",
                            level: ""
                          };

                          this.studentPracticeData.dataAnswerList.push(newData);
                        }

                        this.studentPracticeData = {
                          // NOTE  Filter Data
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
                          // NOTE  School Data
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
                          levelSet: newSetArray
                        };

                        db.collection("studentplacementlog")
                          .add(this.studentPracticeData)
                          .then(key => {
                            this.practice.key = key.id;

                            this.isActivePracticeNumberQuestion = true;
                            this.isLoadData = true;

                            this.isLoadPractice = true;
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

            // TODO : currentPage = prepare-placement
            if (page == "prepare-placement") {
              this.isActiveMainTalk = true;
              this.isActiveMainCharactor = true;

              this.activeType = "ready";
            }
            // TODO : currentPage = start-placement
            else if (page == "start-placement") {
              this.isActiveMainTalk = false;
              this.isActiveMainCharactor = false;

              setTimeout(() => {
                this.isActivePractice = true;
                this.activeType = "start";

                if (!this.isLoadPractice) {
                  this.loadPractice();
                }
              }, 800);
            }
            // TODO : currentPage = start-placement
            else if (page == "finish-placement") {
              this.isActivePractice = false;

              setTimeout(() => {
                this.isActiveMainTalk = true;
                this.isActiveMainCharactor = true;
                this.activeType = "finish";
              }, 1000);
            }
            // TODO : currentPage = talkingplacement
            else {
              this.isActiveMainTalk = true;
              this.isActiveMainCharactor = true;
              setTimeout(() => {
                this.isActivePractice = false;
                this.activeType = "continue";
              }, 1000);
            }
          }
        });
    },

    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  async created() {
    await this.loadSynchronize();
  },
  beforeDestroy() {
    this.snapSync();
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

.sticky-boxtalk {
  position: sticky;
  top: 100%;
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
