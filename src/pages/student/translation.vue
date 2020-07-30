<template>
  <q-page
    class="q-pa-md color3 bg-writing bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <!-- TODO : Header Practice -->
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp "
      v-if="isActivePractice"
    >
      <div class="relative-position" align="center" v-if="isStartPractice || isFinishPractice">
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

    <div v-if="isLoadPractice && isStartPractice">
      <div class="relative-position" align="center">
        <!-- NOTE  ActiveType = Ready -->
        <!-- <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in"
        leave-active-class="animated fadeOut duration-fade-out"
        v-if="isInstruction"
        >
        <div v-if="activeType == 'ready'" class="q-mt-xl row justify-center">
          <div class="col-lg-10 col-md-12 col-xs-12 bg5 q-pa-md br-a-sm">
            <div class="border-dashed br-a-sm" align="center">
              <div class="q-my-lg">
                <span class="text-h6">
                  Translate each Thai sentence into English using the correct
                  given words and punctuations.
                </span>
              </div>
              <div class="q-my-lg">
                <span
                  class="text-h6"
                >แปลประโยคภาษาไทยเป็นภาษาอังกฤษโดยเลือกใช้คำและเครื่องหมายวรรคตอนที่ถูกต้อง</span>
              </div>
            </div>
          </div>
        </div>
        </transition>-->

        <!-- NOTE  ActiveType = Start -->
        <transition
          appear
          enter-active-class="animated fadeIn duration-fade-in"
          leave-active-class="animated fadeOut duration-fade-out"
          v-if="isActivePractice"
        >
          <div class="q-mt-md row justify-center">
            <div
              class="col-12 relative-position"
              style="max-width:1200px;width:95%;"
              v-if="practiceListShow.length"
            >
              <div class="bg3 br-tr-md br-tl-md q-pa-sm q-pt-md text-white">
                <div>
                  <span class="text-h5">{{ practice.nameENG }}</span>
                </div>
                <div
                  align="left"
                  class="q-pa-md q-px-lg"
                  style="height:fit-content;min-height:60px"
                >
                  <span class="text-subtitle1" v-html="CheckHightLight"></span>
                </div>
              </div>
              <div
                class="bg5 br-br-md br-bl-md text-bold q-px-lg q-pt-sm"
                v-if="!practiceListShow[practice.currentQuestion].except"
              >
                <div class="row q-py-md">
                  <div class="col-2 q-pl-sm" align="left" style="width:100px;">
                    <span style="font-size:20px;">
                      {{
                      "ข้อ " +
                      (practice.currentQuestion + 1) +
                      " / " +
                      practiceListShow.length
                      }}
                    </span>
                  </div>
                  <div class="col q-px-md" align="center">
                    <span style="font-size:20px;" v-html="cutUndersocre"></span>
                  </div>
                  <!-- <div class="col-2" style="width:100px;"></div> -->
                </div>
                <div class="row justify-center bg1 q-pa-md br-a-sm" align="left">
                  <span
                    class="text-h5 text-black self-center"
                    v-for="(item, index) in practiceListShow[
                      practice.currentQuestion
                    ].questionEngArr"
                    :key="index"
                  >
                    <span
                      class="relative-position q-py-sm"
                      v-if="item.showHTML == ''"
                    >{{ item.showText + "&nbsp;" }}</span>

                    <!-- : 
                            practiceListShow[practice.currentQuestion]
                              .currentAnswer[index].isCorrect
                          ? 'bg10'
                          : 
                            !practiceListShow[practice.currentQuestion]
                              .currentAnswer[index].isCorrect 
                    ? 'bg7'-->

                    <q-chip
                      square
                      dark
                      :removable="!isSendData"
                      class="text-h6 color1 br-a-sm q-pa-lg"
                      :class="[!isCheckCorrect ? 'bg3' : null,isCheckCorrect && practiceListShow[practice.currentQuestion].currentAnswer[index].isCorrect ? 'bg10' : null,isCheckCorrect && !practiceListShow[practice.currentQuestion].currentAnswer[index].isCorrect ? 'bg7' : null]"
                      text-color="white"
                      v-else-if="item.showText != ''"
                      @remove="clearBtn(item.showText, index)"
                    >
                      {{
                      practiceListShow[practice.currentQuestion]
                      .questionEngArr[index].showText
                      }}
                    </q-chip>
                    <span v-else v-html="item.showHTML + '&nbsp;'"></span>
                  </span>
                </div>

                <div class="row justify-center q-py-md" align="center">
                  <div class="col-12 bg4 q-pa-sm br-a-sm" v-if="!isSendData">
                    <q-btn
                      no-caps
                      push
                      class="bg3 color1 q-ma-xs q-px-sm text-h6"
                      v-for="(item, index) in practiceListShow[
                        practice.currentQuestion
                      ].showWords"
                      :key="index"
                      @click="answerBtn(item, index)"
                      :disable="isSaveData"
                      v-show="
                        practiceListShow[practice.currentQuestion].showWords[
                          index
                        ] != ''
                      "
                    >{{ item }}</q-btn>
                  </div>

                  <div class="col-12" v-if="isSendData">
                    <div class="q-pb-sm br-a-sm q-mt-xs" align="center">
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
                      <div class="border-dashed br-a-sm text-h6 q-pa-md" align="center">
                        <div>
                          <span class="text-bold">ประโยคที่ถูกต้อง</span>
                        </div>
                        <span v-html="cutSymbolTag"></span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-12 q-pt-md q-pb-sm"
                    align="center"
                    v-if="
                      practiceListShow[practice.currentQuestion].questionEngArr
                        .map(x => {
                          return x.showText;
                        })
                        .indexOf('') == -1
                    "
                  >
                    <q-btn
                      align="center"
                      @click="sendAnswerBtn()"
                      label="ส่งคำตอบ"
                      class="color6 bg3 text-h6 q-px-md"
                      :loading="isChecKData"
                      :disable="isSaveData"
                      v-if="!isFinish && !isSendData"
                    ></q-btn>

                    <q-btn
                      align="center"
                      @click="nextQuestionBtn()"
                      icon-right="fas fa-chevron-right"
                      label="ข้อถัดไป"
                      class="color6 bg3 text-h6 q-px-md"
                      :loading="isChecKData"
                      :disable="isSaveData"
                      v-if="!isFinish && isSendData"
                    ></q-btn>

                    <q-btn
                      @click="finishBtn()"
                      v-if="isFinish"
                      label="จบภารกิจ"
                      class="color6 bg3 text-h6 q-px-md"
                      :disable="isSaveData"
                      :loading="isChecKData"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="isLoadPractice && isFinishPractice">
      <!-- NOTE  ActiveType = Finish -->
      <transition
        appear
        enter-active-class="animated zoomIn duration-bounce-in"
        leave-active-class="animated zoomOut duration-bounce-out"
        v-if="isActivePractice"
      >
        <div class="row justify-center" style="max-width:1200px;width:100%;margin:20px auto;">
          <div class="col bg5 q-pa-md br-a-sm">
            <div class="border-dashed br-a-sm q-pa-xl">
              <div align="center">
                <span class="text-h4 text-bold">{{ practice.nameENG }}</span>
              </div>
              <div class="q-py-sm q-px-sm row justify-center q-my-md" align="left">
                <span style="font-size:calc(16px + .5vw);" v-html="CheckHightLight"></span>
              </div>
              <q-separator inset class="q-my-xl" />
              <div align="center" class="q-mt-lg">
                <span class="text-h4 text-bold">{{ practice.nameTH }}</span>
              </div>
              <div class="q-py-sm q-px-sm row justify-center q-mt-md" align="left">
                <span
                  style="font-size:calc(16px + .5vw);"
                  v-html="
                    practiceList
                      .map(x => {
                        return x.questionThai;
                      })
                      .join(' ')
                      .replace(/<u>/g, '')
                      .replace(/<\/u>/g, '')
                  "
                ></span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- <q-dialog
      v-model="isHelp"
      persistent
      content-class="backdrop"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card
        flat
        class="relative-position bg-transparent q-pa-lg"
        style="max-width:1200px;width:100%;"
      >
        <div class="bg5 q-pa-md" style="border-radius:20px;">
          <div class="row justify-center border-dashed br-a-md q-pa-xl">
            <div>
              <div class="q-pb-md" align="center">
                <span class="text-h5 color3">การเขียนประโยชน์บอกเล่า</span>
              </div>
              <div class="c-video relative-position">
                <video id="video" class="video" :src="practice.vdoURL" controlslist="nodownload"></video>
                <div class="absolute-center">
                  <q-btn push class id="btn" @click="tooglePlayPause()" round flat>
                    <span style="font-size:100px;" id="icon" class="far fa-play-circle"></span>
                  </q-btn>
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
              @click="isHelp = !isHelp"
            ></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>-->
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      studentPracticeData: {
        dataAnswerList: []
      },
      practice: {
        currentQuestion: 0,
        nameENG: "",
        nameTH: "",
        sentenceENG: "",
        sentenceTH: "",
        imageURL: "",
        vdoURL: "",
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
      practiceListShow: [],

      isActivePractice: true,
      isLoadPractice: false,
      isStartPractice: false,
      isFinishPractice: false,
      isLoad: false,
      isFinish: false,
      isSaveData: false,
      isSendData: false,
      isChecKData: false,

      activeType: "start",
      isInstruction: false,
      isStartPractice: false,
      isFinishPractice: false,

      isCheckCorrect: false,

      isNextQuestion: false,
      isHelp: false,
      isPlay: false,

      snapSync: ""
    };
  },
  methods: {
    // showHelpVideo() {
    //   this.isHelp = !this.isHelp;

    //   setTimeout(() => {
    //     var vid = document.getElementById("video");
    //     let _this = this;
    //     let iconBtn = document.getElementById("icon");
    //     let btn = document.getElementById("btn");
    //     vid.onplaying = function() {
    //       btn.classList.add("btn-hidden");
    //       iconBtn.className = "far fa-pause-circle ";

    //       vid.play();
    //     };

    //     vid.onpause = function() {
    //       btn.classList.remove("btn-hidden");
    //       iconBtn.className = "far fa-play-circle";
    //     };
    //   }, 500);
    // },
    // tooglePlayPause() {
    //   let video = document.getElementById("video");
    //   let iconBtn = document.getElementById("icon");
    //   let btn = document.getElementById("btn");

    //   video.addEventListener("timeupdate", () => {
    //     let videoTime = video.currentTime / video.duration;

    //     if (videoTime * 100 == 100) {
    //       iconBtn.className = "far fa-play-circle";
    //       btn.classList.remove("btn-hidden");
    //       video.pause();
    //     }
    //   });

    //   if (video.paused) {
    //     video.play();

    //     video.controls = true;
    //   } else {
    //     video.pause();

    //     video.controls = false;
    //   }
    // },
    finishBtn() {
      this.isStartPractice = false;

      setTimeout(() => {
        this.isFinishPractice = true;
      }, 1000);
    },
    nextQuestionBtn() {
      this.isSaveData = true;
      this.isNextQuestion = false;
      this.isSendData = false;

      this.isCheckCorrect = false;

      this.practice.currentQuestion++;
      setTimeout(() => {
        this.isSaveData = false;
      }, 500);
    },
    async sendAnswerBtn() {
      this.isSendData = true;
      this.isChecKData = true;
      this.isSaveData = true;

      let currentAnswer = this.practiceListShow[this.practice.currentQuestion]
        .currentAnswer;

      let questionAnswer = this.practiceListShow[this.practice.currentQuestion]
        .questionEngArr;

      for (let i = 0; i < questionAnswer.length; i++) {
        if (questionAnswer[i].showHTML != "") {
          this.studentPracticeData.dataAnswerList[this.practice.currentQuestion]
            .totalAnswer++;
        }
      }

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practiceListShow[this.practice.currentQuestion].key;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].order = this.practiceListShow[this.practice.currentQuestion].order;

      if (this.practice.currentQuestion + 1 == this.practiceListShow.length) {
        this.isFinish = true;
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

      let currentWords = this.practiceListShow[
        this.practice.currentQuestion
      ].showWords.filter(x => {
        return x == "";
      });

      let fakeWords = this.practiceListShow[
        this.practice.currentQuestion
      ].showWords.filter(x => {
        return x != "";
      });

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].totalFakeAnswer = fakeWords.length;

      for (let i = 0; i < currentAnswer.length; i++) {
        if (currentAnswer[i].isAnswer) {
          if (currentAnswer[i].text == questionAnswer[i].showText) {
            this.practiceListShow[this.practice.currentQuestion].currentAnswer[
              i
            ].isCorrect = true;
            this.studentPracticeData.dataAnswerList[
              this.practice.currentQuestion
            ].correct++;

            this.studentPracticeData.correct++;
          } else {
            this.practiceListShow[this.practice.currentQuestion].currentAnswer[
              i
            ].isCorrect = false;
            this.studentPracticeData.dataAnswerList[
              this.practice.currentQuestion
            ].incorrect++;

            this.studentPracticeData.incorrect++;
          }
        }
      }

      let RagQuestion = this.practiceListShow[
        this.practice.currentQuestion
      ].questionEng.match(/<\s*u[^>]*>(.*?)<\s*\/\s*u>/g);

      let newQuestion = "";

      for (let i = 0; i < RagQuestion.length; i++) {
        newQuestion = this.practiceListShow[
          this.practice.currentQuestion
        ].questionEng.replace(
          RagQuestion[i],
          RagQuestion[i].replace(/(<([^>]+)>)/gi, "")
        );
        this.practiceListShow[
          this.practice.currentQuestion
        ].questionEng = newQuestion;
      }

      newQuestion = newQuestion
        .replace(/&nbsp;/g, "")
        .replace(/" ."/g, ".")
        .replace(/". "/g, ".")
        .replace(/"."/g, ".");

      this.practice.sentenceENG += newQuestion + " ";

      this.studentPracticeData.sentenceENG = this.practice.sentenceENG;

      let findIndex = this.practiceList
        .map(x => {
          return x.key;
        })
        .indexOf(this.practiceListShow[this.practice.currentQuestion].key);

      if (findIndex != this.practiceList.length - 1) {
        for (let i = findIndex; i < this.practiceList.length; i++) {
          if (this.practiceList[i + 1].except) {
            this.practice.sentenceENG +=
              this.practiceList[i + 1].questionEng + " ";

            if (i + 1 == this.practiceList.length - 1) {
              break;
            }
          } else {
            break;
          }
        }
      }

      if (this.practice.currentQuestion + 1 == this.practiceListShow.length) {
        this.isFinish = true;

        this.studentPracticeData.status = true;
      }

      if (
        this.studentPracticeData.dataAnswerList[this.practice.currentQuestion]
          .incorrect == 0
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";
      } else {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ผิด";
      }

      this.studentPracticeData.currentQuestion += 1;

      db.collection("studentpracticelog")
        .doc(this.practice.key)
        .update(this.studentPracticeData)
        .then(() => {
          this.isNextQuestion = true;
          this.isChecKData = false;
          this.isSaveData = false;

          this.isCheckCorrect = true;
        });
    },
    clearBtn(value, index) {
      let indexOfAnswer = this.practiceListShow[
        this.practice.currentQuestion
      ].showWords
        .map(x => {
          return x;
        })
        .indexOf("");

      this.practiceListShow[this.practice.currentQuestion].showWords[
        indexOfAnswer
      ] = value;

      this.practiceListShow[this.practice.currentQuestion].questionEngArr[
        index
      ].showText = "";

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer[index] = "";
    },
    answerBtn(answer, index) {
      this.isSaveData = true;

      let indexOfAnswer = this.practiceListShow[
        this.practice.currentQuestion
      ].questionEngArr
        .map(x => {
          return x.showText;
        })
        .indexOf("");

      if (indexOfAnswer == -1) {
        this.isSaveData = false;
        return;
      }

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correct = 0;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].incorrect = 0;

      this.practiceListShow[this.practice.currentQuestion].questionEngArr[
        indexOfAnswer
      ].showText = answer;

      if (
        this.studentPracticeData.dataAnswerList[this.practice.currentQuestion]
          .answer.length > 0
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].answer[indexOfAnswer] = answer;

        this.practiceListShow[this.practice.currentQuestion].showWords[index] =
          "";
        this.practiceListShow[this.practice.currentQuestion].showWords.push(
          "1"
        );
        this.practiceListShow[this.practice.currentQuestion].showWords.pop();
      } else {
        this.practiceListShow[
          this.practice.currentQuestion
        ].questionEngArr.some(x => {
          this.studentPracticeData.dataAnswerList[
            this.practice.currentQuestion
          ].answer.push(x.showText);
        });

        this.practiceListShow[this.practice.currentQuestion].showWords[index] =
          "";
      }

      this.isSaveData = false;
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

      // NOTE  Load Practice LIst Name
      db.collection("practiceListName")
        .where("skill", "==", this.practiceSkill)
        .where("level", "==", this.practiceLevel)
        .where("unit", "==", this.practiceUnit)
        .get()
        .then(getName => {
          if (getName.size) {
            this.practice.nameENG = getName.docs[0].data().name;
            this.practice.nameTH = getName.docs[0].data().nameth;
          }
        });

      // NOTE  Load Practice Data
      db.collection("practicepool_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(async doc => {
          let temp = [];
          let practiceCopy = [];
          let vdoHelpKey = [];
          let sumAnswerBox = 0;

          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            doc.forEach(data => {
              let dataKey = {
                key: data.id,
                questionEng: data.data().questionEng,
                showWords: data.data().showWords,
                questionEngArr: [],
                currentAnswer: [],
                fakeAnswer: []
              };

              if (!data.data().except) {
                let newWord;
                let setNewUnderline = [];
                let newQuestion = data.data().questionEng;

                let setArray = data
                  .data()
                  .questionEng.match(/<\s*u[^>]*>(.*?)<\s*\/\s*u>/g);

                newQuestion = newQuestion.replace(/&nbsp;/g, " ").split(" ");

                for (let i = 0; i < newQuestion.length; i++) {
                  let newData = {
                    showText: newQuestion[i].replace(/(<([^>]+)>)/gi, ""),
                    showHTML: ""
                  };

                  let newCurrentData = {
                    text: newQuestion[i].replace(/(<([^>]+)>)/gi, ""),
                    isAnswer: false
                  };

                  for (let x = 0; x < setArray.length; x++) {
                    if (newQuestion[i] == setArray[x]) {
                      newCurrentData = {
                        text: newQuestion[i].replace(/(<([^>]+)>)/gi, ""),
                        isAnswer: true,
                        isCorrect: false
                      };

                      newData = {
                        showText: "",
                        showHTML: (newQuestion[i] =
                          "<span style='display:inline-block;width:50px;border-bottom:2px solid#000;padding:16.8px;'></span>")
                      };
                    }
                  }

                  if (newData.showHTML != "") {
                    sumAnswerBox++;
                  }

                  dataKey.questionEngArr.push(newData);
                  dataKey.currentAnswer.push(newCurrentData);
                }

                this.sortRandom(dataKey.showWords);
              }

              let final = {
                ...data.data(),
                ...dataKey
              };

              let helpKey = data.data().help;

              temp.push(final);
              practiceCopy.push(final);
              vdoHelpKey.push(helpKey);
            });

            let vdoKey = vdoHelpKey.filter(x => {
              return x != "";
            })[0];

            await db
              .collection("vdotranslation")
              .doc(vdoKey)
              .get()
              .then(doc => {
                this.practice.imageURL = doc.data().imageURL;
                this.practice.vdoURL = doc.data().vdoURL;
              });

            practiceCopy.sort((a, b) => {
              return Number(a.order) - Number(b.order);
            });

            temp.sort((a, b) => {
              return Number(a.order) - Number(b.order);
            });

            this.practiceList = temp;

            let startExceptWords = "";

            for (let i = 0; i < this.practiceList.length; i++) {
              if (this.practiceList[i].except) {
                startExceptWords += this.practiceList[i].questionEng + " ";
              } else {
                break;
              }
            }

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
                  if (
                    checkData.docs[0].data().status ||
                    this.currentPage == "finish-translation"
                  ) {
                    this.practice.sentenceENG = checkData.docs[0].data().sentenceENG;
                    this.isStartPractice = false;

                    setTimeout(() => {
                      this.isFinishPractice = true;
                    }, 1000);
                  }
                  // NOTE  กรณีมีแบบฝึกหัดแล้วแต่ยังทำแบบฝึกหัดไม่เสร็จ
                  else {
                    this.practice.currentQuestion = checkData.docs[0].data().currentQuestion;
                    this.practice.sentenceENG = checkData.docs[0].data().sentenceENG;

                    // NOTE  หาข้อมูลแบบฝึกหัดที่ทำไปแล้วเป็น Array[]
                    let setQuestion = this.studentPracticeData.dataAnswerList.filter(
                      x => {
                        return x.key != "";
                      }
                    );

                    // NOTE  หาข้อมูลที่เหมือนกันในแบบฝึกหัดจริงและตัดข้อมูลที่ทำไปแล้วออก
                    for (let i = 0; i < setQuestion.length; i++) {
                      let setIndex = practiceCopy
                        .map(x => {
                          return x.key;
                        })
                        .indexOf(setQuestion[i].key);

                      practiceCopy.splice(setIndex, 1); // ตัดข้อมูล
                    }

                    let setNewTemp = practiceCopy.filter(x => {
                      return x.except != true;
                    });

                    // NOTE  เอาแบบฝึกหัดที่ทำไปแล้วก่อนหน้านี้กับแบบฝึกหัดที่เหลือมาร่วมกันให้มีจำนวนเท่ากับแบบฝึกหัดที่เหลือและแบบฝึกหัดที่ยังไม่ได้ทำ
                    this.practiceListShow = [...setQuestion, ...setNewTemp];

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
                        this.practice.sentenceENG = startExceptWords;

                        // NOTE  ตัดตัวที่เป็นประโยคละเว้น
                        this.practiceListShow = practiceCopy.filter(x => {
                          return x.except != true;
                        });

                        let newData = "";

                        // NOTE  เก็บข้อมูลการที่นักเรียนจะตอบตามจำนวนข้อแบบฝึกหัด
                        this.practiceListShow.some(x => {
                          newData = {
                            incorrect: 0,
                            correct: 0,
                            totalAnswer: 0,
                            key: "",
                            answer: [],
                            totalFakeAnswer: 0,
                            status: "ผิด",
                            order: ""
                          };

                          this.studentPracticeData.dataAnswerList.push(newData);
                        });

                        let sumQuestionAnswer = 0;

                        for (let i = 0; i < practiceCopy.length; i++) {
                          sumQuestionAnswer += practiceCopy[i].showWords.length;
                        }

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
                          sentenceENG: startExceptWords, // ต่อประโยคที่ตอบเข้ามา
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
      console.log(this.studentData);
      this.snapSync = db
        .collection("synchronize")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        .where("room", "==", this.studentData.room)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          if (doc.size) {
            this.currentPage = doc.docs[0].data().currentPage;

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

            // NOTE  กรณีมีแบบฝึกหัดแล้วและทำแบบฝึกหัดจบแล้ว
            if (this.currentPage == "finish-translation") {
              this.isLoadPractice = false;
              this.isStartPractice = false;

              // return
            }

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
  computed: {
    cutUndersocre() {
      let result;
      if (this.practiceListShow.length) {
        result = this.practiceListShow[
          this.practice.currentQuestion
        ].questionThai
          .replace(/<u>/g, "")
          .replace(/<\/u>/g, "");

        return result;
      }
    },
    cutSymbolTag() {
      let result;
      if (this.practiceListShow.length) {
        result = this.practiceListShow[this.practice.currentQuestion]
          .questionEng;

        let reg = new RegExp(/\s[\.]/, "g");

        result = result.replace(/(<([^>]+)>)/gi, "");
        result = result.replace(/&nbsp;/g, " ");
        result = result.replace(reg, ". ");
      }

      return result;
    },
    CheckHightLight() {
      let setHightLight = "";

      if (this.isStartPractice) {
        let currentWord = " ";

        if (this.practiceListShow.length) {
          currentWord = this.practiceListShow[this.practice.currentQuestion]
            .questionEng;
        }

        if (this.practice.sentenceENG != "") {
          setHightLight = this.practice.sentenceENG.replace(
            currentWord,
            "<span class='color6 text-bold'>" + currentWord + "</span>"
          );

          setHightLight = setHightLight.replace(
            new RegExp(/\s[$.]/, "g"),
            ". "
          );
        }
      } else {
        let sentenceEng = this.practiceList.map(x => x.questionEng);

        sentenceEng = sentenceEng.join(" ");

        let reg = new RegExp(/\s[\.]/, "g");

        sentenceEng = sentenceEng.replace(/(<([^>]+)>)/gi, "");
        sentenceEng = sentenceEng.replace(/&nbsp;/g, " ");
        sentenceEng = sentenceEng.replace(reg, ". ");
        setHightLight = sentenceEng;
      }

      return setHightLight;
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
.duration-slide-in {
  animation-duration: 0.5s;
}

.duration-slide-out {
  animation-duration: 0.3s;
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.2s;
}

.duration-bounce-in {
  animation-duration: 0.7s;
}

.duration-bounce-out {
  animation-duration: 0.3s;
}

.c-video {
  width: 100%;
  max-width: 1000px;
}

.video {
  width: 800px;
}

.controls {
  position: absolute;
  bottom: 5px;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.bar {
  height: 7px;
  top: 0;
  left: 0;
  width: 100%;
  transition: height 0.2s;
  background: rgba(0, 0, 0, 0.01);
  cursor: pointer;
}

.bar:hover {
  height: 10px;
}

.bar:hover .bar-orange {
  height: 10px;
}

.bar-orange {
  height: 7px;
  width: 0%;
  background-color: orangered;
  transition: height 0.2s;
  cursor: pointer;
}

#video + div #btn.btn-hidden {
  opacity: 0;
  transition: opacity 0.2s;
}

#video:hover + div #btn.btn-hidden {
  opacity: 1;
}

#btn:hover.btn-hidden {
  opacity: 1 !important;
}
</style>
