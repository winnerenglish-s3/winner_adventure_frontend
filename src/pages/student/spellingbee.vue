<template>
  <q-page
    class="q-pa-md color3 bg-vocabulary bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <div v-if="isLoadPractice && isStartPractice">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-slide-in"
        leave-active-class="animated fadeOutUp duration-slide-out"
        v-if="isActivePractice"
      >
        <div class="relative-position" align="center">
          <div
            class="bg5 br-a-sm q-pa-xs shadow-2"
            style="width:fit-content;width:-webkit-fit-content;"
          >
            <div class="br-a-sm border-dashed q-px-xl q-py-sm">
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
        <div class="q-mt-md row justify-center">
          <div class="col-lg-8 col-md-10 col-xs-12 row justify-center relative-position">
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
                  <span
                    v-if="isChangeLanguage"
                  >Choose the given alphabets to spell the correct word.</span>
                  <span v-else>เลือกตัวอักษรภาษาอังกฤษให้เป็นคำที่ถูกต้อง</span>
                  <q-tooltip anchor="top left" self="bottom left" :offset="[10, 10]">
                    <span style="font-size:20px;">
                      <span v-if="isChangeLanguage">
                        Choose the given alphabets to spell the correct
                        wrod.
                      </span>
                      <span v-else>เลือกตัวอักษรภาษาอังกฤษให้เป็นคำที่ถูกต้อง</span>
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
                  :label="isChangeLanguage ? 'ENG' : 'ไทย'"
                ></q-btn>
              </div>
            </div>

            <div class="col-12 absolute-top-right" align="right" style="top:-70px;">
              <q-btn
                push
                class="q-ml-md color6 bg3 q-pa-sm shadow-2 br-a-md"
                style="z-index:15;"
                @click="isShowVocab = !isShowVocab"
              >
                <q-icon name="far fa-question-circle" class="q-mr-md" size="md"></q-icon>
                <span class="text-h5">ตัวช่วย</span>
              </q-btn>
            </div>
          </div>

          <!-- SECTION  Practice -->
          <div class="row col-lg-8 col-md-10 col-xs-12 row q-mt-sm relative-position">
            <div class="col bg5 shadow-2 br-a-lg q-pa-sm" style="height:fit-content;">
              <div class="q-pa-lg border-dashed br-a-md">
                <div align="center">
                  <span class="text-h3">{{ practiceList[practice.currentQuestion].meaning }}</span>
                </div>
                <div class="q-mt-lg row">
                  <!-- NOTE ตัวแสดงการทำงาน -->
                  <div
                    v-if="!isCheckData"
                    class="col bg1 border1-lg br-a-sm"
                    :class="isCheckWordsFailed ? 'border-animation' : ''"
                  >
                    <div class="row">
                      <div class="col-2 self-center" align="center" style="width:70px;">
                        <q-btn
                          push
                          round
                          flat
                          class="q-pa-xs color6 bg3"
                          @click="
                            playSound(
                              practiceList[practice.currentQuestion].sound
                            )
                          "
                          v-if="!isCheckData"
                        >
                          <q-icon name="fas fa-volume-up" />
                        </q-btn>
                      </div>
                      <div class="col q-py-lg" align="center">
                        <span class="text-h3 color3">{{practice.currentAnswer}}</span>
                        <div class="cursor-line"></div>
                      </div>
                      <div class="col-2 self-center" align="center" style="width:70px;">
                        <q-btn
                          flat
                          dense
                          round
                          class="q-ma-xs color3"
                          size="lg"
                          icon="fas fa-backspace"
                          v-if="!isCheckData"
                          @click="resetBtn()"
                        ></q-btn>
                      </div>
                    </div>
                  </div>

                  <!-- NOTE ตัวแสดงคำตอบผิดและถูก -->

                  <div
                    v-if="isCheckData"
                    class="col bg1 border1-lg br-a-sm"
                    :class="
                      isCorrectWords
                        ? 'border10-lg'
                        : '' || !isCorrectWords
                        ? 'border-failed'
                        : ''
                    "
                  >
                    <div class="row">
                      <div class="col-2 self-center" align="center" style="width:70px;"></div>
                      <div class="col q-py-lg" align="center">
                        <span
                          class="text-h3"
                          :class="isCorrectWords
                          ? 'color10 text-bold text-h3'
                          : '' || !isCorrectWords
                          ? 'colorF text-bold text-h3 q-pa-md'
                          : ''"
                        >{{practice.currentAnswer}}</span>
                      </div>
                      <div class="col-2 self-center" align="center" style="width:70px;"></div>
                    </div>
                  </div>
                </div>
                <div class="q-mt-md row" v-if="!isCheckData">
                  <div class="col bg4 q-pa-sm q-py-md br-a-sm">
                    <div class="row justify-center">
                      <div
                        class="q-pa-sm"
                        style="max-width:100px;width:90%;"
                        v-for="(item, index) in practiceList[
                          practice.currentQuestion
                        ].choiceList"
                        :key="index"
                      >
                        <q-btn
                          class="q-py-sm br-a-sm fit border-dashed"
                          style="padding-bottom:10px;max-width:100px;width:90%;"
                          size="xl"
                          dense
                          no-caps
                          @click="answerBtn(item, index)"
                          :disable="isSaveData || item == '!'"
                          :class="item == '!' ? 'bg4 no-pointer-events' : 'bg3'"
                        >
                          <span
                            style="font-size:2.5vmax;font-size:5vmin;"
                            :class="item == '!' ? 'color4 ' : 'color6'"
                            v-if="item != '!'"
                          >{{ item }}</span>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="q-mt-md row" v-if="isCheckData">
                  <div class="col br-a-sm" align="center">
                    <div class="bg4 q-py-lg br-a-sm" align="center">
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
                      <div>
                        <span class="text-h6">
                          {{
                          "คำตอบ : " +
                          practiceList[practice.currentQuestion].vocabulary
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="q-mt-md row">
                  <div class="col-12 br-a-sm" align="center" v-if="isBoxNextQuestion">
                    <q-btn
                      label="ส่งคำตอบ"
                      class="color6 bg3 text-h6 q-px-md"
                      @click="sendAnswerBtn()"
                      :disable="isDisabledNext"
                      v-if="!isFinish && isSendAnswer"
                      :loading="isLoadCheckData"
                      @keyup.enter="sendAnswerBtn()"
                      @keypress.enter="sendAnswerBtn()"
                      @keydown.enter="sendAnswerBtn()"
                    ></q-btn>
                    <q-btn
                      icon-right="fas fa-chevron-right"
                      label="ข้อถัดไป"
                      class="color6 bg3 text-h6 q-px-md"
                      @click="nextQuestionBtn()"
                      :disable="isDisabledNext"
                      v-if="!isFinish && isNextQuestion"
                      @keyup.enter="nextQuestionBtn()"
                    ></q-btn>
                    <q-btn
                      label="จบภารกิจ"
                      class="color6 bg3 text-h6 q-px-md"
                      :disable="isDisabledNext"
                      :loading="isLoadCheckData"
                      @click="finishBtn()"
                      v-if="isFinish"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="isLoadPractice && isFinishPractice">
      <waiting :dataType="practicType"></waiting>
    </div>

    <q-dialog v-model="isShowVocab" persistent content-class="backdrop">
      <q-card
        flat
        class="relative-position bg-transparent q-pa-lg"
        style="max-width:1450px;width:100%;"
      >
        <div class="bg5">
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
              @click="isShowVocab = false"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
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
        currentAnswer: "",
        timer: "-- : --",
        key: ""
      },
      practiceKey: "",
      practicType: "",
      practiceName: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",
      practiceOrder: "",
      practiceList: [],
      vocabHelp: [],

      setTimer: "",

      isTimeOut: false,
      isShowVocab: false,
      isChangeLanguage: true,
      isSaveData: false,
      isCorrectWords: false,
      isCheckInput: false,

      isDisabledNext: false,
      isBoxNextQuestion: false,

      isFinish: false,
      isDisableInput: false,
      isSendAnswer: false,
      isNextQuestion: false,
      isCheckData: false,
      isCheckWordsFailed: false,
      isLoadCheckData: false,

      isActivePractice: true,
      isLoadPractice: false,
      isStartPractice: false,
      isFinishPractice: false,

      snapSync: ""
    };
  },
  methods: {
    resetBtn() {
      // ตัวที่ลบ
      let lastString = this.practice.currentAnswer[
        this.practice.currentAnswer.length - 1
      ];

      let setArrCopy = this.practiceList[this.practice.currentQuestion]
        .choiceListCopy;

      let setArr = this.practiceList[this.practice.currentQuestion].choiceList;

      for (let i = 0; i < setArrCopy.length; i++) {
        if (setArrCopy[i] == lastString && setArr[i] == "!") {
          this.practiceList[this.practice.currentQuestion].choiceList[
            i
          ] = lastString;
          break;
        }
      }

      let newShowAnswer = this.practice.currentAnswer.substring(
        0,
        this.practice.currentAnswer.length - 1
      );

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = newShowAnswer;

      this.practice.currentAnswer = newShowAnswer;

      // แสดงบล็อกปุ่มกด ถัดไปและจบแบบฝึกหัด
      this.isBoxNextQuestion = false;
      // เปิดใช้งานปุ่มกดเช็คข้อมูล
      this.isSendAnswer = false;
    },
    finishBtn() {
      this.isActivePractice = false;
      this.isStartPractice = false;

      setTimeout(() => {
        this.isFinishPractice = true;
      }, 1000);
    },
    nextQuestionBtn() {
      this.isBoxNextQuestion = false;
      this.isDisableInput = false;
      this.isNextQuestion = false;

      // ปิดการใช้งานการเช็คข้อมูลตอนบันทึก
      this.isCheckData = false;
      this.letterTemp = [];
      this.counterClick = 0;
      this.lastLength = 0;

      this.practice.currentQuestion++;
      this.isSaveData = false;
      this.practice.currentAnswer = "";

      document.documentElement.scrollTop = 0;
    },
    async sendAnswerBtn() {
      // ปิดการใช้งานตัวกรอกข้อมูล
      this.isDisabledNext = true;
      this.isDisableInput = true;
      this.isSaveData = true;
      this.isLoadCheckData = true;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = this.practice.currentAnswer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].order = this.practiceList[this.practice.currentQuestion].order;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correctAnswer = this.practiceList[
        this.practice.currentQuestion
      ].vocabulary;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practiceList[this.practice.currentQuestion].key;

      this.studentPracticeData.currentQuestion++;

      if (
        this.practiceList[this.practice.currentQuestion].vocabulary ==
        this.practice.currentAnswer
      ) {
        // เพิ่มสถานนะเป็นถูกในข้อนั้นๆ
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";

        this.isCorrectWords = true;

        // เพิ่มจำนวนข้อที่ตอบถูกทั้งหมด
        this.studentPracticeData.correct++;
      } else {
        // เพิ่มสถานนะเป็นผิดในข้อนั้นๆ
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ผิด";

        this.isCorrectWords = false;

        // เพิ่มจำนวนข้อที่ตอบผิดทั้งหมด
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

      this.isSendAnswer = true;

      db.collection("studentpracticelog")
        .doc(this.practice.key)
        .update(this.studentPracticeData)
        .then(() => {
          if (this.isFinish) {
            this.isSendAnswer = false;
            this.isDisabledNext = false;

            // แสดงสถานะเช็คข้อมูลว่า ผิด หรือ ถูก
            this.isCheckData = true;

            this.isLoadCheckData = false;
          } else {
            // เปิดใช้งานปุ่มถัดไป
            this.isNextQuestion = true;

            // ปิดการใช้งานปุ่มส่งคำตอบ
            this.isSendAnswer = false;

            // ปิดการใช้งานการบันทึกข้อมูล
            this.isSaveData = false;

            // ปิดการใช้งานปุ่ม Disabled
            this.isDisabledNext = false;

            this.isLoadCheckData = false;

            // แสดงสถานะเช็คข้อมูลว่า ผิด หรือ ถูก
            this.isCheckData = true;
          }
        });
    },
    // กรณีกดปุ้มตัวอักษร
    async answerBtn(answer, index) {
      this.isSaveData = true;

      // เช็คค่าที่ได้จากการกดส่งตัวอักษรมาเทียบกับคำตอบที่ถูกต้อง ยกตัวอย่าง ส่งตัวอีกษร a = เทียบกลับตัว Split ตัวที่ [0] = a
      // เก็บข้อมูลตัวอักษรที่ถูกต้องเอามาต่อกัน เช่น a += b = ab
      this.practice.currentAnswer += answer;

      // เปลื่ยนแปลงค่าปุ่มที่กดมาจากอักษร a => ! เพื่อไปเช็คข้อมูลเมื่อมีการกดแล้ว
      this.practiceList[this.practice.currentQuestion].choiceList[index] = "!";

      // เปิดใช้งานปุ่มกดส่งตัวอักษร เช็คการกดเบิ้ล
      this.isSaveData = false;

      let countFinish = this.practiceList[
        this.practice.currentQuestion
      ].choiceList.filter(x => {
        return x != "!";
      });

      if (countFinish.length == 0) {
        // แสดงบล็อกปุ่มกด ถัดไปและจบแบบฝึกหัด
        this.isBoxNextQuestion = true;
        // เปิดใช้งานกดปุ่มทำข้อถัดไป
        this.isDisabledNext = false;
        // เปิดใช้งานปุ่มกดเช็คข้อมูล
        this.isSendAnswer = true;

        setTimeout(() => {
          document.documentElement.scrollTop =
            document.documentElement.scrollHeight;
        }, 100);
      }
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

      // NOTE  Load Practice List : โหลดข้อมูล
      db.collection("practicelist")
        .where("level", "==", this.practiceLevel)
        .where("unit", "==", this.practiceUnit)
        .where("practicetype", "==", "flashcard")
        .get()
        .then(doc => {
          if (doc.size) {
            // NOTE  Load Practice Data
            db.collection("practicepool_server")
              .where("practicekey", "==", doc.docs[0].id)
              .get()
              .then(doc => {
                // NOTE  กรณีมีข้อมูลแบบฝึกหัด
                if (doc.size) {
                  let temp = [];
                  doc.forEach(data => {
                    let setAnswer = data.data().vocabulary;

                    let setSplit = setAnswer.split("");

                    this.sortRandom(setSplit);

                    let newData = {
                      meaning: data.data().meaning,
                      vocabulary: setAnswer,
                      choiceList: setSplit,
                      sound:
                        this.serverPath +
                        "sound_flashcard/" +
                        data.id.toLowerCase() +
                        ".mp3",
                      key: data.id,
                      correctAnswer: data.data().vocabulary.split(""),
                      choiceListCopy: "",
                      order: data.data().order
                    };

                    this.sortRandom(newData.choiceList);

                    newData.choiceListCopy = [...newData.choiceList];

                    temp.push(newData);
                    this.vocabHelp.push(newData);
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

                          this.sortRandom(temp); // สุ่มแบบฝึกหัด

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
                              this.sortRandom(temp); // สุ่มแบบฝึกหัด

                              this.practiceList = temp;
                              let countNo = 1;
                              // NOTE  เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                              temp.some(() => {
                                let newData = {
                                  key: "",
                                  answer: "",
                                  status: "ผิด",
                                  correctAnswer: "",
                                  no: countNo,
                                  order: ""
                                };
                                this.studentPracticeData.dataAnswerList.push(
                                  newData
                                );
                                countNo++;
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

                                  this.$q.localStorage.set(
                                    "lastPracticeKey",
                                    key.id
                                  );

                                  this.isStartPractice = true;
                                });
                            }
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
  mounted() {
    let _this = this;
    document.addEventListener("keyup", function(e) {
      if (e.which != 8) {
        let textKeyUp = e.which;

        if (e.which == 32) {
          textKeyUp = " ";
        } else {
          textKeyUp = String.fromCharCode(e.which);
        }

        let wordType = textKeyUp;

        wordType = wordType.toLowerCase();

        let checkWords = _this.practiceList[
          _this.practice.currentQuestion
        ].choiceList.includes(wordType);

        if (checkWords && wordType != "!") {
          let findIndex = _this.practiceList[
            _this.practice.currentQuestion
          ].choiceList.indexOf(wordType);

          _this.practiceList[_this.practice.currentQuestion].choiceList[
            findIndex
          ] = "!";

          _this.practice.currentAnswer += wordType;

          let countFinish = _this.practiceList[
            _this.practice.currentQuestion
          ].choiceList.filter(x => {
            return x != "!";
          });

          if (countFinish.length == 0) {
            // แสดงบล็อกปุ่มกด ถัดไปและจบแบบฝึกหัด
            _this.isBoxNextQuestion = true;
            // เปิดใช้งานกดปุ่มทำข้อถัดไป
            _this.isDisabledNext = false;
            // เปิดใช้งานปุ่มกดเช็คข้อมูล
            _this.isSendAnswer = true;
          }
        } else {
          // แสดงสถานะเช็คคำผิด
          _this.isCheckWordsFailed = true;

          // กำหนดเวลาปิด Animation และการกดเบิ้ล
          setTimeout(() => {
            // ปิดแสดงสถานะเช็คคำผิด
            _this.isCheckWordsFailed = false;
            _this.isSaveData = false;
          }, 300);
        }
      } else {
        if (!_this.isCheckData) {
          _this.resetBtn();
        }
      }
    });
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

.border-failed {
  border: 4px solid rgb(161, 0, 0);
}

.border-animation {
  animation-name: borders;
  animation-duration: 0.3s;
}

.duration-timer {
  animation-duration: 1s;
}

@keyframes borders {
  0% {
    border: 4px solid #fff;
  }
  30% {
    border: 4px solid rgb(161, 0, 0);
  }
  60% {
    border: 4px solid#fff;
  }
  90% {
    border: 4px solid rgb(161, 0, 0);
  }
  100% {
    border: 4px solid#fff;
  }
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.3s;
}

.cursor-line {
  display: inline-block;
  width: 2px;
  height: 35px;
  margin: 0px 3px;
  background-color: #662707;
  border-radius: 40%;
  animation-name: cursor-line;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}

@keyframes cursor-line {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
