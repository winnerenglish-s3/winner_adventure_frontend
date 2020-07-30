<template>
  <div>
    <!-- SECTION  Main Practice  -->
    <div class="q-pa-md">
      <transition
        appear
        enter-active-class="animated zoomIn duration-practice-start-in"
        leave-active-class="animated bounceOut duration-practice-start-out"
        v-if="isActivePractice"
      >
        <div class="row box-practice relative-position">
          <div
            class="col-12 relative-position"
            v-if="
              practiceType.type == 'pretest' || practiceType.type == 'posttest'
            "
          >
            <!-- NOTE  Logo -->
            <div align="center" class="relative-position q-my-md" style="overflow:hidden">
              <transition
                appear
                enter-active-class="animated slideInDown duration-practice-logo-in"
                leave-active-class="animated slideOutUp duration-practice-logo-in"
                v-if="isActivePracticeLogo"
              >
                <q-img
                  src="../statics/prepost/preTest.png"
                  style="max-width:420px;width:100%;"
                  v-if="practice.type == 'pretest'"
                />
                <q-img
                  src="../statics/prepost/postTest.png"
                  style="max-width:420px;width:100%;"
                  v-if="practice.type == 'posttest'"
                />
              </transition>
            </div>
          </div>
          <div class="col-12 relative-position" v-if="!isLoadData">
            <!-- NOTE  Timer : ตัวจับเวลา -->
            <div class="absolute-bottom-right" style="bottom:15px;">
              <transition
                appear
                enter-active-class="animated bounceIn duration-timer-in"
                leave-active-class="animated bounceOut duration-timer-out"
                v-if="isActivePracticeTimer"
              >
                <q-btn
                  flat
                  class="bg1 border3-xl q-py-sm q-px-xs br-a-md no-pointer-events"
                  icon="far fa-clock"
                  size="lg"
                >
                  <span
                    class="text-h5 q-pl-sm"
                    style="width:100px;"
                    v-if="!isTimeOut"
                  >{{ practice.timer }}</span>
                  <span
                    style="width:100px;"
                    class="text-h5 animated flash infinite duration-timeout text-red q-pl-sm"
                    v-if="isTimeOut"
                  >หมดเวลา</span>
                </q-btn>
              </transition>
            </div>
          </div>

          <!-- NOTE  Show Data : แสดงข้อมูลเด็กนักเรียนที่กำลังทำอยู่ -->
          <div class="col-12" style="z-index:5;">
            <div class="bg5 br-a-md q-pa-md">
              <div>
                <div
                  class="text-h6 q-pa-md br-a-md"
                  style="border:1px dashed #000;border-width:2px;"
                >
                  <!-- NOTE  Header Content : แเสดงข้องมูลส่วนบน -->
                  <div class="row justify-end" v-if="!isLoadData">
                    <div class="col-4" style="width:250px;">
                      <div class="bg1 row justify-between border3-sm br-a-xs q-pa-sm">
                        <div class="self-end" align="left">
                          <span class="relative-position q-px-sm">ทำเสร็จ</span>
                        </div>
                        <div class="self-end" align="right">
                          <q-icon name="far fa-user" class="q-pb-sm" size="30px" />
                          <span class="relative-position q-px-sm">
                            {{
                            student.finish + "/" + totalOnlineStudent
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- NOTE  Body Content : แเสดงข้องมูลการทำแบบฝึกหัด -->
                  <div class="row justify-center items-center box-progress-bar" v-if="isLoadData">
                    <q-spinner-hourglass color="deep-orange-10" size="100" />
                  </div>

                  <div class="row" v-else>
                    <!--NOTE  Arrow Left : ปุ่มด้านซ้ายถัดไป -->
                    <transition
                      appear
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut"
                      v-if="isArrowLeft"
                    >
                      <div
                        class="col-2 bg5 self-center"
                        align="left"
                        style="width:50px;z-index:10;"
                      >
                        <q-btn
                          @click="
                            (showProgress = 'one'),
                              (isArrowLeft = !isArrowLeft),
                              (isArrowRight = !isArrowRight)
                          "
                          dense
                          style="height:200px;"
                          icon="fas fa-chevron-left"
                          class="bg3 color6 text-h6"
                        />
                      </div>
                    </transition>

                    <div class="col">
                      <q-tab-panels v-model="showProgress" class="bg5" animated>
                        <!-- SECTION  ตารางข้อมูลที่ 1 -->
                        <q-tab-panel name="one" v-touch-swipe.mouse.left="handleSwipe">
                          <div class="row box-progress-bar">
                            <div class="self-end full-width" style="z-index:5;">
                              <div class="row" align="center">
                                <div
                                  class="col self-end"
                                  style="font-size:15px;font-weight:bold;"
                                  v-for="(set, index) in practice.setQuestion"
                                  :key="index"
                                >
                                  <div>
                                    <div class="q-px-sm">
                                      <span>
                                        {{
                                        student.data
                                        .filter(
                                        x =>
                                        x.currentQuestion >=
                                        set.start &&
                                        set.end >= x.currentQuestion
                                        )
                                        .map(e => e.currentQuestion).length
                                        }}
                                        คน
                                      </span>
                                      <div
                                        :style="
                                          'max-height:' +
                                            totalOnlineStudent * 300 +
                                            'px;height:' +
                                            (student.data
                                              .filter(
                                                x =>
                                                  x.currentQuestion >=
                                                    set.start &&
                                                  set.end >= x.currentQuestion
                                              )
                                              .map(e => e.currentQuestion)
                                              .length *
                                              300) /
                                              totalOnlineStudent +
                                            'px'
                                        "
                                        class="bg10"
                                      ></div>
                                    </div>
                                    <div class="q-px-sm">
                                      <div style="height:10px" class="bg10"></div>
                                    </div>
                                  </div>

                                  <div class="line-bar">
                                    <span>{{ set.start + "-" + set.end }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>

                        <!-- SECTION  ตารางข้อมูลที่ 2 -->
                        <q-tab-panel name="two" v-touch-swipe.mouse.right="handleSwipe">
                          <div class="row box-progress-student me-scrollbar">
                            <table class="table-spacing">
                              <tr class="text-body1 z-top">
                                <td class="table-sticky">
                                  <div align="center" class="q-pa-xs">
                                    <span>เลขที่</span>
                                  </div>
                                </td>
                                <td class="table-sticky">
                                  <div align="center">
                                    <span>ชื่อ-นามสกุล</span>
                                  </div>
                                </td>
                                <td class="table-sticky" style="width:350px;">
                                  <div align="center">
                                    <span>ช่วงข้อที่ทำ</span>
                                  </div>
                                </td>
                              </tr>
                              <tbody>
                                <tr v-for="(item, index) in student.data" :key="index">
                                  <td
                                    style="width:60px;"
                                    class="br-tl-xs br-bl-xs"
                                    :class="{
                                      bg9: index % 2 == 0,
                                      bg4: index % 2 == 1
                                    }"
                                    align="center"
                                  >
                                    <div>
                                      <span>{{ item.studentNo }}</span>
                                    </div>
                                  </td>
                                  <td
                                    align="left"
                                    :class="{
                                      bg9: index % 2 == 0,
                                      bg4: index % 2 == 1
                                    }"
                                  >
                                    <div class="q-px-sm text-ellipsis">
                                      <span style="font-size:18px;">
                                        {{
                                        item.studentName
                                        }}
                                      </span>
                                    </div>
                                  </td>
                                  <td
                                    class="br-tr-xs br-br-xs q-py-sm q-px-md"
                                    :class="{
                                      bg9: index % 2 == 0,
                                      bg4: index % 2 == 1
                                    }"
                                  >
                                    <div class="row box-question border2-md">
                                      <div
                                        v-for="(set,
                                        index2) in practice.setQuestion"
                                        :key="index2"
                                        class="col q-pa-xs"
                                        :class="{
                                          'bg10 color1':
                                            item.currentQuestion >=
                                              set.end + 1 ||
                                            (item.currentQuestion ==
                                              practice.totalQuestion &&
                                              item.finish),
                                          bg1:
                                            item.currentQuestion < set.end + 1,
                                          'bg8 color1':
                                            item.currentQuestion >= set.start &&
                                            item.currentQuestion <= set.end,
                                          'border2-r-md':
                                            index2 !=
                                            practice.setQuestion.length - 1
                                        }"
                                        align="center"
                                      >
                                        <span>
                                          {{
                                          set.start + "-" + set.end
                                          }}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>

                    <!--NOTE  Arrow RIght : ปุ่มด้านขวาถัดไป -->
                    <transition
                      appear
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut"
                      v-if="isArrowRight"
                    >
                      <div
                        class="col-2 bg5 self-center"
                        align="right"
                        style="width:50px;z-index:10;"
                      >
                        <q-btn
                          @click="
                            (showProgress = 'two'),
                              (isArrowLeft = !isArrowLeft),
                              (isArrowRight = !isArrowRight)
                          "
                          dense
                          style="height:200px;"
                          icon="fas fa-chevron-right"
                          class="bg3 color6 text-h6"
                        />
                      </div>
                    </transition>
                  </div>

                  <!-- Footer Content : แสดงข้อมูลล่างสุด -->
                  <div align="center" v-if="!isLoadData">
                    <q-btn
                      label="เสร็จสิ้น"
                      class="q-py-xs q-px-lg bg3 color6"
                      style="font-size:18px;"
                      @click="dialogFinishTest = true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <w-dialog
        :isShow="dialogFinishTest"
        :header="'จบการทำแบบทดสอบ'"
        :content="'คุณต้องการจบการทำแบบทดสอบนี้หรือไม่'"
        :cancle="true"
        @confirmDialog="confirmFinish"
        @cancleDialog="cancleDialog"
      >
        <!-- props: ["isShow", "header", "content", "dialogPersis", "cancle"], -->
      </w-dialog>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
