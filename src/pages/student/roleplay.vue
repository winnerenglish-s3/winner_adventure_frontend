<template>
  <q-page
    class="q-pa-md color3 bg-listening bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="white" size="100" />
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
      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActivePractice"
      >
        <div class="q-mt-md row justify-center">
          <div class="col-lg-9 col-md-12 col-xs-12 relative-position">
            <div class="bg3 q-pa-md br-tl-sm br-tr-sm" align="center">
              <span class="text-h5 color1">
                {{ practiceName }}
                <span>
                  {{
                  "(" +
                  (practice.currentSpeaking + 1) +
                  "/" +
                  speakingList.length +
                  ")"
                  }}
                </span>
              </span>
            </div>
            <div class="bg5 br-bl-sm br-br-sm q-px-md q-pb-md">
              <div class="row border-dashed-sentence br-ba-md">
                <!-- SECTION One  -->
                <div
                  align="center"
                  class="row justify-center items-start q-pa-md full-width"
                  style="min-height:calc(100vh - 350px);max-height:fit-content;"
                >
                  <div class="col q-pa-md" align="left">
                    <div
                      class="color1 bg10 q-pa-xs"
                      style="width:fit-content;width:-webkit-fit-content;border-radius:30px;"
                    >
                      <q-icon size="50px" name="fas fa-user-circle"></q-icon>
                      <span class="q-mx-lg" style="font-size:18px;">
                        {{
                        speakingName.filter(
                        x =>
                        x.key ==
                        speakingList[practice.currentSpeaking].nameKey
                        )[0].name + " : พูดประโยคนี้"
                        }}
                      </span>
                    </div>
                  </div>

                  <div align="center" class="col-12 q-mb-xl q-mt-md q-py-xl">
                    <div>
                      <span style="font-size:50px;">
                        {{
                        speakingList[practice.currentSpeaking].conversationEng
                        }}
                      </span>
                    </div>
                    <div>
                      <span style="font-size:30px;">
                        {{
                        speakingList[practice.currentSpeaking].conversationThai
                        }}
                      </span>
                    </div>
                  </div>
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
      practice: {
        key: "",
        currentSpeaking: 0
      },

      speakingList: [],
      speakingName: [],
      practiceKey: "",
      practiceType: "",
      practiceName: "",
      practiceOrder: "",
      practiceSkill: "",
      practiceLevel: "",
      practiceUnit: "",

      isLoadPractice: false,
      isActivePractice: true,

      isStartPractice: false,
      isFinishPractice: false,

      isDisable: false,

      snapSync: ""
    };
  },
  methods: {
    loadPractice() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;

      db.collection("practicelist")
        .where("level", "==", this.practiceLevel)
        .where("unit", "==", this.practiceUnit)
        .where("practicetype", "==", "speaking")
        .get()
        .then(docPractice => {
          let setNameArr = [];
          let setPracticeArr = [];
          db.collection("conversationSpeaker")
            .where("practicekey", "==", docPractice.docs[0].id)
            .get()
            .then(doc => {
              doc.forEach(result => {
                let dataKey = {
                  key: result.id,
                  ...result.data()
                };
                setNameArr.push(dataKey);
              });

              db.collection("practicepool_server")
                .where("practicekey", "==", docPractice.docs[0].id)
                .get()
                .then(doc => {
                  console.log(
                    "อย่าลืม Sync ข้อมูล เมื่อทำการ เปิดการใช้งาน RolePlay ไม่งั้นจะโหลดข้อมูลไม่ได้"
                  );
                  doc.forEach(result => {
                    if (result.data().rolePlay) {
                      let dataKey = {
                        key: result.id,
                        ...result.data()
                      };
                      setPracticeArr.push(dataKey);
                    }
                  });

                  setPracticeArr.sort((a, b) => {
                    return Number(a.order) - Number(b.order);
                  });

                  this.speakingList = setPracticeArr;

                  let newName = [];

                  for (let i = 0; i < setNameArr.length; i++) {
                    for (let x = 0; x < setPracticeArr.length; x++) {
                      if (setNameArr[i].key == setPracticeArr[x].nameKey) {
                        let dataKey = {
                          name: setNameArr[i].nameConversationer,
                          key: setNameArr[i].key,
                          order: setPracticeArr[x].order
                        };
                        newName.push(dataKey);
                        break;
                      }
                    }
                  }

                  newName.sort((a, b) => {
                    return Number(a.order) - Number(b.order);
                  });

                  this.speakingName = newName;

                  this.isStartPractice = true;
                });
            });
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
            this.practice.currentSpeaking = doc.docs[0].data().currentQuestion;

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

            if (!this.isLoadPractice) {
              // this.$q.localStorage.set(
              //   "useTime",
              //   doc.docs[0].data().date.microtime
              // );

              // NOTE  Delete Local Storage : ลบแบบฝึกหัดก่อนหน้านี้
              this.$q.localStorage.remove("lastPracticeLog");
              this.loadPractice();
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
  }
};
</script>

<style lang="scss" scoped>
.duration-bounce {
  animation-iteration-count: infinite;
  animation-duration: 2.5s;
  animation-delay: 1s;
}

.duration-tada-in {
  animation-duration: 0.5s;
}

.duration-tada-out {
  animation-duration: 1s;
}

.border-dashed-sentence {
  border-right: 2px dashed #662707;
  border-left: 2px dashed #662707;
  border-bottom: 2px dashed #662707;
}

.duration-fade-in {
  animation-duration: 0.5s;
}

.duration-fade-out {
  animation-duration: 0.3s;
}

.duration-fadeOut-caret {
  animation-duration: 0.1s;
}
</style>
