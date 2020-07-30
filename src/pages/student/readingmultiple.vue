<template>
  <q-page
    class="q-pa-md color3 bg-reading bg-blend-mode animated fadeIn"
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
            <span class="text-bold" style="font-size:calc(20px + 1vw)">
              {{
              convertPracticeName(practiceType, practiceSkill)
              }}
            </span>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="isLoadPractice && isStartPractice">
      <!-- TODO : Content Practice -->
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
                  {{ practice.currentQuestion + 1 + "/" + practiceList.length }}
                </span>
              </div>
            </div>
            <div
              class="row col bg1 border3-t-xl border3-b-xl border3-r-xl br-tr-xs br-br-xs q-pa-sm self-center"
            >
              <div class="col self-center text-overflow" align="left">
                <span class="text-h6 text-bold">
                  <span v-if="!isChangeLanguage">
                    {{
                    practice.instructionEN
                    }}
                  </span>
                  <span v-else>{{ practice.instructionTH }}</span>
                  <q-tooltip anchor="top left" self="bottom left" :offset="[10, 10]">
                    <span style="font-size:20px;">
                      <span v-if="!isChangeLanguage">
                        {{
                        practice.instructionEN
                        }}
                      </span>
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
          </div>

          <div class="col-lg-9 col-md-12 col-xs-12 row q-mt-sm relative-position">
            <div class="col-12" align="left">
              <q-tabs align="left" v-model="tab" dense indicator-color="transparent">
                <div
                  class="text-h6 text-bold br-tr-lg br-tl-lg"
                  :class="
                    tab == 'practice'
                      ? 'bg5 color3 border5-xs'
                      : 'bg3 color6 border3-xs'
                  "
                  style="max-width:250px;width:100%;"
                >
                  <q-tab name="practice" class="br-tr-md br-tl-md">
                    <span class="text-h6">เนื้อเรื่อง</span>
                  </q-tab>
                </div>
                <div
                  class="text-h6 text-bold br-tr-lg br-tl-lg"
                  :class="[
                    tab == 'extra' && !isFinish ? 'bg5 color3 border5-xs' : '',
                    tab != 'extra' && !isFinish ? 'bg3 color6 border3-xs' : '',
                    isFinish ? 'bg11 color1 no-pointer-events border11-xs' : ''
                  ]"
                  style="max-width:250px;width:100%;"
                >
                  <q-tab name="extra" class="br-tr-md br-tl-md">
                    <span class="text-h6">คำศัพท์เสริม</span>
                  </q-tab>
                </div>
              </q-tabs>
            </div>

            <div class="col-12 bg5 br-tr-sm br-br-sm br-bl-sm q-pa-sm">
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="jump-up"
                transition-next="jump-down"
                class="bg-transparent"
              >
                <!-- NOTE  part Story : เนื้อเรื่อง -->
                <q-tab-panel name="practice">
                  <div class="text-h4" align="center">
                    <span v-html="readingContent.titleEng"></span>
                  </div>
                  <div class="q-mt-md" align="center">
                    <q-img :src="readingContent.imageURL" style="max-width:600px;width:95%;"></q-img>
                  </div>
                  <div class="text-h6">
                    <div class="q-mt-lg">
                      <span v-html="contentEng"></span>
                    </div>
                  </div>
                </q-tab-panel>

                <!-- NOTE  part Vocab : คำศัพท์เสริม -->
                <q-tab-panel name="extra">
                  <div style="height:300px;">
                    <div class="row" v-if="readingExtra.length > 0">
                      <div
                        class="col-3 self-start q-pa-xs"
                        align="center"
                        v-for="(item, index) in readingExtra[
                          practice.currentExtraVocab
                        ]"
                        :key="index"
                      >
                        <div class="bg1 br-a-xs q-pa-sm">
                          <div>
                            <span class="text-h5 text-bold color3" v-html="item.vocabulary"></span>
                          </div>
                          <div class="q-pa-xs q-mt-xs">
                            <span class="text-h6" v-html="item.meaning"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-mt-md row justify-center q-px-lg" v-if="readingExtra.length > 1">
                    <div :class="readingExtra.length <= 2 ? 'col-4' : 'col-8'">
                      <q-btn-group push class="full-width">
                        <q-btn
                          @click="practice.currentExtraVocab = index"
                          class="fit text-h6"
                          :class="[
                            index + 1 != readingExtra.length
                              ? 'border1-r-md'
                              : '',
                            practice.currentExtraVocab == index
                              ? 'bg1 color3'
                              : 'bg3 color1'
                          ]"
                          push
                          v-for="(item, index) in readingExtra.length"
                          :key="index"
                        >{{ item }}</q-btn>
                      </q-btn-group>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>

            <!-- SECTION  show answer : แสดงผลคำตอบ -->
            <transition
              appear
              enter-active-class="animated fadeInUp duration-fadeChoice-in"
              leave-active-class="animated fadeOutDown duration-fadeChoice-out"
              v-if="tab == 'practice'"
            >
              <div class="col bg5 q-mt-md br-a-sm q-pa-md" v-if="practiceList.length">
                <div
                  class="text-h5 q-pa-sm"
                  v-html="practiceList[practice.currentQuestion].question"
                ></div>

                <!-- แสดงปุ่มกดคำตอบ -->
                <div v-show="!isAnswer">
                  <q-btn
                    no-caps
                    dense
                    align="left"
                    class="full-width color1 br-a-sm q-mt-md"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choice"
                    :key="index"
                    :class="
                      index == 0
                        ? 'bg14'
                        : '' || index == 1
                        ? 'bg8'
                        : '' || index == 2
                        ? 'bg10'
                        : '' || index == 3
                        ? 'bg9'
                        : ''
                    "
                    :disable="isDisabled"
                    @click="answerBtn(item.answer)"
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

                <!-- แสดงผลลัพธ์คำตอบ -->
                <div v-show="isAnswer">
                  <q-btn
                    no-caps
                    dense
                    align="left"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choice"
                    :key="index"
                    class="full-width br-a-sm q-mt-md no-pointer-events"
                    :class="{
                      'bg6 color3':
                        practiceList[practice.currentQuestion].correctAnswer ==
                        item.index,
                      'bg3 color1':
                        studentPracticeData.dataAnswerList[
                          practice.currentQuestion
                        ].answer == item.answer,
                      'bg11 color1':
                        studentPracticeData.dataAnswerList[
                          practice.currentQuestion
                        ].answer != item.answer &&
                        practiceList[practice.currentQuestion].correctAnswer !=
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
                                .correctAnswer != item.index
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
                              .correctAnswer == item.index
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
                                .correctAnswer != item.index
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
                <div v-if="isShowDescription">
                  <div
                    align="center"
                    class="q-py-lg"
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
                  <div class="border-dashed br-a-sm q-pa-md" align="center">
                    <span class="text-h5 text-bold" align="center">คำอธิบาย</span>
                    <div class="q-mt-sm">
                      <span
                        class="text-h6"
                        v-html="
                          practiceList[practice.currentQuestion].description
                        "
                      ></span>
                    </div>
                  </div>

                  <div class="q-mt-md" align="center">
                    <q-btn
                      class="bg3 color5 q-px-lg text-h6"
                      label="ข้อถัดไป"
                      @click="nextQuestionBtn()"
                      v-if="!isFinish"
                      :disable="isDisabledNext"
                    >
                      <q-icon name="fas fa-angle-right" class="q-pl-md"></q-icon>
                    </q-btn>
                    <q-btn
                      class="bg3 color5 text-h6 q-px-lg"
                      label="จบภารกิจ"
                      @click="finishBtn()"
                      v-if="isFinish"
                      :disable="isDisabled"
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
      <!-- SECTION : Finish Show Content Eng -->
      <!-- TODO : Content Practice -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActiveContent"
      >
        <div class="row justify-center" style="max-width:1200px;width:100%;margin:20px auto;">
          <div class="col bg5 br-a-sm q-pa-md">
            <div align="center">
              <span class="text-h4" v-html="readingContent.titleThai"></span>
            </div>
            <div class="q-mt-md" align="center">
              <q-img :src="readingContent.imageURL" style="max-width:600px;width:95%;"></q-img>
            </div>
            <div class="q-mt-md">
              <span class="text-h6" v-html="readingContent.contentThai"></span>
            </div>
          </div>
          <div class="col-12 bg5 q-mt-lg br-a-sm q-pa-md">
            <div align="center">
              <span class="text-h4" v-html="readingContent.titleEng"></span>
            </div>
            <div class="q-mt-md">
              <span class="text-h6" v-html="readingContent.contentEng"></span>
            </div>
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
      tab: "practice",
      practice: {
        currentQuestion: 0, // ข้อที่ทำแบบฝึกหัดปัจจุบัน
        currentSentence: 0,
        currentExtraVocab: 0,
        instructionTH: "",
        instructionEN: ""
      },
      currentPage: "",
      practiceKey: "",
      practiceType: "",
      practiceName: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",
      practiceOrder: "",
      readingContent: "",
      readingExtra: [],
      readingSpeak: [],
      practiceList: [], // รายการแบบฝึกหัด

      studentPracticeData: {
        dataAnswerList: []
      },

      isChangeLanguage: false, // เปลื่ยนภาษา

      isActivePractice: true, // อนิเมชั่นแบบฝึกหัด
      isActiveContent: true, // อนิเมชั่นเนื้อเรื่อง

      isLoadPractice: false, // โหลดข้อมูลแบบฝึกหัด
      isStartPractice: false, // เริ่่มทำแบบฝึกหัด
      isFinishPractice: false, // จบแบบฝึกหัด

      isLoadPractice: false, // โหลดข้อมูลแบบฝึกหัด
      isDisabled: false,
      isAnswer: false,
      isShowDescription: false,

      isDisabledNext: false,
      isFinish: false,

      isSaveData: false,

      snapSync: ""
    };
  },
  methods: {
    finishBtn() {
      this.isDisabled = true;
      this.isActivePractice = false;
      this.isStartPractice = false;

      setTimeout(() => {
        this.isFinishPractice = true;
      }, 1000);
    },
    nextQuestionBtn() {
      this.isDisabledNext = true;
      this.isDisabled = true;
      this.isSaveData = true;

      this.practice.currentQuestion++;
      this.isDisabledNext = false;

      this.isAnswer = false;
      this.isShowDescription = false;

      setTimeout(() => {
        this.isSaveData = false;
        this.isDisabled = false;
      }, 1000);
    },
    async answerBtn(answer) {
      this.isDisabled = true;
      this.isSaveData = true;

      let indexOf = this.practiceList[
        this.practice.currentQuestion
      ].defaultChoice
        .map(x => {
          return x;
        })
        .indexOf(answer);

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = answer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].correctAnswer = this.practiceList[
        this.practice.currentQuestion
      ].defaultChoice[
        this.practiceList[this.practice.currentQuestion].correctAnswer
      ];

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].order = this.practiceList[this.practice.currentQuestion].order;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].key = this.practiceList[this.practice.currentQuestion].key;

      this.studentPracticeData.currentQuestion++;

      if (
        indexOf ==
        this.practiceList[this.practice.currentQuestion].correctAnswer
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
          this.isDisabled = false;
          this.isAnswer = true;
          this.isShowDescription = true;
          this.isSaveData = false;

          setTimeout(() => {
            document.documentElement.scrollTop =
              document.documentElement.scrollHeight;
          }, 100);
        });
    },
    loadPractice() {
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

      // NOTE  Load Reading Content
      db.collection("readingcontent_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(doc => {
          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            let newContentEN = doc.docs[0]
              .data()
              .contentEng.replace(/\[tab\]/g, "&nbsp;&nbsp;&nbsp;");

            let newContentTH = doc.docs[0]
              .data()
              .contentThai.replace(/\[tab\]/g, "&nbsp;&nbsp;&nbsp;");

            let newData = {
              key: doc.docs[0].id,
              ...doc.docs[0].data(),
              contentEng: newContentEN,
              contentThai: newContentTH
            };

            this.readingContent = newData;

            // NOTE  Load Reading Content Vocab
            db.collection("readingcontent_server")
              .doc(this.readingContent.key)
              .collection("extraVocab")
              .get()
              .then(extraDoc => {
                this.readingExtra = [];
                let setArr = [];
                let temp = [];

                extraDoc.forEach(result => {
                  let dataKey = {
                    key: result.id,
                    ...result.data()
                  };

                  setArr.push(dataKey);
                });

                setArr.sort((a, b) => {
                  return a.vocabulary.toLowerCase() > b.vocabulary.toLowerCase()
                    ? 1
                    : -1;
                });

                let setCount = 12;

                let countExtra = Math.ceil(setArr.length / setCount);
                let start = 0;
                let end = setCount;

                for (let i = 0; i < countExtra; i++) {
                  let newData = setArr.slice(start, end);

                  temp.push(newData);

                  start += setCount;
                  end += setCount;
                }

                this.readingExtra = temp;
              });

            // NOTE  Load Reading Speak
            db.collection("readingcontent_server")
              .doc(this.readingContent.key)
              .collection("speakPractice")
              .get()
              .then(speakDoc => {
                if (speakDoc.size) {
                  speakDoc.forEach(result => {
                    let dataKey = {
                      key: result.id,
                      ...result.data()
                    };

                    this.readingSpeak.push(dataKey);
                  });

                  this.readingSpeak.sort((a, b) => {
                    return Number(a.order) - Number(b.order);
                  });
                }
              });

            // NOTE  Load Practice Data
            db.collection("practicepool_server")
              .where("practicekey", "==", this.practiceKey)
              .get()
              .then(practiceDoc => {
                let temp = [];

                // NOTE  กรณีมีข้อมูลแบบฝึกหัด
                if (practiceDoc.size) {
                  practiceDoc.forEach(result => {
                    let dataKey = {
                      key: result.id,
                      ...result.data(),
                      choice: [],
                      defaultChoice: result.data().choice
                    };

                    result.data().choice.forEach((getItem, index) => {
                      let newIndexChoice = {
                        answer: getItem,
                        index: index
                      };

                      dataKey.choice.push(newIndexChoice);
                    });

                    this.sortRandom(dataKey.choice);

                    temp.push(dataKey);
                  });

                  temp.sort((a, b) => {
                    return Number(a.order) - Number(b.order);
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
                        if (
                          checkData.docs[0].data().status ||
                          this.currentPage == "finish-reading"
                        ) {
                          setTimeout(() => {
                            this.isFinishPractice = true;
                          }, 1000);

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
                        console.log("ยังไม่มีข้อมูล");
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
                                  correctAnswer: "",
                                  order: ""
                                };
                                this.studentPracticeData.dataAnswerList.push(
                                  newData
                                );
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
          } else {
            this.$router.push("/student/practice/waiting");
            return;
          }
        });
    },
    loadContent() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;

      // NOTE  Load Reading Content
      db.collection("readingcontent_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(doc => {
          if (doc.size) {
            let newContentEN = doc.docs[0]
              .data()
              .contentEng.replace(/\[tab\]/g, "&nbsp;&nbsp;&nbsp;");

            let newContentTH = doc.docs[0]
              .data()
              .contentThai.replace(/\[tab\]/g, "&nbsp;&nbsp;&nbsp;");

            let newData = {
              key: doc.docs[0].id,
              ...doc.docs[0].data(),
              contentEng: newContentEN,
              contentThai: newContentTH
            };

            this.readingContent = newData;

            this.isStartPractice = false;

            setTimeout(() => {
              this.isFinishPractice = true;
            }, 1000);
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
            if (this.currentPage == "finish-reading") {
              this.isLoadPractice = false;
              this.loadContent();
            } else {
              if (!this.isLoadPractice) {
                this.$q.localStorage.set(
                  "useTime",
                  doc.docs[0].data().date.microtime
                );

                // NOTE  Delete Local Storage : ลบแบบฝึกหัดก่อนหน้านี้
                this.$q.localStorage.remove("lastPracticeLog");
                this.loadPractice();
              }
            }
          }
        });
    }
  },
  computed: {
    contentEng() {
      let contentEng = this.readingContent.contentEng;

      let res = "";

      if (this.isAnswer) {
        let setArr = this.practiceList[this.practice.currentQuestion].refer;

        let textHighLight = setArr.filter(x => {
          return x != "";
        });

        for (let i = 0; i < textHighLight.length; i++) {
          res = contentEng.replace(
            textHighLight[i],
            "<span class='q-px-xs bg3 color6'>" + textHighLight[i] + "</span>"
          );

          contentEng = res;
        }
      }

      res = contentEng;

      return res;
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
.border-dashed-sentence {
  border-right: 2px dashed #662707;
  border-left: 2px dashed #662707;
  border-bottom: 2px dashed #662707;
}

.duration-fadeChoice-in {
  animation-duration: 0.5s;
}

.duration-fadeChoice-out {
  animation-duration: 0.5s;
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.3s;
}
</style>
