<template>
  <div class="q-pa-md" style="height:calc(100vh);overflow-y:auto;background-color:#9AE4F0;">
    <!-- <q-select
      v-model="optionSelected"
      :options="['Vocabulary','Grammar','Reading','Writing','Phonics','Listening & Speaking']"
    ></q-select>
    <div align="center">
      <q-btn
        @click="resetPractice()"
        class="bg10 color1"
        label="Reset PracticeLog && studentPracticeLog"
      ></q-btn>
    </div>-->
    <!-- 
    <div>
      <q-select :options="roomOptions" @input="getStudentData()" v-model="roomOptionSelected"></q-select>
      <q-btn label="getStudentData" @click="getStudentData()" class="bg3 color1"></q-btn>
    </div>-->

    <!-- <div v-for="(item,index) in studentArr" :key="index">
      <q-toolbar>
        <q-toolbar-title>{{ item.name }} {{ item.surname }} เลขที่ {{ item.no }}</q-toolbar-title>
        <q-btn @click="moveRoom(item.studentId)" label="ย้ายห้อง"></q-btn>
      </q-toolbar>
      <q-separator></q-separator>
    </div>

    <q-dialog v-model="isShowDialogMoveRoom">
      <q-card style="min-width:360px">
        <q-card-section align="center" class="text-h6">ย้ายไปห้อง</q-card-section>
        <q-card-section>
          <q-select :options="roomOptions" v-model="roomSelected"></q-select>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="confirmMoveRoom()" label="ย้ายห้อง"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    -->

    <!-- <q-btn @click="SearchPracticeByClass()" label="Search Practice by Class"></q-btn> -->

    <!-- <q-btn @click="testRemovePractice()" label="Test Remove Practice"></q-btn> -->

    <!-- <q-btn @click="checkStudentLearn" label="Check Student Learn Pre-Test And Post-Test" no-caps></q-btn> -->

    <!-- NOTE : Reset Practice Log -->
    <div class="row q-pa-md" style="max-width:1000px;width:100%;margin:auto;">
      <div class="col-12" align="center">
        <span class="text-h5">Reset Practice</span>
      </div>
      <div class="col-6 q-pa-md">
        <q-select
          filled
          v-model="school.key"
          use-input
          hide-selected
          fill-input
          emit-value
          map-options
          input-debounce="0"
          label="เลือกโรงเรียน"
          :options="schoolOptions"
          :rules="[val => !!val]"
          ref="schoolkey"
          @filter="filterFn"
        ></q-select>
      </div>
      <div class="col q-pa-md">
        <q-input
          label="ชั้น"
          filled
          v-model="school.class"
          :rules="[val => !!val]"
          ref="classroom"
        />
      </div>
      <div class="col q-pa-md">
        <q-input label="ห้อง" filled v-model="school.room" :rules="[val => !!val]" ref="room" />
      </div>

      <div class="col-1 self-center" style="width:70px;">
        <q-btn @click="Search()" label="ค้นหา" round class="bg-white" :loading="isSearch"></q-btn>
      </div>

      <div class="col-12 row q-mb-lg" v-show="isLoadData">
        <q-separator />

        <div class="col-12 row q-mt-lg q-mb-md">
          <div class="col-12" align="center">
            <span
              class="text-h6"
            >ข้อมูลโรงเรียน : {{ "โรงเรียน" + school.name + " " + school.class + "/" + school.room}}</span>
          </div>

          <div class="col-12 q-pa-md" align="center">
            <q-btn label="ลบข้อมูลแบบฝึกหัดทั้งหมด" @click="reset()"></q-btn>
          </div>
        </div>

        <q-separator />
      </div>

      <div class="col-12 row q-mb-md" v-show="isLoadData">
        <div class="col-12 q-py-sm" align="center">
          <span class="text-h6">รายการแบบฝึกหัด : Practice Log</span>
        </div>

        <div align="center" class="col-12" v-if="!classroomPracticeList.length">
          <span class="text-red text-subtitle1">ไม่มีข้อมูล</span>
        </div>

        <div
          class="col-6 row q-pa-sm"
          v-show="classroomPracticeList.length"
          v-for="(item,index) in classroomPracticeList"
          :key="index"
        >
          <div class="col-12 shadow-3 rounded-borders row">
            <div class="col">
              <q-item class="bg-blue-grey-7 text-white" style="border-radius:3px 0px 0px 3px;">
                <q-item-section>
                  <q-item-label class="text-subtitle1">World : {{item.skill}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Type : {{item.practiceType}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Level : {{item.level}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Unit : {{item.unit}}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-1" style="width:70px;">
              <q-btn icon="fas fa-redo-alt" flat class="fit"></q-btn>
            </div>
          </div>
        </div>
      </div>

      <q-separator />

      <div class="col-12 row q-mb-md q-mt-lg" v-show="isLoadData">
        <div class="col-12 q-py-sm" align="center">
          <span class="text-h6">รายการภารกิจ : Mission Log</span>
        </div>

        <div align="center" class="col-12" v-if="!classroomMissionList.length">
          <span class="text-red text-subtitle1">ไม่มีข้อมูล</span>
        </div>

        <div
          class="col-6 row q-pa-sm"
          v-show="classroomMissionList.length"
          v-for="(item,index) in classroomMissionList"
          :key="index"
        >
          <div class="col-12 shadow-3 rounded-borders row">
            <div class="col">
              <q-item class="bg-blue-grey-7 text-white" style="border-radius:3px 0px 0px 3px;">
                <q-item-section>
                  <q-item-label class="text-subtitle1">Mission : {{item.missionName}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Level : {{item.missionLevel}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Goal : {{item.missionGoal}}</q-item-label>
                  <q-item-label class="text-grey-5" caption>Status : {{item.status}}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-1" style="width:70px;">
              <q-btn icon="fas fa-redo-alt" flat class="fit"></q-btn>
            </div>
          </div>
        </div>
      </div>

      <q-separator />

      <q-dialog v-model="isDialogDelete" persistent>
        <q-card style="width:360px;">
          <q-card-section>
            <div class="text-h6">กระบวรการลบข้อมูลทั้งหมด</div>
            <div class="text-subtitle2">รายละเอียดข้อมูล</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row">
              <!-- Check Delete : Classroom Lesson Log -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isClassroomLessonLog" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Classroom Lesson Log</span>
              </div>

              <!-- Check Delete : Classroom Practice Log -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isClassroomPracticeLog" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Classroom Practice Log</span>
              </div>

              <!-- Check Delete : Classroom Mission -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isClassroomMission" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Classroom Mission</span>
              </div>

              <!-- Check Delete : Mission Vote -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isMissionVote" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Mission Vote</span>
              </div>

              <!-- Check Delete : Student Practice Log -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isStudentPracticeLog" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Student Practice Log</span>
              </div>

              <!-- Check Delete : Student Set CurrentExp = 0 -->
              <div class="col-12 q-pa-sm">
                <span v-if="!isStudentCurrentExp" class="q-pa-sm">
                  <q-spinner-ios color="primary" size="25px" />
                </span>
                <span v-else class="q-pa-sm">
                  <q-icon name="fas fa-check" size="25px" class="text-green"></q-icon>
                </span>
                &nbsp;
                <span>Set All Student CurrentExp = 0</span>
              </div>
            </div>
          </q-card-section>

          <q-card-section
            class="no-padding"
            v-show="isClassroomLessonLog && isClassroomMission && isClassroomPracticeLog && isMissionVote && isStudentPracticeLog && isStudentCurrentExp"
          >
            <div align="center" class="q-pb-md">
              <q-btn label="Finish" @click="clearDeleteLog()"></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- NOTE : Reset Practice Log -->
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      optionSelected: "Vocabulary",
      studentArr: "",
      isShowDialogMoveRoom: false,
      roomOptions: [1, 2, 3],
      roomSelected: "",
      roomOptionSelected: "",
      studentIdClicked: "",
      schoolId: "k6XigIP0EXp7H1xS2dss",
      schoolKey: "",
      school: {
        name: "",
        key: "",
        class: "",
        room: "1",
      },
      // 1gqagZI0ygOzo2LspNCM
      schoolList: [],
      missionList: [],
      schoolOptions: [],
      classroomPracticeList: [],
      classroomMissionList: [],
      isLoadData: false,
      isSearch: false,

      snapClassroomPractice: "",
      snapClassroomMission: "",

      isDialogDelete: false,
      isClassroomPracticeLog: false,
      isStudentPracticeLog: false,
      isClassroomLessonLog: false,
      isClassroomMission: false,
      isMissionVote: false,
      isStudentCurrentExp: false,
    };
  },
  methods: {
    filterFn(val, update) {
      update(() => {
        this.isLoadData = false;

        if (typeof this.snapClassroomPractice == "function") {
          this.snapClassroomPractice();
        }

        if (typeof this.snapClassroomMission == "function") {
          this.snapClassroomMission();
        }

        if (val) {
          this.schoolOptions = this.schoolList.filter(
            (x) => x.label.indexOf(val) > -1
          );
        } else {
          this.schoolOptions = this.schoolList;
        }
      });
    },
    async Search() {
      this.$refs.schoolkey.validate();
      this.$refs.classroom.validate();
      this.$refs.room.validate();

      if (
        this.$refs.schoolkey.hasError ||
        this.$refs.classroom.hasError ||
        this.$refs.room.hasError
      ) {
        return;
      }

      let getTermAndYear = await this.getTermAndYear();

      this.isSearch = true;

      this.isLoadData = true;
      this.classroomPracticeList = [];
      this.classroomMissionList = [];

      let splitName;

      splitName = this.schoolList
        .filter((x) => x.value == this.school.key)[0]
        .label.split("-");

      this.school.name = splitName[1];

      let getData = await db.collection("mission").get();

      let tempMission = [];
      getData.forEach((result) => {
        let newData = {
          id: result.id,
          ...result.data(),
        };

        tempMission.push(newData);
      });

      this.missionList = tempMission;

      this.snapClassroomPractice = db
        .collection("classroomPracticeLog")
        .where("schoolKey", "==", this.school.key)
        .where("class", "==", this.school.class)
        .where("room", "==", this.school.room)
        .where("term", "==", getTermAndYear.term)
        .where("year", "==", getTermAndYear.year)
        .onSnapshot((doc) => {
          let temp = [];

          if (doc.size) {
            doc.forEach((result) => {
              let newData = {
                id: result.id,
                ...result.data(),
              };

              temp.push(newData);
            });

            temp.sort((a, b) => {
              return a.skill < b.skill ? 1 : -1;
            });
          }

          this.classroomPracticeList = temp;

          this.isSearch = false;
        });

      this.snapClassroomMission = db
        .collection("classroomMission")
        .where("schoolKey", "==", this.school.key)
        .where("class", "==", this.school.class)
        .where("room", "==", this.school.room)
        .where("term", "==", getTermAndYear.term)
        .where("year", "==", getTermAndYear.year)
        .onSnapshot((doc) => {
          let temp = [];

          if (doc.size) {
            doc.forEach((result) => {
              let mission = tempMission.filter(
                (x) => x.id == result.data().currentMissionKey
              )[0];

              let newData = {
                id: result.id,
                missionName: mission.name,
                missionLevel: mission.level,
                missionGoal: mission.goal,
                ...result.data(),
              };

              temp.push(newData);
            });

            temp.sort((a, b) => {
              return Number(a.unit) - Number(b.unit);
            });
          }

          this.classroomMissionList = temp;

          this.isSearch = false;
        });
    },
    reset() {
      this.$q
        .dialog({
          title: "ลบข้อมูล",
          message: "ยืนยันการลบข้อมูล",
          ok: "ตกลง",
          cancel: "ยกเลิก",
        })
        .onOk(async () => {
          console.clear();
          this.isDialogDelete = true;

          let getTermAndYear = await this.getTermAndYear();

          let getData;

          console.log("GET : Classroom Lesson Log");

          // GET Classroom Lesson Log
          getData = await db
            .collection("classroomLessonLog")
            .where("schoolKey", "==", this.school.key)
            .where("class", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // DELETE Classroom Lesson Log
              await db.collection("classroomLessonLog").doc(result.id).delete();
            });

            this.isClassroomLessonLog = true;

            console.log("Active : Delete Complete");
          } else {
            this.isClassroomLessonLog = true;

            console.log("Active : NO DATA");
          }

          console.log(" ");

          console.log("----- GET Classroom Practice Log -----");

          // GET Classroom Practice Log
          getData = await db
            .collection("classroomPracticeLog")
            .where("schoolKey", "==", this.school.key)
            .where("class", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // DELETE Classroom Practice Log
              await db
                .collection("classroomPracticeLog")
                .doc(result.id)
                .delete();
            });

            this.isClassroomPracticeLog = true;

            console.log("Active : Delete Complete");
          } else {
            this.isClassroomPracticeLog = true;

            console.log("Active : NO DATA");
          }

          console.log(" ");

          console.log("----- GET Classroom Mission -----");

          // GET Classroom Mission
          getData = await db
            .collection("classroomMission")
            .where("schoolKey", "==", this.school.key)
            .where("class", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // DELETE Classroom Mission
              await db.collection("classroomMission").doc(result.id).delete();
            });

            this.isClassroomMission = true;

            console.log("Active : Delete Complete");
          } else {
            this.isClassroomMission = true;

            console.log("Active : NO DATA");
          }

          console.log(" ");

          console.log("----- GET Mission Vote -----");

          // GET Mission Vote
          getData = await db
            .collection("missionvote")
            .where("schoolKey", "==", this.school.key)
            .where("class", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // DELETE Mission Vote
              await db.collection("missionvote").doc(result.id).delete();
            });

            this.isMissionVote = true;

            console.log("Active : Delete Complete");
          } else {
            this.isMissionVote = true;

            console.log("Active : NO DATA");
          }

          console.log(" ");

          console.log("----- GET Student Practice log -----");

          // GET Student Practice log
          getData = await db
            .collection("studentpracticelog")
            .where("schoolKey", "==", this.school.key)
            .where("class", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // DELETE Student Practice log
              await db.collection("studentpracticelog").doc(result.id).delete();
            });

            this.isStudentPracticeLog = true;

            console.log("Active : Delete Complete");
          } else {
            this.isStudentPracticeLog = true;

            console.log("Active : NO DATA");
          }

          console.log(" ");

          console.log("----- GET All Student Reset Current Exp -----");

          // GET Student
          getData = await db
            .collection("student")
            .where("schoolKey", "==", this.school.key)
            .where("classRoom", "==", this.school.class)
            .where("room", "==", this.school.room)
            .where("term", "==", getTermAndYear.term)
            .where("year", "==", getTermAndYear.year)
            .get();

          console.log("Totle Data : " + getData.size);

          if (getData.size) {
            getData.forEach(async (result) => {
              // UPDATE All Student Current Exp = 0
              await db
                .collection("student")
                .doc(result.id)
                .update({ currentExp: 0 });
            });

            this.isStudentCurrentExp = true;

            console.log("Active : Update Complete");
          } else {
            this.isStudentCurrentExp = true;

            console.log("Active : NO DATA");
          }
        })
        .onCancel(() => {
          console.log("ยกเลิก");
        });

      return;
    },
    clearDeleteLog() {
      this.isClassroomLessonLog = false;
      this.isClassroomMission = false;
      this.isClassroomPracticeLog = false;
      this.isMissionVote = false;
      this.isStudentPracticeLog = false;
      this.isStudentCurrentExp = false;

      this.isDialogDelete = false;
    },
    loadSchool() {
      this.loadingShow();

      db.collection("school")
        .get()
        .then((doc) => {
          let temp = [];
          doc.forEach((result) => {
            let newData = {
              value: result.id,
              label: result.data().schoolCode + "-" + result.data().name,
              indexCode: result.data().schoolCode,
            };

            temp.push(newData);
          });

          temp.sort((a, b) => Number(a.indexCode) - Number(b.indexCode));

          this.schoolList = temp;
          this.loadingHide();
        });
    },
    checkStudentLearn() {
      let collection = "missionvote";

      let schoolKey = "2T0aJKqdfuOqsrjGFIr3";

      let classRoom = "ม.1";
      let room = "1";

      db.collection(collection)
        .where("schoolKey", "==", schoolKey)
        .where("class", "==", classRoom)
        .where("room", "==", room)
        .where("term", "==", "1")
        .where("year", "==", "2563")
        .onSnapshot((doc) => {
          console.clear();
          console.log(doc.size);
        });
    },
    testRemovePractice() {
      console.clear();
      let collection = "classroomMission";

      let schoolKey = "rUBZYrq2Ba1jjBBv7SSj";

      let classRoom = "ป.5";
      let room = "3";

      db.collection(collection)
        .where("schoolKey", "==", schoolKey)
        .where("class", "==", classRoom)
        .where("room", "==", room)
        .where("term", "==", "1")
        .where("year", "==", "2563")
        // .where("skill", "==", "Vocabulary")
        .get()
        .then((doc) => {
          let summit = false;
          for (const result of doc.docs) {
            console.log("--------- Practice ---------");
            console.log("World : " + result.data().skill);
            console.log("Type : " + result.data().practiceType);
            console.log("Practice id : " + result.data().practiceKey);
            console.log("Key : " + result.id);
            console.log("Data : ");
            console.log(result.data());

            // db.collection(collection)
            //   .doc(result.id)
            //   .delete();
          }
        });
    },
    SearchPracticeByClass() {
      console.clear();
      let collection = "classroomLessonLog";

      let schoolKey = "1RPHlxpOmS7UqCP8dKDn";
      let classRoom = "ม.2";
      let room = "1";

      db.collection(collection)
        .where("schoolKey", "==", schoolKey)
        .where("class", "==", classRoom)
        .where("room", "==", room)
        .where("term", "==", "1")
        .where("year", "==", "2563")
        .get()
        .then((doc) => {
          if (doc.size) {
            doc.forEach((result) => {
              console.log("--------- Practice ---------");
              console.log("World : " + result.data().skill);
              console.log("Type : " + result.data().practiceType);
              console.log("Key : " + result.id);
              console.log("Data : ");
              console.log(result.data());
            });
          } else {
            console.log(doc.size);
          }
        });
    },
    confirmMoveRoom() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to do this process?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          // console.log('>>>> OK')

          let classSelected = this.roomSelected.slice(0, 3);
          let roomSelected = this.roomSelected.slice(4);
          // เปลี่ยนเลขที่
          db.collection("student").doc(this.studentIdClicked).update({
            classRoom: classSelected,
            room: roomSelected,
          });

          // MOVE STUDENT PRACTICE LOG
          db.collection("studentpracticelog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                db.collection("studentpracticelog").doc(element.id).update({
                  class: classSelected,
                  room: roomSelected,
                });
              });
            });
          // MOVE STUDENT PLACEMENT LOG
          db.collection("studentplacementlog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                db.collection("studentplacementlog").doc(element.id).update({
                  class: classSelected,
                  room: roomSelected,
                });
              });
            });

          // MOVE STUDENT PREPOST LOG
          db.collection("studentprepostlog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                db.collection("studentprepostlog").doc(element.id).update({
                  class: classSelected,
                  room: roomSelected,
                });
              });
            });

          // MOVE STUDENT PREPOST LOG
          db.collection("missionvote")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then((doc) => {
              doc.forEach((element) => {
                db.collection("missionvote").doc(element.id).update({
                  class: classSelected,
                  room: roomSelected,
                });
              });
            });

          this.isShowDialogMoveRoom = false;
        });
    },
    moveRoom(id) {
      this.isShowDialogMoveRoom = true;
      this.roomSelected = this.roomOptions[0];
      this.studentIdClicked = id;
    },
    loadRoomOptions() {
      db.collection("student")
        .where("schoolKey", "==", this.schoolId)
        .get()
        .then((doc) => {
          let roomTemp = [];
          doc.forEach((element) => {
            roomTemp.push(element.data().classRoom + "/" + element.data().room);
          });
          let newRoom = [...new Set(roomTemp)];
          newRoom.sort((a, b) => (a > b ? 1 : -1));
          this.roomOptions = newRoom;
          this.roomOptionSelected = newRoom[0];
          this.roomSelected = newRoom[0];
          this.getStudentData();
        });
    },
    async getStudentData() {
      // let roomOptions = await this.loadRoomOptions();
      // this.roomOptions = roomOptions;

      let classSelected = this.roomOptionSelected.slice(0, 3);
      let roomSelected = this.roomOptionSelected.slice(4);
      db.collection("student")
        .where("schoolKey", "==", this.schoolId)
        .where("classRoom", "==", classSelected)
        .where("room", "==", roomSelected)
        .onSnapshot((doc) => {
          let temp = [];
          doc.forEach((element) => {
            temp.push({ ...element.data(), studentId: element.id });
          });
          temp.sort((a, b) => Number(a.no) - Number(b.no));
          this.studentArr = temp;
        });
    },
    getClassroomPracticeLog() {
      // db.collection("classroomPracticeLog")
      //   .where("class", "==", "ม.1")
      //   .where("room", "==", "3")
      //   .where("schoolKey", "==", "LWvFPI4VusMpdnikxLD8")
      //   .where("practiceType", "==", "translation")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       console.log(element.id);
      //       console.log(element.data());
      //     });
      //   });
    },
    move() {
      let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // this.transferData("classroomLessonLog");
      // this.transferData("classroomMission");
      // this.transferClassroomPracticeLog();
      // this.transferData("missionvote");
      // this.transferData("studentpracticelog")

      // db.collection("studentpracticelog")
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     console.log(doc.size);
      //     doc.forEach(element => {
      //       let filter = element.data().filter;
      //       filter = filter.replace("ป.6", "ม.1");
      //       db.collection("studentpracticelog")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1",
      //           filter: filter
      //         })
      //         .then(() => {
      //           console.log("UPDATE classroom practicelog");
      //         });
      //     });
      //   });

      // db.collection("studentpracticelog")
      //   .where("studentKey", "==", "FLGsgypwBRLhS2Ccz86m")
      //   .get()
      //   .then(doc => {
      //     let practiceKey = [];
      //     doc.forEach(element => {
      //       practiceKey.push(element.data().practiceKey);
      //     });

      //     let noDup = [...new Set(practiceKey)];

      //     console.log(practiceKey);

      //     console.log(noDup);

      //     // console.log(practiceKey.filter(x => !noDup.includes(x)));
      //   });
    },
    transferClassroomPracticeLog() {
      // let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // db.collection("classroomPracticeLog")
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       let filter = element.data().filter;
      //       filter = filter.replace("ป.6", "ม.1");
      //       db.collection("classroomPracticeLog")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1",
      //           filter: filter
      //         })
      //         .then(() => {
      //           console.log("UPDATE classroom practicelog");
      //         });
      //     });
      //   });

      // db.collection("placementMark")
      //   .where("class", "==", "ป.6")
      //   .where("schoolKey", "==", schoolKey)
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       db.collection("placementMark")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1"
      //         })
      //         .then(() => {
      //           console.log("UPDATE placementMark");
      //         });
      //     });
      //   });

      db.collection("studentpracticelog");
      // .where("schoolKey", "==", schoolKey)
      // .where("class", "==", "ป.6")
      // .where("room", "==", "1")
      // .get()
      // .then(doc => {
      //   doc.forEach(element => {
      //     let filter = element.data().filter;
      //     filter = filter.replace("ป.6", "ม.1");
      //     db.collection("classroomPracticeLog")
      //       .doc(element.id)
      //       .update({
      //         class: "ม.1",
      //         filter: filter
      //       })
      //       .then(() => {
      //         console.log("UPDATE classroom practicelog");
      //       });
      //   });
      // });
    },

    transferData(collection) {
      // let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // db.collection(collection)
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       db.collection(collection)
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1"
      //         })
      //         .then(() => {
      //           console.log(collection, "updated");
      //         });
      //     });
      //   });
    },
    resetPractice() {
      //     this.$q
      //       .dialog({
      //         message: "ยืนยัน",
      //         cancel: "ยกเลิก",
      //         ok: "ตกลง"
      //       })
      //       .onOk(() => {
      //         console.log("YES");
      //         db.collection("classroomPracticeLog")
      //           .where("skill", "==", this.optionSelected)
      //           .where("schoolKey", "==", this.teacherData.schoolKey)
      //           .get()
      //           .then(doc => {
      //             console.log("classroompracticelog", doc.size);
      //             let counterDelete = 0;
      //             doc.forEach(element => {
      //               db.collection("classroomPracticeLog")
      //                 .doc(element.id)
      //                 .delete()
      //                 .then(() => {
      //                   console.log("DELETING classroomPracticeLog");
      //                   counterDelete++;
      //                 });
      //             });
      //           });
      //         db.collection("studentpracticelog")
      //           .where("skill", "==", this.optionSelected)
      //           .where("schoolKey", "==", this.teacherData.schoolKey)
      //           .get()
      //           .then(doc => {
      //             console.log("studentpracticelogSize", doc.size);
      //             doc.forEach(element => {
      //               db.collection("studentpracticelog")
      //                 .doc(element.id)
      //                 .delete()
      //                 .then(() => {
      //                   console.log("DELETING student practice log");
      //                 });
      //             });
      //           });
      //       });
    },
  },
  mounted() {
    this.loadSchool();
    // this.loadRoomOptions();
    // db.collection("studentpracticelog")
    //   .where("schoolKey", "==", "PCqo2TqcEFMOcfkHnCEk")
    //   .where("missionKey", "==", "zKV9miN6uHXKnU5L4V2u")
    //   .get()
    //   .then(doc => {
    //     // let test = [];
    //     doc.forEach(element => {
    //       console.log(element.data().correct);
    //       // test.push(element.data().missionKey);
    //     });
    //     // test.sort((a, b) => (a > b ? 1 : -1));
    //     // console.log(test);
    //   });
  },
  beforeDestroy() {
    if (typeof this.snapClassroomPractice == "function") {
      this.snapClassroomPractice();
    }

    if (typeof this.snapClassroomMission == "function") {
      this.snapClassroomMission();
    }
  },
};
</script>

<style lang="scss" scoped></style>
