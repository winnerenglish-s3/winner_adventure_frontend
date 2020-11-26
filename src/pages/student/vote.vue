<template>
  <q-page
    class="bg-main row justify-center"
    :class="{ 'flex flex-center': isLoadData }"
  >
    <q-resize-observer @resize="onResize" />

    <q-spinner-facebook v-if="isLoadData" color="primary" size="100px" />

    <!-- SECTION  Type = Vote -->
    <div
      class="col-12 self-start row justify-center relative-position q-pa-xs"
      style="padding-top:50px;max-width:1400px;width:95%;overflow:hidden;"
      v-if="activeType == 'startvote' && !isLoadData"
    >
      <!-- NOTE  Vote Title : หัวข้อการโหวต -->
      <transition
        appear
        enter-active-class="animated fadeIn duration-votetext-in"
        leave-active-class="animated fadeOut duration-votetext-out"
        v-if="isActiveVote"
      >
        <div class="col-12 row q-mt-md">
          <div
            class="col q-pa-md bg1 border3-md br-a-sm self-center text-overflow"
            align="center"
          >
            <span class="text-h5 color3"
              >เลือกภารกิจเพื่อนทำร่วมกับเพื่อนๆ</span
            >
          </div>
        </div>
      </transition>

      <!-- NOTE  Vote 1 : ตัวเลือกที่ 1 -->
      <transition
        appear
        enter-active-class="animated flipInX duration-voteskill1-in"
        leave-active-class="animated bounceOut duration-voteskill-out"
        v-if="isActiveVoteSkill"
      >
        <div class="col-4 q-mt-lg q-pa-xs relative-position" align="center">
          <div align="center" class="animated bounce duration-bounce">
            <q-icon
              name="fas fa-caret-down"
              class="color7"
              size="100px"
              style="height:50px;"
            ></q-icon>
          </div>

          <div
            v-ripple
            align="center"
            class="shadow-3 br-a-xl relative-position bg1"
            style="max-width:300px;width:100%;"
            :class="
              isDisabled || checkedShip ? 'no-pointer-events' : 'cursor-pointer'
            "
            @click="voteBtn('ship')"
          >
            <div
              class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
              :style="checkedShip ? { opacity: '.6' } : null"
            >
              <div class="q-pt-xs">
                <span class="color1 text-h6"
                  >เรือ ระดับ {{ mission.ship.level }}</span
                >
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
              <div class="q-px-lg" style="height:40px;" align="left">
                <span class="color1"
                  >+ {{ mission.ship.status }} เหรียญเมื่อทำแบบฝึกหัด</span
                >
              </div>
            </div>
            <div
              class="q-px-lg bg5 q-pa-md br-bl-xl br-br-xl"
              align="center"
              :style="checkedShip ? { opacity: '.6' } : null"
            >
              <span class="text-h4 color3 text-bold"
                >{{ mission.ship.goal * totalStudent }} เหรียญ</span
              >
            </div>
          </div>

          <div
            class="absolute-center bg5 br-a-sm q-pa-sm shadow-3"
            style="max-width:330px;width:97%;"
            v-if="checkedShip"
          >
            <div class="border-dashed br-a-sm q-py-md">
              <div class="q-pa-xs">
                คุณจะเลือกเรือ ระดับ {{ mission.ship.level }} ได้ต่อเมื่อ
              </div>
              <div v-if="mission.buddy.level == mission.treasure.level">
                มีคู่หู ระดับ {{ Number(mission.buddy.level) + 1 }} และ สมบัติ
                ชิ้นที่ {{ Number(mission.treasure.level) + 1 }}
              </div>
              <div v-else>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.ship.level) - Number(mission.buddy.level) ==
                      3
                  "
                >
                  มีคู่หู ระดับ {{ Number(mission.buddy.level) + 1 }}
                </div>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.ship.level) -
                      Number(mission.treasure.level) ==
                      3
                  "
                >
                  มีสมบัติ ชิ้นที่ {{ Number(mission.treasure.level) + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- NOTE  Vote 2 : ตัวเลือกที่ 2 -->
      <transition
        appear
        enter-active-class="animated flipInX duration-voteskill2-in"
        leave-active-class="animated bounceOut duration-voteskill-out"
        v-if="isActiveVoteSkill"
      >
        <div class="col-4 q-mt-lg q-pa-xs relative-position" align="center">
          <div align="center" class="animated bounce duration-bounce">
            <q-icon
              name="fas fa-caret-down"
              class="color7"
              size="100px"
              style="height:50px;"
            ></q-icon>
          </div>
          <div
            v-ripple
            align="center"
            class="shadow-3 br-a-xl relative-position bg1"
            style="max-width:300px;width:100%;"
            :class="
              isDisabled || checkedBuddy
                ? 'no-pointer-events'
                : 'cursor-pointer'
            "
            @click="voteBtn('buddy')"
          >
            <div
              class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
              :style="checkedBuddy ? { opacity: '.6' } : null"
            >
              <div class="q-pt-xs">
                <span class="color1 text-h6"
                  >คู่หู ระดับ {{ mission.buddy.level }}</span
                >
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
              <div class="q-px-lg" style="height:40px;" align="center">
                <span class="color1">
                  ลดราคาภารกิจ
                  {{ mission.buddy.status * totalStudent }} เหรียญ
                </span>
              </div>
            </div>
            <div
              class="q-px-lg bg5 q-pa-md br-bl-xl br-br-xl"
              :style="checkedBuddy ? { opacity: '.6' } : null"
              style="max-width:300px;width:100%;"
              align="center"
            >
              <span class="text-h4 color3 text-bold"
                >{{ mission.buddy.goal * totalStudent }} เหรียญ</span
              >
            </div>
          </div>

          <div
            class="absolute-center bg5 br-a-sm q-pa-sm shadow-3"
            style="max-width:330px;width:97%;"
            v-if="checkedBuddy"
          >
            <div class="border-dashed br-a-sm q-py-md">
              <div class="q-pa-xs">
                คุณจะเลือกเรือ ระดับ {{ mission.buddy.level }} ได้ต่อเมื่อ
              </div>
              <div v-if="mission.ship.level == mission.treasure.level">
                มีเรือ ระดับ {{ Number(mission.ship.level) + 1 }} และ สมบัติ
                ชิ้นที่ {{ Number(mission.treasure.level) + 1 }}
              </div>
              <div v-else>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.buddy.level) - Number(mission.ship.level) ==
                      3
                  "
                >
                  มีเรือ ระดับ {{ Number(mission.ship.level) + 1 }}
                </div>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.buddy.level) -
                      Number(mission.treasure.level) ==
                      3
                  "
                >
                  มีสมบัติ ชิ้นที่ {{ Number(mission.treasure.level) + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- NOTE  Vote 3 : ตัวเลือกที่ 3 -->
      <transition
        appear
        enter-active-class="animated flipInX duration-voteskill3-in"
        leave-active-class="animated bounceOut duration-voteskill-out"
        v-if="isActiveVoteSkill"
      >
        <div class="col-4 q-mt-lg q-pa-xs relative-position" align="center">
          <div align="center" class="animated bounce duration-bounce">
            <q-icon
              name="fas fa-caret-down"
              class="color7"
              size="100px"
              style="height:50px;"
            ></q-icon>
          </div>
          <div
            v-ripple
            align="center"
            class="shadow-3 br-a-xl relative-position bg1"
            style="max-width:300px;width:100%;"
            :class="
              isDisabled || checkedTreasure
                ? 'no-pointer-events'
                : 'cursor-pointer'
            "
            @click="voteBtn('treasure')"
          >
            <div
              class="bg3 br-tl-xl br-tr-xl q-pa-sm q-px-lg"
              :style="checkedTreasure ? { opacity: '.6' } : null"
            >
              <div class="q-pt-xs">
                <span class="color1 text-h6"
                  >สมบัติ ชิ้นที่ {{ mission.treasure.level }}</span
                >
              </div>
              <div class="q-py-md">
                <transition
                  appear
                  enter-active-class="animated flipInY duration-flip3-in"
                  leave-active-class="animated flipOutY "
                >
                  <q-img
                    :src="
                      '../../statics/coins/t' + mission.treasure.level + '.png'
                    "
                    style="width:180px;"
                  ></q-img>
                </transition>
              </div>
              <div class="q-px-lg" style="height:40px;" align="center">
                <span class="color1">
                  ได้รับรางวัล
                  {{ mission.treasure.status * totalStudent }} เหรียญ
                </span>
              </div>
            </div>
            <div
              class="q-px-lg bg5 q-pa-md br-bl-xl br-br-xl"
              :style="checkedTreasure ? { opacity: '.6' } : null"
              style="max-width:300px;width:100%;"
              align="center"
            >
              <span class="text-h4 color3 text-bold"
                >{{ mission.treasure.goal * totalStudent }} เหรียญ</span
              >
            </div>
          </div>

          <div
            class="absolute-center bg5 br-a-sm q-pa-sm shadow-3"
            style="max-width:330px;width:97%;"
            v-if="checkedTreasure"
          >
            <div class="border-dashed br-a-sm q-py-md">
              <div class="q-pa-xs">
                คุณจะเลือกเรือ ระดับ {{ mission.treasure.level }} ได้ต่อเมื่อ
              </div>
              <div v-if="mission.ship.level == mission.buddy.level">
                มีเรือ ระดับ {{ Number(mission.ship.level) + 1 }} และ คู่หู
                ชิ้นที่ {{ Number(mission.buddy.level) + 1 }}
              </div>
              <div v-else>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.treasure.level) -
                      Number(mission.ship.level) ==
                      3
                  "
                >
                  มีเรือ ระดับ {{ Number(mission.ship.level) + 1 }}
                </div>
                <div
                  class="q-pa-xs"
                  v-if="
                    Number(mission.treasure.level) -
                      Number(mission.buddy.level) ==
                      3
                  "
                >
                  มีคู่หู ระดับ {{ Number(mission.buddy.level) + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- SECTION  vote status : finish -->
    <div
      class="row q-py-sm q-px-lg relative-position full-width"
      style="z-index:10;"
      v-if="activeType == 'waitingvote'"
    >
      <div class="col self-center relative-position"></div>
      <!-- NOTE  main ship & friend & bridge : แสดง เรือ, คู่หู, สะพาน  -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="isActiveMain"
      >
        <div class="self-end col-lg-4 col-xs-5">
          <div>
            <div align="right">
              <q-img
                style="z-index:10;max-width:1000px;width:80%;"
                src="../../statics/buddy/friend0.png"
                v-if="studentData.buddy == null"
              />
              <q-img
                style="z-index:10;max-width:1000px;width:80%;"
                :src="
                  '../../statics/buddy/friend' +
                    studentData.buddy.level +
                    '.png'
                "
                v-else
              />
              <div style="height:30px;"></div>
            </div>
            <q-img
              src="../../statics/ship/ship0.png"
              class="absolute-bottom-right"
              style="z-index:5;width:96vw;"
              v-if="studentData.ship == null"
            ></q-img>

            <q-img
              v-else
              :src="'../../statics/ship/ship' + studentData.ship.level + '.png'"
              class="absolute-bottom-right"
              style="z-index:5;width:96vw;"
            ></q-img>
          </div>
        </div>
      </transition>

      <!-- NOTE  main Talking : แสดงการพูดคุย -->
      <div
        class="col-12 self-end z-top absolute-bottom"
        style="overflow:hidden;"
      >
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div
            class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md"
            align="left"
          >
            <span
              class="q-pa-md"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              v-html="
                charTalking(
                  currentPage,
                  '',
                  studentData.buddy == null ? '0' : studentData.buddy.level
                )
              "
            ></span>
          </div>
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      currentPage: "",
      studentVote: {},
      mission: {},
      allMission: [],
      allClassMission: [],
      activeType: "",

      isActiveVote: false, // เปิดการใช้งาน : การโหวต
      isActiveVoteSkill: false, // เปิดการใช้งาน : เลิอกทักษะที่ต้องการ

      isActiveMain: false, // เปิดการใช้งาน : ทักษะ
      isActiveMainTalk: false, // เปิดการใช้งาน : การพูดคุย

      isDisabled: false,
      isLoadData: true,

      snapSync: "",
      totalStudent: 0,

      isLoadData: false,

      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    async voteBtn(type) {
      if (this.isDisabled) {
        return;
      }
      this.isDisabled = true;

      this.studentVote.vote = type;

      db.collection("missionvote")
        .add(this.studentVote)
        .then(() => {
          this.isActiveVote = false;
          this.isActiveVoteSkill = false;

          setTimeout(() => {
            this.activeType = "waitingvote";
            this.isActiveMain = true;
            this.isActiveMainTalk = true;
          }, 1000);
        });
    },
    async loadClassroomMission() {
      console.clear();
      if (this.isLoadData) {
        return;
      }

      this.isLoadData = true;

      db.collection("mission")
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({ key: element.id, ...element.data() });
          });
          // ภารกิจทั้งหมด
          temp.sort((a, b) => {
            return Number(b.level) - Number(a.level);
          });
          this.allMission = temp;
          // Load Mission ปัจจุบันของห้องเรียนนี้
          db.collection("classroomMission")
            .where("class", "==", this.studentData.classRoom)
            .where("room", "==", this.studentData.room)
            // .where("term", "==", this.studentData.term)
            .where("year", "==", this.studentData.year)
            .where("schoolKey", "==", this.studentData.schoolKey)
            .where("status", "==", "finish")
            .get()
            .then(doc => {
              let classroomTemp = [];
              doc.forEach(classElement => {
                let dataAdd = {
                  key: classElement.id
                };
                let dataFinal = { ...dataAdd, ...classElement.data() };
                classroomTemp.push(dataFinal);
              });
              this.allClassMission = classroomTemp;

              let shipMission;
              let buddyMission;
              let treasureMission;

              // ภาคกิจเรือทั้งหมด
              shipMission = temp.filter(x => {
                return x.name == "เรือ";
              });
              // ภารกิจคู่หูทั้งหมด

              buddyMission = temp.filter(x => {
                return x.name == "คู่หู";
              });
              // ภารกิจสมบัติทั้งหมด

              treasureMission = temp.filter(x => {
                return x.name == "สมบัติ";
              });

              let classShipMission;
              let classBuddyMission;
              let classTreasureMission;

              let classTempMap = classroomTemp.map(e => {
                return e.currentMissionKey;
              });
              // ภารกิจเรือที่ระดับชั้นนี้ได้ทำ
              classShipMission = shipMission.filter(x => {
                return classTempMap.includes(x.key);
              });

              classShipMission.sort((a, b) => {
                return Number(a.level) - Number(b.level);
              });

              // ภารกิจคู่หูที่ระดับชั้นนี้ได้ทำ

              classBuddyMission = buddyMission.filter(x => {
                return classTempMap.includes(x.key);
              });

              classBuddyMission.sort((a, b) => {
                return Number(a.level) - Number(b.level);
              });

              // ภารกิจสมบัติที่ระดับชั้นนี้ได้ทำ
              classTreasureMission = treasureMission.filter(x => {
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
              let findNextTreasureLv = (
                Number(lastTreasureMissionLV) + 1
              ).toString();

              this.mission.ship = shipMission.filter(x => {
                return x.level == findNextShipLv;
              })[0];
              this.mission.buddy = buddyMission.filter(x => {
                return x.level == findNextBuddyLv;
              })[0];
              this.mission.treasure = treasureMission.filter(x => {
                return x.level == findNextTreasureLv;
              })[0];

              this.studentVote = {
                class: this.studentData.classRoom,
                room: this.studentData.room,
                schoolKey: this.studentData.schoolKey,
                studentKey: this.studentData.key,
                vote: "",
                no: doc.size + 1,
                term: this.studentData.term,
                year: this.studentData.year
              };

              db.collection("missionvote")
                .where("class", "==", this.studentData.classRoom)
                .where("room", "==", this.studentData.room)
                .where("no", "==", this.studentVote.no)
                .where("term", "==", this.studentData.term)
                .where("year", "==", this.studentData.year)
                .where("studentKey", "==", this.studentData.key)
                .get()
                .then(docVote => {
                  if (docVote.size > 0) {
                    this.isLoadData = false;
                    this.activeType = "waitingvote";

                    this.isActiveMain = true;
                    this.isActiveMainTalk = true;
                  } else {
                    this.isLoadData = false;
                    this.activeType = "startvote";

                    this.isActiveVote = true;
                    this.isActiveVoteSkill = true;
                  }

                  this.checkedMission;
                });
            });
        });
    },
    async loadSynchronize() {
      let dateTime = await this.getDateAndTime();

      this.snapSync = await db
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
            this.totalStudent = doc.docs[0].data().totalStudent;

            if (!this.isLoadData) {
              this.loadClassroomMission();
            }
          }
        });
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  computed: {
    checkedShip() {
      let res = this.mission;
      let sl = Number(res.ship.level);
      let bl = Number(res.buddy.level);
      let tl = Number(res.treasure.level);

      if (sl === bl && bl === tl) {
        return false;
      } else {
        // Mission
        if (sl - bl === 3 || sl - tl === 3) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkedBuddy() {
      let res = this.mission;
      let sl = Number(res.ship.level);
      let bl = Number(res.buddy.level);
      let tl = Number(res.treasure.level);

      if (sl === bl && bl === tl) {
        return false;
      } else {
        // Mission
        if (bl - sl === 3 || bl - tl === 3) {
          return true;
        } else {
          return false;
        }
      }
    },
    checkedTreasure() {
      let res = this.mission;
      let sl = Number(res.ship.level);
      let bl = Number(res.buddy.level);
      let tl = Number(res.treasure.level);

      if (sl === bl && bl === tl) {
        return false;
      } else {
        // Mission
        if (tl - sl === 3 || tl - bl === 3) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    if (typeof this.snapSync == "function") {
      this.snapSync();
    }
  }
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
  animation-delay: 0.1s;
  animation-duration: 0.5s;
}
.duration-voteskill2-in {
  animation-delay: 0.4s;
  animation-duration: 0.5s;
}
.duration-voteskill3-in {
  animation-delay: 0.7s;
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

.duration-bounce {
  animation-iteration-count: infinite;
  animation-duration: 2.5s;
  animation-delay: 1s;
}

.duration-talk-in {
  animation-delay: 0.5s;
}
.duration-talk-out {
  animation-delay: 0.3s;
}

.duration-partner-in {
  animation-direction: 0.4s;
}

.duration-partner-out {
  animation-delay: 0.6s;
  animation-direction: 1s;
}
</style>
