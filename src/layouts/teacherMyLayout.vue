<template>
  <q-layout view="lHh Lpr lFf" class="animated fadeIn print-hide">
    <q-resize-observer @resize="onResize" />

    <q-drawer
      v-model="drawer"
      behavior="desktop"
      :width="100"
      content-class="bg3 row shadow-5 orientation-landscape "
      v-if="innerWidth > 949"
    >
      <div class="row">
        <!-- SECTION  ONE -->
        <div class="self-start">
          <!-- NOTE   Button : หนักหลัก -->
          <q-btn
            dense
            flat
            align="center"
            class="q-py-sm fit"
            :class="[
              !$q.localStorage.has('selectClassRoom') ||
              $route.name == 't-prepost' ||
              $route.name == 't-placement' ||
              $route.name == 't-classroom'
                ? 'not-active no-pointer-events'
                : 'color6',
              $q.localStorage.has('selectClassRoom') &&
              $route.name != 't-placement' &&
              $route.name != 't-questionnair' &&
              $route.name != 't-talkingplacement' &&
              $route.name != 't-score' &&
              $route.name != 't-documentfolder' &&
              $route.name != 't-studentlist' &&
              $route.name != 't-learningplans' &&
              $route.name != 't-printmain' &&
              $route.name != 't-scorereview' &&
              $route.name != 't-userInfo' &&
              $route.name != 't-scoreReview' &&
              $route.name != 't-scoreAvg' &&
              $route.name != 't-scorePractice' &&
              $route.name != 't-scorePrePost' &&
              $route.name != 't-classroom' &&
              $route.name != 't-prepost'
                ? 'active-select'
                : null
            ]"
            @click="checkShowExitDialog('toMain')"
          >
            <div class="col-12">
              <q-icon
                name="fas fa-book"
                size="34px"
                :style="[
                  !$q.localStorage.has('selectClassRoom') ||
                  $route.name == 't-prepost' ||
                  $route.name == 't-placement' ||
                  $route.name == 't-classroom'
                    ? { color: '#421003' }
                    : { color: '#F6A539' }
                ]"
              ></q-icon>
            </div>
            <div class="col-12 q-pt-sm">
              <span style="font-size:14px;">บทเรียน</span>
            </div>
          </q-btn>

          <hr class="no-margin" style="border:.15mm solid #420F02;" />

          <!-- NOTE   Button : คะแนน -->
          <q-btn
            dense
            flat
            align="center"
            class="q-py-sm fit color6"
            :class="[
              $route.name == 't-placement' ||
              $route.name == 't-questionnair' ||
              $route.name == 't-talkingplacement' ||
              $route.name == 't-prepost'
                ? 'not-active no-pointer-events'
                : null,
              $route.name == 't-score' ||
              $route.name == 't-scoreReview' ||
              $route.name == 't-scoreAvg' ||
              $route.name == 't-scorePractice' ||
              $route.name == 't-scorePrePost'
                ? 'active-select'
                : null
            ]"
            @click="checkShowExitDialog('score')"
          >
            <div class="col-12">
              <img
                src="../statics/iconmenu/score_disable.png"
                style="width:37px;"
                v-if="
                  $route.name == 't-placement' ||
                    $route.name == 't-questionnair' ||
                    $route.name == 't-talkingplacement' ||
                    $route.name == 't-prepost'
                "
              />
              <img
                src="../statics/iconmenu/score.png"
                style="width:37px;"
                v-else
              />
            </div>
            <div class="col-12">
              <span class="q-pt-xs" style="font-size:14px;">คะแนน</span>
            </div>
          </q-btn>

          <hr class="no-margin" style="border:.15mm solid #420F02;" />

          <!-- NOTE   Button : แฟ้มข้อมูล -->
          <q-btn
            dense
            flat
            align="center"
            class="q-py-sm fit color6"
            :class="{
              'active-select':
                $route.name == 't-documentfolder' ||
                $route.name == 't-studentlist' ||
                $route.name == 't-learningplans',
              'not-active no-pointer-events':
                $route.name == 't-placement' ||
                $route.name == 't-questionnair' ||
                $route.name == 't-talkingplacement' ||
                $route.name == 't-prepost'
            }"
            @click="checkShowExitDialog('file')"
          >
            <div class="col-12">
              <img
                src="../statics/iconmenu/document_disable.png"
                style="width:37px;"
                v-if="
                  $route.name == 't-placement' ||
                    $route.name == 't-questionnair' ||
                    $route.name == 't-talkingplacement' ||
                    $route.name == 't-prepost'
                "
              />
              <img
                src="../statics/iconmenu/document.png"
                style="width:37px;"
                v-else
              />
            </div>
            <div class="col-12">
              <span class="q-pt-xs" style="font-size:14px;">แฟ้มข้อมูล</span>
            </div>
          </q-btn>

          <hr class="no-margin" style="border:.15mm solid #420F02;" />

          <!-- NOTE   Button : ข้อมูลผู้ใช้ -->
          <q-btn
            dense
            flat
            align="center"
            class="q-py-sm fit color6"
            :class="{
              'active-select': $route.name == 't-userInfo',
              'not-active no-pointer-events':
                $route.name == 't-placement' ||
                $route.name == 't-questionnair' ||
                $route.name == 't-talkingplacement' ||
                $route.name == 't-prepost'
            }"
            @click="checkShowExitDialog('userInfo')"
          >
            <div class="col-12">
              <img
                src="../statics/iconmenu/user_disable.png"
                style="width:37px;"
                v-if="
                  $route.name == 't-placement' ||
                    $route.name == 't-questionnair' ||
                    $route.name == 't-talkingplacement' ||
                    $route.name == 't-prepost'
                "
              />
              <img
                src="../statics/iconmenu/user.png"
                style="width:37px;"
                v-else
              />
            </div>
            <div class="col-12">
              <span class="q-pt-xs" style="font-size:14px;">ข้อมูลผู้ใช้</span>
            </div>
          </q-btn>

          <hr class="no-margin" style="border:.12mm solid #420F02;" />
        </div>

        <!-- SECTION  Two -->
        <div class="self-end menu-teacher">
          <div>
            <hr class="no-margin" style="border:.15mm solid #420F02;" />

            <!-- NOTE   Button : เลือกห้องเรียน -->
            <q-btn
              @click="checkShowExitDialog('toClassroom')"
              dense
              flat
              align="center"
              class="q-py-sm fit color6"
              :class="{
                'active-select': $route.name == 't-classroom'
              }"
            >
              <div class="col-12">
                <img src="../statics/iconmenu/room.png" style="width:37px;" />
              </div>
              <span class="q-pt-xs" style="font-size:14px;"
                >เลือกห้องเรียน</span
              >
              <div class="col-12"></div>
            </q-btn>

            <hr class="no-margin" style="border:.15mm solid #420F02;" />

            <!-- NOTE   Button : ออกจากระบบ -->
            <q-btn
              dense
              @click="checkShowExitDialog('logout')"
              flat
              align="center"
              class="q-py-sm fit color6"
            >
              <div class="col-12">
                <img src="../statics/iconmenu/logout.png" style="width:37px;" />
              </div>
              <div class="col-12">
                <span class="q-pt-xs" style="font-size:14px;">ออกจากระบบ</span>
              </div>
            </q-btn>

            <hr class="no-margin" style="border:.15mm solid #420F02;" />
          </div>
        </div>
      </div>

      <div
        class="bg5 q-py-xs color3 text-h6 q-pl-lg fixed z-top shadow-1"
        style="left:100px;width:350px;border-top-right-radius:30px;border-bottom-right-radius:30px"
        v-if="
          isShowMission &&
            $route.name != 't-vote' &&
            $route.name != 't-scoreReview' &&
            $route.name != 't-classroom' &&
            $route.name != 't-score' &&
            $route.name != 't-documentfolder' &&
            $route.name != 't-userInfo' &&
            $route.name != 't-finishMission' &&
            $route.name != 't-scoreAvg' &&
            $route.name != 't-scorePractice' &&
            $route.name != 't-scorePrePost' &&
            $route.name != 't-learningplans' &&
            $route.name != 't-studentlist'
        "
      >
        เป้าหมาย :
        <span>
          <span
            :class="{
              color10: missionScore >= missionCurrent.finishScore,
              color3: missionScore < missionCurrent.finishScore
            }"
            >{{ Math.round(missionScore) }}</span
          >
          / {{ missionCurrent.finishScore }} เหรียญ
        </span>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view class="orientation-landscape" v-if="innerWidth > 949" />
      <not-mobile class="orientation-landscape" v-else />
      <not-landscape class="z-top orientation-portrait" />
    </q-page-container>

    <q-dialog v-model="isShowPromptDialog" content-class="backdrop">
      <q-card class="bg5 color3 q-pa-xs" style="max-width:500px;width:100%">
        <q-card-section>
          <div class="text-h5 text-weight-bolder">
            <q-icon name="fas fa-sign-out-alt"></q-icon>
            &nbsp;{{ dialogObj.header }}
          </div>
          <div class="q-pt-md" style="font-size:16px">
            {{ dialogObj.content }}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" v-close-popup></q-btn>
          <q-btn label="ตกลง" @click="confirmDialogPopup()" outline />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import dialogCheckLogin from "../components/dialogchecklogin.vue";
