<template>
  <q-page
    class="q-pa-md color3 bg-reading bg-blend-mode animated fadeIn"
    :class="!isLoadPractice ? 'bg5 flex flex-center' : ' '"
  >
    <!-- TODO : Loading Page -->
    <div class v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <!-- TODO : ป้ายกำกับแบบฝึกหัด -->
    <transition
      appear
      enter-active-class="animated fadeInDown "
      leave-active-class="animated fadeOutUp "
      v-if="isActivePractice"
    >
      <div class="relative-position" align="center" v-if="isLoadPractice">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="border-dashed br-a-sm q-px-xl q-py-sm">
            <span
              class="text-bold"
              style="font-size:calc(20px + 1vw)"
            >{{convertPracticeName(practiceType,practiceSkill)}}</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- TODO : แสดงแบบฝึกหัด -->
    <transition
      appear
      enter-active-class="animated fadeIn duration-fade-in "
      leave-active-class="animated fadeOut duration-fade-out "
      v-if="isActivePractice"
    >
      <div class="q-mt-md row justify-center" v-if="isLoadPractice">
        <div class="col-lg-9 col-md-12 col-xs-12 relative-position">
          <div class="bg3 q-pa-md br-tl-sm br-tr-sm" align="center">
            <span
              class="color1"
              style="font-size:calc(16px + 1vw)"
              v-html="readingContent.titleEng"
            ></span>
          </div>
          <div class="bg5 br-bl-xl br-br-xl q-px-md q-pb-md">
            <div class="border-dashed-sentence br-bl-xl br-br-xl q-pb-xl">
              <div align="center" class="q-pt-lg">
                <span class="text-h5">
                  ประโยคที่
                  {{ practice.currentQuestion + 1 + "/" + readingSpeak.length }}
                </span>
              </div>
              <!-- <div class="q-mb-sm" align="center">
                <q-img :src="readingContent.imageURL" style="max-width:800px;width:95%;"></q-img>
              </div>-->
              <div class="q-px-xl q-mt-xl q-mb-xl row justify-center q-py-lg" align="center">
                <div>
                  <div
                    v-if="readingSpeak.length > 0"
                    style="font-size:calc(14px + 1vw)"
                    v-html="readingSpeak[practice.currentQuestion].sentenceEng"
                  ></div>
                  <br />
                  <div
                    id="contentThai"
                    style="font-size:calc(14px + 1vw)"
                    v-if="readingSpeak.length > 0"
                    v-html="readingSpeak[practice.currentQuestion].sentenceThai"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      practice: {
        currentQuestion: 0 // ข้อที่ทำแบบฝึกหัดปัจจุบัน
      },
      readingContentKey: "", // reading content key
      readingContent: "", //
      readingSpeak: [],
      practiceKey: "", // key แบบฝึกหัด

      isLoadPractice: true,
      isActivePractice: true,

      isLoad: false,

      snapSync: "",
      practiceType: "",
      practiceSkill: "",
      isLoadPractice: false
    };
  },
  methods: {
    loadPractice() {
      if (this.isLoadPractice) {
        return;
      }

      this.isLoadPractice = true;
      // NOTE  Load Reading Content
      db.collection("readingcontent_server")
        .where("practicekey", "==", this.readingContentKey)
        .get()
        .then(doc => {
          // NOTE  กรณีมีข้อมูลแบบฝึกหัด
          if (doc.size) {
            let newData = {
              key: doc.docs[0].id,
              ...doc.docs[0].data()
            };

            this.readingContent = newData;

            // NOTE  Load Reading Speak
            db.collection("readingcontent_server")
              .doc(this.readingContent.key)
              .collection("speakPractice")
              .get()
              .then(speakDoc => {
                if (speakDoc.size) {
                  speakDoc.forEach(result => {
                    let dataKey = {
                      key: result.id,
                      ...result.data()
                    };

                    this.readingSpeak.push(dataKey);
                  });

                  this.readingSpeak.sort((a, b) => {
                    return Number(a.order) - Number(b.order);
                  });

                  setTimeout(() => {
                    document.documentElement.scrollTop =
                      document.documentElement.scrollHeight;
                  }, 700);
                }
              });
          } else {
            this.$router.push("/student/practice/waiting");
            return;
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
            this.readingContentKey = doc.docs[0].data().readingContentKey;
            this.practiceType = doc.docs[0].data().practicetype;
            this.practiceSkill = doc.docs[0].data().skill;

            this.practice.currentQuestion = doc.docs[0].data().lessonIndex;

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
  mounted() {
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
</style>
