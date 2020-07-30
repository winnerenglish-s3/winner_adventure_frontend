<template>
  <q-page class="bg-main row justify-center items-center relative-position animated fadeIn q-pa-md">
    <div align="center" class="col-12 q-pa-md z-top">
      <q-img
        src="../../statics/paper_map.png"
        class="relative-position"
        style="max-width:800px;width:100%;"
      >
        <div class="row justify-center full-width bg-transparent">
          <div class="col-6">
            <div class="q-py-xl" align="center">
              <span class="text-h3 color3">เลือกห้องเรียน</span>
            </div>
            <div class="row justify-center q-py-md">
              <div class="col-2 self-center">
                <span class="text-h5 color3">ชั้น</span>
              </div>
              <div class="col bg1 rounded-borders">
                <q-select
                  @input="changeRoom()"
                  borderless
                  v-model="data.class"
                  :options="classroom"
                  class="q-pl-md"
                  dense
                  map-options
                  emit-value
                />
              </div>
            </div>
            <div class="row justify-center q-py-md">
              <div class="col-2 self-center">
                <span class="text-h5 color3">ห้อง</span>
              </div>
              <div class="col bg1 rounded-borders">
                <q-select
                  borderless
                  v-model="data.room"
                  :options="roomOptions"
                  class="q-pl-md"
                  emit-value
                  map-options
                  dense
                />
              </div>
            </div>
            <div align="center" class="q-pa-xl">
              <q-btn
                @click="startLearn()"
                label="ตกลง"
                :disable="isCheckData"
                class="text-h5 bg3 color6 q-px-lg"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-img>
    </div>

    <dialog-check-login
      v-if="isDialogPopup"
      :propsData="sendDataDialog"
      @dataclose="val => closePopupFunction(val)"
    ></dialog-check-login>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import dialogCheckLogin from "../../components/dialogchecklogin.vue";
