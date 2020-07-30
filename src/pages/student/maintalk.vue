<template>
  <q-page class="row justify-center bg-main relative-position">
    <q-resize-observer @resize="onResize" />
    <!-- SECTION  Type = Main -->
    <div
      class="col-12 row relative-position"
      style="padding-top:70px;"
      v-if="
        activeType == 'main' ||
          activeType == 'waiting' ||
          activeType == 'waiting_learn'
      "
    >
      <div class="col row q-py-sm q-px-lg relative-position" style="z-index:10;">
        <!-- NOTE  treasure : สมบัติ -->
        <transition
          appear
          enter-active-class="animated fadeInLeft duration-item-in"
          leave-active-class="animated fadeOutLeft duration-item-out"
          v-if="isActiveMainItem"
        >
          <div
            class="col-12 self-start bg5 q-pa-sm br-a-sm"
            style="width:250px;height:fit-content;"
            v-if="activeType == 'main'"
          >
            <div class="br-a-sm border-dashed">
              <div align="center" class="text-h6 color3 q-my-sm">สมบัติ({{ array.length }})</div>
              <div class="row q-px-md">
                <div
                  class="col-6 q-pa-sm"
                  align="center"
                  v-for="(i, index) in item[pageItem - 1]"
                  :key="index"
                >
                  <q-btn
                    dense
                    class="bg4 border3-lg br-a-xs shadow-2 no-pointer-events"
                    style="width:100%;height:80px;"
                  >
                    <q-img
                      :src="
                        '../../statics/main/item/treasure' + i.name + '.png'
                      "
                      v-if="i.name != ''"
                    ></q-img>
                  </q-btn>
                </div>
              </div>
              <div align="center" class="q-px-lg q-pb-md q-pt-md">
                <div class="row justify-center">
                  <div class="col">
                    <q-btn
                      :disable="pageItem == 1"
                      @click="pageItem--"
                      dense
                      :flat="pageItem == 1"
                      :class="{
                        'disable-arrow color1': pageItem == 1,
                        bg3: pageItem > 1
                      }"
                      class="fit color1"
                      size="15px"
                      icon="fas fa-chevron-left"
                    ></q-btn>
                  </div>
                  <div class="self-center" style="width:100px;">
                    <span class="text-h5 color3">{{ pageItem }}/{{ item.length }}</span>
                  </div>
                  <div class="col">
                    <q-btn
                      :disable="pageItem == item.length"
                      @click="pageItem++"
                      dense
                      :flat="pageItem == item.length"
                      :class="{
                        'disable-arrow color1': pageItem == item.length,
                        bg3: pageItem < item.length
                      }"
                      class="bg3 fit color1"
                      size="15px"
                      icon="fas fa-chevron-right"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- NOTE  Skill : ทักษะ -->
        <transition
          appear
          enter-active-class="animated fadeIn duration-skill-in"
          leave-active-class="animated fadeOut duration-skill-out"
          v-if="isActiveMainSkill"
        >
          <div class="col-12 q-mt-md q-mb-sm self-end">
            <!-- NOTE skill ship : ทักษะเรือ -->
            <div class="col-12 row">
              <div class="col-2 self-center bg5 br-a-xs q-pa-xs" style="width:150px;">
                <div align="center" class="br-a-xs q-pa-md border-dashed">
                  <span class="text-h6 text-bold color3">ทักษะเรือ</span>
                </div>
              </div>
              <div
                class="col q-pa-md bg1 border3-r-md border3-t-md border3-b-md br-br-sm br-tr-sm self-center text-overflow"
              >
                <span class="text-h5 color3">+ 1 คะแนนทันทีเมื่อทำแบบฝึกหัดเสร็จสิ้น</span>
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span class="text-h6">+ 1 คะแนนทันทีเมื่อทำแบบฝึกหัดเสร็จสิ้น</span>
                </q-tooltip>
              </div>
            </div>

            <!-- NOTE  skill partner : ทักษะคู่หู -->
            <div class="col-12 q-mt-md row">
              <div class="col-2 bg5 br-a-xs q-pa-xs" style="width:150px;">
                <div align="center" class="br-a-xs q-pa-md border-dashed">
                  <span class="text-h6 text-bold color3">ทักษะคู่หู</span>
                </div>
              </div>
              <div
                class="col q-pa-md bg1 border3-r-md border3-t-md border3-b-md br-br-sm br-tr-sm self-center text-overflow"
              >
                <span class="text-h5 color3">เป้าหมายที่ต้องทำให้สำเสร็จมีคะแนนลดลง 100 คะแนน</span>
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <span class="text-h6">เป้าหมายที่ต้องทำให้สำเสร็จมีคะแนนลดลง 100 คะแนน</span>
                </q-tooltip>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- NOTE  main ship & friend & bridge : แสดง เรือ, คู่หู, สะพาน  -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        v-if="isActiveMain"
      >
        <div class="col-4 self-end">
          <q-img style="z-index:10;" src="../../statics/buddy/friend10.png" />
          <div>
            <q-img
              src="../../statics/bridge.png"
              class="absolute-bottom-right"
              style="z-index:5;width:100%;"
              :style="[
                innerWidth > 1279 ? { width: '100%' } : { width: '110%' }
              ]"
            ></q-img>
            <img
              src="../../statics/ship/ship4.png"
              class="absolute-right"
              style="top:50%;right:30%;transform:translate(30%,-55%);"
            />
          </div>
        </div>
      </transition>

      <!-- NOTE  main Talking : แสดงการพูดคุย -->
      <div class="col-12 self-end z-top absolute-bottom" style="overflow:hidden;">
        <transition
          appear
          enter-active-class="animated fadeInUp duration-talk-in"
          leave-active-class="animated fadeOutDown duration-talk-out"
          v-if="isActiveMainTalk"
        >
          <div class="boxtalk row bg1 color2 border3-lg br-a-lg q-ma-md" align="left">
            <span
              class="q-pa-md"
              :class="{
                'text-size-s ': innerWidth < 1201,
                'text-size-m': innerWidth > 1200 && innerWidth < 1441,
                'text-size-l': innerWidth > 1440
              }"
              v-html="
                activeType == 'waiting'
                  ? talking.waiting
                  : '' || activeType == 'waiting_learn'
                  ? talking.learn
                  : ''
              "
            ></span>
          </div>
        </transition>
      </div>
    </div>

    <!-- SECTION  Type = Ready -->
    <div class="col-lg-10 col-xs-11 row" style="padding-top:80px;" v-if="activeType == 'ready'">
      <div class="col-4" align="center">
        <div>
          <q-img src="../../statics/main/partner_circle.png" style="max-width:350px;width:85%;"></q-img>
        </div>
        <div class="bg5 q-mt-lg q-pa-sm br-a-sm" style="max-width:300px;width:95%;">
          <div class="br-a-sm border-dashed q-pa-md q-py-lg text-h4 color3">
            <div>
              <span>เรือ ขั้นที่ 4</span>
            </div>
            <div>
              <span>1000 คะแนน</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col q-pt-lg q-pa-lg relative-position" align="center">
        <q-img src="../../statics/main/ready_label.png" style="max-width:850px;width:100%;">
          <div class="absolute-bottom bg-transparent" style="bottom: 8px;">
            <span
              :class="{
                'text-h2': innerWidth < 1280,
                'text-h1 ': innerWidth > 1279
              }"
            >คำศัพท์</span>
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      pageItem: 1,
      item: [],
      array: [],

      // NOTE  Next Step
      activeType: "main", // แสดงผลการทำงานหน้าหลัก : main = หน้าหลัก , vote = หน้าโหวตเลือกทักษะ , ready = เตรียมเข้าสู่บบเรียน , waiting = หน้ารอตอนเลือกโหวตเสร็จ , waiting_learn = หน้ารอตอนคุณครูเลือกแบบฝึกหัด

      talking: {
        waiting: "เดี๋ยวรอเพื่อนๆ เลือกโหวตภารกิจก่อนนะ ลุ้นกัน", // สถานะการพูดคุย : รอตอนเลือกโหวตเสร็จ
        learn: "รอกับตันหาเส้นทาง" // สถานะการพูดคุย : รอตอนเลือกเรียน
      },

      // NOTE  Disabled
      isDisabled: false,

      isActiveMain: true, // เปิดการใช้งาน : รูปภาพหลัก เช่น เรือ, คู่หู, สะพาน
      isActiveMainItem: true, // เปิดการใช้งาน : คลังสมบัติ
      isActiveMainSkill: true, // เปิดการใช้งาน : ทักษะ
      isActiveMainTalk: false, // เปิดการใช้งาน : การพูดคุย

      // Screen size width & height
      innerWidth: window.innerWidth, // เก็บข้อมูลขนาดความกว้าง
      innerHeight: window.innerHeight // เก็บข้อมูลขนาดความสูง
    };
  },
  methods: {
    itemSet() {
      let setItem = 8;
      let setCount = Math.ceil(this.array.length / setItem);
      let start = 0;
      let end = setItem;

      if (setCount > 0) {
        for (let i = 0; i < setCount; i++) {
          let newArr = this.array.slice(start, end);

          if (newArr.length != 8) {
            for (let x = 0; x < 8; x++) {
              let data = {
                name: "",
                type: ""
              };
              newArr.push(data);
              if (newArr.length == 8) {
                break;
              }
            }
          }
          this.item.push(newArr);
          start += setItem;
          end += setItem;
        }
      } else {
        let newArr = [];
        for (let i = 0; i < 8; i++) {
          let data = {
            name: "",
            type: ""
          };

          newArr.push(data);
        }

        this.item.push(newArr);
      }
    },
    onResize(size) {
      (this.innerWidth = size.width), (this.innerHeight = size.height);
    },
    testMove(e) {
      let date = new Date().getTime();

      // console.log(date);
    }
  },
  mounted() {
    this.itemSet();
  }
};
</script>

<style lang="scss" scoped>
.disable-arrow {
  background-color: #bbb;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.duration-talk-in {
  animation-delay: 0.5s;
}
.duration-talk-out {
  animation-delay: 0.3s;
}

.duration-item-in {
  animation-duration: 1s;
}

.duration-item-out {
  animation-duration: 0.6s;
}

.duration-skill-in {
  animation-duration: 1s;
}

.duration-skill-out {
  animation-duration: 0.5s;
}

.duration-partner-in {
  animation-direction: 0.4s;
}

.duration-partner-out {
  animation-delay: 0.6s;
  animation-direction: 1s;
}
</style>