import { db } from "../router/index.js";
export default {
  components: {
    notLandscape,
    notMobile,
    dialogCheckLogin
  },
  name: "MyLayout",
  data() {
    return {
      drawer: true,

      classMission: {
        buddy: null,
        ship: null
      },
      missionCurrent: {},
      menu: {
        home: "หน้าหลัก",
        score: "คะแนน",
        document: "แฟ้มข้อมูล",
        userInfo: "ข้อมูลผู้ใช้"
      },
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      snapLogin: "",
      snapGetOnline: "",
      syncVersion: "",
      isShowPromptDialog: false,
      dialogObj: {
        header: "",
        content: ""
      },
      btnClicked: "",
      totalStudent: Number(
        this.decrypt(this.$q.localStorage.getItem("totalStudent"), 2)
      ),

      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      isDialogPopup: false,

      // NOTE Mission On Snapshot
      snapMission: "",
      missionData: {
        finishGoal: 0
      },
      isShowMission: false,
      missionScore: 0,
      snapSynch: "",
      currentRoute: this.$route.name,

      snapPlacementMark: "",
      isPlacement: false,

      snapPrepostLog: "",
      isPrepost: false
    };
  },
  methods: {
    loadClassroomMission() {
      let currentClass = this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      );
      let currentRoom = this.decrypt(
        this.$q.localStorage.getItem("currentRoom"),
        2
      );

      let allMission = this.decrypt(
        this.$q.localStorage.getItem("allMission"),
        1
      );

      this.snapMission = db
        .collection("classroomMission")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("class", "==", currentClass)
        .where("room", "==", currentRoom)
        .where("term", "==", this.studentData.term)
        .where("year", "==", this.studentData.year)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          let totalStudent = this.decrypt(
            this.$q.localStorage.getItem("allStudentData"),
            1
          ).filter(x => {
            return x.classRoom == currentClass && x.room == currentRoom;
          }).length;

          if (doc.size) {
            let tempMission = [];
            let missionShipFinish = [];
            let missionBuddyFinish = [];
            let missionTreasureFinish = [];

            doc.forEach(data => {
              let missionData = allMission.filter(x => {
                return x.key == data.data().currentMissionKey;
              })[0];

              tempMission.push({
                key: data.id,
                level: missionData.level,
                name: missionData.name,
                skill: missionData.status,
                ...data.data()
              });
            });

            tempMission.sort((a, b) => {
              return Number(a.level) - Number(b.level);
            });

            let classroomMission = {
              ship: [],
              treasure: [],
              buddy: []
            };

            tempMission.filter(x => {
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

            this.classMission.ship =
              missionShipFinish.length > 1
                ? missionShipFinish[missionShipFinish.length - 1]
                : null;

            this.classMission.buddy =
              missionBuddyFinish.length > 0
                ? missionBuddyFinish[missionBuddyFinish.length - 1]
                : null;

            let currentMission = tempMission.filter(x => {
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
                  Number(this.classMission.buddy.skill) * Number(totalStudent);

                sumGoal =
                  Number(missionCurrent.goal) * Number(totalStudent) -
                  disCountNumber;
              } else {
                disCountNumber = 0;
                sumGoal = Number(missionCurrent.goal) * Number(totalStudent);
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

              this.isShowMission = true;
            } else {
              this.isShowMission = false;
            }
          }
        });
    },
    closePopupFunction(val) {
      if (val.type == "exitPractice") {
        if (val.reFunction) {
          // NOTE กดตกลง
          this.confirmDialogPopup();
          this.isDialogPopup = false;
        } else {
          // NOTE กดยกเลิก
          this.isDialogPopup = false;
        }
      } else {
        if (val.type == "teacherLogout" && val.reFunction) {
          db.collection("synchronize")
            .doc(this.teacherData.key)
            .update({
              status: "offline"
            })
            .then(() => {
              this.$router.push("/");
              this.$q.localStorage.clear();
            });
        } else {
          // NOTE กดยกเลิก
          this.isDialogPopup = false;
        }

        if (val.reFunction) {
          this.snapLogin();
          this.$router.push("/login");
        }
      }
    },
    async toFiles() {
      if (this.$route.name != "t-documentfolder") {
        this.loadingShow();
        let getTime = await this.getDateAndTime();
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            currentPage: "waiting",
            date: getTime
          })
          .catch(async e => {
            await this.solveNoDucmentToUpdate();
          })
          .then(() => {
            this.loadingHide();
            this.$router.push("/teacher/folder");
            this.isShowMission = false;
          });
      }
    },
    async toScore() {
      if (this.$route.name != "t-score") {
        this.loadingShow();
        let getTime = await this.getDateAndTime();
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({
            currentPage: "waiting",
            date: getTime
          })
          .catch(async e => {
            await this.solveNoDucmentToUpdate();
          })
          .then(() => {
            this.loadingHide();
            this.$router.push("/teacher/score");

            this.isShowMission = false;
          });
      }
    },
    checkShowExitDialog(btn) {
      this.btnClicked = btn;
      if (btn == "logout") {
        // this.checkLogout();
        this.isDialogPopup = true;
        this.sendDataDialog.type = "teacherLogout";
        this.sendDataDialog.title = "ยืนยันการออกจากระบบ";
        this.sendDataDialog.btn1 = "ออกจากระบบ";
        this.sendDataDialog.icon = "fas fa-sign-out-alt";
        this.sendDataDialog.btn2 = "ยกเลิก";
        return;
      }

      if (
        this.$route.name == "t-flashcard" ||
        this.$route.name == "t-progress" ||
        this.$route.name == "t-finishpractice" ||
        this.$route.name == "t-addmorescore" ||
        this.$route.name == "t-grammarlesson" ||
        this.$route.name == "t-grammaraction"
      ) {
        // กรณีเป็นหน้าที่ต้องแจ้งเตือนการออกแบบฝึกหัด
        this.isDialogPopup = true;
        this.sendDataDialog.type = "exitPractice";
        this.sendDataDialog.title = "ออกจากแบบฝึกหัด";
        this.sendDataDialog.btn1 = "ตกลง";
        this.sendDataDialog.icon = "fas fa-sign-out-alt";
        this.sendDataDialog.btn2 = "ยกเลิก";
      } else {
        if (this.$route.name != "t-main") {
          if (btn == "toMain") {
            this.toMain();
          } else if (btn == "toClassroom") {
            if (this.$route.name != "t-classroom") {
              this.toClassroom();
            }
          } else if (btn == "score") {
            this.toScore();
          } else if (btn == "file") {
            this.toFiles();
          } else if (btn == "userInfo") {
            this.toUserInfo();
          }
        } else {
          if (btn == "toClassroom") {
            if (this.$route.name != "t-classroom") {
              this.toClassroom();
            }
          } else if (btn == "score") {
            if (this.$route.name != "t-score") {
              this.toScore();
            }
          } else if (btn == "file") {
            if (this.$route.name != "t-documentfolder") {
              this.toFiles();
            }
          } else if (btn == "userInfo") {
            if (this.$route.name != "t-userInfo") {
              this.toUserInfo();
            }
          }
        }
      }
    },
    toUserInfo() {
      if (this.$route.name != "t-userInfo") {
        this.$router.push("/teacher/userInfo");
      }
      this.isShowMission = false;
    },
    async solveNoDucmentToUpdate() {
      let getTime = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .set({
          currentPage: "waiting",
          date: getTime
        });
    },

    async toClassroom() {
      this.loadingShow();
      let getTime = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "waiting",
          date: getTime
        })
        .catch(async e => {
          await this.solveNoDucmentToUpdate();
        })
        .then(() => {
          this.loadingHide();
          this.$router.push("/teacher/classroom");
          this.isShowMission = false;
        });
    },
    async toMain() {
      this.loadingShow();
      let getTime = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "main",
          date: getTime
        })
        .catch(async e => {
          await this.solveNoDucmentToUpdate();
        })
        .then(() => {
          this.loadingHide();
          this.$router.push("/teacher/main");
          this.isShowMission = true;
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    checkLogout() {
      this.dialogObj.header = "ออกจากระบบ";
      this.dialogObj.content =
        "คุณต้องการออกจากระบบหรือไม่ ลูกเรือจะถูกบังคับออกจากระบบด้วย";
      this.isShowPromptDialog = true;
    },
    confirmDialogPopup() {
      if (this.btnClicked == "toMain") {
        this.toMain();
      } else if (this.btnClicked == "toClassroom") {
        this.toClassroom();
      } else if (this.btnClicked == "score") {
        this.toScore();
      } else if (this.btnClicked == "file") {
        this.toFiles();
      } else if (this.btnClicked == "userInfo") {
        this.toUserInfo();
      }
    },
    snapCheckLogin() {
      this.snapLogin = db
        .collection("teacher")
        .doc(this.teacherData.key)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          if (doc.data().status == "offline") {
            this.$q.localStorage.clear();

            this.isDialogPopup = true;
            this.sendDataDialog.type = "hasStudentOrTeacher";
            this.sendDataDialog.title = "มีการเข้าสู่ระบบจากอุปกรณ์อื่น";
            this.sendDataDialog.btn1 = "ตกลง";
            this.sendDataDialog.icon = "fas fa-exclamation-circle";
          }
        });
    },
    snapGetOnlineStudent() {
      this.snapGetOnline = db
        .collection("student")
        .where(
          "classRoom",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentClass"), 2)
        )
        .where(
          "room",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
        )
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          let totalOnlineStudentEncrypt = this.encrypt(doc.size, 2);
          this.$q.localStorage.set("totalOnlineStudent", doc.size);
        });
    },
    snapSynchronize() {
      this.snapSynch = db
        .collection("synchronize")
        .doc(this.teacherData.key)
        .onSnapshot(doc => {
          if (doc.exists) {
            this.missionScore = doc.data().missionScore;
          } else {
            this.missionScore = 0;
          }
        });
    },
    async checkPlacement() {
      let currentClass = this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      );

      let currentRoom = this.decrypt(
        this.$q.localStorage.getItem("currentRoom"),
        2
      );

      let currentYear = this.decrypt(
        this.$q.localStorage.getItem("currentYear"),
        2
      );

      let currentTerm = this.decrypt(
        this.$q.localStorage.getItem("currentTerm"),
        2
      );

      this.snapPlacementMark = await db
        .collection("placementMark")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("class", "==", currentClass)
        .where("room", "==", currentRoom)
        .where("isPlacement", "==", true)
        .onSnapshot(result => {
          console.log(result.size);
          if (result.size) {
            this.isPlacement = true;
          }
        });

      this.snapPrepostLog = await db
        .collection("studentprepostlog")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("term", "==", currentTerm)
        .where("year", "==", currentYear)
        .where("class", "==", currentClass)
        .where("room", "==", currentRoom)
        .onSnapshot(result => {
          console.log(result.size);
          if (result.size) {
            this.isPrepost = true;
          }
        });
    }
  },
  mounted() {
    this.snapCheckLogin();
    this.snapGetOnlineStudent();
    this.loadClassroomMission();
    this.snapSynchronize();

    this.checkPlacement();
  },
  beforeDestroy() {
    this.snapLogin();
    this.snapGetOnline();
    this.snapMission();
    this.snapSynch();
    this.snapPlacementMark();
  },
  watch: {
    $route(to, from) {
      this.currentRoute = this.$route.name;
      if (typeof this.snapMission == "function") {
        this.snapMission();
      }
      this.loadClassroomMission();
    }
  }
};
</script>

<style scoped>
.menu-teacher {
  overflow-y: auto;
  overflow-x: hidden;
}
/* width */
.menu-teacher::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.menu-teacher::-webkit-scrollbar-track {
  background: #662707;
}

/* Handle */
.menu-teacher::-webkit-scrollbar-thumb {
  background: #bd7754;
}

/* Handle on hover */
.menu-teacher::-webkit-scrollbar-thumb:hover {
  background: #555;
  opacity: 1;
}

.active-select {
  background-color: #420f02;
}

.not-active {
  color: #420f02;
}
</style>
