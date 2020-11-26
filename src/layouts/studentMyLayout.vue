<template>
  <q-layout view="lHh Lpr lFf" class="animated fadeIn">
    <q-resize-observer @resize="onResize" />

    <!-- TODO : เมนูบาร์ -->
    <q-header class="z-top orientation-landscape" id="headerBar" v-if="innerWidth > 949">
      <q-toolbar class="bg3 no-padding">
        <div class style="width:400px;"></div>
        <q-space />
        <div
          v-if="
            $route.name != 's-placement' &&
              $route.name != 's-prepost' &&
              $route.name != 's-questionnair' &&
              isMissionStart
          "
          align="center"
          class="col text-overflow q-px-xs"
          style="max-width:320px;"
        >
          <div class="bg5 q-px-md br-a-lg q-py-xs">
            <span class="text-h6 text-bold color3">
              เป้าหมาย :
              <span align="center">
                <span
                  :class="
                    missionScore >= missionCurrent.finishScore
                      ? 'color10'
                      : null
                  "
                >{{ missionScore }}</span>
                /
                <span>{{ missionCurrent.finishScore }}</span>
              </span>
              เหรียญ
            </span>
          </div>
        </div>
        <q-space />
        <div align="right" class="q-py-xs" style="width:250px;">
          <q-btn
            size="20px"
            dense
            label="โหลดใหม่"
            class="q-px-md bg1 color3 rounded q-mr-xl"
            @click="refresh()"
            push
          />
          <q-btn
            size="20px"
            flat
            icon="fas fa-sign-out-alt"
            class="q-mr-xs"
            @click="isShow = true"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- TODO : เมนูบาร์ สถานะเลเวลนักเรียน -->
    <div
      class="row fixed-top-left z-top animated fadeInLeft orientation-landscape"
      id="userBar"
      v-if="
        $route.name != 's-placement' &&
          $route.name != 's-questionnair' &&
          innerWidth > 949
      "
    >
      <div class="row bg4 border3-lg br-br-md shadow-2">
        <div
          class="q-py-md q-px-lg col-12 relative-position"
          align="center"
          style="width:80px;height:90px;overflow:hidden;"
        >
          <q-spinner-oval
            color="deep-orange-10"
            size="4em"
            v-if="!isLoadData"
            class="absolute-center"
          />
          <q-img
            v-if="isLoadData && studentData.currentLevel < 27"
            :src="'../statics/main/Level' + studentData.currentLevel + '.png'"
            style="width:50px;"
            class="absolute-center"
          />
          <q-img
            v-if="isLoadData && studentData.currentLevel >= 27"
            :src="'../statics/main/Level27.png'"
            style="width:50px;"
            class="absolute-center"
          />
        </div>
      </div>
      <div class="row bg5 br-br-sm shadow-4" style="width:300px;height:fit-content;">
        <div class="col-12" align="center">
          <div class="row">
            <div class="col-4 relative-position" :class="{ 'self-center': !isLoadData }">
              <div class="bar-exp-top relative-position">
                <q-spinner-oval
                  color="deep-orange-10"
                  style="z-index:15;"
                  class="q-mt-sm"
                  v-if="!isLoadData"
                />
                <div class="row color1" v-if="isLoadData">
                  <div class="col-12" style="font-size:20px;" align="left">
                    <span>LEVEL</span>
                  </div>
                  <div class="col-12 border1-sm"></div>
                </div>
              </div>
              <div class="bar-exp-bottom color1 relative-position" style="z-index:10;">
                <div
                  class="absolute-bottom row full-width"
                  align="center"
                  style="bottom:3px;"
                  v-if="isLoadData"
                >
                  <div class="col self-center">
                    <q-icon size="30px" name="fas fa-angle-double-right"></q-icon>
                  </div>
                  <div class="col" align="left">
                    <span class="text-h4 text-bold">
                      {{
                      studentData.currentLevel >= 9
                      ? studentData.currentLevel
                      : "0" + studentData.currentLevel
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col"></div>
            <div class="col-7 relative-position" style="width:190px;">
              <div align="center" class="name-student q-px-sm text-h6" style="padding-top:13px;">
                <span class>
                  {{
                  studentData.name + " " + studentData.surname
                  }}
                </span>
              </div>
              <div class="absolute-bottom-right" style="width:210px;">
                <div style="left:-15px;z-index:5;">
                  <q-linear-progress
                    track-color="white"
                    stripe
                    style="height: 10px"
                    :value="studentData.progress"
                  />
                </div>
                <div class="bg6 q-pr-xs br-br-sm" style="font-size:12px;" align="right">
                  XP
                  {{ studentData.expOld + "/" + studentData.exp }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TODO : Dialog Logout -->
    <app-dialog-logout
      @confirmDialog="logOut"
      @cancleDialog="isShow = false"
      :isShow="isShow"
      content="นักเรียนต้องการออกจากระบบใช่หรือไม่"
      header="ออกจากระบบ"
      cancle="true"
    ></app-dialog-logout>

    <!-- TODO : Q Page Container -->
    <q-page-container>
      <router-view class="orientation-landscape" v-if="innerWidth > 949" />
      <not-mobile class="orientation-landscape" v-else />
      <not-landscape class="z-top orientation-portrait" />
    </q-page-container>

    <dialog-check-login
      v-if="isDialogPopup"
      :propsData="sendDataDialog"
      @dataclose="val => closePopupFunction(val)"
    ></dialog-check-login>
  </q-layout>
</template>

<script>
import notLandscape from "../components/notLandscape.vue";
import notMobile from "../components/notMobile.vue";
import appDialogLogout from "../components/dialog.vue";
import dialogCheckLogin from "../components/dialogchecklogin.vue";
import { db } from "../router/index.js";
export default {
  components: {
    notLandscape,
    notMobile,
    appDialogLogout,
    dialogCheckLogin
  },
  data() {
    return {
      studentData: {
        progress: 0,
        currentExp: 0,
        exp: 0,
        expOld: 0,
        currentLevel: 1,
        buddy: null,
        ship: null
      },
      totalStudent: 0,
      missionCurrent: {},
      missionScore: 0,

      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,

      syncData: null,
      syncStudent: null,
      syncMission: null,
      syncVersion: null,

      isMissionStart: false,

      isShow: false,

      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },

      isDialogPopup: false,

      isLoadData: false
    };
  },
  methods: {
    // TODO : Function() => Dialog Login Check User
    closePopupFunction(val) {
      if (val.reFunction) {
        this.clearSnapData();
        this.$q.localStorage.clear();
        this.$router.push("/login");
      }
    },
    // TODO : Function() => Refresh Page
    refresh() {
      window.location.reload(true);
    },
    // TODO : Function() => Logout
    logOut(val) {
      if (typeof this.syncStudent == "function") {
        this.syncStudent();
      }

      db.collection("student")
        .doc(this.studentData.key)
        .update({
          status: "offline"
        })
        .then(() => {
          this.syncData();
          this.syncMission();

          if (this.$route.name != "login") {
            this.$q.localStorage.clear();
            this.$router.push("/login");
          }

          this.isShow = val;

          return;
        });
    },
    // TODO : Function() => Teacher Clear Class Room
    teacherClearClass() {
      if (typeof this.syncStudent == "function") {
        this.syncStudent();
      }

      db.collection("student")
        .doc(this.studentData.key)
        .update({
          status: "offline"
        })
        .then(() => {
          this.$q.localStorage.clear();
          this.isDialogPopup = true;
          this.sendDataDialog.type = "finishLearning";
          this.sendDataDialog.title = "จบคาบเรียน";
          this.sendDataDialog.btn1 = "ตกลง";
          this.sendDataDialog.icon = "fas fa-star";

          return;
        });
    },
    // TODO : Function() => Loading Mission
    loadMission() {
      if (this.isLoadData) {
        return;
      }

      this.isLoadData = true;

      let allMission = this.decrypt(
        this.$q.localStorage.getItem("allMission"),
        1
      );

      this.syncMission = db
        .collection("classroomMission")
        .where("schoolKey", "==", this.studentData.schoolKey)
        .where("class", "==", this.studentData.classRoom)
        // .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .where("room", "==", this.studentData.room)
        .onSnapshot({ includeMetadataChanges: true }, missionDoc => {
          console.log(missionDoc);
          let temp = [];
          let missionShipFinish = [];
          let missionBuddyFinish = [];
          let missionTreasureFinish = [];

          if (missionDoc.size) {
            missionDoc.forEach(missionData => {
              let missionFinish = allMission.filter(x => {
                return x.key == missionData.data().currentMissionKey;
              })[0];

              temp.push({
                key: missionData.id,
                level: missionFinish.level,
                name: missionFinish.name,
                skill: missionFinish.status,
                ...missionData.data()
              });

              temp.sort((a, b) => {
                return Number(a.level) - Number(b.level);
              });
            });

            let classroomMission = {
              ship: [],
              treasure: [],
              buddy: []
            };

            temp.filter(x => {
              if (x.name === "คู่หู") {
                if (x.status === "finish") {
                  missionBuddyFinish.push(x);
                }
                classroomMission.buddy.push(x);
              }

              if (x.name === "เรือ") {
                if (x.status === "finish") {
                  missionShipFinish.push(x);
                }
                classroomMission.ship.push(x);
              }

              if (x.name === "สมบัติ") {
                if (x.status === "finish") {
                  missionTreasureFinish.push(x);
                }
                classroomMission.treasure.push(x);
              }
            });

            this.studentData.ship =
              missionShipFinish.length > 0
                ? missionShipFinish[missionShipFinish.length - 1]
                : null;

            this.studentData.buddy =
              missionBuddyFinish.length > 0
                ? missionBuddyFinish[missionBuddyFinish.length - 1]
                : null;

            let classroomMissionEncrypt = this.encrypt(classroomMission, 1);

            this.$q.localStorage.set(
              "classroomMission",
              classroomMissionEncrypt
            );

            let currentMission = temp.filter(x => {
              return x.status == "current";
            })[0];

            if (currentMission != undefined) {
              let missionCurrent = allMission.filter(
                x => x.key == currentMission.currentMissionKey
              )[0];

              let disCountNumber = 0;
              let sumGoal = 0;

              if (missionBuddyFinish.length > 0) {
                disCountNumber =
                  Number(this.studentData.buddy.skill) *
                  Number(this.totalStudent);

                sumGoal =
                  Number(missionCurrent.goal) * Number(this.totalStudent) -
                  disCountNumber;
              } else {
                disCountNumber = 0;
                sumGoal =
                  Number(missionCurrent.goal) * Number(this.totalStudent);
              }

              this.missionCurrent = {
                currentMissionKey: currentMission.currentMissionKey,
                currentScore: 0,
                finishScore: sumGoal,
                skill: missionCurrent.status,
                type: missionCurrent.name,
                level: missionCurrent.level,
                buddySkill: disCountNumber,
                ...currentMission
              };

              let missionEncrypt = this.encrypt(this.missionCurrent, 1);

              this.$q.localStorage.set("currentMission", missionEncrypt);

              let studentDataEncrypt = this.encrypt(this.studentData, 1);

              this.$q.localStorage.set("studentData", studentDataEncrypt);

              this.isMissionStart = true;
            } else {
              this.isMissionStart = false;
            }
          }
        });

      this.loadStudent();
    },
    loadStudent() {
      if (typeof this.syncStudent == "function") {
        this.syncStudent();
      }

      let dataStudent = db.collection("student").doc(this.studentData.key);

      db.collection("levelexp")
        .get()
        .then(docLevel => {
          let setLevel = [];
          docLevel.forEach(dataLevel => {
            let newData = {
              level: dataLevel.id,
              ...dataLevel.data()
            };

            setLevel.push(newData);
          });

          setLevel.sort((a, b) => {
            return Number(a.level) - Number(b.level);
          });

          setLevel.forEach((x, index) => {
            x.index = index;
          });

          this.syncStudent = dataStudent.onSnapshot(
            { includeMetadataChanges: true },
            async doc => {
              console.log(doc);
              let currentExp =
                doc.data().currentExp === undefined ||
                doc.data().currentExp === 0
                  ? 0
                  : doc.data().currentExp;

              let getOldExpIndex = null;

              await this.loadPracticeScore().then(exscore => {
                let testExp = currentExp + exscore;

                this.studentData.currentExp = testExp;

                let getExp = setLevel.filter(x => {
                  return this.studentData.currentExp < x.exp;
                })[0];

                this.studentData.currentLevel = getExp.level;

                this.studentData.currentExp =
                  getExp.level == 1
                    ? this.studentData.currentExp
                    : this.studentData.currentExp;

                this.studentData.exp =
                  getExp.level == 1
                    ? getExp.exp
                    : getExp.exp - setLevel[getExp.index - 1].exp;

                this.studentData.expOld =
                  getExp.level == 1
                    ? this.studentData.currentExp
                    : this.studentData.currentExp -
                      setLevel[getExp.index - 1].exp;

                // console.log(
                //   "levelปัจจุบัน",
                //   getExp.level,
                //   "EXP ปัจจุบัน",
                //   this.studentData.currentExp,
                //   "EXP ของเลเวลก่อนหน้า",
                //   setLevel[getExp.index - 1].exp,
                //   "Exp ณ เลเวลนี้",
                //   this.studentData.currentExp - setLevel[getExp.index - 1].exp,
                //   "% Progress ของเลเวลนี้ = ",
                //   (this.studentData.currentExp - setLevel[getExp.index - 1].exp) /
                //     (getExp.exp - setLevel[getExp.index - 1].exp)
                // );

                this.studentData.progress =
                  getExp.level == 1
                    ? this.studentData.currentExp / getExp.exp
                    : (this.studentData.currentExp -
                        setLevel[getExp.index - 1].exp) /
                      (getExp.exp - setLevel[getExp.index - 1].exp);

                let studentDataEncrypt = this.encrypt(this.studentData, 1);

                this.$q.localStorage.set("studentData", studentDataEncrypt);

                if (doc.data().status == "offline") {
                  // this.$q.localStorage.clear();
                  this.isDialogPopup = true;
                  this.sendDataDialog.type = "hasStudentOrTeacher";
                  this.sendDataDialog.title = "มีการเข้าสู่ระบบจากอุปกรณ์อื่น";
                  this.sendDataDialog.btn1 = "ตกลง";
                  this.sendDataDialog.icon = "fas fa-exclamation-circle";
                } else if (doc.data().status == "waiting") {
                  this.isDialogPopup = true;
                  this.sendDataDialog.type = "finishLearning";
                  this.sendDataDialog.title = "จบคาบเรียน";
                  this.sendDataDialog.btn1 = "ตกลง";
                  this.sendDataDialog.icon = "fas fa-star";
                }
              });
            }
          );
        });
    },

    async loadPracticeScore() {
      let datetime = await this.getDateAndTime().microtime;

      return new Promise((reslove, reject) => {
        db.collection("studentpracticelog")
          .where("studentKey", "==", this.studentData.key)
          .get()
          .then(async doc => {
            let score = 0;

            if (doc.size) {
              doc.forEach(data => {
                if (data.data().practiceType == "translation") {
                  score +=
                    Math.round(data.data().correct / 4) +
                    data.data().extraScore;
                } else {
                  score += data.data().correct + data.data().extraScore;
                }
              });

              reslove(score);
            } else {
              reslove(0);
            }
          });
      });
    },
    async loadSynchronize() {
      let dateTime = await this.getDateAndTime();

      this.syncData = await db
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
            let currentTime =
              dateTime.microtime - doc.docs[0].data().date.microtime;

            let syncData = doc.docs[0].data();

            this.totalStudent = doc.docs[0].data().totalStudent;

            this.missionScore =
              doc.docs[0].data().missionScore == undefined
                ? 0
                : doc.docs[0].data().missionScore;

            if (!this.isLoadData) {
              this.loadMission();
            }

            // NOTE
            if (currentTime > 1800000) {
              // TODO : Waiting Teacher
              if (this.$route.name != "s-waiting") {
                this.$router.push("/student/waiting/");
              }
            }
            // NOTE : กรณีคุณครูยังมีการใช้งานระบบอย่างต่อเนื่อง
            else {
              // TODO : Waiting
              if (syncData.currentPage == "waiting") {
                if (this.$route.name != "s-waiting") {
                  this.$router.push("/student/waiting/");
                }
              }
              // TODO : Placement
              else if (
                syncData.currentPage == "prepare-placement" ||
                syncData.currentPage == "start-placement" ||
                syncData.currentPage == "talkingplacement"
              ) {
                if (this.$route.name != "s-placement") {
                  this.$router.push("/student/placement");
                }
              }
              // TODO : Pretest - Posttest
              else if (
                syncData.currentPage == "prepare-pretest" ||
                syncData.currentPage == "prepare-posttest" ||
                syncData.currentPage == "start-posttest" ||
                syncData.currentPage == "start-pretest"
              ) {
                if (this.$route.name != "s-prepost") {
                  this.$router.push("/student/prepost");
                }
              }
              // TODO : Questionnaire
              else if (
                syncData.currentPage == "prepare-questionnaire" ||
                syncData.currentPage == "start-questionnaire"
              ) {
                if (this.$route.name != "s-questionnaire") {
                  this.$router.push("/student/questionnaire");
                }
              }
              // TODO : Main
              else if (syncData.currentPage == "main") {
                if (this.$route.name != "s-main") {
                  this.$router.push("/student/main/");
                }
              }
              // TODO : Vote
              else if (syncData.currentPage == "vote") {
                if (this.$route.name != "s-vote") {
                  this.$router.push("/student/vote/");
                }
              }
              // TODO : Mission
              else if (syncData.currentPage == "show-current-mission") {
                if (this.$route.name != "s-mission") {
                  this.$router.push("/student/mission/");
                }
              }
              // TODO : Studyplan
              else if (syncData.currentPage == "studyplan") {
                if (this.$route.name != "s-studyplan") {
                  this.$router.push("/student/studyplan/");
                }
              }
              // TODO : Practice
              else if (syncData.currentPage == "practice") {
                if (this.$route.name != "s-practice") {
                  this.$router.push("/student/practice/");
                }
              }
              // TODO : Review Practice
              else if (
                syncData.currentPage == "review grammar" ||
                syncData.currentPage == "review vocab"
              ) {
                if (this.$route.name != "s-reviewpractice") {
                  this.$router.push("/student/practice/review/");
                }
              }
              // TODO : Vocabluary : Flashcard
              else if (syncData.currentPage == "flashcard") {
                if (this.$route.name != "s-flashcard") {
                  this.$router.push("/student/practice/flashcard/");
                }
              }
              // TODO : Vocabluary : Spelling Bee
              else if (syncData.currentPage == "spelling bee") {
                if (this.$route.name != "s-spellingbee") {
                  this.$router.push("/student/practice/spellingbee/");
                }
              }
              // TODO : Vocabluary : Multiple Choices
              else if (syncData.currentPage == "multiplechoices") {
                if (this.$route.name != "s-multiplechoice") {
                  this.$router.push("/student/practice/multiplechoice/");
                }
              }
              // TODO : Grammar : Grammar Lesson
              else if (syncData.currentPage == "grammarlesson") {
                if (this.$route.name != "s-lesson") {
                  this.$router.push("/student/practice/lesson/");
                }
              }
              // TODO : Grammar : Grammar Action
              else if (syncData.currentPage == "grammaraction") {
                if (this.$route.name != "s-grammaraction") {
                  this.$router.push("/student/practice/grammaraction/");
                }
              }
              // TODO : Grammar : Grammar Action
              else if (syncData.currentPage == "fillintheblank") {
                if (this.$route.name != "s-grammarfillin") {
                  this.$router.push("/student/practice/grammarfillin/");
                }
              }
              // TODO : Writing : Translation
              else if (syncData.currentPage == "translation") {
                if (this.$route.name != "s-translation") {
                  this.$router.push("/student/practice/translation/");
                }
              }
              // TODO : Reading : Reading Content
              else if (syncData.currentPage == "readingspeaking") {
                if (this.$route.name != "s-readingcontent") {
                  this.$router.push("/student/practice/readingcontent/");
                }
              }
              // TODO : Reading : Reading Multiple Choices
              else if (syncData.currentPage == "readingmulti") {
                if (this.$route.name != "s-readingmultiple") {
                  this.$router.push("/student/practice/readingmultiple/");
                }
              }
              // TODO : Reading : Reading Fill in the blank
              else if (syncData.currentPage == "readingfillin") {
                if (this.$route.name != "s-readingfillin") {
                  this.$router.push("/student/practice/readingfillin/");
                }
              }
              // TODO : Phonics : Phonics Lesson
              else if (syncData.currentPage == "phonicslesson") {
                if (this.$route.name != "s-lesson") {
                  this.$router.push("/student/practice/lesson/");
                }
              }
              // TODO : Phonics & Listening & Speaking : (Multiple Answersound) & (Multiple Questionsound)
              else if (
                syncData.currentPage == "multiplechoice(questionsound)" ||
                syncData.currentPage == "multiplechoice(answersound)"
              ) {
                if (this.$route.name != "s-multipleother") {
                  this.$router.push("/student/practice/multipleother/");
                }
              }
              // TODO : Listening & Speaking : Language Tips Lesson
              else if (syncData.currentPage == "languagetips") {
                if (this.$route.name != "s-lesson") {
                  this.$router.push("/student/practice/lesson/");
                }
              }
              // TODO : Listening & Speaking : Speaking
              else if (syncData.currentPage == "speaking") {
                if (this.$route.name != "s-lesson") {
                  this.$router.push("/student/practice/lesson/");
                }
              }
              // TODO : Listening & Speaking : Speaking
              else if (syncData.currentPage == "roleplay") {
                if (this.$route.name != "s-roleplay") {
                  this.$router.push("/student/practice/roleplay/");
                }
              }
              // TODO : Show Score Finish Practice & Finish World
              else if (
                syncData.currentPage == "finish-practice" ||
                syncData.currentPage == "finish-world"
              ) {
                if (this.$route.name != "s-score") {
                  this.$router.push("/student/practice/score/");
                }
              }

              // TODO : Show Extra Score
              else if (syncData.currentPage == "extra-score") {
                if (this.$route.name != "s-extrascore") {
                  this.$router.push("/student/practice/extrascore/");
                }
              }
              // TODO : Finish Waiting
              else if (syncData.currentPage == "finish-waiting") {
                if (this.$route.name != "s-waitingfriend") {
                  this.$router.push("/student/practice/waiting/");
                }
              }
              // TODO : Finish Mission
              else if (syncData.currentPage == "finish-mission") {
                if (this.$route.name != "s-missionsuccess") {
                  this.$router.push("/student/missionsuccess/");
                }
              }
            }
          } else {
            this.teacherClearClass();
          }
        });
    },

    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    loadVersion() {
      this.syncVersion = db
        .collection("version")
        .doc("frontend")
        .onSnapshot(
          {
            includeMetadataChanges: true
          },
          doc => {
            if (doc.data().version != this.version) {
              window.location.reload(true);
            }
          }
        );
    },
    clearSnapData() {
      if (typeof this.syncData == "function") {
        this.syncData();
      }

      if (typeof this.syncStudent == "function") {
        this.syncStudent();
      }

      if (typeof this.syncMission == "function") {
        this.syncMission();
      }

      if (typeof this.syncVersion == "function") {
        this.syncVersion();
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name == "s-score") {
        this.loadStudent();
      }
    }
  },
  created() {
    window.onpopstate = function() {
      window.location.reload();
    };

    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset;
      if (100 > currentScrollPos) {
        document.getElementById("userBar").style.top = "0";
        document.getElementById("headerBar").style.transitionDuration = "0.1s";

        document.getElementById("headerBar").style.top = "0";

        document.getElementById("userBar").style.transitionDuration = "0.1s";
      } else {
        document.getElementById("userBar").style.top = "-100px";
        document.getElementById("userBar").style.transitionDuration = ".5s";

        document.getElementById("headerBar").style.top = "-100px";
        document.getElementById("headerBar").style.transitionDuration = ".5s";
      }
    };

    let checkStudentData = this.$q.localStorage.has("studentData");

    if (checkStudentData) {
      this.loadSynchronize();
      this.loadVersion();
    } else {
      this.clearSnapData();

      this.$q.localStorage.clear();
      this.$router.push("/login");
    }
  },
  beforeDestroy() {
    this.clearSnapData();
  }
};
</script>

<style scoped>
.bar-exp-top {
  border-bottom: 55px solid #662707;
  border-right: 20px solid transparent;
  height: 10px;
  width: 110px;
}

.bar-exp-bottom {
  border-top: 30px solid #662707;
  border-right: 26px solid transparent;
  width: 110px;
}

.animated {
  animation-duration: 0.7s;
}

.name-student {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
