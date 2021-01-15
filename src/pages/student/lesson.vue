<template>
  <q-page
    class="q-pa-md color3 bg-blend-mode animated fadeIn"
    :class="[
      !isLoadPractice ? 'bg5 flex flex-center' : null,
      practiceSkill == 'Grammar' ? 'bg-grammar' : null,
      practiceSkill == 'Phonics' ? 'bg-phonics' : null,
      practiceSkill == 'Listening & Speaking' ? 'bg-listening' : null
    ]"
  >
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="white" size="100" />
    </div>

    <div v-if="isLoadPractice && isStartPractice">
      <transition
        appear
        enter-active-class="animated fadeInDown "
        leave-active-class="animated fadeOutUp "
        v-if="isActivePractice"
      >
        <div class="relative-position" align="center">
          <div
            class="bg5 br-a-sm q-pa-xs shadow-2"
            style="width:fit-content;width:-webkit-fit-content;"
          >
            <div class="border-dashed br-a-sm q-px-xl q-py-sm">
              <span class="text-bold" style="font-size:calc(20px + 1vw)">{{
                convertPracticeName(practiceType, practiceSkill)
              }}</span>
            </div>
          </div>
        </div>
      </transition>

      <transition
        appear
        enter-active-class="animated fadeIn duration-fade-in "
        leave-active-class="animated fadeOut duration-fade-out "
        v-if="isActivePractice"
      >
        <div class="q-mt-md row justify-center">
          <div
            class="q-pa-md bg5 col-12 br-a-md"
            style="max-width:1200px;width:100%;"
          >
            <div v-if="practiceType == 'speaking'">
              <div
                class="border-dashed row justify-center items-center br-a-md q-pa-md"
                align="center"
                style="height:calc(100vh - 300px);"
              >
                <span style="font-size:3vw">ตั้งใจดูบนหน้าจอกัปตัน</span>
              </div>
            </div>
            <div v-if="practiceType == 'languagetips'">
              <!-- <div
                v-if="
                  practice.currentQuestion == 0 &&
                    practiceList[practice.currentQuestion].practicetype !=
                      'languagetips'
                "
              >
                <div
                  class="border-dashed row justify-center items-center br-a-md q-pa-md"
                  align="center"
                  style="height:calc(100vh - 300px);"
                >
                  <span style="font-size:3vw">ตั้งใจดูบนหน้าจอกัปตัน</span>
                </div>
              </div> -->
              <div>
                <q-img
                  :src="practiceList[practice.currentQuestion].imgURL"
                  style="width:100%;"
                />
              </div>
            </div>
            <div
              v-if="
                practiceType != 'speaking' && practiceType != 'languagetips'
              "
              align="center"
            >
              <q-img
                :src="practiceList[practice.currentQuestion].imgURL"
                style="width:100%;"
              />
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
        currentQuestion: 0
      },
      practiceSkill: "",
      practiceType: "",
      practiceList: [],
      practiceKey: "",

      isLoadPractice: false,
      isActivePractice: true,
      isStartPractice: false,

      isLoad: false,
      snapSync: ""
    };
  },
  methods: {
    loadPractice() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;

      db.collection("practicepool_server")
        .where("practicekey", "==", this.practiceKey)
        .get()
        .then(doc => {
          if (doc.size) {
            let temp = [];
            doc.forEach(result => {
              let dataKey = {
                key: result.id,
                ...result.data()
              };

              temp.push(dataKey);
            });

            temp.sort((a, b) => {
              return Number(a.order) - Number(b.order);
            });

            this.practiceList = temp;

            this.isStartPractice = true;
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
            this.practiceType = doc.docs[0].data().practicetype;
            this.practiceSkill = doc.docs[0].data().skill;

            this.practice.currentQuestion = doc.docs[0].data().lessonIndex
              ? doc.docs[0].data().lessonIndex
              : 0;

            if (this.practiceType == "speaking") {
              this.isLoadPractice = false;
            }

            if (!this.isLoadPractice) {
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

<style lang="scss" scoped></style>
