<template>
  <q-page
    class="q-pa-md color3 bg-blend-mode animated fadeIn"
    :class="
      !isLoadPractice
        ? 'bg5 flex flex-center'
        : practiceSkill == 'Vocabulary'
        ? 'bg-vocabulary'
        : practiceSkill == 'Grammar'
        ? 'bg-grammar'
        : practiceSkill == 'Phonics'
        ? 'bg-phonics'
        : practiceSkill == 'Listening & Speaking'
        ? 'bg-listening'
        : null
    "
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <div v-if="isLoadPractice && isStartPractice">
      <transition
        appear
        enter-active-class="animated fadeInDown "
        leave-active-class="animated fadeOutUp "
        v-if="isActivePractice"
      >
        <div class="relative-position" align="center">
          <div
            class="bg5 br-a-sm q-pa-xs shadow-2"
            style="width:fit-content;width:-webkit-fit-content;"
          >
            <div class="border-dashed br-a-sm q-px-xl q-py-sm">
              <span
                class="text-bold"
                style="font-size:calc(20px + 1vw)"
              >{{ convertPracticeName(practiceType, practiceSkill) }}</span>
            </div>
          </div>
        </div>
      </transition>

      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActivePractice"
      >
        <div class="q-mt-md row justify-center">
          <div class="col-lg-9 col-md-12 col-xs-12 row relative-position">
            <div class="col-2 self-center bg5 shadow-2 br-a-xs q-pa-xs" style="width:150px;">
              <div class="border-dashed br-a-xs q-pa-md text-h5 text-bold" align="center">
                <span>
                  ข้อ
                  {{
                  practice.currentQuestion + 1 + "/" + practiceList.length
                  }}
                </span>
              </div>
            </div>
            <div
              class="row col bg1 border3-t-xl border3-b-xl border3-r-xl br-tr-xs br-br-xs q-pa-sm self-center"
            >
              <div class="col self-center text-overflow" align="left">
                <span class="text-h6 text-bold">
                  <span v-if="!isChangeLanguage">{{ practice.instructionEN }}</span>
                  <span v-else>{{ practice.instructionTH }}</span>
                  <q-tooltip anchor="top left" self="bottom left" :offset="[10, 10]">
                    <span style="font-size:20px;">
                      <span v-if="!isChangeLanguage">{{ practice.instructionEN }}</span>
                      <span v-else>{{ practice.instructionTH }}</span>
                    </span>
                  </q-tooltip>
                </span>
              </div>
              <div class="col-2" style="width:80px;" align="right">
                <q-btn
                  push
                  dense
                  class="bg6 text-h6 text-bold br-a-md q-px-md fit"
                  @click="isChangeLanguage = !isChangeLanguage"
                  :label="!isChangeLanguage ? 'ENG' : 'ไทย'"
                ></q-btn>
              </div>
            </div>

            <div class="col-12 absolute-top-right" align="right" style="top:-70px;">
              <!-- <q-btn push round class="q-ml-md color6 bg3 q-pa-sm" @click="isShowDialog = true">
              <q-icon name="fas fa-question" size="md"></q-icon>
              </q-btn>-->
              <q-btn
                push
                class="q-ml-md color6 bg3 q-pa-sm shadow-2 br-a-md"
                style="z-index:15;"
                @click="isShowDialog = true"
              >
                <q-icon name="far fa-question-circle" class="q-mr-md" size="md"></q-icon>
                <span class="text-h5">ตัวช่วย</span>
              </q-btn>
            </div>
          </div>

          <div class="col-lg-9 col-md-12 col-xs-12 row q-mt-sm relative-position">
            <div class="col bg5 q-mr-md br-a-sm">
              <div class="q-pa-lg">
                <div class="q-mb-md" v-if="practiceList[practice.currentQuestion].question != ''">
                  <span class="text-h5" v-html="practiceList[practice.currentQuestion].question"></span>
                </div>

                <!-- แสดงปุ่มตอบ -->
                <div class v-if="!isAnswer">
                  <q-btn
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
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                    @click="answerBtn(item.answer)"
                    :disable="isDisabled"
                    :loading="isSaveData"
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
                          <span class="text-h5" v-html="item.answer"></span>
                        </div>
                      </div>
                    </div>
                  </q-btn>
                </div>

                <!-- แสดงปุ่มที่ตอบผิดหรือถูก -->
                <div v-if="isAnswer">
                  <q-btn
                    no-caps
                    dense
                    align="left"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                    class="full-width br-a-sm q-mt-md no-pointer-events"
                    :class="{
                      'bg6 color3':
                        practiceList[practice.currentQuestion].correctanswer ==
                        item.index,
                      'bg3 color1':
                        studentPracticeData.dataAnswerList[
                          practice.currentQuestion
                        ].answer == item.answer,
                      'bg11 color1':
                        studentPracticeData.dataAnswerList[
                          practice.currentQuestion
                        ].answer != item.answer &&
                        practiceList[practice.currentQuestion].correctanswer !=
                          item.index
                    }"
                  >
                    <div class="row full-width">
                      <div class="col-2 self-center q-pa-md" style="width:100px">
                        <span
                          v-if="
                            studentPracticeData.dataAnswerList[
                              practice.currentQuestion
                            ].answer != item.answer &&
                              practiceList[practice.currentQuestion]
                                .correctanswer != item.index
                          "
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
                        </span>
                        <span
                          v-if="
                            practiceList[practice.currentQuestion]
                              .correctanswer == item.index
                          "
                        >
                          <q-icon name="fas fa-check" size="45px"></q-icon>
                        </span>
                        <span
                          v-if="
                            studentPracticeData.dataAnswerList[
                              practice.currentQuestion
                            ].answer == item.answer &&
                              practiceList[practice.currentQuestion]
                                .correctanswer != item.index
                          "
                        >
                          <q-icon name="fas fa-times" size="45px"></q-icon>
                        </span>
                      </div>
                      <div class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm" align="left">
                        <div class="self-center q-px-md">
                          <span class="text-h5" v-html="item.answer"></span>
                        </div>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </div>
            </div>

            <div class="col-3 bg5 br-a-sm relative-position" style="width:300px;">
              <div class="bg3 br-tl-sm br-tr-sm">
                <div class="color1 text-h5 q-pa-sm q-py-md" align="center">คำศัพท์เสริม</div>
              </div>
              <div
                class="row q-pa-sm relative-position"
                style="min-height:400px;max-height:fit-content"
                align="center"
              >
                <div
                  class="col-12 text-h6"
                  v-if="practiceList[practice.currentQuestion].extra.length > 0"
                >
                  <div
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].extra"
                    :key="index"
                    class="border3-xs br-a-xs q-mb-sm q-pb-xs"
                  >
                    <div>
                      <span class="text-bold">{{ item.vocabulary }}</span>
                    </div>
                    <div>
                      <span>{{ item.meaning }}</span>
                    </div>
                  </div>
                </div>
                <div v-else class="absolute-center col-10">
                  <div>
                    <div class="q-py-xl q-px-sm text-bold text-h6">ไม่มีคำศัพท์เสริม</div>
                  </div>
                </div>
              </div>
            </div>

            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              v-if="isShowDescription"
            >
              <div class="col-12 q-mt-md" v-if="isShowDescription">
                <div class="bg5 br-a-xs q-pa-lg">
                  <div
                    align="center"
                    class="q-pb-lg"
                    :class="
                      studentPracticeData.dataAnswerList[
                        practice.currentQuestion
                      ].status == 'ผิด'
                        ? 'color7'
                        : 'color10'
                    "
                  >
                    <q-icon
                      :name="
                        studentPracticeData.dataAnswerList[
                          practice.currentQuestion
                        ].status == 'ผิด'
                          ? 'far fa-times-circle'
                          : 'far fa-check-circle'
                      "
                      class="q-mx-md"
                      size="55px"
                    ></q-icon>
                    <span class="text-h5 text-bold">
                      {{
                      studentPracticeData.dataAnswerList[
                      practice.currentQuestion
                      ].status == "ผิด"
                      ? "ตอบผิด"
                      : "ตอบถูก"
                      }}
                    </span>
                  </div>
                  <div class="border-dashed q-pa-md q-py-md br-a-sm" align="center">
                    <span class="text-h5 text-bold">คำอธิบาย</span>
                    <div class="q-mt-sm">
                      <span
                        class="text-h6"
                        v-html="
                          practiceList[practice.currentQuestion].description
                        "
                      ></span>
                    </div>
                  </div>
                  <div class="q-mt-lg" align="center">
                    <q-btn
                      icon-right="fas fa-chevron-right"
                      label="ข้อถัดไป"
                      class="color6 bg3 text-h6 q-px-md"
                      @click="nextQuestionBtn()"
                      :disable="isDisabledNext"
                      v-if="!isFinish"
                    ></q-btn>

                    <q-btn
                      label="จบภารกิจ"
                      class="color6 bg3 text-h6 q-px-md"
                      @click="finishBtn()"
                      :disable="isDisabledNext"
                      v-if="isFinish"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="isLoadPractice && isFinishPractice">
      <waiting :dataType="practiceType"></waiting>
    </div>

    <!-- TODO : Dialog Vocab Help -->
    <q-dialog
      v-model="isShowDialog"
      v-if="practiceSkill == 'Vocabulary' && isLoadPractice"
      persistent
      content-class="backdrop"
    >
      <q-card
        flat
        class="relative-position bg-transparent q-pa-lg"
        style="max-width:1450px;width:100%;"
      >
        <div class="bg5" v-if="vocabHelp.length">
          <div class="row">
            <div
              class="col-4 bg1 border5-xs"
              align="center"
              v-for="(item, index) in vocabHelp"
              :key="index"
            >
              <div class="color3 q-pa-md">
                <div style="font-size:1.8vw;">
                  <span class="text-bold">{{ item.vocabulary }}</span>
                </div>
                <div style="font-size:1.5vw;" class="q-pa-xs">
                  <span>
                    {{ item.meaning }}
                    <!-- <q-tooltip anchor="top middle" self="bottom middle">
                      <span>{{ item.meaning }}</span>
                    </q-tooltip>-->
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div align="center" class="absolute-top-right">
            <q-btn
              round
              class="bg7 color1 text-bold"
              icon="fas fa-times"
              size="20px"
              @click="isShowDialog = false"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- TODO : Dialog Grammar VDO  Help -->
    <q-dialog
      full-height
      v-model="isShowDialog"
      persistent
      content-class="backdrop"
      v-if="
        practiceSkill == 'Grammar' ||
          (practiceSkill == 'Listening & Speaking' && isLoadPractice)
      "
      position="standard"
    >
      <q-card
        flat
        class="row justify-center items-center bg-transparent q-pa-lg"
        style="max-width:1450px;width:100%;"
      >
        <div
          class="bg5 full-width relative-position"
          style="border-radius:12px;"
          v-if="vdoHelp.length"
        >
          <div class="row">
            <div class="col-4 bg3 br-tl-sm q-pa-md br-bl-sm" style="width:350px;">
              <q-scroll-area
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 420px; max-width: 350px;"
              >
                <q-btn
                  class="full-width row q-pa-sm"
                  :class="[
                    vdoIndex == index ? 'bg6' : 'bg5',
                    index != vdoHelp.length - 1 ? 'q-mb-sm' : ''
                  ]"
                  no-caps
                  v-for="(item, index) in vdoHelp"
                  :key="index"
                  @click="(vdoIndex = index), (isPlayVideo = false)"
                  v-show="practiceSkill == 'Grammar'"
                >
                  <div
                    align="left"
                    class="col"
                    v-if="practiceSkill == 'Grammar'"
                  >{{ item.slideName }}</div>
                  <div align="left" class="col" v-else>{{ item.topic }}</div>
                </q-btn>

                <q-btn
                  class="full-width row q-pa-sm"
                  :class="[
                    vdoIndex == index ? 'bg6' : 'bg5',
                    index != vdoHelp.length - 1 ? 'q-mb-sm' : ''
                  ]"
                  no-caps
                  v-for="(item, index) in vdoHelp"
                  :key="index"
                  @click="(vdoIndex = index), (isPlayVideo = false)"
                  v-show="practiceSkill == 'Listening & Speaking' && !item.type"
                >
                  <div
                    align="left"
                    class="col"
                    v-if="practiceSkill == 'Grammar'"
                  >{{ item.slideName }}</div>
                  <div align="left" class="col" v-else>{{ item.topic }}</div>
                </q-btn>
              </q-scroll-area>
            </div>
            <div class="col bg5 q-pa-lg br-a-md q-mt-lg">
              <q-responsive :ratio="16 / 9" style="position:sticky;top:20px;" class="z-top">
                <video
                  :src="vdoHelp[vdoIndex].vdoURL"
                  :poster="vdoHelp[vdoIndex].imgURL"
                  controls
                  style="max-width:1000px;width:90%;"
                  controlslist="nodownload"
                  :id="vdoIndex"
                ></video>
              </q-responsive>
              <div class="q-pt-lg" align="center">
                <q-btn align="left" class="q-pa-xs bg3 color6" @click="playVDO(vdoIndex)">
                  <q-icon :name="isPlayVideo ? 'fas fa-pause' : 'fas fa-play'" class="q-mr-sm"></q-icon>
                  <span class="text-h6" v-html="isPlayVideo ? 'หยุดวีดีโอ' : 'เล่นวีดีโอ'"></span>
                </q-btn>
              </div>
            </div>
          </div>

          <div align="center" class="absolute-top-right" style="top:-20px;right:-20px;">
            <q-btn
              round
              class="bg7 color1 text-bold"
              icon="fas fa-times"
              size="20px"
              @click="isShowDialog = false"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index";
