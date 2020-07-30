<template>
  <q-page class="bg-placement relative-position animated fadeIn">
    <q-resize-observer @resize="onResize" />

    <!-- SECTION  Main Logo -->
    <div align="center" class="full-width q-pb-md">
      <transition
        appear
        enter-active-class="animated fadeInDown duration-label"
        leave-active-class="animated fadeOutUp duration-label"
      >
        <img src="../../statics/placement/placement_label.png" style="width:350px;" />
      </transition>
    </div>

    <!-- SECTION  Main Talking -->
    <div class="q-px-xl q-pb-lg sticky-boxtalk" v-if="activeType != 'start'">
      <div align="right">
        <transition
          appear
          enter-active-class="animated fadeIn duration-charactor-in"
          leave-active-class="animated fadeOut duration-charactor-out"
          v-if="isActiveMainCharactor"
        >
          <img
            class="absolute-bottom-right"
            src="../../statics/placement/pirates_captain.png"
            style="height:calc(100vh - 110px);bottom:-85px;right:45px;"
          />
        </transition>
      </div>

      <transition
        appear
        enter-active-class="animated fadeInUp duration-boxtalk-in"
        leave-active-class="animated fadeOutDown duration-boxtalk-out"
        v-if="isActiveMainTalk"
      >
        <div class="relative-position">
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-pa-md">
            <div class="col q-pa-xs q-pr-md" align="left">
              <!-- NOTE  Type = Ready -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'ready'"
                v-html="talking.ready"
              ></span>

              <!-- NOTE  Active Type = Continue -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'continue'"
                v-html="talking.continue"
              ></span>

              <!-- NOTE  Active Type = waiting -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'waiting'"
                v-html="talking.waiting"
              ></span>

              <!-- NOTE  Active Type = finish -->
              <span
                :class="{
                  'text-size-s ': innerWidth < 1201,
                  'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                  'text-size-l': innerWidth > 1440
                }"
                v-if="activeType == 'finish'"
                v-html="talking.finish"
              ></span>
            </div>
            <div class="col-2 self-end" style="width:200px;" align="center">
              <q-btn
                v-if="activeType != 'finish'"
                class="bg6 color3 text-h6 q-py-xs q-my-md q-px-sm"
                label="เริ่มทดสอบ"
                @click="startPlacement()"
              />
              <q-btn
                v-else
                class="bg6 color3 text-h6 q-py-xs q-my-md q-px-sm"
                label="ออกจากระบบ"
                @click="logout()"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- SECTION  Show Data -->
    <progress-data
      v-if="activeType == 'start'"
      :collection="'studentplacementlog'"
      :practiceType="{ type: this.practice.type }"
      @finish="
        val => {
          finishPlacement(val.activeType);
        }
      "
    ></progress-data>
  </q-page>
</template>

<script>
import { db } from "../../router/index.js";
import progressData from "../../components/progress.vue";
export default {
  components: {
    progressData
  },
  data() {
    return {
      practice: {
        type: "placement"
      },
      // SECTION  Status Active
      activeType: "ready", // เก็บข้อมูลประเภท ready , start , finish
      showData: 1,
      talking: {
        ready:
          "กัปตัน ท่านและลูกเรือคือผู้อาสาออกล่าสมบัติให้ราชาสินะ ข้าจะมอบเรือให้ แต่ลูกเรือของท่านต้องเข้าร่วมการทดสอบของข้าเสียก่อน....",
        finish:
          "กัปตัน หากลูกเรือของท่านผ่านการทดสอบทุกคนแล้ว ให้ท่านออกจากระบบได้เลย  แล้วกลับมารับเรือของท่านและเริ่มการผจญภัยได้ในครั้งต่อไป",
        continue:
          "เรือของท่านยังไม่พร้อมออกเดินทาง ข้ากำลังเตรียมเรือให้ท่านอยู่...."
      },

      isActiveMainTalk: true, // เปิดใข้งาน Animation : แบบสนทนา
      isActiveMainCharactor: true, //เปิดใช้งาน Animation : รูปโจรสลัด

      // SECTION  Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    logout() {
      db.collection("student")
        .where(
          "room",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2)
        )
        .where(
          "classRoom",
          "==",
          this.decrypt(this.$q.localStorage.getItem("currentClass"), 2)
        )
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then(doc => {
          doc.forEach(element => {
            db.collection("student")
              .doc(element.id)
              .update({ status: "waiting" });
          });
          this.$router.push("/login");
        });
    },
    startPlacement() {
      // this.$q.dialog({});

      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: "start-placement"
        })
        .then(() => {
          // console.log("RETURN");
          this.activeType = "start";
          this.$q.localStorage.set("startPlacement", true);
        });
    },
    finishPlacement(type) {
      // Status : Start
      if (type == "start") {
        setTimeout(() => {
          this.activeType = "finish";
          this.isActiveMainTalk = true;
          this.isActiveMainCharactor = true;
          this.$q.localStorage.remove("startPlacement");
        }, 1200);
      }

      // Status : Finish
      else {
        this.isActiveMainTalk = false;
        this.activeType = "ready";

        setTimeout(() => {
          this.isActiveMainTalk = true;
        }, 500);
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    }
  },
  mounted() {
    if (this.$q.localStorage.has("startPlacement")) {
      this.activeType = "start";
    }
  }
};
</script>

<style lang="scss" scoped>
.text-size-s {
  font-size: 24px;
}

.text-size-m {
  font-size: 27px;
}

.text-size-l {
  font-size: 30px;
}

.boxtalk {
  max-height: fit-content;
  min-height: 200px;
}

.sticky-boxtalk {
  position: sticky;
  top: 100%;
}

.duration-label {
  animation-delay: 0.3s;
}

.duration-charactor-in {
  animation-delay: 0.2s;
}
.duration-charactor-out {
  animation-delay: 0.5s;
}

.duration-boxtalk-in {
  animation-delay: 0.5s;
}
.duration-boxtalk-out {
  animation-delay: 0.3s;
}
</style>
