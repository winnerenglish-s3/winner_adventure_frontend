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
        v-if="isActiveHeader"
      >
        <div class="relative-position q-mt-md" align="center">
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

      <!-- NOTE : คำสั่ง -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in"
        leave-active-class="animated fadeOut duration-fade-out"
        v-if="isActivePractice"
      >
        <div class="q-mt-md row justify-center">
          <div class="bg5 shadow-2 q-pa-sm col-lg-9 col-md-12 col-xs-12 br-a-sm">
            <div
              align="center"
              class="border-dashed br-a-sm q-pa-md q-px-xl q-py-lg"
              :style="
                isShowDescription
                  ? { height: 'fit-content', minHeight: 'calc(100vh - 300px;)' }
                  : ''
              "
            >
              <div class="row border3-sm bg1 color3 text-bold">
                <div
                  v-for="(i, index) in practiceList"
                  :key="index"
                  class="col q-pa-xs self-start"
                  :class="[
                    { 'border3-r-sm': index != practiceList.length - 1 },
                    { 'bg10 color1': practice.currentQuestion > index },
                    { 'bg8 color1': index == practice.currentQuestion }
                  ]"
                >{{ index + 1 }}</div>
              </div>
              <div class="q-mt-md bg3 q-pa-lg q-px-xl" align="left">
                <div>
                  <span
                    class="text-h5 color1"
                    v-html="practiceList[practice.currentQuestion].question"
                  ></span>
                </div>
              </div>

              <transition
                appear
                enter-active-class="animated fadeIn duration-fade-in"
                leave-active-class="animated fadeOut duration-fade-out"
                v-if="isShowAnswer"
              >
                <div class="q-mt-sm">
                  <q-btn
                    no-caps
                    dense
                    class="full-width color1 br-a-sm q-mt-md"
                    :class="
                      isAnswer == false
                        ? 'bg11 no-pointer-events'
                        : index == 0
                        ? 'bg14'
                        : index == 1
                        ? 'bg8'
                        : index == 2
                        ? 'bg10'
                        : index == 3
                        ? 'bg7'
                        : null
                    "
                    align="left"
                    v-for="(item, index) in practiceList[
                      practice.currentQuestion
                    ].choices"
                    :key="index"
                    @click="answerBtn(item, index)"
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
                          <span class="text-h5" v-html="item"></span>
                        </div>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </transition>

              <transition
                appear
                enter-active-class="animated fadeIn duration-fade-in"
                leave-active-class="animated fadeOut duration-fade-out"
                v-if="isShowDescription"
              >
                <div class="q-mb-xl">
                  <div class="border-dashed br-a-xs q-mt-lg q-pa-md" align="center">
                    <div class="q-mt-lg">
                      <span class="text-h4 text-bold">คำอธิบาย</span>
                    </div>
                    <div class="row justify-center" align="left">
                      <div class="q-mt-xl q-mb-md">
                        <span
                          class="text-h5"
                          v-html="
                            practiceList[practice.currentQuestion].description
                          "
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>

      <!-- NOTE : รอเพื่อน -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in"
        leave-active-class="animated fadeOut duration-fade-out"
        v-if="isActiveWaiting"
      >
        <div class="q-mt-md row justify-center">
          <div class="bg5 shadow-2 q-pa-sm col-lg-9 col-md-12 col-xs-12 br-a-sm">
            <div
              align="center"
              class="border-dashed br-a-sm q-px-xl row justify-center q-pa-md"
              style="min-height:calc(100vh - 250px);max-height:fit-content;"
            >
              <div class="col-4 self-end">
                <img src="../../statics/island.png" style="max-width:400px;width:100%;" alt />
              </div>
              <div class="col-12 q-mt-md">
                <span style="font-size:4.5vw;" class="text-bold">รอเพื่อนก่อนนะ</span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- NOTE : สรุป -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActiveResult"
      >
        <div class="q-mt-md row justify-center">
          <div class="bg5 shadow-2 q-pa-sm col-lg-9 col-md-12 col-xs-12 br-a-sm">
            <div
              class="row border-dashed br-a-sm q-pa-md q-px-xl"
              style="min-height:calc(100vh - 220px);max-height:fit-content;"
            >
              <div class="col-md-12 col-xs-10 q-pa-sm q-mb-xl q-pb-xl">
                <span class="text-h5">สรุปคำตอบที่ลูกเรือเลือก</span>
              </div>
              <div class="col-12 row justify-center self-end border2-b-md q-mb-xl">
                <div
                  align="center"
                  class="col self-end"
                  v-for="(item, index) in practiceList[
                        practice.currentQuestion
                      ].choices"
                  :key="index"
                >
                  <div
                    class="q-mx-md q-pa-xs q-mb-xs relative-position"
                    :class="{
                          bg14: index == 0,
                          bg8: index == 1,
                          bg10: index == 2,
                          bg7: index == 3
                        }"
                    :style="
                          practice.graph.length > 0
                            ? { height: practice.graph[index].height + 'px' }
                            : {}
                        "
                  >
                    <span class="absolute-top text-h6 text-black text-bold" style="top:-35px;">
                      {{
                      practice.graph.length > 0
                      ? practice.graph[index].number
                      : 0
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
        </div>
      </transition>

      <!-- NOTE : เฉลย -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActiveAnswer"
      >
        <div class="row justify-center" style="max-width:1200px;width:90%;margin:15px auto;">
          <div class="bg5 shadow-2 q-pa-sm col-12 br-a-sm">
            <div
              class="row justify-center items-center border-dashed br-a-sm q-pa-xl"
              style="min-height:calc(100vh - 230px);max-height:fit-content;"
            >
              <!-- ตอบถูก -->
              <div
                class="col-6 br-a-md bg10 q-pa-xl text-white relative-position"
                align="center"
                v-if="
                    studentPracticeData.dataAnswerList[practice.currentQuestion]
                      .status == 'ถูก'
                  "
              >
                <q-icon name="fas fa-check" size="17vw"></q-icon>
                <div align="center">
                  <span style="font-size:2.5vw">ยินดีด้วยคุณตอบถูก</span>
                </div>
              </div>

              <!-- ตอบผิด -->
              <div
                class="col-6 br-a-md bg7 q-pa-xl text-white relative-position"
                align="center"
                v-if="
                    studentPracticeData.dataAnswerList[practice.currentQuestion]
                      .status == 'ผิด'
                  "
              >
                <q-icon name="fas fa-times" size="17vw"></q-icon>
                <div align="center">
                  <span style="font-size:2.5vw">พยายามใหม่อีกครั้ง</span>
                </div>
              </div>
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
      studentPracticeData: {
        dataAnswerList: []
      },
      practice: {
        currentQuestion: 0,
        graph: []
      },
      practiceList: [],
      practiceKey: "",
      practiceType: "",
      practiceStep: "",
      isLoadPractice: false,
      isActiveHeader: true,
      isActivePractice: true,
      isActiveAnswer: false,
      isActiveWaiting: false,
      isActiveResult: false,
      isActiveDescription: false,
      isAnswer: false,
      isDisabled: false,
      isSaveData: false,

      isShowAnswer: true,
      isShowDescription: false,

      isStartPractice: false,

      isLoad: false,
      snapSync: ""
    };
  },
  methods: {
    answerBtn(answer, index) {
      console.clear();
      this.isSaveData = true;
      this.isDisabled = true;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].answer = answer;

      this.studentPracticeData.dataAnswerList[
        this.practice.currentQuestion
      ].index = index;

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
      ].choices[this.practiceList[this.practice.currentQuestion].correctanswer];

      this.studentPracticeData.currentQuestion = this.practice.currentQuestion;

      if (
        this.practiceList[this.practice.currentQuestion].correctanswer == index
      ) {
        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ถูก";

        this.studentPracticeData.correct++;
      } else {
        this.studentPracticeData.incorrect++;

        this.studentPracticeData.dataAnswerList[
          this.practice.currentQuestion
        ].status = "ผิด";
      }

      db.collection("studentpracticelog")
        .doc(this.practice.key)
        .update(this.studentPracticeData)
        .then(() => {
          this.isActivePractice = false;
          this.isActiveAnswer = false;

          setTimeout(() => {
            this.isActiveWaiting = true;
          }, 500);
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

      // NOTE  Load Practice Data
      db.collection("practicepool_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(doc => {
          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            let temp = [];

            doc.forEach(async data => {
              let newData = {
                key: data.id,
                ...data.data()
              };

              temp.push(newData);
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
                if (checkData.size) {
                  this.studentPracticeData = checkData.docs[0].data();
                  this.practice.key = checkData.docs[0].id;

                  this.$q.localStorage.set(
                    "lastPracticeKey",
                    checkData.docs[0].id
                  );

                  if (this.practiceStep == "2") {
                    if (
                      this.studentPracticeData.dataAnswerList[
                        this.practice.currentQuestion
                      ].key != ""
                    ) {
                      this.isActivePractice = false;
                      this.isActiveAnswer = false;

                      setTimeout(() => {
                        this.isActiveWaiting = true;
                      }, 500);
                    }
                  }

                  // NOTE  กรณีมีแบบฝึกหัดแล้วและทำแบบฝึกหัดจบแล้ว
                  // if (checkData.docs[0].data().status) {
                  //   this.isFinishPractice = true;
                  //   return;
                  // }
                  // NOTE  กรณีมีแบบฝึกหัดแล้วแต่ยังทำแบบฝึกหัดไม่เสร็จ
                  // NOTE  เอาแบบฝึกหัดที่ทำไปแล้วก่อนหน้านี้กับแบบฝึกหัดที่เหลือมาร่วมกันให้มีจำนวนเท่ากับแบบฝึกหัดเหลือและแบบฝึกหัดที่ยังไม่ได้ทำ
                  this.practiceList = temp;

                  this.isStartPractice = true;
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
                        temp.some((item, index) => {
                          let newData = {
                            key: "",
                            answer: "",
                            status: "ผิด",
                            correctAnswer: "",
                            order: "",
                            index: null,
                            no: index
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

            this.practice.currentQuestion = doc.docs[0].data().currentQuestion
              ? doc.docs[0].data().currentQuestion
              : 0;

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

            this.practiceStep = doc.docs[0].data().page;

            let type = doc.docs[0].data().page;

            if (!this.isLoadPractice) {
              if (!this.$q.localStorage.has("useTime")) {
                this.$q.localStorage.set(
                  "useTime",
                  doc.docs[0].data().date.microtime
                );
              }

              this.loadPractice();
            }

            // 1 = คำสั่ง
            if (type == "1") {
              this.isActiveAnswer = false; // ปิดเฉลย
              this.isActiveWaiting = false; // ปิดหน้ารอ
              this.isShowDescription = false; // ปิดคำอธิบาย
              this.isActiveResult = false; // ปิดรวมคะแนน
              this.isAnswer = false; // ปิดไม่ให้ตอบ

              setTimeout(() => {
                this.isActivePractice = true; // เปิดแบบฝึกหัด
                this.isShowAnswer = true; // เปิดคำตอบ
              }, 300);
            }
            // 2 = แบบฝึกหัด
            else if (type == "2") {
              this.isActiveWaiting = false; // ปิดหน้ารอ
              this.isShowDescription = false; // ปิดคำอธิบาย
              this.isActiveResult = false; // ปิดหน้าคะแนน
              this.isActiveAnswer = false; // ปิดหน้าเฉลย

              setTimeout(() => {
                this.isActivePractice = true; // เปิดแบบฝึกหัด
                this.isAnswer = true; // เปิดให้ตอบได้
              }, 300);
            }
            // 3 = สรุป
            else if (type == "3") {
              this.isActivePractice = false; // ปิดแบบฝึกหัด
              this.isActiveWaiting = false; // ปิดหน้ารอ
              this.isShowDescription = false; // ปิดคำอธิบาย

              this.practice.graph =
                doc.docs[0].data().graph != undefined
                  ? doc.docs[0].data().graph
                  : [];

              setTimeout(() => {
                this.isActiveResult = true; // เปิดหน้าคะแนน
              }, 300);
            }
            // 4 = เฉลย
            else if (type == "4") {
              this.isActivePractice = false; // ปิดแบบฝึกหัด
              this.isActiveResult = false; // ปิดหน้าคะแนน
              this.isActiveWaiting = false; // ปิดหน้ารอ
              this.isShowDescription = false; // ปิดคำอธิบาย
              this.isAnswer = false; // ปิดไม่ให้ตอบ

              setTimeout(() => {
                this.isActiveAnswer = true; // เปิดหน้าเฉลย
              }, 300);
            }
            // 5 = คำอธิบาย
            else {
              this.isActiveResult = false; // ปิดหน้าคะแนน
              this.isActiveWaiting = false; // ปิดหน้ารอ
              this.isActiveAnswer = false; // ปิดหน้าเฉลย
              this.isAnswer = false; // ปิดไม่ให้ตอบ
              this.isShowAnswer = false; //  ปิดคำตอบ

              this.isSaveData = false; // ปิดการบันทึกข้อมูล
              this.isDisabled = false; // ปิดการกดปุ่มคำตอบ

              setTimeout(() => {
                this.isActivePractice = true; // เปิดแบบฝึกหัด
                this.isShowDescription = true; /// เปิดคำอธิบาย
              }, 300);
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

<style scpoed>
.duration-fade-in {
  animation-duration: 0.5s;
}
</style>
