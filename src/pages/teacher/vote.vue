<template>
  <q-page class="bg-main">
    <!-- SECTION  Type = Vote -->
    <div
      class="row justify-center relative-position q-pa-sm"
      style="padding-top:20px;overflow:hidden;"
      v-if="isLoaded"
    >
      <div class="col-lg-10 col-xs-12 row q-px-xs">
        <div class="col-12" align="right">
          <q-btn class="bg1 border3-sm br-a-xs text-h6 no-pointer-events" style="width:370px;">
            <div class="row fit">
              <div class="col self-center" align="left">
                <span>จำนวนลูกเรือที่เลือก</span>
              </div>
              <div class="col-2 self-center">
                <q-icon name="far fa-user" size="35px"></q-icon>
              </div>
              <div align="center" class="col-3 self-center">
                <span>{{ totalVote }}/{{ totalOnlineStudent }}</span>
              </div>
            </div>
          </q-btn>
        </div>
        <!-- NOTE  Vote Title : หัวข้อการโหวต -->
        <transition
          appear
          enter-active-class="animated fadeIn duration-votetext-in"
          leave-active-class="animated fadeOut duration-votetext-out"
        >
          <div class="col-12 row q-mt-md" align="center">
            <div class="col q-pa-md bg1 border3-md border3-b-md br-a-sm self-center text-overflow">
              <span class="text-h5 color2">ให้ลูกเรือเลือกภารกิจที่อยากได้และหาเหรียญให้ครบตามกำหนด</span>
            </div>
          </div>
        </transition>

        <!-- NOTE  Vote 1 : ตัวเลือกที่ 1 -->
        <transition
          appear
          enter-active-class="animated flipInX duration-voteskill1-in"
          leave-active-class="animated bounceOut duration-voteskill-out"
        >
          <div class="col-4 q-mt-md q-pa-xs">
            <div align="center">
              <div
                flat
                class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
                style="max-width:300px;width:100%;"
                :disable="isDisabled"
              >
                <div class="q-pt-xs">
                  <span class="color1 text-h6">
                    เรือ ระดับ
                    {{ mission.ship.level }}
                  </span>
                </div>
                <div class="q-py-md">
                  <transition
                    appear
                    enter-active-class="animated flipInY duration-flip1-in"
                    leave-active-class="animated flipOutY"
                  >
                    <q-img
                      :src="
                        '../../statics/coins/sh' + mission.ship.level + '.png'
                      "
                      style="width:180px;"
                    ></q-img>
                  </transition>
                </div>
                <div class="q-px-md" style="height:40px;" align="center">
                  <span class="color1">+ {{ mission.ship.status }} เหรียญเมื่อทำแบบฝึกหัด</span>
                </div>
              </div>
              <div class="q-px-lg bg1 q-pa-xs" style="max-width:300px;width:100%;" align="center">
                <span class="text-h4 color3 text-bold">{{ mission.ship.goal * totalStudent }} เหรียญ</span>
              </div>
              <div class="bg5 br-bl-xl br-br-xl q-pa-md" style="max-width:300px;width:100%;">
                <span class="text-h5 color3">ลูกเรือเลือก {{ vote.ship }} คน</span>
              </div>
              <div class="q-mt-xl">
                <!-- :disable="!(vote.ship > 0 &&  vote.ship >= vote.treasure && vote.ship >= vote.buddy)" -->
                <q-btn
                  style="max-width:300px;width:100%;"
                  push
                  label="เลือกภารกิจ เรือ"
                  @click="checkChooseMission(mission.ship.key)"
                  :class="
                    vote.ship > 0 &&
                    vote.ship >= vote.treasure &&
                    vote.ship >= vote.buddy
                      ? 'bg6 text-h5 color3'
                      : 'bg11 text-h5 color2 no-pointer-events'
                  "
                ></q-btn>
              </div>
            </div>
          </div>
        </transition>

        <!-- NOTE  Vote 2 : ตัวเลือกที่ 2 -->
        <transition
          appear
          enter-active-class="animated flipInX duration-voteskill2-in"
          leave-active-class="animated bounceOut duration-voteskill-out"
        >
          <div class="col-4 q-mt-md q-pa-xs">
            <div align="center">
              <div
                flat
                class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
                style="max-width:300px;width:100%;"
                :disable="isDisabled"
              >
                <div class="q-pt-xs">
                  <span class="color1 text-h6">คู่หู ระดับ {{ mission.buddy.level }}</span>
                </div>
                <div class="q-py-md">
                  <transition
                    appear
                    enter-active-class="animated flipInY duration-flip2-in"
                    leave-active-class="animated flipOutY "
                  >
                    <q-img
                      :src="
                        '../../statics/coins/f' + mission.buddy.level + '.png'
                      "
                      style="width:180px;"
                    ></q-img>
                  </transition>
                </div>
                <div class="q-px-md" style="height:40px;" align="center">
                  <span class="color1">
                    ลดราคาภารกิจ
                    {{ mission.buddy.status * totalStudent }} เหรียญ
                  </span>
                </div>
              </div>
              <div class="q-px-lg bg1 q-pa-xs" style="max-width:300px;width:100%;" align="center">
                <span
                  class="text-h4 color3 text-bold"
                >{{ mission.buddy.goal * totalStudent }} เหรียญ</span>
              </div>
              <div class="bg5 br-bl-xl br-br-xl q-pa-md" style="max-width:300px;width:100%;">
                <span class="text-h5 color3">ลูกเรือเลือก {{ vote.buddy }} คน</span>
              </div>
              <div class="q-mt-xl">
                <q-btn
                  style="max-width:300px;width:100%;"
                  push
                  label="เลือกภารกิจ คู่หู"
                  @click="checkChooseMission(mission.buddy.key)"
                  :class="
                    vote.buddy > 0 &&
                    vote.buddy >= vote.treasure &&
                    vote.buddy >= vote.ship
                      ? 'bg6 text-h5 color3'
                      : 'bg11 text-h5 color2 no-pointer-events'
                  "
                ></q-btn>
              </div>
            </div>
          </div>
        </transition>

        <!-- NOTE  Vote 3 : ตัวเลือกที่ 3 -->
        <transition
          appear
          enter-active-class="animated flipInX duration-voteskill3-in"
          leave-active-class="animated bounceOut duration-voteskill-out"
        >
          <div class="col-4 q-mt-md q-pa-xs">
            <div align="center">
              <div
                class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
                style="max-width:300px;width:100%;"
              >
                <div class="q-pt-xs">
                  <span class="color1 text-h6">
                    สมบัติ ชิ้นที่
                    {{ mission.treasure.level }}
                  </span>
                </div>
                <div class="q-py-md">
                  <transition
                    appear
                    enter-active-class="animated flipInY duration-flip3-in"
                    leave-active-class="animated flipOutY "
                  >
                    <q-img
                      :src="
                        '../../statics/coins/t' +
                          mission.treasure.level +
                          '.png'
                      "
                      style="width:180px;"
                    ></q-img>
                  </transition>
                </div>
                <div class="q-px-md" style="height:40px;" align="center">
                  <span class="color1">
                    ได้รับรางวัล
                    {{ mission.treasure.status * totalStudent }} เหรียญ
                  </span>
                </div>
              </div>
              <div class="q-px-lg bg1 q-pa-xs" style="max-width:300px;width:100%;" align="center">
                <span
                  class="text-h4 color3 text-bold"
                >{{ mission.treasure.goal * totalStudent }} เหรียญ</span>
              </div>
              <div class="bg5 br-bl-xl br-br-xl q-pa-md" style="max-width:300px;width:100%;">
                <span class="text-h5 color3">ลูกเรือเลือก {{ vote.treasure }} คน</span>
              </div>
              <div class="q-mt-xl">
                <q-btn
                  style="max-width:300px;width:100%;"
                  push
                  label="เลือกภารกิจ สมบัติ"
                  @click="checkChooseMission(mission.treasure.key)"
                  :class="
                    vote.treasure > 0 &&
                    vote.treasure >= vote.buddy &&
                    vote.treasure >= vote.ship
                      ? 'bg6 text-h5 color3'
                      : 'bg11 text-h5 color2 no-pointer-events'
                  "
                ></q-btn>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <app-dialog
      :isShow="isShowWhenChooseMission"
      :cancle="true"
      header="เลือกภารกิจ"
      content="ลูกเรือยังทำการโหวตไม่ครบ ต้องการเลือกภารกิจนี้หรือไม่"
      @cancleDialog="cancleDialog()"
      @confirmDialog="confirmDialog()"
    ></app-dialog>

    <app-dialog
      :isShow="isShowWhenNeedToConfirmChoose"
      :cancle="true"
      header="ยืนยันการโหวต"
      content="ต้องการเลือกภารกิจนี้ใช่หรือไม่"
      @cancleDialog="cancleDialog()"
      @confirmDialog="confirmChooiseMission()"
    ></app-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router";
