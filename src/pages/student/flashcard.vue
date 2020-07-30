<template>
  <q-page
    class="bg-vocabulary bg-blend-mode q-pa-md color3"
    :class="!isLoadPractice ? 'flex flex-center' : ''"
  >
    <div v-if="!isLoadPractice">
      <q-spinner-hourglass color="deep-orange-10" size="100" />
    </div>

    <transition
      appear
      enter-active-class="animated fadeInDown duration-slide-in"
      leave-active-class="animated fadeOutUp duration-slide-out"
      v-if="isActivePractice"
    >
      <div class="relative-position q-mb-md" align="center" v-if="isLoadPractice">
        <div
          class="bg5 br-a-sm q-pa-xs shadow-2"
          style="width:fit-content;width:-webkit-fit-content;"
        >
          <div class="br-a-sm border-dashed q-px-xl q-py-sm">
            <span class="text-bold" style="font-size:calc(20px + 1vw)">การ์ดคำศัพท์</span>
          </div>
        </div>
      </div>
    </transition>

    <div
      class="row justify-center full-width animated zoomIn duration-zoomIn"
      v-if="isLoadPractice"
    >
      <div class="bg5 col br-a-md q-pa-md" style="max-width:1300px;width:100%;">
        <div class="br-a-md q-pb-xl full-height relative-position">
          <div class="row q-my-lg q-py-sm">
            <div class="col-1 self-center" style="width:80px;" align="left"></div>
            <div
              class="col-3 border-dashed q-px-xs q-py-md"
              style="max-width:200px;width:100%;border-radius:35px;height:fit-content"
            >
              <div align="center" class="self-start">
                <span class="color3" style="font-size:22px;">
                  คำศัพท์ที่
                  {{ currentQuestion + "/" + practiceList.length }}
                </span>
              </div>
            </div>
            <div class="col-1 self-center q-py-md" style="width:80px;" align="left"></div>
          </div>

          <div class="row" v-if="practiceList.length">
            <div class="col-1 self-center q-py-md" style="width:80px;" align="left"></div>
            <!-- TODO : กรณีมีรูปภาพ -->
            <div class="row col border3-xl br-a-xl bg1 self-center" style="height:450px;">
              <div
                align="center"
                class="col-5 self-center q-pa-sm"
                style="width:400px;"
                v-if="checkIsShowImage"
              >
                <q-img
                  :src="
                    vocabKey == ''
                      ? ''
                      : serverPath +
                        'pic_flashcard/' +
                        vocabKey.toLowerCase() +
                        '.jpg'
                  "
                  class="q-my-sm"
                  style="max-width:350px;width:85%;"
                >
                  <div class="absolute-bottom-right bg-transparent">
                    <q-btn push round class="bg3" @click="showImage = true">
                      <q-icon name="fas fa-search-plus"></q-icon>
                    </q-btn>
                  </div>
                </q-img>
              </div>

              <div class="col self-center q-px-sm q-pt-md" align="center">
                <div>
                  <span
                    class="text-bold"
                    style="font-size:42px;"
                    v-if="vocabKey != ''"
                  >{{ showVocabText }}</span>
                </div>
                <div class="q-mt-md">
                  <span style="font-size:38px;" v-if="vocabKey != ''">{{ showMeaningText }}</span>
                </div>
              </div>
            </div>
            <div class="col-1 self-center q-py-md" style="width:80px;" align="left"></div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="showImage" content-class="backdrop" v-if="isLoadPractice">
      <q-card style="width: 60%; max-width: 650px;">
        <q-img
          contain
          :src="
            flashcardKey == ''
              ? ''
              : serverPath + 'pic_flashcard/' + flashcardKey + '.jpg'
          "
        >
          <div class="absolute-top-right bg-transparent">
            <q-btn push round class="bg3" @click="showImage = false">
              <q-icon name="fas fa-times"></q-icon>
            </q-btn>
          </div>
        </q-img>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
export default {
  data() {
    return {
      showImage: false,
      practiceKey: "",
      vocabKey: "",
      practiceWorld: "",
      currentQuestion: 0,
      flashcardKey: "",

      practiceList: [],

      isLoadPractice: false,
      isActivePractice: true,

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
          let temp = [];

          if (doc.size) {
            doc.forEach(data => {
              let dataKey = {
                key: data.id
              };

              temp.push({ ...dataKey, ...data.data() });
            });

            this.practiceList = temp;
          }
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
            this.practiceKey = doc.docs[0].data().practiceKey;

            this.vocabKey = doc.docs[0].data().currentVocabKey;

            this.flashcardKey = this.vocabKey.toLowerCase();

            this.currentQuestion = doc.docs[0].data().currentQuestion + 1;
            this.practiceWorld = doc.docs[0].data().skill;

            if (!this.isLoadPractice) {
              this.loadPractice();
            }
          }
        });
    }
  },
  computed: {
    showVocabText() {
      let result = this.practiceList.filter(x => {
        return x.key == this.vocabKey;
      })[0].vocabulary;

      return result;
    },
    showMeaningText() {
      let result = this.practiceList.filter(x => {
        return x.key == this.vocabKey;
      })[0].meaning;

      return result;
    },
    checkIsShowImage() {
      let result = this.practiceList.filter(x => {
        return x.key == this.vocabKey;
      })[0].isShowImage;

      if (!result) {
        this.showImage = false;
      }

      return result;
    }
  },
  created() {
    this.loadSynchronize();
  },
  beforeDestroy() {
    this.snapSync();
  }
};
</script>

<style lang="scss">
.duration-zoomIn {
  animation-duration: 0.5s;
}

.duration-bounceIn {
  animation-duration: 50s;
}
.duration-slide-in {
  animation-duration: 0.5s;
}
.duration-slide-out {
  animation-duration: 0.5s;
}
</style>
