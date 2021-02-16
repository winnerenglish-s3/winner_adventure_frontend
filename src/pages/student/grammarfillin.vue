<template>
  <q-page
    class="q-pa-md color3 bg-grammar bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="white" size="100" />
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
                  <span v-if="!isChangeLanguage">{{ practice.instructionEN }}</span>
                  <span v-else>{{ practice.instructionTH }}</span>
                  <q-tooltip anchor="top left" self="bottom left" :offset="[10, 10]">
                    <span
                      style="font-size:1vw;"
                      v-if="!isChangeLanguage"
                    >{{ practice.instructionEN }}</span>
                    <span style="font-size:1vw;" v-else>{{ practice.instructionTH }}</span>
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
              <!-- <q-btn
              push
              round
              class="q-ml-md color6 bg3 q-pa-sm"
              @click="isGrammarHelp = !isGrammarHelp"
            >
              <q-icon name="fas fa-question" size="md"></q-icon>
              </q-btn>-->
              <q-btn
                push
                class="q-ml-md color6 bg3 q-pa-sm shadow-2 br-a-md"
                style="z-index:15;"
                @click="isGrammarHelp = !isGrammarHelp"
              >
                <q-icon name="far fa-question-circle" class="q-mr-md" size="md"></q-icon>
                <span class="text-h5">ตัวช่วย</span>
              </q-btn>
            </div>
          </div>

          <div
            class="col-lg-9 col-md-12 col-xs-12 row q-mt-sm relative-position"
            v-if="practiceList.length"
          >
            <div class="col bg5 row q-mr-md br-a-sm q-pa-md">
              <div class="col-12 self-start">
                <div class="border-dashed br-a-sm q-pa-md q-pb-xl">
                  <div
                    v-if="practiceList[practice.currentQuestion].imgURL"
                    align="center"
                    class="q-pb-md"
                  >
                    <img
                      :src="practiceList[practice.currentQuestion].imgURL"
                      style="max-width:600px;width:100%;"
                    />
                  </div>
                  <span
                    class="text-h5 text-bold"
                    v-html="
                      practiceList[practice.currentQuestion].questionAndAnswer
                    "
                  ></span>
                </div>
              </div>
              <div class="col-12 self-end q-mt-lg q-pb-md" align="center">
                <q-btn
                  class="color6 bg3 text-h6 q-px-md"
                  :class="{ 'no-pointer-events': isDisabled }"
                  label="ส่งคำตอบ"
                  @click="sendAnswerBtn()"
                  :disable="isDisabled"
                  :loading="isLoadCheckData"
                  v-if="isSendAnswer"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>

                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                  v-if="isShowDescription"
                >
                  <div class="col-12">
                    <div class="bg5 br-a-xs">
                      <div class="br-a-sm" align="center">
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
                      </div>

                      <div class="border-dashed q-pa-md q-py-lg br-a-sm" align="center">
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
                          class="color6 bg3 text-h6 q-px-md"
                          label="ข้อถัดไป"
                          @click="nextQuestionBtn()"
                          :disable="isDisabledNext"
                          v-if="!isFinish"
                        ></q-btn>

                        <q-btn
                          class="color6 bg3 text-h6 q-px-md"
                          @click="finishBtn()"
                          :disable="isDisabledNext"
                          label="เสร็จสิ้น"
                          v-if="isFinish"
                        ></q-btn>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <div class="col-3 bg5 br-a-sm relative-position" style="width:300px;">
              <div class="bg3 br-tl-sm br-tr-sm">
                <div class="color1 text-h5 q-pa-sm q-py-md" align="center">คำศัพท์เสริม</div>
              </div>
              <div
                class="row q-pa-md q-pt-lg relative-position"
                style="min-height:400px;max-height:fit-content"
                align="center"
              >
                <div
                  class="col-12 text-h6 broder3-xs br-a-md"
                  v-if="practiceList[practice.currentQuestion].extra.length > 0"
                >
                  <div
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].extra"
                    :key="index"
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
          </div>
        </div>
      </transition>

      <q-dialog
        full-height
        v-model="isGrammarHelp"
        persistent
        content-class="backdrop"
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
            v-if="grammarHelp.length"
          >
            <div class="row">
              <div class="col-4 bg3 br-tl-sm q-pa-md br-bl-sm" style="width:350px;">
                <q-scroll-area
                  :thumb-style="thumbStyle"
                  :bar-style="barStyle"
                  style="height: 450px; max-width: 350px;"
                >
                  <q-btn
                    class="full-width row q-pa-sm"
                    :class="[
                      grammarIndex == index ? 'bg6' : 'bg5',
                      index != grammarHelp.length - 1 ? 'q-mb-sm' : ''
                    ]"
                    no-caps
                    v-for="(item, index) in grammarHelp"
                    :key="index"
                    @click="(grammarIndex = index), (isPlayVideo = false)"
                  >
                    <div align="left" class="col">{{ item.slideName }}</div>
                  </q-btn>
                </q-scroll-area>
              </div>
              <div class="col bg5 q-pa-lg br-a-md q-mt-lg">
                <q-responsive :ratio="16 / 9" style="position:sticky;top:20px;" class="z-top">
                  <video
                    :src="grammarHelp[grammarIndex].vdoURL"
                    :poster="grammarHelp[grammarIndex].imgURL"
                    controls
                    style="width:100%;"
                    controlslist="nodownload"
                    :id="grammarIndex"
                  ></video>
                </q-responsive>

                <div class="q-pt-lg" align="center">
                  <q-btn align="left" class="q-pa-xs bg3 color6" @click="playVDO(grammarIndex)">
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
                @click="isGrammarHelp = !isGrammarHelp"
              ></q-btn>
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>

    <div v-if="isLoadPractice && isFinishPractice">
      <waiting :dataType="practiceType"></waiting>
    </div>
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
      practicType: "",
      practiceName: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",
      practiceOrder: "",
      practiceList: [],
      grammarHelp: [],
      grammarIndex: 0,

      isTimeOut: false,
      isGrammarHelp: false,
      isChangeLanguage: false,
      isActivePractice: true,

      isDisabled: false,
      isShowDescription: false,
      isLoadPractice: false,
      isAnswer: false,
      isFinish: false,
      isDisabledNext: false,
      isSaveData: false,
      isLoadCheckData: false,
      isSendAnswer: true,

      snapSync: "",

      isPlayVideo: false,
      isStartPractice: false,
      isFinishPractice: false,

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
      this.isDisabled = true;

      this.isStartPractice = false;
      this.isActivePractice = false;

      setTimeout(() => {
        this.isFinishPractice = true;
      }, 1000);
    },
    nextQuestionBtn() {
      this.isDisabled = true;
      this.isAnswer = false;
      this.isShowDescription = false;

      this.practice.currentQuestion++;

      setTimeout(() => {
        this.isDisabled = false;
        this.isSendAnswer = true;
      }, 500);
    },
    async sendAnswerBtn() {
      this.isLoadCheckData = true;
      this.isDisabled = true;
      let correctAnswer = this.practiceList[this.practice.currentQuestion]
        .answer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correctAnswer = correctAnswer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practiceList[this.practice.currentQuestion].key;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].sumAnswerChoices = this.practiceList[
        this.practice.currentQuestion
      ].answer.length;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].order = this.practiceList[this.practice.currentQuestion].order;

      this.studentPracticeData.currentQuestion++;

      let setAnswerArr = [];

      let correctNumber = 0;

      for (let i = 0; i < correctAnswer.length; i++) {
        if (
          correctAnswer[i] == document.getElementById("answer" + (i + 1)).value
        ) {
          this.studentPracticeData.dataAnswerList[this.practice.currentQuestion]
            .correct++;

          this.studentPracticeData.correct++;

          correctNumber++;
        } else {
          this.studentPracticeData.dataAnswerList[this.practice.currentQuestion]
            .incorrect++;

          this.studentPracticeData.incorrect++;
        }

        setAnswerArr.push(document.getElementById("answer" + (i + 1)).value);

        if (i == correctAnswer.length - 1) {
          if (correctNumber == correctAnswer.length) {
            this.studentPracticeData.dataAnswerList[
              this.practice.currentQuestion
            ].status = "ถูก";
          }
        }
      }

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = setAnswerArr;

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
          correctAnswer.some((x, index) => {
            if (x == setAnswerArr[index]) {
              document
                .getElementById("answer" + (index + 1))
                .classList.remove("border3-md");

              document
                .getElementById("answer" + (index + 1))
                .classList.add(
                  "border10-md",
                  "color10",
                  "text-bold",
                  "no-pointer-events"
                );

              document
                .getElementById("answer" + (index + 1))
                .setAttribute("readonly", "");
            } else {
              document
                .getElementById("answer" + (index + 1))
                .classList.remove("border3-md");

              document
                .getElementById("answer" + (index + 1))
                .classList.add(
                  "border7-md",
                  "color7",
                  "text-bold",
                  "no-pointer-events"
                );

              document
                .getElementById("answer" + (index + 1))
                .setAttribute("readonly", "");
            }
          });

          this.isDisabled = false;
          this.isAnswer = true;
          this.isLoadCheckData = false;
          this.isShowDescription = true;

          if (this.isFinish) {
            this.isBtnType = "finishPractice";
          } else {
            this.isBtnType = "nextQuestion";
          }

          setTimeout(() => {
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight;
          }, 100);

          this.isSendAnswer = false;
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
          this.practice.instructionTH = doc.data().thai;
          this.practice.instructionEN = doc.data().eng;
        });

      db.collection("practicelist")
        .where("level", "==", this.practiceLevel)
        .where("unit", "==", this.practiceUnit)
        .where("practicetype", "==", "grammarlesson")
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
            // NOTE  Load Practice Data Vocab Flashcard
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

          this.grammarHelp = temp;
        });

      let sumAnswerBox = 0;

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

              let question = data.data().question;
              let answer = [];

               let resSpan = data
                      .data().question.replace(/<\s*span[^>]*>/g,'<u>').replace(/<\s*\/\s*span>/g,'</u>')

              let setArray = resSpan.match(/<\s*u[^>]*>(.*?)<\s*\/\s*u>/g);

              sumAnswerBox += setArray.length;

              for (let i = 0; i < setArray.length; i++) {
                let setRemoveTag = setArray[i].replace(/(<([^>]+)>)/gi, "");

                answer.push(setRemoveTag);

                let setWidth = setRemoveTag.length * 25;

                let res = resSpan.replace(
                  setArray[i],
                  '<input type="text" id="answer' +
                    (i + 1) +
                    '"  class="border3-md br-a-xs" style="width:' +
                    setWidth +
                    'px;max-width:300px;min-width:130px;outline:none;text-align:center;padding:3px 10px;margin:5px 0px;" />'
                );

                question = res;
              }

              let newData = {
                key: data.id,
                extra: extraArr,
                questionAndAnswer: question,
                answer: answer
              };

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
                        this.practiceList = temp;
                        // NOTE  เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                        temp.some(() => {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: 0,
                            correct: 0,
                            incorrect: 0,
                            order: "",
                            sumAnswerChoices: 0
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
                          totalQuestion: sumAnswerBox, // จำนวนข้อทั่้งหมด
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

                            this.isStartPractice = true;
                          });
                      }
                    });
                }
              });
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
              : "";

            this.practiceType = doc.docs[0].data().practicetype
              ? doc.docs[0].data().practicetype
              : "";

            this.practiceName = doc.docs[0].data().practiceName
              ? doc.docs[0].data().practiceName
              : "";

            this.practiceOrder = doc.docs[0].data().order
              ? doc.docs[0].data().order
              : "";

            this.practiceSkill = doc.docs[0].data().skill
              ? doc.docs[0].data().skill
              : "";

            this.practiceLevel = doc.docs[0].data().level
              ? doc.docs[0].data().level
              : "";

            this.practiceUnit = doc.docs[0].data().unit
              ? doc.docs[0].data().unit
              : "";

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
.disable-btn {
  background-color: rgb(161, 161, 161);
}

.dashed {
  border-bottom: 2.2px dashed #662707;
  margin: 15px auto;
}
.border-dashed-sentence {
  border-right: 2px dashed #662707;
  border-left: 2px dashed #662707;
  border-bottom: 2px dashed #662707;
}
.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.2s;
}

.duration-fadeChoice-in {
  animation-duration: 0.5s;
}

.duration-fadeChoice-out {
  animation-duration: 0.5s;
}
</style>
