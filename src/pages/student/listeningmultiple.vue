<template>
  <q-page
    class="q-pa-md color3 bg-phonics bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <transition
      appear
      enter-active-class="animated fadeInDown "
      leave-active-class="animated fadeOutUp "
      v-if="isActivePractice"
    >
      <div class="relative-position" align="center" v-if="isLoadPractice">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="border-dashed br-a-sm q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">
              {{
              convertPracticeName(practiceType, practiceSkill)
              }}
            </span>
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
      <div class="q-mt-md row justify-center" v-if="isLoadPractice">
        <div class="col-lg-9 col-md-12 col-xs-12 row relative-position">
          <div class="col-2 self-center bg5 shadow-2 br-a-xs q-pa-xs" style="width:150px;">
            <div class="border-dashed br-a-xs q-pa-md text-h5 text-bold" align="center">
              <span>
                ข้อ
                {{ practice.currentQuestion + 1 + "/" + practiceList.length }}
              </span>
            </div>
          </div>
          <div
            class="row col bg1 border3-t-xl border3-b-xl border3-r-xl br-tr-xs br-br-xs q-pa-sm self-center"
          >
            <div class="col self-center text-overflow" align="left">
              <span class="text-h6 text-bold">
                <span v-if="!isChangeLanguage" v-html="practice.instructionENG"></span>
                <span v-else v-html="practice.instructionTH"></span>
                <q-tooltip anchor="top left" self="bottom left" :offset="[10, 10]">
                  <span
                    style="font-size:1vw;"
                    v-if="!isChangeLanguage"
                    v-html="practice.instructionENG"
                  ></span>
                  <span style="font-size:1vw;" v-else v-html="practice.instructionTH"></span>
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
            <q-btn
              push
              round
              class="q-ml-md color6 bg3 q-pa-sm"
              @click="isPhonicsHelp = !isPhonicsHelp"
            >
              <q-icon name="fas fa-question" size="md"></q-icon>
            </q-btn>
          </div>
        </div>

        <div class="col-lg-9 col-md-12 col-xs-12 row q-mt-sm relative-position">
          <div class="col-12 bg5 br-a-sm">
            <div class="q-pa-lg">
              <div class="q-px-md-md" align="center">
                <div
                  class="q-px-md"
                  v-if="
                    practice.practiceType == 'multiplechoice(questionsound)'
                  "
                >
                  <q-btn
                    class="full-width bg3 text-white q-pa-md br-a-sm"
                    :class="{ 'no-pointer-events': isAnswer }"
                    @click="
                      playSound(practiceList[practice.currentQuestion].audioURL)
                    "
                  >
                    <div class="text-h5" v-if="!isAnswer">
                      <q-icon name="fas fa-volume-up" class="q-mr-md"></q-icon>
                      <span>กดเพื่อฟังเสียงโจทย์</span>
                    </div>
                    <div class="text-h5" v-else>
                      <span>
                        {{
                        practiceList[practice.currentQuestion].question
                        }}
                      </span>
                    </div>
                  </q-btn>
                </div>

                <div
                  class="border3-lg br-a-sm bg1 q-pa-lg q-mx-md"
                  v-if="practiceList[practice.currentQuestion].question != ''"
                >
                  <div class="text-h5" v-html="practiceList[practice.currentQuestion].question"></div>
                </div>
              </div>

              <!-- SECTION  Set : แสดงปุ่มตอบ -->
              <div class="q-mt-lg q-px-md-md" v-if="!isAnswer">
                <!-- NOTE  multiple choices (questionsound) -->
                <div
                  class="row"
                  v-if="
                    practice.practiceType == 'multiplechoice(questionsound)'
                  "
                >
                  <div
                    class="col-6 q-px-md q-mb-lg"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      class="full-width color1 br-a-sm"
                      :class="{
                        bg7: index == 0,
                        bg8: index == 1,
                        bg9: index == 2,
                        bg10: index == 3
                      }"
                      align="left"
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
                        <div class="col row bg1 br-tr-xs br-br-xs color2 q-pa-sm" align="left">
                          <div class="self-center q-px-md">
                            <span class="text-h5" v-html="item.answer"></span>
                          </div>
                        </div>
                      </div>
                    </q-btn>
                  </div>
                </div>

                <!-- NOTE  multiple choices (answersound) -->
                <div class="row" v-if="practice.practiceType == 'multiplechoice(answersound)'">
                  <div
                    class="col-12 q-px-md q-mb-lg"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      class="bg3 full-width color1 br-a-sm q-pa-md"
                      :class="[
                        choicesIndex == index ? 'color6' : 'color1',
                        isPlaySound && choicesIndex != index
                          ? 'no-pointer-events'
                          : null
                      ]"
                      align="center"
                      @click="
                        playURL(item.url),
                          (choicesIndex = index),
                          (choicesAnswer = item.answer)
                      "
                      :disable="isDisabled"
                      :loading="isSaveData"
                    >
                      <template v-slot:loading>
                        <q-spinner-facebook size="3vw" />
                      </template>

                      <div class="full-width relative-position" align="center">
                        <q-icon name="fas fa-volume-up" class="q-pr-lg" size="30px"></q-icon>
                        <span class="text-h5" style="display:inline-block;">
                          ฟังเสียงคำตอบ
                          <span
                            v-html="
                              index == 0
                                ? 'A'
                                : index == 1
                                ? 'B'
                                : index == 2
                                ? 'C'
                                : index == 3
                                ? 'D'
                                : ''
                            "
                          ></span>
                        </span>
                      </div>
                    </q-btn>
                  </div>
                </div>

                <!-- NOTE  multiple choices -->
                <div class="row" v-if="practice.practiceType == 'multiplechoices'">
                  <div
                    class="col-12 q-px-md q-mb-lg"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      class="bg3 full-width color1 br-a-sm q-pa-md"
                      align="center"
                      @click="answerBtn(item.answer)"
                      :disable="isDisabled"
                      :loading="isSaveData"
                    >
                      <template v-slot:loading>
                        <q-spinner-facebook size="3vw" />
                      </template>

                      <div class="full-width relative-position" align="center">
                        <span class="text-h5" v-html="item.answer"></span>
                      </div>
                    </q-btn>
                  </div>
                </div>
              </div>

              <!-- SECTION  Set : แสเงปุ่มที่ตอบผิดหรือถูก -->
              <div class="q-mt-lg q-px-md-md" v-if="isAnswer">
                <!-- NOTE  multiple choices (questionsound) -->
                <div
                  class="row"
                  v-if="
                    practice.practiceType == 'multiplechoice(questionsound)'
                  "
                >
                  <div
                    class="q-px-md q-mb-lg"
                    :class="{
                      'col-6':
                        practice.practiceType ==
                        'multiplechoice(questionsound)',
                      'col-12':
                        practice.practiceType == 'multiplechoice(answersound)'
                    }"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      align="left"
                      class="full-width br-a-sm q-mt-md no-pointer-events"
                      :class="{
                        'bg6 color3':
                          practiceList[practice.currentQuestion].currentAnswer[
                            practiceList[practice.currentQuestion].correctanswer
                          ] == item.answer,
                        'bg3 color1':
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer == item.answer,
                        'bg11 color1':
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer != item.answer &&
                          practiceList[practice.currentQuestion]
                            .correctanswer != item.index
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
                            <q-icon name="fas fa-spider" v-if="index == 0" size="45px"></q-icon>
                            <q-icon name="fas fa-fish" v-if="index == 1" size="45px"></q-icon>
                            <q-icon name="fas fa-dove" v-if="index == 2" size="45px"></q-icon>
                            <q-icon name="fas fa-frog" v-if="index == 3" size="45px"></q-icon>
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

                <!-- NOTE  multiple choices (answersound) -->
                <div class="row" v-if="practice.practiceType == 'multiplechoice(answersound)'">
                  <div
                    class="col-12 q-px-md q-mb-lg"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      class="full-width color1 br-a-sm q-pa-md no-pointer-events"
                      :class="{
                        bg10:
                          practiceList[practice.currentQuestion].currentAnswer[
                            practiceList[practice.currentQuestion].correctanswer
                          ] == item.answer,
                        bg7:
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer == item.answer,
                        bg3:
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer != item.answer &&
                          practiceList[practice.currentQuestion]
                            .correctanswer != item.index
                      }"
                      align="left"
                      @click="
                        playURL(item.url),
                          (choicesIndex = index),
                          (choicesAnswer = item.answer)
                      "
                      no-pointer-events
                    >
                      <div class="full-width relative-position" align="center">
                        <q-icon name="fas fa-volume-up" class="q-pr-lg" size="30px"></q-icon>
                        <span class="text-h5" style="display:inline-block;" v-html="item.answer"></span>
                      </div>
                    </q-btn>
                  </div>
                </div>

                <!-- NOTE  multiple choices -->
                <div class="row" v-if="practice.practiceType == 'multiplechoices'">
                  <div
                    class="col-12 q-px-md q-mb-lg"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                  >
                    <q-btn
                      no-caps
                      dense
                      class="full-width color1 br-a-sm q-pa-md no-pointer-events"
                      :class="{
                        bg10:
                          practiceList[practice.currentQuestion].currentAnswer[
                            practiceList[practice.currentQuestion].correctanswer
                          ] == item.answer,
                        bg7:
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer == item.answer,
                        bg3:
                          studentPracticeData.dataAnswerList[
                            practice.currentQuestion
                          ].answer != item.answer &&
                          practiceList[practice.currentQuestion]
                            .correctanswer != item.index
                      }"
                    >
                      <div class="full-width relative-position" align="center">
                        <span class="text-h5" v-html="item.answer"></span>
                      </div>
                    </q-btn>
                  </div>
                </div>
              </div>

              <div class align="center">
                <q-btn
                  class="bg3 color6 q-pa-xs q-px-md q-mt-sm"
                  :class="{ 'no-pointer-events': isSaveData }"
                  @click="answerBtn(choicesAnswer)"
                  :disable="isSaveData"
                  v-if="
                    !isFinish &&
                      !isAnswer &&
                      choicesIndex != null &&
                      practice.practiceType == 'multiplechoice(answersound)'
                  "
                >
                  <div class="text-h6">ส่งคำตอบ</div>
                </q-btn>

                <q-btn
                  icon-right="fas fa-chevron-right"
                  class="bg3 color6 q-pa-xs q-px-md"
                  @click="nextQuestionBtn()"
                  :disable="isDisabledNext"
                  v-if="!isFinish && isAnswer"
                >
                  <div class="q-mr-lg text-h6">ถัดไป</div>
                </q-btn>

                <q-btn
                  class="bg3 color6 q-pa-xs q-px-md"
                  @click="finishBtn()"
                  :disable="isDisabledNext"
                  v-if="isFinish && isAnswer"
                >
                  <div class="text-h6">เสร็จสิ้น</div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <q-dialog
      full-height
      v-model="isPhonicsHelp"
      persistent
      content-class="backdrop"
      v-if="isLoadPractice"
      position="standard"
    >
      <q-card
        flat
        class="row justify-center items-center bg-transparent q-pa-lg"
        style="max-width:1450px;width:100%;"
      >
        <div class="bg5 full-width relative-position" style="border-radius:12px;">
          <div class="row">
            <div class="col-4 bg3 br-tl-sm q-pa-md br-bl-sm" style="width:330px;overflow-y:auto;">
              <q-btn
                class="full-width row q-pa-sm"
                :class="[
                  phonicsIndex == index ? 'bg6' : 'bg5',
                  index != phonicsHelp.length - 1 ? 'q-mb-md' : ''
                ]"
                no-caps
                v-for="(item, index) in phonicsHelp"
                :key="index"
                @click="phonicsIndex = index"
                v-show="!item.type"
              >
                <div align="left" class="col">{{ item.topic }}</div>
                <q-badge
                  color="red"
                  style="animation-duration:5s;opacity:1;"
                  class="animated swing infinite no-pointer-events"
                  floating
                  transparent
                  v-show="item.isNew"
                >new</q-badge>
              </q-btn>
            </div>
            <div class="col bg5 q-pa-lg br-a-md q-mt-lg">
              <q-responsive :ratio="16 / 9" style="position:sticky;top:20px;" class="z-top">
                <video
                  :src="phonicsHelp[phonicsIndex].vdoURL"
                  :poster="phonicsHelp[phonicsIndex].imgURL"
                  controls
                  style="width:100%;"
                  controlslist="nodownload"
                ></video>
              </q-responsive>
            </div>
          </div>

          <div align="center" class="absolute-top-right" style="top:-20px;right:-20px;">
            <q-btn
              round
              class="bg7 color1 text-bold"
              icon="fas fa-times"
              size="20px"
              @click="isPhonicsHelp = !isPhonicsHelp"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index";