export default {
  components: {
    dialogCheckLogin,
  },
  data() {
    return {
      data: {
        class: "",
        room: "",
      },
      roomOptions: [],
      classroom: [],
      teacherData: "",
      schoolData: "",
      schoolKey: "",
      studentList: [],

      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: "",
      },
      isDialogPopup: false,
      isCheckData: false,
    };
  },

  methods: {
    // Function Filter Class Room
    async filterClassRoom() {
      this.loadingShow();

      let teacherData = await this.loadTeacherData();

      this.schoolKey = teacherData.schoolKey;

      this.teacherData = await this.loadTeacherSyncData();

      // NOTE : โหลดข้อมูลนักเรียนทั้งหมด
      let studentAll = await this.loadStudentList();

      this.studentList = studentAll;

      console.log(studentAll);

      // NOTE : สร้างตัวแปลไว้เก็บชั้นทั้งหมดของนักเรียน จากการ Map() หา
      let studentClass = studentAll.data.map((x) => {
        return x.classRoom;
      });

      // NOTE : หลังจากการ Map() หาข้อมูลแล้วให้ทำการตัดตัวซ้ำกันออกก่อน
      studentClass = [...new Set(studentClass)];

      console.log(studentClass);

      // NOTE : สร้างตัวแปล Array ไว้เก็บชั้นของนักเรียน
      let studentClassObj = [];

      // NOTE : ใช้ forEach() ในการหาลำดับชั้นเรียน เช่น ป.1/1 ขึ้นก่อนให้ set Index เป็นตัวแรก
      studentClass.forEach((element, index) => {
        let splitClass = element.split(".");
        let indexadd =
          splitClass[0] == "ป"
            ? splitClass[1]
            : splitClass[0] == "ม"
            ? Number(splitClass[1]) + 6
            : null;
        let dataStudentClass = {
          label: element,
          value: element,
          indexAdd: indexadd,
        };

        // NOTE : เก็บข้อมูลจากการหา Index ใส่ในตัวแปล Array ที่สร้างไว้
        studentClassObj.push(dataStudentClass);
      });

      // NOTE : เอาชั้นเรียนที่หาได้ทำการ sort() เพื่อเรียงข้อมูล จากน้อยไปมาก
      studentClassObj.sort((a, b) => {
        return a.indexAdd - b.indexAdd;
      });

      this.classroom = studentClassObj;

      // NOTE : ถ้า status ของคุณครู == "online" ให้ไป set ชั้นเรียนที่เคยเรียนเป็นตัวแรก
      if (this.teacherData.status == "online") {
        this.data.class = this.teacherData.class;
      } else {
        this.data.class = studentClassObj[0].value;
      }

      // NOTE : ค้นหาห้องจากการ Filter() ด้วยชั้นเรียนปัจจุบันที่เลือกไว้จะได้ค่าออกมาเป็น Array แล้ว ทำการ Map() เลือกเฉพาะห้องที่มีในชั้นนั้น
      let studentRoomTotal = studentAll.data
        .filter((x) => {
          return x.classRoom == this.data.class;
        })
        .map((e) => {
          return e.room;
        });

      // NOTE : หลังจากการหาห้องโดยการ Map() แล้วให้ทำการตัดตัวซ้ำออก
      studentRoomTotal = [...new Set(studentRoomTotal)];

      console.log(studentRoomTotal);

      // NOTE : สร้างตัวแปล Array ไว้เก็บห้องของนักเรียน
      let roomTotal = [];

      // NOTE : ใช้ forEach() ในการ set ค่า value และ label เอาไปใช้ใน Options ของ q-select
      studentRoomTotal.forEach((element, index) => {
        let data = {
          label: element,
          value: element,
        };
        roomTotal.push(data);
      });

      // NOTE : เอาห้องเรียนที่หา มาทำการ sort() เพื่อเรียงข้อมูล จากน้อยไปมาก
      roomTotal.sort((a, b) => {
        return Number(a.value) - Number(b.value);
      });

      this.roomOptions = roomTotal;

      // NOTE : ถ้า status ของคุณครู == "online" ให้ไป set ห้องเรียนที่เคยเรียนเป็นตัวแรก
      if (this.teacherData.status == "online") {
        this.data.room = this.teacherData.room;
      } else {
        this.data.room = roomTotal[0].value;
      }

      this.loadingHide();
    },
    async closePopupFunction(val) {
      this.loadingShow();

      let dateAndTime = await this.getDateAndTime();
      let getTermAndYear = await this.getTermAndYear();

      if (!val.reFunction) {
        this.isDialogPopup = false;
        this.isCheckData = false;
        this.loadingHide();
      } else {
        let checkSync = await db
          .collection("synchronize")
          .where("currentDate", "==", dateAndTime.date)
          .where("room", "==", this.data.room)
          .where("class", "==", this.data.class)
          .where("term", "==", getTermAndYear.term)
          .where("year", "==", getTermAndYear.year)
          .where("schoolKey", "==", this.schoolKey)
          .get();

        checkSync.forEach((element) => {
          db.collection("synchronize")
            .doc(element.id)
            .delete()
            .then(() => {
              if (this.teacherData.key != element.id) {
                db.collection("teacher")
                  .doc(element.id)
                  .update({
                    status: "offline",
                  })
                  .then(() => {
                    this.startAndRoute();
                  });
              } else {
                this.startAndRoute();
              }
            });
        });

        // this.isDialogPopup = false;
        // this.isCheckData = false;
      }

      this.sendDataDialog = {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: "",
      };
    },
    changeRoom() {
      let roomTotal = [];

      let studentRoomTotal = this.studentList
        .filter((x) => {
          return x.classRoom == this.data.class;
        })
        .map((e) => {
          return e.room;
        });

      studentRoomTotal = [...new Set(studentRoomTotal)];
      studentRoomTotal.forEach((element, index) => {
        let data = {
          label: element,
          value: element,
        };
        roomTotal.push(data);
        roomTotal.sort((a, b) => {
          return Number(a.value) - Number(b.value);
        });
      });

      this.roomOptions = roomTotal;
      this.data.room = this.roomOptions[0].value;
    },
    async getPracticeList(level) {
      let practiceTemp = [];
      let loadPracticelist = await db
        .collection("practicelist")
        .where("level", "==", level)
        .get();

      // console.log(loadPracticelist.size);

      loadPracticelist.forEach((element) => {
        let dataKey = { practiceKey: element.id };
        let final = { ...dataKey, ...element.data() };
        practiceTemp.push(final);
        practiceTemp.sort((a, b) => {
          return a.order - b.order;
        });
      });

      practiceTemp.sort((a, b) => {
        return Number(a.unit) - Number(b.unit);
      });

      // SET PRACTICELIST TO LOCALSTORAGE
      // let practiceTempEncrypt = this.encrypt(practiceTemp, 1);

      // this.$q.localStorage.set("practiceList", practiceTempEncrypt);
    },

    async startLearn() {
      console.clear();
      this.loadingShow();
      let dateAndTime = await this.getDateAndTime();
      let getTermAndYear = await this.getTermAndYear();

      let tk = this.$q.localStorage.getItem("tk");

      let tempTeacher = [];

      let checkTeacher = await db
        .collection("synchronize")
        .where("currentDate", "==", dateAndTime.date)
        .where("room", "==", this.data.room)
        .where("class", "==", this.data.class)
        .where("term", "==", getTermAndYear.term)
        .where("year", "==", getTermAndYear.year)
        .where("schoolKey", "==", this.schoolKey)
        .get();

      checkTeacher.forEach((doc) => {
        tempTeacher.push(doc.id);
      });

      if (!tempTeacher.includes(tk)) {
        // ถ้ากรณีไม่มีคุณครูสอนอยู่ในระดับชั้นเดียวกัน
        // console.log("ถ้ากรณีไม่มีคุณครูสอนอยู่ในระดับชั้นเดียวกัน");

        this.startAndRoute();
      } else {
        // ถ้ากรณีที่มีคุณครูสอนอยู่ในระดับชั้นเดียวกัน
        // console.log("ถ้ากรณีที่มีคุณครูสอนอยู่ในระดับชั้นเดียวกัน");

        this.loadingHide();

        this.isCheckData = true;
        this.isDialogPopup = true;

        this.sendDataDialog.type = "teacherHasInClassroom";
        this.sendDataDialog.title =
          "มีการใช้งานห้อง " + this.data.class + "/" + this.data.room + " อยู่";
        this.sendDataDialog.btn1 = "เข้าใช้งาน";
        this.sendDataDialog.btn2 = "ยกเลิก";
        this.sendDataDialog.icon = "fas fa-desktop";
      }
    },

    async startAndRoute() {
      // await this.loadScoreMission();

      this.$q.localStorage.set("selectClassRoom", true);

      let dateAndTime = await this.getDateAndTime();
      let getTermAndYear = await this.getTermAndYear();
      let getStudentList = await this.loadStudentList();

      console.log(getStudentList);

      let level = getStudentList.data.filter((x) => {
        return x.classRoom == this.data.class && x.room == this.data.room;
      });

      let copyLevel = level;

      level = level.sort((a, b) => {
        return b.level - a.level;
      });

      level = level[0].level;
      level = level.toString();

      // เซ็ทเลเวล เข้าสู่ LocalStorage
      // let levelEncrypt = this.encrypt(level, 2);
      // this.$q.localStorage.set("currentLevel", levelEncrypt);
      //*************Set all practicelist in level to local storage******************* */
      // await this.getPracticeList(level);

      // console.log(level);

      let missionScore = await this.setInitialMissionScore();

      // console.log(missionScore);

      // SET INITIAL VARIABLE
      let finalData = {
        ...this.data,
        studyplanType: "auto",
        date: dateAndTime,
        currentPage: "main",
        schoolKey: this.schoolKey,
        status: "online",
        term: getTermAndYear.term,
        year: getTermAndYear.year,
        currentDate: dateAndTime.date,
        totalStudent: copyLevel.length,
        missionScore: missionScore,
      };

      // console.log(finalData);

      // Update นักเรียนภายในระดับชั้นนี้ ห้องนี้ให้เป็น Offline ทั้งหมด
      if (
        this.data.class != this.teacherData.class ||
        this.data.room != this.teacherData.room
      ) {
        this.setStudentToOffline();
      }

      // Set ห้องปัจจุบัน / ชั้นปัจจุบัน
      // let currentRoomEncrypt = this.encrypt(this.data.room, 2);
      // this.$q.localStorage.set("currentRoom", currentRoomEncrypt);
      // let currentClassEncrypt = this.encrypt(this.data.class, 2);
      // this.$q.localStorage.set("currentClass", currentClassEncrypt);

      // โหลดข้อมูลโรงเรียน

      let schoolData = await this.loadSchoolData();

      // console.log(schoolData);

      // สถานะการเรียน / pretest / posttest / study
      let prePostStatus = schoolData.prePostStatus;

      // ตรวจสอบว่า ระดับชั้นนี้ได้ถูก มาร์คว่าทำ Placementแล้วหรือยัง
      let checkPlacementMark = await db
        .collection("placementMark")
        .where("schoolKey", "==", this.schoolKey)
        .where("class", "==", this.data.class)
        .where("isPlacement", "==", true)
        .get();

      if (
        prePostStatus == "pretest" ||
        prePostStatus == "posttest" ||
        schoolData.placement
      ) {
        // โหลดข้อมูล schooltestlog ต่อเมื่อ มีการเปิด pretest หรือ posttest เท่านั้น
        var checkTestStatus = await db
          .collection("schooltestlog")
          .where("schoolKey", "==", this.schoolKey)
          .where("class", "==", this.data.class)
          .where("room", "==", this.data.room)
          .where("term", "==", getTermAndYear.term)
          .where("year", "==", getTermAndYear.year)
          .where("status", "==", true)
          .get();

        var schoolTestData = [];

        checkTestStatus.forEach((element) => {
          schoolTestData.push(element.data());
        });
      }

      // console.log(schoolTestData);

      // console.log(level);

      if (checkPlacementMark.size) {
        //  กรณีถูกมาร์คว่า ระดับชั้นนี้ได้ทำ Placement Test ไปแล้ว

        if (level == "0") {
          this.$q.dialog({
            title: "แจ้งเตือน",
            message: "ไม่พบบทเรียนกรุณาติดต่อทีมงาน",
          });

          this.loadingHide();
          return;
        }

        // console.log("มี Level ของ Placement Test แล้ว");
        if (prePostStatus == "pretest") {
          // กรณี โรงเรียนเปิดระบบ Pretest
          // console.log("โรงเรียนเปิด Pretest");
          let checkPretestStatus = schoolTestData.filter((e) => {
            return e.testtype == "pretest";
          });
          if (checkPretestStatus.length > 0) {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ได้ทำการ Pretest ไปแล้ว ไปหน้าหลัก
            // console.log("ทำ Pretest แล้ว ไปหน้าหลัก");
            this.syncAndRoute(finalData, "/teacher/main");
          } else {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ยังไม่ได้ทำการ Pretest
            // console.log("ยังไม่ทำ Pretest ไป pretest");
            finalData.currentPage = "prepare-pretest";
            this.$q.localStorage.set("prepostType", "pretest");
            this.syncAndRoute(finalData, "/teacher/prepost");
          }
        } else if (prePostStatus == "posttest") {
          // กรณีโรงเรียนเปิดระบบ Posttest
          // console.log("โรงเรียนเปิด posttest");
          let checkPosttestStatus = schoolTestData.filter((e) => {
            return e.testtype == "posttest";
          });
          if (checkPosttestStatus.length > 0) {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ได้ทำการ Posttest ไปแล้ว
            // console.log("ทำ Posttest แล้วไปหน้าหลัก");
            this.syncAndRoute(finalData, "/teacher/main");
          } else {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ยังไม่ได้ทำการ Posttest
            // console.log("ยังไม่ทำ Posttestไป posttest");
            finalData.currentPage = "prepare-posttest";
            this.$q.localStorage.set("prepostType", "posttest");
            this.syncAndRoute(finalData, "/teacher/prepost");
          }
        } else {
          // กรณีเป็นโหมดเรียนปกติ
          // console.log("เรียนปกติ");
          this.syncAndRoute(finalData, "/teacher/main");
        }
      } else {
        // กรณียังไม่ได้ถูกมาร์คว่า ทำ Placement Test
        // console.log("ยังไม่มี Level ของ Placement Test");
        if (schoolData.placement) {
          // กรณีเปิด Placement Test
          // console.log("เปิด Placement Test");
          let checkPlacementStatus = schoolTestData.filter((e) => {
            return e.testtype == "placement";
          });
          if (checkPlacementStatus.length > 0) {
            // กรณีระดับชั้นนี้ ห้องนี้ ได้ทำ Placement test ไปแล้ว
            finalData.currentPage = "talkingplacement";
            // console.log("ระดับชั้นนี้ ห้องนี้ได้ทำ Placement Test แล้ว");
            this.syncAndRoute(finalData, "/talkingplacement");
          } else {
            // กรณีระดับชั้นนี้ ห้องนี้ยังไม่ได้ทำ Placement test
            // console.log("ระดับชั้นนี้ ห้องนี้ยังไม่ได้ทำ Placement Test");
            finalData.currentPage = "prepare-placement";
            this.syncAndRoute(finalData, "/teacher/placement");
          }
        } else {
          // กรณีไม่เปิด Placement Test
          // console.log("โรงเรียนไม่เปิดระบบ placement");
          finalData.currentPage = "talkingplacement";
          this.syncAndRoute(finalData, "/talkingplacement");
        }
      }
    },
    async setInitialMissionScore() {
      return new Promise(async (a, b) => {
        let getTermAndYear = await this.getTermAndYear();

        let classMission = await this.loadClassroomMissionCurrent(
          this.data.class,
          this.data.room,
          getTermAndYear.year
        );

        if (classMission.size) {
          // NOTE มีภารกิจปัจจุบัน
          console.log(classMission.docs[0].data().currentMissionKey);
          db.collection("studentpracticelog")
            .where("schoolKey", "==", this.schoolKey)
            .where(
              "missionKey",
              "==",
              classMission.docs[0].data().currentMissionKey
            )
            .where("class", "==", this.data.class)
            .where("room", "==", this.data.room)
            // .where("term", "==", term)
            .where("year", "==", getTermAndYear.year)
            .get()
            .then(async (doc) => {
              let totalScore = 0;
              // console.log(doc.size);
              doc.forEach((element) => {
                let score = element.data().correct;

                if (element.data().practiceType == "translation") {
                  // กรณีเป็นแบบฝึกหัด Translation ให้คะแนน หาร 4
                  score = element.data().correct / 4;
                  score = Math.round(score);
                }
                totalScore += score;
              });

              let classroomScoreBalance = `${this.data.class}-${this.data.room}-${getTermAndYear.term}-${getTermAndYear.year}-${this.schoolKey}`;
              let getScore = await db
                .collection("classroomScoreBalance")
                .doc(classroomScoreBalance)
                .get();

              let getScoreBalance;
              if (getScore.exists) {
                getScoreBalance = getScore.data().scoreBalance;
              } else {
                getScoreBalance = 0;
              }

              a(totalScore + getScoreBalance);
            });
        } else {
          // NOTE ไม่มีภารกิจปัจจุบัน
          let classroomScoreBalance = `${this.data.class}-${this.data.room}-${getTermAndYear.term}-${getTermAndYear.year}-${this.schoolKey}`;

          let getScore = await db
            .collection("classroomScoreBalance")
            .doc(classroomScoreBalance)
            .get();

          let getScoreBalance;
          if (getScore.exists) {
            getScoreBalance = getScore.data().scoreBalance;
          } else {
            getScoreBalance = 0;
          }
          a(getScoreBalance);
        }
      });
    },

    syncAndRoute(finalData, destination) {
      let tk = this.$q.localStorage.getItem("tk");

      db.collection("synchronize")
        .doc(tk)
        .set(finalData)
        .then(() => {
          this.loadingHide();
          this.$router.push(destination);
        });
    },

    setStudentToOffline() {
      db.collection("student")
        .where("room", "==", this.data.room)
        .where("classRoom", "==", this.data.class)
        .where("schoolKey", "==", this.schoolKey)
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            db.collection("student")
              .doc(element.id)
              .update({ status: "waiting" });
          });
        });
    },
  },
  async mounted() {
    this.$q.localStorage.remove("startPrepost");

    this.filterClassRoom();
  },
};
</script>
