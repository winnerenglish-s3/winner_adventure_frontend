<template>
  <q-page
    class="q-pa-md color3 bg-grammar bg-blend-mode animated fadeIn"
    :class="isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div v-if="isLoadPractice" class="absolute-center">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <transition
      appear
      enter-active-class="animated fadeInDown "
      leave-active-class="animated fadeOutUp "
      v-if="!isLoadPractice"
    >
      <div class="relative-position" style="top:30px" align="center">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="border-dashed br-a-sm q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">ถามตอบไวยากรณ์</span>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="isLoadState" class="absolute-center"></div>

    <div v-else>
      <!-- NOTE  Timer : ตัวจับเวลา -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="!isLoadPractice"
      >
        <div class="q-mt-xl row justify-center">
          <div class="col-lg-9 col-md-12 col-xs-12 relative-position">
            <!-- จำนวนนักเรียน / เวลา -->
            <div class="absolute-left" style="top:-92px">
              <q-btn
                flat
                class="bg1 border3-xl q-py-sm q-px-xs br-a-md no-pointer-events"
                icon="far fa-user"
                size="lg"
              >
                <span
                  class="text-h5 q-pl-sm"
                  style="width:100px;"
                >{{ finishStudent }}/ {{totalOnlineStudent}}</span>
              </q-btn>
            </div>
            <div class="absolute-right" style="top:-92px">
              <countdown-timer class="relative-position" :practiceTimeProps="currentPractice.time"></countdown-timer>
            </div>

            <div class="bg5 br-a-sm q-px-md q-py-md">
              <div class="border-dashed-sentence br-a-sm q-pa-lg">
                <!-- เลขข้อ -->
                <div class="q-py-sm" v-show="currentState != '3' && currentState != '6'">
                  <div class="row border3-sm bg1 color3 text-bold">
                    <div
                      align="center"
                      v-for="(i, index) in practiceData"
                      :key="index"
                      class="col q-pa-xs"
                      :class="[
                        {
                          'bg8 color1': currentQuestion == index,
                          'bg10 color1': currentQuestion > index
                        },
                        { 'border3-r-sm': index != practiceData.length - 1 }
                      ]"
                    >{{ index + 1 }}</div>
                  </div>
                </div>
                <div
                  class="q-pa-sm bg3 color1 text-h6"
                  v-show="currentState != '3' && currentState != '6'"
                >
                  <div class="q-pa-md" v-html="practiceData[currentQuestion].question"></div>
                </div>

                <!-- คำถาม -->
                <transition
                  appear
                  enter-active-class="animated fadeIn duration-fade-in"
                  leave-active-class="animated fadeOut duration-fade-out"
                  v-if="currentState == '1' || currentState == '2'"
                >
                  <div>
                    <div>
                      <q-btn
                        no-caps
                        dense
                        class="full-width color1 br-a-sm q-mt-md no-pointer-events"
                        :class="isActiveAnswer == false ? 'bg11 ' : index == 0  ?'bg14' : index == 1 ? 'bg8' : index == 2 ? 'bg10' : index == 3 ? 'bg7' : null"
                        align="left"
                        v-for="(item, index) in practiceData[currentQuestion]
                          .choices"
                        :key="index"
                      >
                        <template v-slot:loading>
                          <q-spinner-facebook size="3vw" />
                        </template>

                        <div class="row full-width">
                          <div class="col-2 self-center q-pa-md" style="width:100px">
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
                          <div class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm" align="left">
                            <div class="self-center q-px-md">
                              <span class="text-h5" v-html="item"></span>
                            </div>
                          </div>
                        </div>
                      </q-btn>
                    </div>
                  </div>
                </transition>
                <!-- graph -->
                <transition
                  appear
                  enter-active-class="animated fadeIn duration-fade-in"
                  leave-active-class="animated fadeOut duration-fade-out"
                  v-else-if="currentState == '3'"
                >
                  <div
                    class="q-mt-md row justify-center"
                    style="max-height:fit-content;min-height:400px"
                  >
                    <div class="col-md-12 col-xs-10 q-px-md q-pa-sm q-mb-xl q-pb-xl">
                      <span class="text-h5">สรุปคำตอบที่ลูกเรือเลือก</span>
                    </div>

                    <div class="col-12 row justify-center self-end q-mb-xl">
                      <div class="col-md-10 col-xs-12 row border2-b-md q-px-lg">
                        <div
                          align="center"
                          class="col self-end"
                          v-for="(item, index) in practiceData[currentQuestion]
                            .choices"
                          :key="index"
                        >
                          <div
                            class="q-mx-md q-pa-xs q-mb-xs relative-position"
                            v-if="isLoadSnap && practiceLogData"
                            :class="{
                              bg14: index == 0,
                              bg8: index == 1,
                              bg10: index == 2,
                              bg7: index == 3
                            }"
                            :style="
                              'height:' +
                                (practiceLogData
                                  .map(e => {
                                    return e.dataAnswerList.filter(x => {
                                      return (
                                        x.index == index &&
                                        x.no == currentQuestion
                                      );
                                    }).length;
                                  })
                                  .reduce((a, b) => a + b, 0) *
                                  300) /
                                  totalOnlineStudent +
                                'px;'
                            "
                          >
                            <span
                              class="absolute-top text-h6 text-black text-bold"
                              style="top:-35px;"
                            >
                              {{
                              practiceLogData
                              .map(e => {
                              return e.dataAnswerList.filter(x => {
                              return (
                              x.index == index &&
                              x.no == currentQuestion
                              );
                              }).length;
                              })
                              .reduce((a, b) => a + b, 0)
                              }}
                            </span>
                          </div>

                          <div
                            class="text-white q-mx-md q-pa-sm"
                            :class="{
                              bg14: index == 0,
                              bg8: index == 1,
                              bg10: index == 2,
                              bg7: index == 3
                            }"
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
                              size="30px"
                            ></q-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                <!-- เฉลยถูกผิด -->
                <transition
                  appear
                  enter-active-class="animated fadeIn duration-fade-in"
                  leave-active-class="animated fadeOut duration-fade-out"
                  v-else-if="currentState == '4'"
                >
                  <div>
                    <!-- ชอยส์ -->
                    <div>
                      <q-btn
                        no-caps
                        dense
                        class="full-width color1 br-a-sm q-mt-md"
                        :class="{
                          bg3:
                            index ==
                            practiceData[currentQuestion].correctanswer,
                          'bg11 no-pointer-events':
                            index != practiceData[currentQuestion].correctanswer
                        }"
                        align="left"
                        v-for="(item, index) in practiceData[currentQuestion]
                          .choices"
                        :key="index"
                      >
                        <template v-slot:loading>
                          <q-spinner-facebook size="3vw" />
                        </template>

                        <div class="row full-width">
                          <div class="col-2 self-center q-pa-md" style="width:100px">
                            <q-icon
                              name="fas fa-check"
                              size="45px"
                              v-if="
                                practiceData[currentQuestion].correctanswer ==
                                  index
                              "
                            ></q-icon>
                            <q-icon
                              v-else
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
                          <div class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm" align="left">
                            <div class="self-center q-px-md">
                              <span class="text-h5" v-html="item"></span>
                            </div>
                          </div>
                        </div>
                      </q-btn>
                    </div>
                  </div>
                </transition>
                <!-- คำอธิบาย -->
                <transition
                  appear
                  enter-active-class="animated fadeIn duration-fade-in"
                  leave-active-class="animated fadeOut duration-fade-out"
                  v-else-if="currentState == '5'"
                >
                  <div class="q-mb-xl">
                    <div class="border-dashed br-a-xs q-mt-lg q-pa-md" align="center">
                      <div class="q-mt-lg">
                        <span class="text-h4 text-bold">คำอธิบาย</span>
                      </div>
                      <div class="row justify-center" align="left">
                        <div class="q-mt-xl q-mb-md">
                          <span class="text-h5" v-html="practiceData[currentQuestion].description"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>

                <transition
                  appear
                  enter-active-class="animated fadeIn duration-fade-in"
                  leave-active-class="animated fadeOut duration-fade-out"
                  v-else-if="currentState == '6'"
                >
                  <div class="text-h6 br-a-md">
                    <div v-show="true" class="q-px-lg">
                      <div align="center" class="color3 text-h5">รายงานผลภารกิจ</div>
                      <div class="q-my-lg">
                        <div class="color3 q-pt-md text-h6">คะแนนเฉลี่ย</div>
                        <div class="q-px-lg">
                          <div class="bg1 relative-position q-mt-md" style="width:100%">
                            <!-- NOTE ขีดแรก -->
                            <div
                              class="absolute color7"
                              style="top:-19px;left:-0.5px;font-size:16px"
                            >|</div>
                            <!-- NOTE ขีดกลาง -->
                            <div
                              class="absolute color7"
                              align="right"
                              style="top:-19px;left:1px;width:50%;font-size:16px"
                            >|</div>
                            <!-- NOTE ขีดขวา -->
                            <div
                              class="absolute color7"
                              style="top:-19px;left:0.5px;width:100%;font-size:16px"
                              align="right"
                            >|</div>
                            <div
                              :class="avgScore >= 50 ? 'bg10' : 'bg7'"
                              :style="'width:'+ avgScore +'%'"
                            >
                              <!-- NOTE Green Bar -->
                              <div align="right" class="text-white q-pr-sm">{{ avgScore }}%</div>
                            </div>
                            <div class="color7 absolute" style="top:25px;left:-5px">0%</div>
                            <div
                              class="color7 absolute"
                              style="top:25px;left:0px;width:52%"
                              align="right"
                            >50%</div>
                            <div
                              class="color7 absolute"
                              style="top:25px;left:20px;width:100%"
                              align="right"
                            >100%</div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="q-py-lg row justify-center color3"
                        align="left"
                        style="font-size:22px"
                      >
                        <div v-if="avgScore < 50">"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดไม่ถูกต้อง"</div>
                        <div v-else>"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดผ่านเกณฑ์"</div>
                      </div>
                    </div>

                    <div v-show="false">
                      <!-- NOTE รูปแบบเก่า -->
                      <!-- HEADER TEXT -->
                      <span class="color3">แผนภูมิการกระจายผลคะแนนของลูกเรือ</span>

                      <div class="color3">
                        คะแนนเฉลี่ย
                        <span class="color10">{{ avgScore }}%</span>
                      </div>
                      <!-- GRAPH -->
                      <div class="row q-pa-xl box-progress-bar">
                        <div class="self-end col-12" style="z-index:5;">
                          <!-- TOTAL QUESTION <= 10 -->
                          <div class="row" align="center">
                            <div
                              class="col self-end"
                              v-for="(items,index) in summaryGraphHeight"
                              :key="index"
                            >
                              <div>
                                <div
                                  v-if="index != summaryGraphHeight.length - 1"
                                  style="position:relative;left:8%;padding-left:10px;padding-right:20px"
                                >
                                  <span>{{ items.number }} คน</span>
                                  <div
                                    class="bg10"
                                    style="width:40px"
                                    :style="'height:' + items.height + 'px'"
                                  ></div>
                                </div>

                                <div
                                  class="line-bar"
                                  v-if="index != summaryGraphHeight.length - 1"
                                  style="position:relative;left:0px"
                                  align="left"
                                >
                                  <span style="position:relative;top:-12px;left:3px">I</span>

                                  <span style="position:relative;left:-5px;top:5px">{{items.start}}</span>
                                </div>
                                <div v-else style="position:relative;left:0px" align="left">
                                  <span style="position:relative;top:-12px;left:-5px">I</span>

                                  <span style="position:relative;left:-12px;top:5px">{{items.start}}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div align="center" class="q-pt-md">คะแนนของลูกเรือ (%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>

                <!-- ปุ่มเริ่มทำ -->
                <div align="center" class="q-py-md" v-if="currentState != '6'">
                  <q-btn
                    v-if="!isLastQuestion"
                    class="bg3 color6 text-h6"
                    @click="startAction()"
                    style="width:160px"
                    push
                  >
                    <span v-if="currentState == '1'">เริ่มทำ</span>
                    <span v-else-if="currentState == '2'">สิ้นสุดการทำ</span>
                    <span v-else-if="currentState == '3'">เฉลยคำตอบ</span>
                    <span v-else-if="currentState == '4'">
                      คำอธิบาย
                      <q-icon name="fas fa-chevron-right"></q-icon>
                    </span>
                    <span v-else-if="currentState == '5'">
                      ข้อถัดไป
                      <q-icon name="fas fa-chevron-right"></q-icon>
                    </span>
                  </q-btn>
                  <q-btn
                    v-else-if="isLastQuestion && currentState != '6'"
                    class="bg3 color6 text-h6"
                    @click="endPractice()"
                    style="width:150px"
                    push
                    label="จบภารกิจ"
                  ></q-btn>
                </div>
                <div v-if="currentState == '6'" class="row q-pt-lg">
                  <div>
                    <q-btn
                      class="bg6 color3 text-h6"
                      icon="fas fa-redo"
                      push
                      label="ทำอีกครั้ง"
                      @click="retryDialog()"
                    ></q-btn>
                  </div>
                  <div class="offset-3">
                    <q-btn
                      class="bg3 color6 text-h6"
                      @click="nextLesson()"
                      icon="fas fa-star"
                      push
                      label="ภารกิจถัดไป"
                      :disable="isClickNextMission"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <increase-time
      v-if="showCountdownDialog"
      :isShowDialog="showCountdownDialog"
      @emitShowDialog="getEmitData"
    ></increase-time>

    <dialog-check-login
      v-if="showRetryDialog"
      :propsData="sendDataDialog"
      @dataclose="val => closePopupFunction(val)"
    ></dialog-check-login>
  </q-page>
</template>

<script>
import { db } from "../../router";
import appDialog from "../../components/dialog.vue";
import increaseTime from "../../components/increaseTime";
import dialogCheckLogin from "../../components/dialogchecklogin.vue";
import countdownTimer from "../../components/countdownTimer";
export default {
  components: {
    appDialog,
    increaseTime,
    dialogCheckLogin,
    countdownTimer
  },
  data() {
    return {
      successPercent: 0,
      isClickNextMission: false,
      showConfirmFinish: false,
      showRetryDialog: false,
      isLoadPractice: false,
      practiceData: [],
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentQuestion: 0,
      isActiveAnswer: false,
      currentState: "1", //initial == 1
      isSnapPracticeLog: "",
      practiceLogData: "",
      isLoadSnap: false,
      synchronizeData: "",
      isLastQuestion: false,
      isLoadState: true,
      summaryGraph: null,
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      isTimeOut: false,
      practiceTimer: "10:00",
      finishStudent: 0,
      snapFinishStudent: 0,
      timeInterval: "",
      snapGetOnlineStudent: "",
      totalOnlineStudent: 0,
      showCountdownDialog: false,
      avgScore: 0,
      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      summaryGraphHeight: ""
    };
  },
  methods: {
    retryDialog() {
      this.showRetryDialog = true;
      this.sendDataDialog.type = "retryPractice";
      this.sendDataDialog.title = "ทำอีกครั้ง";
      this.sendDataDialog.btn1 = "ตกลง";
      this.sendDataDialog.icon = "fas fa-redo";
      this.sendDataDialog.btn2 = "ยกเลิก";
    },
    closePopupFunction(val) {
      if (val.reFunction) {
        // NOTE กดตกลง
        this.confirmRetry();
      } else {
        // NOTE กดยกเลิก
        this.showRetryDialog = false;
      }
    },
    getEmitData(val) {
      this.showCountdownDialog = val;
    },
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
    confirmDialogFinish() {
      this.endPractice();
    },
    async confirmRetry(val) {
      // restart lesson
      // ปุ่มเรียนใหม่
      let date = await this.getDateAndTime();
      this.$q.localStorage.set(
        "timerMin",
        Number(this.currentPractice.time.split(":")[0])
      );
      this.$q.localStorage.set(
        "timerSec",
        Number(this.currentPractice.time.split(":")[1])
      );
      this.$q.localStorage.set("isExtraTime", false);
      this.finishClicked = false;
      this.$q.localStorage.remove("finishClicked");
      // ต้อง Reset แบบฝึกหัดของนักเรียนในระดับชั้นและห้อง ให้หมด ถ้ากดทำแบบฝึกหัดใหม่
      this.loadingShow();
      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear +
        "-" +
        this.currentPractice.practiceKey;

      let filterWhere1 =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      db.collection("classroomPracticeLog")
        .where("filter", "==", filterWhere1)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("schoolKey","==",this.teacherData.schoolKey)
        .get()
        .then(docpractice => {
          // ไปลบข้อมูลแบบฝึกหัดของห้องนี้ ระดับชั้นนี้ เทอมนี้ ปีนี้ทิ้ง
          db.collection("classroomPracticeLog")
            .doc(docpractice.docs[0].id)
            .delete()
            .then(() => {
              db.collection("studentpracticelog")
              .where("schoolKey","==",this.teacherData.schoolKey)
                .where("filter", "==", filterWhere)
                .get()
                .then(practice => {
                  if (practice.size) {
                    let counterUpdate = 0;
                    practice.forEach(element => {
                      db.collection("studentpracticelog")
                        .doc(element.id)
                        .delete()
                        .then(async () => {
                          counterUpdate++;
                          if (counterUpdate == practice.size) {
                            let sendData = {
                              class: this.currentClass,
                              room: this.currentRoom,
                              term: this.currentTerm,
                              year: this.currentYear
                            };
                            await this.checkPassedMission(sendData);

                            this.updateSync();
                            this.showRetryDialog = false;
                            this.currentState = "1";
                            this.isLastQuestion = false;
                            this.currentQuestion = 0;
                          }
                        });
                    });
                  } else {
                    this.updateSync();
                    this.showRetryDialog = false;
                    this.currentState = "1";
                    this.isLastQuestion = false;
                    this.currentQuestion = 0;
                  }
                });
            });
        });
    },
    async updateSync() {
      let date = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: this.currentPractice.practicetype,
          date: date,
          currentQuestion: 0,
          page: "1"
        })
        .then(() => {
          this.loadingHide();
          this.countdownTimer();
          this.isTimeOut = false;
        });
    },
    cancleDialog(val) {
      this.showRetryDialog = val;
      this.showConfirmFinish = val;
    },
    async checkFinishWorld() {
      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      let numOfPracticeInThisWorld = this.practiceListData.filter(
        x =>
          x.skill == this.currentPractice.skill &&
          x.level == this.currentPractice.level &&
          x.unit == this.currentPractice.unit
      ).length;

      // get passed practice from db
      let classPracticeLog = await db
        .collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("level", "==", this.currentPractice.level)
        .where("unit", "==", this.currentPractice.unit)
        .where("skill", "==", this.currentPractice.skill)
        .get();
      classPracticeLog = classPracticeLog.size;

      if (classPracticeLog == numOfPracticeInThisWorld) {
        return true;
      } else {
        return false;
      }
    },

    async nextLesson() {
      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear,
        currentPractice: this.currentPractice
      };
      this.isClickNextMission = true;
      this.goToNextLesson(sendData);
    },
    async endPractice() {
      // ปุ่มจบแบบฝึกหัด

      this.loadingShow();

      // let sendData = {
      //   class: this.currentClass,
      //   room: this.currentRoom,
      //   term: this.currentTerm,
      //   year: this.currentYear
      // };
      // this.checkPassedMission(sendData);

      let date = await this.getDateAndTime();
      let useTime =
        date.microtime - this.$q.localStorage.getItem("enterPracticeTime");
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
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("filter", "==", filterWhere)
        .where("schoolKey", "==", this.teacherData.schoolKey)
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
                schoolKey: this.teacherData.schoolKey,
                onlineStudent: this.totalOnlineStudent,
                totalStudent: this.decrypt(
                  this.$q.localStorage.getItem("totalStudent"),
                  2
                )
              })
              .then(() => {
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({
                    currentPage: "finish-practice",
                    date: date
                  })
                  .then(() => {
                    this.loadingHide();
                    this.currentState = "6";
                    this.showConfirmFinish = false;
                  });
              });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentPage: "finish-practice",
                date: date
              })
              .then(() => {
                this.loadingHide();
                this.currentState = "6";
                this.showConfirmFinish = false;
              });
          }
        });
    },
    async startAction() {
      this.isLoadState = true;

      let date = await this.getDateAndTime();
      console.clear();
      let graphData;
      let graphArr = [];
      for (
        let i = 0;
        i < this.practiceData[this.currentQuestion].choices.length;
        i++
      ) {
        let numberOfStudent = this.practiceLogData
          .map(e => {
            return e.dataAnswerList.filter(x => {
              return x.index == i && x.no == this.currentQuestion;
            }).length;
          })
          .reduce((a, b) => a + b, 0);
        let height = (numberOfStudent * 300) / this.totalOnlineStudent;
        graphArr.push({
          number: numberOfStudent,
          height: height
        });
      }

      let tempState = this.currentState;

      if (tempState == "1") {
        this.isActiveAnswer = true;
        tempState = "2";
      } else if (tempState == "2") {
        tempState = "3";
      } else if (tempState == "3") {
        tempState = "4";
      } else if (tempState == "4") {
        tempState = "5";
        if (this.currentQuestion == this.practiceData.length - 1) {
          this.isLastQuestion = true;
        }
      } else if (tempState == "5") {
        this.finishStudent = 0;
        this.isActiveAnswer = false;
        this.currentQuestion++;
        tempState = "1";
      }

      let updateData = {
        graph: graphArr,
        currentQuestion: this.currentQuestion,
        page: tempState,
        date: date
      };

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update(updateData)
        .then(() => {
          console.log("UPDATED");
          this.currentState = tempState;
          this.isLoadState = false;
        });
    },
    loadGrammarAction() {
      this.isLoadPractice = true;
      db.collection("practicepool_server")
        .where("practicekey", "==", this.currentPractice.practiceKey)
        .get()
        .then(doc => {
          let practiceData = [];
          doc.forEach(element => {
            let dataKey = {
              key: element.id
            };
            let merge = { ...dataKey, ...element.data() };
            practiceData.push(merge);
          });
          practiceData.sort((a, b) => {
            return a.order - b.order;
          });
          // SET INITIAL SYNCHRONIZE TO
          this.practiceData = practiceData;
          this.isLoadPractice = false;
          this.isLoadSnap = true;
          this.isLoadState = false;
        });
    },

    snapPracitceLog() {
      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear +
        "-" +
        this.currentPractice.practiceKey;

      this.isSnapPracticeLog = db
        .collection("studentpracticelog")
        .where("schoolKey","==",this.teacherData.schoolKey)
        .where("filter", "==", filter)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          let temp = [];
          doc.forEach(element => {
            let scorePercent =
              (element.data().correct / element.data().totalQuestion) * 100;
            let dataTemp = {
              scorePercent: Math.round(scorePercent)
            };
            temp.push({ ...element.data(), ...dataTemp });
          });
          this.practiceLogData = temp;

          let summaryGraphHeight = [];


          let avgScoreTemp = (this.avgScore = temp.map(
            x => (x.correct / x.totalQuestion) * 100
          ));

          let sumAvgScoreTemp = avgScoreTemp.reduce((a, b) => a + b, 0);

          let scoreAvgTemp = Math.round(sumAvgScoreTemp / avgScoreTemp.length);
          this.avgScore = scoreAvgTemp;


          if (isNaN(this.avgScore)) {
            this.avgScore = 0;
          }

          let countFinishStudent = temp.map(e => {
            return e.dataAnswerList.filter(x => {
              return x.no == this.currentQuestion && x.key != "";
            });
          });
          countFinishStudent = countFinishStudent.filter(x => {
            return x.length > 0;
          });
          this.finishStudent = countFinishStudent.length;
        });
    },
    getSynchronize() {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.synchronizeData = doc.data();
            this.currentQuestion = doc.data().currentQuestion;
            this.currentState = doc.data().page;
            if (doc.data().page == 2) {
              this.isActiveAnswer = true;
            }

            if (this.currentQuestion == this.practiceData.length - 1) {
              this.isLastQuestion = true;
            }
          }
          this.snapPracitceLog();
        });
    },

    forceFinish() {
      // TODO ฟังก์ชันจะทำงานต่อเมื่อเวลาหมด
    },
    countdownTimer() {
      let min = this.$q.localStorage.has("timerMin")
        ? this.$q.localStorage.getItem("timerMin")
        : Number(this.practiceTimer.split(":")[0]);
      let sec = this.$q.localStorage.has("timerSec")
        ? this.$q.localStorage.getItem("timerSec")
        : Number(this.practiceTimer.split(":")[1]);

      this.timeInterval = setInterval(() => {
        if (min == 0 && sec == 0) {
          clearInterval(this.timeInterval);
          this.isTimeOut = true;
          this.$q.localStorage.remove("timerMin");
          this.$q.localStorage.remove("timerSec");
        } else {
          if (this.$q.localStorage.has("timerMin")) {
            min = this.$q.localStorage.getItem("timerMin");
          }
          if (sec == 0) {
            min--;
            sec = 60;
          }
          sec--;
          this.$q.localStorage.set("timerMin", min);
          this.$q.localStorage.set("timerSec", sec);
        }
        sec = (sec < 10 ? "0" : "") + sec;
        this.practiceTimer = (min < 10 ? "0" : "") + min + " : " + sec;
      }, 1000);
    }
  },
  created() {
    this.$q.localStorage.set("isExtraTime", false);
    this.loadGrammarAction();
    this.getSynchronize();
    this.countdownTimer();
    this.getOnlineStudent();
  },
  beforeDestroy() {
    this.isSnapPracticeLog();
    clearInterval(this.timeInterval);
  },
  mounted() {
    // control shift k

    let _this = this;
    let map = { 75: false, 16: false, 17: false };
    window.addEventListener("keydown", function(e) {
      var e = e || event;
      if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[75] && map[16] && map[17]) {
          _this.endPractice();
        }
      }
    });
    window.addEventListener("keyup", function(e) {
      if (e.keyCode in map) {
        map[e.keyCode] = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.line-bar {
  border-top: 3px solid #353535;
}

.border-dashed-sentence {
  border-right: 2px dashed #662707;
  border-left: 2px dashed #662707;
  border-bottom: 2px dashed #662707;
  border-top: 2px dashed #662707;
}
</style>