import waiting from "../../components/waiting.vue";
export default {
  components: {
    waiting
  },
  data() {
    return {
      studentPracticeData: {
        dataAnswerList: []
      },
      practice: {
        currentQuestion: 0,
        key: "",
        instructionTH: "",
        instructionEN: ""
      },
      practiceKey: "",
      practiceType: "",
      practiceName: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",
      practiceOrder: "",
      practiceList: [],
      vocabHelp: [],
      vdoIndex: 0,
      vdoHelp: [],

      isTimeOut: false,
      isShowDialog: false,
      isChangeLanguage: false,
      isActivePractice: true,

      isDisabled: false,
      isShowDescription: false,

      isLoadPractice: false,
      isStartPractice: false,
      isFinishPractice: false,

      isAnswer: false,
      isFinish: false,
      isDisabledNext: false,
      isSaveData: false,

      isLoad: false,
      isPlayVideo: false,

      snapSync: "",

      // NOTE : Scroll Bar
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#7A4019",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      }
    };
  },
  methods: {
    playVDO(index) {
      let refs = document.getElementById(index);

      this.isPlayVideo = !this.isPlayVideo;

      if (this.isPlayVideo) {
        refs.play();
      } else {
        refs.pause();
      }
    },
    finishBtn() {
      this.isDisabledNext = true;

      this.isActivePractice = false;
      this.isStartPractice = false;

      setTimeout(() => {
        this.isFinishPractice = true;
      }, 1000);
    },
    nextQuestionBtn() {
      this.isDisabledNext = true;
      this.isShowDescription = false;

      this.isDisabled = false;
      this.isAnswer = false;
      this.practice.currentQuestion++;
      this.isDisabledNext = false;

      document.documentElement.scrollTop = 0;
    },
    async answerBtn(answer) {
      this.isDisabled = true;
      this.isSaveData = true;

      let indexOf = this.practiceList[
        this.practice.currentQuestion
      ].currentAnswer
        .map(x => {
          return x;
        })
        .indexOf(answer);

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = answer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].order = this.practiceList[this.practice.currentQuestion].order;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practiceList[this.practice.currentQuestion].key;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correctAnswer = this.practiceList[
        this.practice.currentQuestion
      ].currentAnswer[
        this.practiceList[this.practice.currentQuestion].correctanswer
      ];

      this.studentPracticeData.currentQuestion++;

      if (
        indexOf ==
        this.practiceList[this.practice.currentQuestion].correctanswer
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";

        this.studentPracticeData.correct++;
      } else {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ผิด";

        this.studentPracticeData.incorrect++;
      }

      // ดึงค่าวันที่และเวลาปัจจุบันจากฐานข้อมูลจริง
      let currentDate = await this.getDateAndTime();

      // ดึงค่าเวลาปัจจุบันมาหักลบค่าเวลาที่เข้าทำข้อสอบด้วย (microtime - microtime) / 1000
      let setSecondsToMinutes =
        (currentDate.microtime - this.$q.localStorage.getItem("useTime")) /
        1000;

      // เรียก Function แปลงข้อมูลจาก x = (microtime - microtime) / 1000 , function(x) => Math.floor(x / 60) + ":" + Math.floor(x % 60) == mm:ss
      this.studentPracticeData.useTime = this.secondToMinutes(
        setSecondsToMinutes
      );

      // เช็คจำนวนข้อที่ทำถ้ามีค่าเท่ากับจำนวนข้อที่มีให้ทำการจบแบบฝึกหัด !!!! จะเกิดขึ้นได้ในกรณีทำแบบฝึกหัดแล้วทุกแบบฝึกหัดเท่านั้น
      if (this.practice.currentQuestion + 1 == this.practiceList.length) {
        // เช็คว่าทำจบแบบฝึกหัดแล้ว และ แสดงปุ่มจบแบบฝึกหัด
        this.isFinish = true;
        this.studentPracticeData.status = true;
      }

      db.collection("studentpracticelog")
        .doc(this.practice.key)
        .update(this.studentPracticeData)
        .then(() => {
          this.isAnswer = true;
          this.isShowDescription = true;
          this.isSaveData = false;

          setTimeout(() => {
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight;
          }, 100);
        });
    },
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
        this.studentData.year +
        "-" +
        this.practiceKey;

      // NOTE  Mission Data : รหัสภาระกิจ
      let missionKey = this.$q.localStorage.has("currentMission")
        ? this.decrypt(this.$q.localStorage.getItem("currentMission"), 1)
            .currentMissionKey
        : null;

      db.collection("practicelist")
        .doc(this.practiceKey)
        .get()
        .then(doc => {
          this.practice.instructionTH = doc.data().th;
          this.practice.instructionEN = doc.data().eng;
        });

      // TODO : Type  Vocab SKill
      if (this.practiceSkill == "Vocabulary") {
        // NOTE  Load Practice Data Vocab Flashcard
        db.collection("practicepool_server")
          .where("level", "==", this.practiceLevel)
          .where("unit", "==", this.practiceUnit)
          .where("practicetype", "==", "flashcard")
          .get()
          .then(doc => {
            doc.forEach(data => {
              let dataKey = {
                key: data.id
              };

              this.vocabHelp.push({ ...dataKey, ...data.data() });
            });
          });
      }

      // TODO : Type  Grammar SKill
      if (
        this.practiceSkill == "Grammar" ||
        this.practiceSkill == "Listening & Speaking"
      ) {
        let lesson;

        if (this.practiceSkill == "Grammar") {
          lesson = "grammarlesson";
        } else {
          lesson = "languagetips";
        }

        // NOTE  Load Practice Data Grammar VDO
        db.collection("practicelist")
          .where("level", "==", this.practiceLevel)
          .where("unit", "==", this.practiceUnit)
          .where("practicetype", "==", lesson)
          .get()
          .then(async doc => {
            let temp = [];
            let setOrder = [];
            doc.forEach(data => {
              let dataKey = {
                key: data.id,
                ...data.data()
              };

              setOrder.push(dataKey);

              setOrder.sort((a, b) => {
                return Number(a.order) - Number(b.order);
              });
            });

            for (let i = 0; i < setOrder.length; i++) {
              // NOTE  Load Practice Data Grammar VDO
              db.collection("practicepool_server")
                .where("practicekey", "==", setOrder[i].key)
                .get()
                .then(docResult => {
                  let setNewArr = [];

                  docResult.forEach(resultData => {
                    let newData = {
                      practiceOrder: setOrder[i].order,
                      key: resultData.id,
                      ...resultData.data()
                    };

                    setNewArr.push(newData);

                    setNewArr.sort((a, b) => {
                      return Number(a.order) - Number(b.order);
                    });
                  });

                  temp.push(...setNewArr);

                  this.vdoHelp = temp;
                });
            }
          });
      }

      // NOTE  Load Practice Data
      db.collection("practicepool_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(doc => {
          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            let temp = [];
            doc.forEach(async data => {
              let docExtra = await db
                .collection("practicepool_server")
                .doc(data.id)
                .collection("extraVocab")
                .get();

              let extraArr = [];
              if (docExtra.size) {
                docExtra.forEach(dataExtra => {
                  let dataKey = {
                    key: dataExtra.id
                  };
                  extraArr.push({ ...dataKey, ...dataExtra.data() });
                });

                extraArr.sort((a, b) => {
                  return a.vocabulary > b.vocabulary ? 1 : -1;
                });
              }

              let newData = {
                key: data.id,
                extra: extraArr,
                choices: [],
                currentAnswer: data.data().choices
              };

              data.data().choices.forEach((getItem, index) => {
                let newIndexChoice = {
                  answer: getItem,
                  index: index
                };

                newData.choices.push(newIndexChoice);
              });

              // this.sortRandom(newData.choices);

              temp.push({ ...data.data(), ...newData });

              temp.sort((a, b) => {
                return Number(a.order) - Number(b.order);
              });
            });

            // NOTE  load Student Practice Log
            db.collection("studentpracticelog")
              .where("filter", "==", filterStudent)
              .where("studentKey", "==", this.studentData.key)
              .get()
              .then(async checkData => {
                // NOTE  กรณีมีข้อมูลแล้ว
                if (checkData.size > 0) {
                  this.studentPracticeData = checkData.docs[0].data();
                  this.practice.key = checkData.docs[0].id;

                  this.$q.localStorage.set(
                    "lastPracticeKey",
                    checkData.docs[0].id
                  );

                  // NOTE  กรณีมีแบบฝึกหัดแล้วและทำแบบฝึกหัดจบแล้ว
                  if (checkData.docs[0].data().status) {
                    // this.$router.push("/student/practice/waiting");
                    this.isFinishPractice = true;
                    return;
                  }
                  // NOTE  กรณีมีแบบฝึกหัดแล้วแต่ยังทำแบบฝึกหัดไม่เสร็จ
                  else {
                    this.practice.currentQuestion = checkData.docs[0].data().currentQuestion;

                    // NOTE  หาข้อมูลแบบฝึกหัดที่ทำไปแล้วเป็น Array[]
                    let setQuestion = this.studentPracticeData.dataAnswerList.filter(
                      x => {
                        return x.key != "";
                      }
                    );

                    // NOTE  หาข้อมูลที่เหมือนกันในแบบฝึกหัดจริงและตัดข้อมูลที่ทำไปแล้วออก
                    for (let i = 0; i < setQuestion.length; i++) {
                      let setIndex = temp
                        .map(x => {
                          return x.key;
                        })
                        .indexOf(setQuestion[i].key);

                      temp.splice(setIndex, 1); // ตัดข้อมูล
                    }

                    // this.sortRandom(temp); // สุ่มแบบฝึกหัด

                    // NOTE  เอาแบบฝึกหัดที่ทำไปแล้วก่อนหน้านี้กับแบบฝึกหัดที่เหลือมาร่วมกันให้มีจำนวนเท่ากับแบบฝึกหัดที่เหลือและแบบฝึกหัดที่ยังไม่ได้ทำ
                    this.practiceList = [...setQuestion, ...temp];

                    this.isStartPractice = true;
                  }
                }
                // NOTE  กรณียังไม่มีข้อมูล
                else {
                  db.collection("studentpracticelog")
                    .where("filter", "==", filterStudent)
                    .where("studentKey", "==", this.studentData.key)
                    .get()
                    .then(async checkSize => {
                      if (!checkSize.size) {
                        // this.sortRandom(temp); // สุ่มแบบฝึกหัด

                        this.practiceList = temp;
                        // NOTE  เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                        temp.some(() => {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: 0,
                            order: ""
                          };
                          this.studentPracticeData.dataAnswerList.push(newData);
                        });

                        let shipSkill = 0;

                        if (this.studentData.ship != null) {
                          shipSkill = this.studentData.ship.skill;
                        }

                        this.studentPracticeData = {
                          // NOTE  Filter Data
                          filter: filterStudent, // ชั้น, ห้อง, เทอม, ปี, รหัสแบบฝึกหัด
                          // Practice Answer Data
                          currentQuestion: 0, // แบบฝึกหัดข้อปัจจุบัน
                          dataAnswerList: this.studentPracticeData
                            .dataAnswerList, // ข้อมูลที่นักเรียนตอบแต่ละข้อเก็บเป็น Array[]
                          totalQuestion: this.practiceList.length, // จำนวนข้อทั่้งหมด
                          extraScore: Number(shipSkill), // คะแนะพิเศษจาก สกิลเรือ
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
                          // NOTE  Practice Data
                          practiceKey: this.practiceKey, // รหัสแบบฝึกหัด
                          practiceType: this.practiceType, // ประเภทแบบฝึกหัด
                          practiceName: this.practiceName, // ชื่อแบบฝึกหัด
                          skill: this.practiceSkill, // สกิลแบบฝึกหัด
                          level: this.practiceLevel, // เลเวลแบบฝึกหัด
                          unit: this.practiceUnit, // ยูนิตแบบฝึกหัด
                          order: this.practiceOrder, // ลำดับแบบฝึกหัด
                          // NOTE  Mission Data
                          missionKey: missionKey, // รหัสภาระกิจ
                          // NOTE  Score to exp
                          useScoreToExp: false // ใช้งานเพิ่ม exp และ coins
                        };

                        // NOTE  Add Student Practice Log
                        db.collection("studentpracticelog")
                          .add(this.studentPracticeData)
                          .then(key => {
                            this.practice.key = key.id;

                            this.$q.localStorage.set("lastPracticeKey", key.id);

                            this.isStartPractice = true;
                          });
                      }
                    });
                }
              });
          }
        });
    },
    loadSynchronize() {
      console.clear();
      this.snapSync = db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          if (doc.size) {
            this.practiceKey = doc.docs[0].data().practiceKey
              ? doc.docs[0].data().practiceKey
              : null;

            this.practiceType = doc.docs[0].data().practicetype
              ? doc.docs[0].data().practicetype
              : null;

            this.practiceName = doc.docs[0].data().practiceName
              ? doc.docs[0].data().practiceName
              : null;

            this.practiceOrder = doc.docs[0].data().order
              ? doc.docs[0].data().order
              : null;

            this.practiceSkill = doc.docs[0].data().skill
              ? doc.docs[0].data().skill
              : null;

            this.practiceLevel = doc.docs[0].data().level
              ? doc.docs[0].data().level
              : null;

            this.practiceUnit = doc.docs[0].data().unit
              ? doc.docs[0].data().unit
              : null;

            if (!this.isLoadPractice) {
              this.$q.localStorage.set(
                "useTime",
                doc.docs[0].data().date.microtime
              );

              // NOTE  Delete Local Storage : ลบแบบฝึกหัดก่อนหน้านี้
              this.loadPractice();
            }
          }
        });
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    if (typeof this.syncData == "function") {
      this.snapSync();
    }
    this.$q.localStorage.remove("useTime");
  }
};
</script>

<style lang="scss" scoped>
.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.disable-btn {
  background-color: rgb(161, 161, 161);
}

.dashed {
  border-bottom: 2.2px dashed #662707;
  margin: 15px auto;
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.3s;
}
</style>