import { st } from "../../router/index";
export default {
  data() {
    return {
      studentPracticeData: {
        dataAnswerList: []
      },
      practice: {
        currentQuestion: 0,
        key: "",
        instructionENG: "",
        instructionTH: "",
        practiceType: ""
      },
      practiceKey: "",
      practicType: "",
      practiceName: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",
      practiceOrder: "",
      practiceList: [],
      choicesIndex: null,
      choicesAnswer: "",
      phonicsHelp: [],
      phonicsIndex: 0,

      isTimeOut: false,
      isPhonicsHelp: false,
      isChangeLanguage: false,
      isActivePractice: true,

      isDisabled: false,
      isShowDescription: false,
      isLoadPractice: false,
      isAnswer: false,
      isFinish: false,
      isDisabledNext: false,
      isSaveData: false,
      isPlaySound: false,

      isLoad: false,

      snapSync: "",

      playAudioURL: ""
    };
  },
  methods: {
    playURL(url) {
      if (this.playAudioURL != "") {
        this.playAudioURL.pause();
      }

      this.playAudioURL = new Audio(url);
      this.playAudioURL.play();
    },
    finishBtn() {
      this.isActivePractice = false;
      this.isDisabledNext = true;
      this.isShowDescription = false;

      setTimeout(() => {
        this.$router.push("/student/practice/waiting");
      }, 1000);
    },
    nextQuestionBtn() {
      this.isDisabledNext = true;
      this.choicesIndex = null;
      this.choicesAnswer = "";

      setTimeout(() => {
        this.practice.currentQuestion++;
        this.isDisabledNext = false;
        this.isShowDescription = false;

        this.isDisabled = false;
        this.isAnswer = false;
        document.documentElement.scrollTop = 0;
      }, 500);
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
      ].no = this.practice.currentQuestion;

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
        "drPGfp3HLC3fR28Qf0on";

      // NOTE  Mission Data : รหัสภาระกิจ
      let missionKey = this.$q.localStorage.has("currentMission")
        ? this.decrypt(this.$q.localStorage.getItem("currentMission"), 1)
            .currentMissionKey
        : null;

      // NOTE  Load Practice Data Lesson
      db.collection("practicelist")
        .where("level", "==", "1")
        .where("unit", "==", "1")
        .where("practicetype", "==", "phonicslesson")
        .get()
        .then(async doc => {
          if (doc.size) {
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
              // NOTE  Load Practice Data Lesson
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
                });
            }

            this.phonicsHelp = temp;
          }
        });

      db.collection("practicelist")
        .doc("drPGfp3HLC3fR28Qf0on")
        .get()
        .then(data => {
          this.practice.instructionENG = data.data().eng;
          this.practice.instructionTH = data.data().th;
          this.practice.practiceType = data.data().practicetype;
        });

      // NOTE  Load Practice Data
      db.collection("practicepool_server")
        .where("practicekey", "==", "drPGfp3HLC3fR28Qf0on")
        .get()
        .then(doc => {
          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            let temp = [];
            doc.forEach(async data => {
              let newData = {
                key: data.id,
                choices: [],
                currentAnswer: data.data().choices,
                audioURL: ""
              };

              if (data.data().practicetype == "multiplechoice(questionsound)") {
                st.child("/audio/multiplechoice/" + data.id + ".mp3")
                  .getDownloadURL()
                  .then(getURL => {
                    newData.audioURL = getURL;
                  });
              }

              data.data().choices.forEach((getItem, index) => {
                if (getItem != "" && getItem != null) {
                  let newIndexChoice = {
                    answer: getItem,
                    index: index,
                    url: ""
                  };

                  if (
                    data.data().practicetype == "multiplechoice(answersound)"
                  ) {
                    st.child(
                      "audio/multiplechoice/" +
                        data.id +
                        "-" +
                        (index + 1) +
                        ".mp3"
                    )
                      .getDownloadURL()
                      .then(getURL => {
                        newIndexChoice.url = getURL;
                      });
                  }

                  newData.choices.push(newIndexChoice);
                }
              });

              this.sortRandom(newData.choices);

              temp.push({ ...data.data(), ...newData });
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
                    this.$router.push("/student/practice/waiting");
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

                    this.sortRandom(temp); // สุ่มแบบฝึกหัด

                    // NOTE  เอาแบบฝึกหัดที่ทำไปแล้วก่อนหน้านี้กับแบบฝึกหัดที่เหลือมาร่วมกันให้มีจำนวนเท่ากับแบบฝึกหัดที่เหลือและแบบฝึกหัดที่ยังไม่ได้ทำ
                    this.practiceList = [...setQuestion, ...temp];
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
                        this.sortRandom(temp); // สุ่มแบบฝึกหัด

                        this.practiceList = temp;
                        // NOTE  เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                        temp.some(() => {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: "",
                            order: "",
                            no: null
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
                          extraScore: Number(shipSkill),
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
                          });
                      }
                    });
                }
              });
          } else {
            this.$router.push("/student/practice/waiting");
            return;
          }
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
    if (typeof this.snapSync == "function") {
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