import wDialog from "../components/dialog.vue";
export default {
  components: {
    wDialog
  },
  props: ["practiceType", "collection"],
  data() {
    return {
      student: {
        finish: 0, // ข้อมูลนักเรียนที่ทำเสร็จแล้ว
        data: [] // ข้อมูลนักเรียน
      },
      // SECTION  Data
      practice: {
        totalQuestion: [], // เก็บข้อมูลแบบฝึกหัดทั้งหมด
        calQuestion: 7, // แบ่งข้อมูลออกแยกแต่ละ Section **** แก้ไขได้ไม่รู้จะตั้งชื่อะไร
        setQuestion: [], // ข้อมูลข้อแต่ละ Section **** แก้ไขได้ไม่รู้จะใช้ชื่อะไร
        room: this.$q.localStorage.getItem("classOptions")[0].value, // เลือกห้องเรียน
        roomOptions: this.$q.localStorage.getItem("classOptions"),
        type: this.practiceType.type, // ประเภทแบบฝึกหัด
        timer: "-- : --" // เวลาในการทำแบบฝึกหัด
        //โชว์แจ้งเตือนการกดปุ่มเสร็จสิ้น
      },
      dialogFinishTest: false,
      setTimer: "",
      showProgress: "one", // เปิดใช้งาน : แสดงข้อมูลจำนวนเด็กที่ทำแบบฝึกหัด
      isArrowLeft: false, // เปิดใช้งานปุ่ม : กดเปลื่ยนรูปแบบ
      isArrowRight: true, // เปิดใช้งานปุ่ม : กดเปลื่ยนรูปแบบ
      isActivePractice: true, // เปิดใช้งาน Animation : เปิดใช้งานแบบฝึกหัด
      isActivePracticeTimer: true, // เปิดใช้งาน Animation : ตัวจับเวลา
      isActivePracticeLogo: true,
      isLoadData: true, // เปิดใช้งานโหลดข้อมูล
      isTimeOut: false,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      snapGetOnlineStudent: "",
      totalOnlineStudent: 0,
      term: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      year: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2)
    };
  },
  methods: {
    cancleDialog(val) {
      this.dialogFinishTest = val;
    },
    confirmFinish(val) {
      this.dialogFinishTest = val;
      this.finishBtn();
    },
    async finishBtn() {
      this.loadingShow();
      let date = await this.getDateAndTime();
      let term = await this.getTerm();
      let year = await this.getAcademicYear();

      let checkExists = await db
        .collection("schooltestlog")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("term", "==", this.term)
        .where("year", "==", this.year)
        .where("testtype", "==", this.practiceType.type)
        .where("year", "==", year)
        .get();

      if (checkExists.size == 0) {
        // กรณียังไม่มีการบันทึกไว้
        db.collection("schooltestlog")
          .add({
            class: this.currentClass,
            room: this.currentRoom,
            schoolKey: this.teacherData.schoolKey,
            status: true,
            term: term.toString(),
            testtype: this.practiceType.type,
            year: year.toString(),
            date: date
          })
          .then(() => {
            let routePage;
            if (this.practiceType.type == "pretest") {
              routePage = "finish-pretest";
            } else if (this.practiceType.type == "posttest") {
              routePage = "finish-posttest";
            } else {
              routePage = "finish-placement";
            }
            this.isActivePractice = false;
            this.isActivePracticeTimer = false;
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentPage: routePage
              })
              .then(() => {
                this.loadingHide();
                this.$emit("finish", {
                  activeType: "start"
                });
              });
          });
      } else {
        this.isActivePractice = false;
        this.isActivePracticeTimer = false;
        this.loadingHide();
        this.$emit("finish", {
          activeType: "start"
        });
      }
    },
    async setQuestion() {
      // Load Total Question

      let currentClass = this.currentClass;
      if (
        (this.currentClass == "ป.1" ||
          this.currentClass == "ป.2" ||
          this.currentClass == "ป.3") &&
        this.practiceType.type == "placement"
      ) {
        // เช็คให้ไป talkingplacement ในกรณีที่เป็นแบบทดสอบ placement test เท่านั้น และ ป1-3 ไม่ต้องทำการ placement
        // กรณีเป็น ระดับชั้น ป1 / ป2/ ป3 ไม่ต้องทำการ placement
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            currentPage: "talkingplacement"
          })
          .then(() => {
            this.$router.push("/talkingplacement");
          });
        return;
      }

      currentClass = currentClass.replace("ป.", "p").replace("ม.", "m");

      // studentprepostlog
      // studentplacementlog

      let totalQuestion;
      if (this.collection == "studentplacementlog") {
        totalQuestion = await db
          .collection("placement")
          .doc("server")
          .collection("practice")
          .where("classRoom", "array-contains", currentClass)
          .get();
      } else if (this.collection == "studentprepostlog") {
        // ต้องการ Level
        // ต้องการ Type ว่าเป็น Pretest / Posttest
        let checkPracticeType =
          this.practiceType.type == "pretest" ? "preTest" : "postTest";
        totalQuestion = await db
          .collection("questionpool")
          .doc("server")
          .collection("practice")
          .where(
            "level",
            "==",
            this.decrypt(this.$q.localStorage.getItem("currentLevel"), 2)
          )
          .where(checkPracticeType, "==", true)
          .get();
      }

      // จำนวนข้อทั้งหมด
      totalQuestion = totalQuestion.size;

      if (totalQuestion <= 14) {
        this.practice.calQuestion = 2;
      }
      this.practice.totalQuestion = totalQuestion;

      let subQuestion = Math.ceil(totalQuestion / this.practice.calQuestion);
      let startQuestion = 0;
      let lastQuestion = this.practice.calQuestion;
      let total = 0;

      for (let i = 0; i < subQuestion; i++) {
        let end;
        let start;
        if (i == subQuestion - 1) {
          end = totalQuestion;
        } else {
          if (i == 0) {
            end = Number(startQuestion) + this.practice.calQuestion;
          } else {
            end = Number(startQuestion) + this.practice.calQuestion;
          }
        }
        start = Number(startQuestion) + 1;
        let newData = {
          start: start,
          end: end
        };

        startQuestion += this.practice.calQuestion;
        lastQuestion += this.practice.calQuestion;

        this.practice.setQuestion.push(newData);
      }

      this.snapStudentPlacementLog();
    },
    snapStudentPlacementLog() {
      let year = this.decrypt(this.$q.localStorage.getItem("currentYear"), 2);

      let dbtype = "";

      if (this.practice.type == "pretest" || this.practice.type == "posttest") {
        dbtype = db
          .collection(this.collection)
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("class", "==", this.currentClass)
          .where("room", "==", this.currentRoom)
          .where("year", "==", year)
          .where("type", "==", this.practice.type);
      } else {
        dbtype = db
          .collection(this.collection)
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("class", "==", this.currentClass)
          .where("room", "==", this.currentRoom)
          .where("year", "==", year);
      }

      dbtype.onSnapshot({ includeMetadataChanges: true }, doc => {
        this.student.data = [];
        this.student.finish = 0;
        let practice = this.practice.setQuestion;
        let find = "";
        doc.forEach(data => {
          if (data.data().status) {
            this.student.finish += 1;
          }
          let newData = data.data();
          newData.currentQuestion == 0
            ? (newData.currentQuestion = 1)
            : (newData.currentQuestion = newData.currentQuestion + 1);

          this.student.data.push(newData);
        });
        setTimeout(() => {
          this.isLoadData = false;
          this.timer(40, 0);
        }, 800);
      });
    },
    handleSwipe({ evt, ...info }) {
      if (this.isArrowRight) {
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
        this.showProgress = "two";
      } else {
        this.showProgress = "one";
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
      }
    },
    getOnlineStudent() {
      this.snapGetOnlineStudent = db
        .collection("student")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.totalOnlineStudent = doc.size;
        });
    }
  },
  mounted() {
    this.getOnlineStudent();
    this.setQuestion();
  },
  beforeDestroy() {
    this.snapGetOnlineStudent();
    clearInterval(this.practice.timer);
    this.$q.localStorage.remove("timerMin");
    this.$q.localStorage.remove("timerSec");
  }
};
</script>

<style lang="scss" scoped>
// Progress
.box-progress-bar {
  min-height: 500px;
}
.box-progress-student {
  min-height: 500px;
}

.line-bar {
  border-top: 3px solid #353535;
}

// Table
.me-scrollbar {
  overflow-y: auto;
}
.me-scrollbar::-webkit-scrollbar {
  width: 17px;
}

.me-scrollbar::-webkit-scrollbar-track {
  background-color: #d68a4c;
  border: 4px solid #eabd94;
  border-radius: 15px;
}

.me-scrollbar::-webkit-scrollbar-thumb {
  background-color: #662707;
  border-radius: 10px;
}

/* Handle on hover */
.me-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #662707;
}

.table-spacing {
  width: 100%;
  border-spacing: 8px;
}

.table-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #eabd94;
  padding: 10px 0px;
}

.text-ellipsis {
  max-width: 200px;
  min-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-question {
  margin: auto;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
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
  animation-delay: 0.5s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}

.duration-practice-logo-in {
  animation-delay: 0.6s;
}

.duration-practice-logo-out {
  animation-delay: 0.2s;
}

.duration-timeout {
  animation-duration: 2s;
}
</style>