import appDialog from "../../components/dialog.vue";

export default {
  components: {
    appDialog,
  },
  data() {
    return {
      isShowWhenNeedToConfirmChoose: false,
      isShowWhenChooseMission: false,
      isDisabled: false,
      snapVote: "",
      currentClass: "",
      currentRoom: "",
      vote: {
        ship: 0,
        buddy: 0,
        treasure: 0,
      },
      currentTerm: "",
      currentYear: "",
      schoolKey: "",
      allMission: "",
      allClassMission: "",
      isLoaded: false,
      mission: {},
      totalVote: 0,
      totalOnlineStudent: 0,
      snapGetOnlineStudent: "",
      snapTotalVote: "",
      clickedMissionKey: "",
      totalStudent: "",
    };
  },
  methods: {
    async loadData() {
      console.clear();
      let syncData = await this.loadTeacherSyncData();

      this.currentClass = syncData.class;
      this.currentRoom = syncData.room;
      this.currentTerm = syncData.term;
      this.currentYear = syncData.year;
      this.schoolKey = syncData.schoolKey;

      this.snapMissionVote();
      this.loadClassroomMission();
      this.checkVotePermission();

      this.getStudentVote();
      // this.getOnlineStudent();

      console.log(syncData);
    },
    cancleDialog(val) {
      this.isShowWhenChooseMission = val;
      this.isShowWhenNeedToConfirmChoose = val;
    },
    confirmDialog(val) {
      this.isShowWhenChooseMission = val;
      this.chooseMission(this.clickedMissionKey);
    },
    confirmChooiseMission(val) {
      this.chooseMission(this.clickedMissionKey);
    },
    checkChooseMission(missionKey) {
      this.clickedMissionKey = missionKey;
      if (this.totalVote != this.totalOnlineStudent) {
        //แจ้งเตือนกรณี ยังโหวตไม่ครบ
        this.isShowWhenChooseMission = true;
        return;
      } else {
        this.isShowWhenNeedToConfirmChoose = true;
      }
    },
    async chooseMission(missionKey) {
      this.loadingShow();
      let dateAndTime = await this.getDateAndTime();
      this.$q.localStorage.set("currentMissionKey", missionKey);

      db.collection("classroomMission")
        .add({
          currentMissionKey: missionKey,
          class: this.currentClass,
          room: this.currentRoom,
          term: this.currentTerm,
          year: this.currentYear,
          status: "current",
          schoolKey: this.teacherData.schoolKey,
        })
        .then(() => {
          db.collection("classroomMission")
            .where("schoolKey", "==", this.teacherData.schoolKey)
            .where("class", "==", this.currentClass)
            .where("room", "==", this.currentRoom)
            .where("status", "==", "finish")
            .get()
            .then((m) => {
              // let totalMission = [];
              let allMission = this.decrypt(
                this.$q.localStorage.getItem("allMission"),
                1
              )
                .filter((x) => {
                  return x.name == "คู่หู";
                })
                .map((e) => {
                  return e.key;
                });

              let checkExists = false;
              m.forEach((missionElement) => {
                if (
                  allMission.includes(missionElement.data().currentMissionKey)
                ) {
                  checkExists = true;
                }
              });

              if (checkExists) {
                // กรณีมีคู่หู
                console.log("มีคู่หู");
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({
                    currentPage: "show-current-mission",
                  })
                  .then(() => {
                    this.loadingHide();
                    this.$router.push("/teacher/mission");
                  });
              } else {
                console.log("ไม่มีคู่หู");
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({ currentPage: "studyplan", date: dateAndTime })
                  .then(() => {
                    this.loadingHide();
                    this.$router.push("/teacher/studyplan");
                  });
              }
            });
        });
    },
    async loadClassroomMission() {
      this.loadingShow();
      // console.clear();

      let temp = await this.loadMissionAll();

      this.allMission = temp.data;

      let classroomTemp = await this.loadClassroomMissionFinish();

      this.allClassMission = classroomTemp.data;

      // Load Mission ปัจจุบันของห้องเรียนนี้

      let shipMission;
      let buddyMission;
      let treasureMission;

      // ภาคกิจเรือทั้งหมด
      shipMission = temp.data.filter((x) => {
        return x.name == "เรือ";
      });
      // ภารกิจคู่หูทั้งหมด

      buddyMission = temp.data.filter((x) => {
        return x.name == "คู่หู";
      });
      // ภารกิจสมบัติทั้งหมด

      treasureMission = temp.data.filter((x) => {
        return x.name == "สมบัติ";
      });

      let classShipMission;
      let classBuddyMission;
      let classTreasureMission;

      // ARRAY ของ missionkey ที่ได้ทำไปแล้ว
      let classTempMap = classroomTemp.data.map((e) => {
        return e.currentMissionKey;
      });

      // ภารกิจเรือที่ระดับชั้นนี้ได้ทำ
      classShipMission = shipMission.filter((x) => {
        return classTempMap.includes(x.key);
      });

      classShipMission.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      // ภารกิจคู่หูที่ระดับชั้นนี้ได้ทำ

      classBuddyMission = buddyMission.filter((x) => {
        return classTempMap.includes(x.key);
      });

      classBuddyMission.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      // ภารกิจสมบัติที่ระดับชั้นนี้ได้ทำ
      classTreasureMission = treasureMission.filter((x) => {
        return classTempMap.includes(x.key);
      });

      classTreasureMission.sort((a, b) => {
        return Number(a.level) - Number(b.level);
      });

      let lastShipMissionLV =
        classShipMission.length != 0
          ? classShipMission[classShipMission.length - 1].level
          : "0";

      let lastBuddyMissionLV =
        classBuddyMission.length != 0
          ? classBuddyMission[classBuddyMission.length - 1].level
          : "0";

      let lastTreasureMissionLV =
        classTreasureMission.length != 0
          ? classTreasureMission[classTreasureMission.length - 1].level
          : "0";

      let findNextShipLv = (Number(lastShipMissionLV) + 1).toString();
      let findNextBuddyLv = (Number(lastBuddyMissionLV) + 1).toString();
      let findNextTreasureLv = (Number(lastTreasureMissionLV) + 1).toString();

      this.mission.ship = shipMission.filter((x) => {
        return x.level == findNextShipLv;
      })[0];

      this.mission.buddy = buddyMission.filter((x) => {
        return x.level == findNextBuddyLv;
      })[0];

      this.mission.treasure = treasureMission.filter((x) => {
        return x.level == findNextTreasureLv;
      })[0];

      this.loadingHide();
      this.isLoaded = true;
    },
    async snapMissionVote() {
      let countMission = await this.loadCLassroomMissionAll();

      countMission = countMission.size;
      console.log(countMission);

      console.log(countMission)

      this.snapVote = db
        .collection("missionvote")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("schoolKey", "==", this.schoolKey)
        .where("no", "==", countMission.size + 1)
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          if (doc.size) {
            let temp = [];
            doc.forEach((element) => {
              temp.push(element.data());
            });
            // SHIP VOTE
            this.vote.ship = temp
              .filter((x) => {
                return x.vote == "ship";
              })
              .map((e) => {
                return e.vote;
              }).length;
            // BUDDY VOTE
            this.vote.buddy = temp
              .filter((x) => {
                return x.vote == "buddy";
              })
              .map((e) => {
                return e.vote;
              }).length;
            // Treasure Vote
            this.vote.treasure = temp
              .filter((x) => {
                return x.vote == "treasure";
              })
              .map((e) => {
                return e.vote;
              }).length;
          }
        });
    },
    async getStudentVote() {
      // กรณีเรียนแบบห้องเดียว
      // หาจำนวนครั้งที่่โหวต

      let getNoVote = await this.loadCLassroomMissionAll();

      let numberOfVote = getNoVote.size;
      numberOfVote = numberOfVote == 0 ? 1 : numberOfVote + 1;

      this.snapTotalVote = db
        .collection("missionvote")
        .where("schoolKey", "==", this.schoolKey)
        .where("no", "==", numberOfVote)
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          this.totalVote = doc.size;
        });
    },
    getOnlineStudent() {
      this.snapGetOnlineStudent = db
        .collection("student")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("status", "==", "online")
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          this.totalOnlineStudent = doc.size;
        });
    },
    async checkVotePermission() {
      let dateAndTime = await this.getDateAndTime();
      this.loadingShow();

      let checkMission = await this.loadClassroomMissionCurrent(
        this.currentClass,
        this.currentRoom,
        this.currentYear
      );

      if (checkMission.size > 0) {
        console.log("กรณีเจอภารกิจที่กำลังทำอยู่");
        db.collection("synchronize")
          .doc(this.teacherData.key)
          .update({ currentPage: "studyplan", date: dateAndTime })
          .then(() => {
            this.loadingHide();
            this.$router.push("/teacher/studyplan");
          });
      } else {
        this.loadingHide();
      }
    },
  },
  beforeDestroy() {
    this.snapTotalVote();
    this.snapVote();
    this.snapGetOnlineStudent();
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.duration-votetext-in {
  animation-duration: 0.5s;
}

.duration-votetext-out {
  animation-duration: 0.5s;
}

.duration-voteskill1-in {
  animation-duration: 0.2s;
}
.duration-voteskill2-in {
  animation-delay: 0.3s;
  animation-duration: 0.5s;
}
.duration-voteskill3-in {
  animation-delay: 0.6s;
  animation-duration: 0.5s;
}

.duration-voteskill-out {
  animation-duration: 0.5s;
}

.duration-flip1-in {
  animation-delay: 0.3s;
  animation-duration: 0.5s;
}

.duration-flip2-in {
  animation-delay: 0.6s;
  animation-duration: 0.5s;
}

.duration-flip3-in {
  animation-delay: 0.9s;
  animation-duration: 0.5s;
}

.duration-count1-in {
  animation-delay: 0.5s;
  animation-duration: 0.5s;
}
.duration-count2-in {
  animation-delay: 0.8s;
  animation-duration: 0.5s;
}
.duration-count3-in {
  animation-delay: 1.2s;
  animation-duration: 0.2s;
}
</style>
