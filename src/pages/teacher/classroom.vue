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
    dialogCheckLogin
  },
  data() {
    return {
      data: {
        class: "",
        room: ""
      },
      classOptions: [],
      roomOptions: [],
      classroom: [],
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      schoolData: this.decrypt(this.$q.localStorage.getItem("schoolData"), 1),

      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      isDialogPopup: false,
      isCheckData: false
    };
  },

  methods: {
    async closePopupFunction(val) {
      this.loadingShow();

      let dateAndTime = await this.getDateAndTime();
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
      let year = this.getAcademicYear();

      if (!val.reFunction) {
        this.isDialogPopup = false;
        this.isCheckData = false;
        this.loadingHide();
      } else {
        let checkSync = await db
          .collection("synchronize")
          .where("room", "==", this.data.room)
          .where("class", "==", this.data.class)
          .where("term", "==", term)
          .where("year", "==", year)
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .get();

        checkSync.forEach(element => {
          db.collection("synchronize")
            .doc(element.id)
            .delete()
            .then(() => {
              if (this.teacherData.key != element.id) {
                db.collection("teacher")
                  .doc(element.id)
                  .update({
                    status: "offline"
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
        icon: ""
      };
    },
    changeRoom() {
      let roomTotal = [];
      let studentData = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let studentRoomTotal = studentData
        .filter(x => {
          return x.classRoom == this.data.class;
        })
        .map(e => {
          return e.room;
        });

      studentRoomTotal = [...new Set(studentRoomTotal)];
      studentRoomTotal.forEach((element, index) => {
        let data = {
          label: element,
          value: element
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
      loadPracticelist.forEach(element => {
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

      let practiceTempEncrypt = this.encrypt(practiceTemp, 1);

      this.$q.localStorage.set("practiceList", practiceTempEncrypt);
    },

    async startAndRoute() {
      // await this.loadScoreMission();
      let dateAndTime = await this.getDateAndTime();
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
      let year = this.getAcademicYear();

      let level = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      ).filter(x => {
        return x.classRoom == this.data.class && x.room == this.data.room;
      });

      let copyLevel = level;

      level = level.sort((a, b) => {
        return b.level - a.level;
      });
      level = level[0].level;
      level = level.toString();

      // เซ็ทเลเวล เข้าสู่ LocalStorage
      let levelEncrypt = this.encrypt(level, 2);
      this.$q.localStorage.set("currentLevel", levelEncrypt);
      //*************Set all practicelist in level to local storage******************* */
      await this.getPracticeList(level);

      let missionScore = await this.setInitialMissionScore();

      // SET INITIAL VARIABLE
      let finalData = {
        ...this.data,
        studyplanType: "auto",
        date: dateAndTime,
        currentPage: "main",
        schoolKey: this.teacherData.schoolKey,
        status: "online",
        term: this.studentData.term,
        year: this.studentData.year,
        currentDate: dateAndTime.date,
        totalStudent: copyLevel.length,
        missionScore: missionScore
      };

      // set จำนวนนักเรียนทั้งหมดเข้าสู่ LocalStorage
      this.setTotalStudent();
      // Update นักเรียนภายในระดับชั้นนี้ ห้องนี้ให้เป็น Offline ทั้งหมด
      if (
        this.data.class !=
          this.decrypt(this.$q.localStorage.getItem("currentClass"), 2) &&
        this.data.room !=
          this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
      ) {
        this.setStudentToOffline();
      }
      // Set ห้องปัจจับัน / ชั้นปัจจุบัน

      let currentRoomEncrypt = this.encrypt(this.data.room, 2);
      this.$q.localStorage.set("currentRoom", currentRoomEncrypt);
      let currentClassEncrypt = this.encrypt(this.data.class, 2);
      this.$q.localStorage.set("currentClass", currentClassEncrypt);

      // โหลดข้อมูลโรงเรียน
      let schoolData = await db
        .collection("school")
        .doc(this.teacherData.schoolKey)
        .get();
      schoolData = schoolData.data();

      // สถานะการเรียน / pretest / posttest / study
      let prePostStatus = schoolData.prePostStatus;

      // ตรวจสอบว่า ระดับชั้นนี้ได้ถูก มาร์คว่าทำ Placementแล้วหรือยัง
      let checkPlacementMark = await db
        .collection("placementMark")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("class", "==", this.data.class)
        .where("isPlacement", "==", true)
        .get();

      if (
        prePostStatus == "pretest" ||
        prePostStatus == "posttest" ||
        schoolData.placement
      ) {
        // โหดข้อมูล schooltestlog ต่อเมื่อ มีการเปิด pretest หรือ posttest เท่านั้น
        var checkTestStatus = await db
          .collection("schooltestlog")
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("class", "==", this.data.class)
          .where("room", "==", this.data.room)
          .where("term", "==", term)
          .where("year", "==", year)
          .where("status", "==", true)
          .get();
        var schoolTestData = [];
        checkTestStatus.forEach(element => {
          schoolTestData.push(element.data());
        });
      }

      if (checkPlacementMark.size) {
        //  กรณีถูกมาร์คว่า ระดับชั้นนี้ได้ทำ Placement Test ไปแล้ว
        console.log("มี Level ของ Placement Test แล้ว");
        if (prePostStatus == "pretest") {
          // กรณี โรงเรียนเปิดระบบ Pretest
          console.log("โรงเรียนเปิด Pretest");
          let checkPretestStatus = schoolTestData.filter(e => {
            return e.testtype == "pretest";
          });
          if (checkPretestStatus.length > 0) {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ได้ทำการ Pretest ไปแล้ว ไปหน้าหลัก
            console.log("ทำ Pretest แล้ว ไปหน้าหลัก");
            this.syncAndRoute(finalData, "/teacher/main");
          } else {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ยังไม่ได้ทำการ Pretest
            console.log("ยังไม่ทำ Pretest ไป pretest");
            finalData.currentPage = "prepare-pretest";
            this.$q.localStorage.set("prepostType", "pretest");
            this.syncAndRoute(finalData, "/teacher/prepost");
          }
        } else if (prePostStatus == "posttest") {
          // กรณีโรงเรียนเปิดระบบ Posttest
          console.log("โรงเรียนเปิด posttest");
          let checkPosttestStatus = schoolTestData.filter(e => {
            return e.testtype == "posttest";
          });
          if (checkPosttestStatus.length > 0) {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ได้ทำการ Posttest ไปแล้ว
            console.log("ทำ Posttest แล้วไปหน้าหลัก");
            this.syncAndRoute(finalData, "/teacher/main");
          } else {
            // กรณีห้องเรียนนี้ ระดับชั้นนี้ ยังไม่ได้ทำการ Posttest
            console.log("ยังไม่ทำ Posttestไป posttest");
            finalData.currentPage = "prepare-posttest";
            this.$q.localStorage.set("prepostType", "posttest");
            this.syncAndRoute(finalData, "/teacher/prepost");
          }
        } else {
          // กรณีเป็นโหมดเรียนปกติ
          console.log("เรียนปกติ");
          this.syncAndRoute(finalData, "/teacher/main");
        }
      } else {
        // กรณียังไม่ได้ถูกมาร์คว่า ทำ Placement Test
        console.log("ยังไม่มี Level ของ Placement Test");
        if (schoolData.placement) {
          // กรณีเปิด Placement Test
          console.log("เปิด Placement Test");
          let checkPlacementStatus = schoolTestData.filter(e => {
            return e.testtype == "placement";
          });
          if (checkPlacementStatus.length > 0) {
            // กรณีระดับชั้นนี้ ห้องนี้ ได้ทำ Placement test ไปแล้ว
            finalData.currentPage = "talkingplacement";
            console.log("ระดับชั้นนี้ ห้องนี้ได้ทำ Placement Test แล้ว");
            this.syncAndRoute(finalData, "/talkingplacement");
          } else {
            // กรณีระดับชั้นนี้ ห้องนี้ยังไม่ได้ทำ Placement test
            console.log("ระดับชั้นนี้ ห้องนี้ยังไม่ได้ทำ Placement Test");
            finalData.currentPage = "prepare-placement";
            this.syncAndRoute(finalData, "/teacher/placement");
          }
        } else {
          // กรณีไม่เปิด Placement Test
          console.log("โรงเรียนไม่เปิดระบบ placement");
          finalData.currentPage = "talkingplacement";
          this.syncAndRoute(finalData, "/talkingplacement");
        }
      }
    },
    async setInitialMissionScore() {
      return new Promise(async (a, b) => {
        let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
        let year = this.getAcademicYear();

        let classMission = await db
          .collection("classroomMission")
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("class", "==", this.data.class)
          .where("room", "==", this.data.room)
          // .where("term", "==", term)
          .where("year", "==", year)
          .where("status", "==", "current")
          .get();
        if (classMission.size) {
          // NOTE มีภารกิจปัจจุบัน
          // console.log(classMission.docs[0].data().currentMissionKey);
          db.collection("studentpracticelog")
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .where(
              "missionKey",
              "==",
              classMission.docs[0].data().currentMissionKey
            )
            .where("class", "==", this.data.class)
            .where("room", "==", this.data.room)
            // .where("term", "==", term)
            .where("year", "==", year)
            .get()
            .then(async doc => {
              let totalScore = 0;
              console.log(doc.size);
              doc.forEach(element => {
                let score = element.data().correct;

                if (element.data().practiceType == "translation") {
                  // กรณีเป็นแบบฝึกหัด Translation ให้คะแนน หาร 4
                  score = element.data().correct / 4;
                  score = Math.round(score);
                }
                totalScore += score;
              });
              let classroomScoreBalance = `${this.data.class}-${this.data.room}-${term}-${year}-${this.teacherData.schoolKey}`;
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
          let classroomScoreBalance = `${this.data.class}-${this.data.room}-${term}-${year}-${this.teacherData.schoolKey}`;
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
    async startLearn() {
      this.loadingShow();
      let dateAndTime = await this.getDateAndTime();
      let term = this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2);
      let year = this.getAcademicYear();

      this.$q.localStorage.set("selectClassRoom", true);

      if (
        this.data.class ==
          this.decrypt(this.$q.localStorage.getItem("currentClass"), 2) &&
        this.data.room ==
          this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
      ) {
        // กรณีเลือกซ้ำห้องเดิม
        this.startAndRoute();
      } else {
        let checkSync = await db
          .collection("synchronize")
          .where("currentDate", "==", dateAndTime.date)
          .where("room", "==", this.data.room)
          .where("class", "==", this.data.class)
          .where("term", "==", term)
          .where("year", "==", year)
          .where("schoolKey", "==", this.teacherData.schoolKey)
          .where("status", "==", "online")
          .get();

        if (checkSync.size) {
          // กรณีมีคนสอนห้องเดียวกันซ็ำ ภายในวันเดียวกัน
          let countCheck = 0;

          this.isCheckData = true;
          this.isDialogPopup = true;

          this.sendDataDialog.type = "teacherHasInClassroom";
          this.sendDataDialog.title =
            "มีการใช้งานห้อง " +
            checkSync.docs[0].data().class +
            "/" +
            checkSync.docs[0].data().room +
            " อยู่";
          this.sendDataDialog.btn1 = "เข้าใช้งาน";
          this.sendDataDialog.btn2 = "ยกเลิก";
          this.sendDataDialog.icon = "fas fa-desktop";

          this.loadingHide();
        } else {
          this.startAndRoute();
        }
      }
    },
    syncAndRoute(finalData, destination) {
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .set(finalData)
        .then(() => {
          this.loadingHide();
          this.$router.push(destination);
        });
    },
    setTotalStudent() {
      let totalStudent = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      ).filter(x => {
        return x.classRoom == this.data.class && x.room == this.data.room;
      }).length;

      let totalStudentEncrypt = this.encrypt(totalStudent, 2);

      this.$q.localStorage.set("totalStudent", totalStudentEncrypt);
    },
    setStudentToOffline() {
      db.collection("student")
        .where("room", "==", this.data.room)
        .where("classRoom", "==", this.data.class)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          doc.forEach(element => {
            db.collection("student")
              .doc(element.id)
              .update({ status: "waiting" });
          });
        });
    },
    filterClassRoom() {
      let studentData = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let roomTotal = [];
      let studentRoom = studentData.map(x => {
        return x.classRoom;
      });
      let studentRoomObj = [];
      studentRoom = [...new Set(studentRoom)];

      studentRoom.forEach((element, index) => {
        let splitClass = element.split(".");
        let indexadd =
          splitClass[0] == "ป"
            ? splitClass[1]
            : splitClass[0] == "ม"
            ? Number(splitClass[1]) + 6
            : null;
        let dataStudentRoom = {
          label: element,
          value: element,
          indexAdd: indexadd
        };
        studentRoomObj.push(dataStudentRoom);
      });

      studentRoomObj.sort((a, b) => {
        return a.indexAdd - b.indexAdd;
      });
      this.classroom = studentRoomObj;

      this.data.class = this.$q.localStorage.has("currentClass")
        ? this.decrypt(this.$q.localStorage.getItem("currentClass"), 2)
        : this.classroom[0].value;

      let studentRoomTotal = studentData
        .filter(x => {
          return x.classRoom == this.data.class;
        })
        .map(e => {
          return e.room;
        });

      studentRoomTotal = [...new Set(studentRoomTotal)];

      studentRoomTotal.forEach((element, index) => {
        let data = {
          label: element,
          value: element
        };
        roomTotal.push(data);
        roomTotal.sort((a, b) => {
          return Number(a.value) - Number(b.value);
        });
      });

      this.roomOptions = roomTotal;

      this.data.room = this.$q.localStorage.has("currentRoom")
        ? this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
        : this.roomOptions[0].value;

      // Set Option ของการเลือกระดับชั้น เข้า LocalStorage
      let classroomEncrypt = this.encrypt(this.classroom, 1);
      this.$q.localStorage.set("classOptions", classroomEncrypt);
      // Set Option ของการเลือกห้อง เข้า LocalStorage

      this.$q.localStorage.set("roomOptions", this.roomOptions);
    }
  },
  beforeMount() {
    this.$q.localStorage.remove("startPrepost");
    this.filterClassRoom();
  }
};
</script>
