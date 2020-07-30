<template>
  <q-page
    class="relative-position q-pa-sm animated fadeIn"
    :class="
      currentPractice.skill == 'Vocabulary'
        ? 'bg-vocabulary'
        : currentPractice.skill == 'Grammar'
        ? 'bg-grammar'
        : currentPractice.skill == 'Reading'
        ? 'bg-reading'
        : currentPractice.skill == 'Writing'
        ? 'bg-writing'
        : currentPractice.skill == 'Phonics'
        ? 'bg-phonics'
        : currentPractice.skill == 'Listening & Speaking'
        ? 'bg-listening'
        : ''
    "
  >
    <div class="relative-position q-mb-md" align="center">
      <div
        class="bg5 br-a-sm q-pa-xs shadow-2 q-mt-lg"
        style="width:fit-content;width:-webkit-fit-content;"
      >
        <div class="br-a-sm border-dashed q-px-xl q-py-sm relative-position">
          <span class="text-bold color3" style="font-size:calc(20px + 1vw)">
            {{
            convertPracticeName(
            currentPractice.practicetype,
            currentPractice.skill
            )
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-12 q-mt-lg">
      <!-- Start Progress -->
      <div>
        <!-- SECTION  Main Practice  -->
        <div class="q-pa-xs q-mt-md">
          <transition
            appear
            enter-active-class="animated zoomIn duration-practice-start-in"
            leave-active-class="animated bounceOut duration-practice-start-out"
          >
            <div class="row box-practice q-px-xl relative-position">
              <div class="col-12 relative-position" v-if="!isLoadData">
                <!-- NOTE  Timer : ตัวจับเวลา -->
                <div
                  class="absolute-bottom-right"
                  v-if="
                    !finishClicked &&
                      !showReadingContent &&
                      !showTranslationContent
                  "
                  style="bottom:15px;"
                >
                  <transition
                    appear
                    enter-active-class="animated bounceIn duration-timer-in"
                    leave-active-class="animated bounceOut duration-timer-out"
                  >
                    <countdown-timer
                      class="relative-position"
                      style="top:-10px"
                      :practiceTimeProps="currentPractice.time"
                      :isExtraTime="true"
                      @isTimeout="val => (val ? finishTimeout() : null)"
                    ></countdown-timer>
                  </transition>
                </div>
              </div>

              <!-- NOTE  Show Data : แสดงข้อมูลเด็กนักเรียนที่กำลังทำอยู่ -->
              <div class="col-12" style="z-index:5">
                <div
                  class="bg5 br-a-md q-pa-md"
                  v-if="!showReadingContent && !showTranslationContent"
                >
                  <div>
                    <div
                      v-if="
                        !finishClicked &&
                          !showReadingContent &&
                          !showTranslationContent
                      "
                      class="text-h6 q-pa-md br-a-md"
                      style="border:1px dashed #000;border-width:2px;"
                    >
                      <!-- NOTE  Header Content : แเสดงข้องมูลส่วนบน -->
                      <div class="row justify-end items-center" v-if="!isLoadData">
                        <div class="col color3">ความก้าวหน้าของลูกเรือ</div>
                        <div class="col-4" style="width:300px;">
                          <div class="bg1 row justify-between border3-sm br-a-xs q-pa-sm">
                            <div class="self-end" align="left">
                              <span class="relative-position q-px-sm">ลูกเรือที่ทำเสร็จ</span>
                            </div>
                            <div class="self-end" align="right">
                              <q-icon name="far fa-user" class="q-pb-sm" size="30px" />
                              <span class="relative-position q-px-sm">
                                {{
                                totalFinish + "/" + totalOnlineStudent
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- NOTE  Body Content : แเสดงข้องมูลการทำแบบฝึกหัด -->
                      <div
                        class="row justify-center items-center box-progress-bar"
                        v-if="isLoadData"
                      >
                        <q-spinner-hourglass color="deep-orange-10" size="100" />
                      </div>

                      <div class="row" v-else>
                        <!--NOTE  Arrow Left : ปุ่มด้านซ้ายถัดไป -->
                        <transition
                          appear
                          enter-active-class="animated fadeIn"
                          leave-active-class="animated fadeOut"
                          v-if="isArrowLeft"
                        >
                          <div
                            class="col-2 bg5 self-center"
                            align="left"
                            style="width:50px;z-index:10;"
                          >
                            <q-btn
                              @click="
                                (showProgress = 'one'),
                                  (isArrowLeft = !isArrowLeft),
                                  (isArrowRight = !isArrowRight)
                              "
                              dense
                              style="height:200px;"
                              icon="fas fa-chevron-left"
                              class="bg3 color6 text-h6"
                            />
                          </div>
                        </transition>

                        <div class="col">
                          <q-tab-panels
                            v-model="showProgress"
                            class="bg5"
                            animated
                            v-touch-swipe.mouse.left="handleSwipe"
                          >
                            <!-- SECTION  ตารางข้อมูลที่ 1 -->
                            <q-tab-panel name="one">
                              <div class="row box-progress-bar">
                                <div class="self-end col-12" style="z-index:5;">
                                  <!-- TOTAL QUESTION <= 10 -->
                                  <div class="row" align="center" v-if="totalQuestion <= 10">
                                    <div
                                      class="col self-end"
                                      style="font-size:15px;font-weight:bold;"
                                      v-for="i in totalQuestion"
                                      :key="i"
                                    >
                                      <div class="q-px-sm">
                                        <span>
                                          {{
                                          studentData.filter(x => {
                                          return x.currentQuestion == i;
                                          }).length
                                          }}
                                          คน
                                        </span>
                                        <div
                                          class="bg10"
                                          :style="
                                            (studentData.filter(x => {
                                              return x.currentQuestion == i;
                                            }).length *
                                              300) /
                                              totalOnlineStudent >
                                            0
                                              ? 'height:' +
                                                (studentData.filter(x => {
                                                  return x.currentQuestion == i;
                                                }).length *
                                                  300) /
                                                  totalOnlineStudent +
                                                'px'
                                              : 'height:10px'
                                          "
                                        ></div>
                                      </div>

                                      <div class="line-bar">
                                        <span>{{ i }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <!-- TOTAL QUESTION > 10 -->
                                  <div class="row" align="center" v-else>
                                    <div
                                      class="col self-end"
                                      style="font-size:15px;font-weight:bold;"
                                      v-for="(item, index) in progressData"
                                      :key="index"
                                    >
                                      <div class="q-px-sm">
                                        <span>
                                          {{
                                          studentData.filter(x => {
                                          return (
                                          x.currentQuestion >=
                                          item.start &&
                                          item.end >= x.currentQuestion
                                          );
                                          }).length
                                          }}
                                          คน
                                        </span>

                                        <div
                                          class="bg10"
                                          :style="
                                            (studentData.filter(x => {
                                              return (
                                                x.currentQuestion >=
                                                  item.start &&
                                                item.end >= x.currentQuestion
                                              );
                                            }).length *
                                              300) /
                                              totalOnlineStudent >
                                            0
                                              ? 'height:' +
                                                (studentData.filter(x => {
                                                  return (
                                                    x.currentQuestion >=
                                                      item.start &&
                                                    item.end >=
                                                      x.currentQuestion
                                                  );
                                                }).length *
                                                  300) /
                                                  totalOnlineStudent +
                                                'px'
                                              : 'height:10px'
                                          "
                                        ></div>
                                      </div>

                                      <div class="line-bar">
                                        <span>
                                          {{ item.start }} -
                                          {{ item.end }}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div align="center">
                                    <span
                                      class="relative-position"
                                      style="left:25px"
                                    >ข้อปัจจุบันที่ลูกเรือทำอยู่</span>
                                  </div>
                                </div>
                              </div>
                            </q-tab-panel>

                            <!-- SECTION  ตารางข้อมูลที่ 2 -->
                            <q-tab-panel name="two" v-touch-swipe.mouse.right="handleSwipe">
                              <div
                                class="row box-progress-student me-scrollbar"
                                v-if="studentData.length"
                              >
                                <table class="table-spacing">
                                  <tr class="text-body1 z-top">
                                    <td class="table-sticky">
                                      <div align="center" class="q-pa-xs">
                                        <span>เลขที่</span>
                                      </div>
                                    </td>
                                    <td class="table-sticky">
                                      <div align="center">
                                        <span>ชื่อ-นามสกุล</span>
                                      </div>
                                    </td>
                                    <td class="table-sticky" style="width:350px;">
                                      <div align="center">
                                        <span>ข้อที่ลูกเรือกำลังทำ</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tbody>
                                    <tr v-for="(item, index) in studentData" :key="index">
                                      <td
                                        style="width:60px;"
                                        class="br-tl-xs br-bl-xs"
                                        :class="{
                                          bg9: index % 2 == 0,
                                          bg4: index % 2 == 1
                                        }"
                                        align="center"
                                      >
                                        <div>
                                          <span>{{ item.studentNo }}</span>
                                        </div>
                                      </td>
                                      <td
                                        align="left"
                                        :class="{
                                          bg9: index % 2 == 0,
                                          bg4: index % 2 == 1
                                        }"
                                        style="width:200px"
                                      >
                                        <div class="q-px-sm text-ellipsis">
                                          <span style="font-size:18px;">
                                            {{
                                            item.studentName
                                            }}
                                          </span>
                                        </div>
                                      </td>
                                      <td
                                        class="br-tr-xs br-br-xs q-py-sm q-px-md"
                                        :class="{
                                          bg9: index % 2 == 0,
                                          bg4: index % 2 == 1
                                        }"
                                      >
                                        <!-- bg10 color1 เสร็จแล้ว -->
                                        <!-- bg8 color1 กำลังทำ -->
                                        <!-- bg1 border2-r-md ยังทำไม่ถึง -->
                                        <!-- TOTAL QUESTION <= 10 -->
                                        <div
                                          class="row box-question border2-md"
                                          v-if="totalQuestion <= 10"
                                        >
                                          <div
                                            v-for="i in totalQuestion"
                                            :key="i"
                                            class="col q-pa-xs"
                                            :class="{
                                              'bg8 color1':
                                                item.currentQuestion == i,
                                              'bg10 color1':
                                                i < item.currentQuestion,
                                              bg1: i > item.currentQuestion,
                                              'border2-r-md': i != totalQuestion
                                            }"
                                            align="center"
                                          >
                                            <span>{{ i }}</span>
                                          </div>
                                        </div>
                                        <!-- TOTAL QUESTION >10 -->
                                        <div class="row box-question border2-md" v-else>
                                          <div
                                            v-for="(items,
                                            index) in progressData"
                                            :key="index"
                                            class="col q-pa-xs border2-r-sm"
                                            align="center"
                                            :class="{
                                              bg1:
                                                items.start >
                                                item.currentQuestion,
                                              'bg8 color1':
                                                item.currentQuestion >=
                                                  items.start &&
                                                item.currentQuestion <=
                                                  items.end,
                                              'bg10 color1':
                                                item.currentQuestion >
                                                items.end,
                                              'border2-r-md':
                                                index + 1 != progressData.length
                                            }"
                                          >
                                            <span v-if="items.start == items.end">{{ items.start }}</span>
                                            <span v-else>
                                              {{ items.start }} -
                                              {{ items.end }}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div
                                v-else
                                class="box-progress-student row items-center justify-center me-scrollbar"
                              >
                                <div align="center" class="text-h5 color3">ไม่พบข้อมูล</div>
                              </div>
                            </q-tab-panel>
                          </q-tab-panels>
                        </div>

                        <!--NOTE  Arrow RIght : ปุ่มด้านขวาถัดไป -->
                        <transition
                          appear
                          enter-active-class="animated fadeIn"
                          leave-active-class="animated fadeOut"
                          v-if="isArrowRight"
                        >
                          <div
                            class="col-2 bg5 self-center"
                            align="right"
                            style="width:50px;z-index:10;"
                          >
                            <q-btn
                              @click="
                                (showProgress = 'two'),
                                  (isArrowLeft = !isArrowLeft),
                                  (isArrowRight = !isArrowRight)
                              "
                              dense
                              style="height:200px;"
                              icon="fas fa-chevron-right"
                              class="bg3 color6 text-h6"
                            />
                          </div>
                        </transition>
                      </div>

                      <!-- Footer Content : แสดงข้อมูลล่างสุด -->
                      <div align="center" v-if="!isLoadData">
                        <q-btn
                          :label="
                            currentPractice.practicetype.includes('review')
                              ? 'จบการทบทวน'
                              : 'จบภารกิจ'
                          "
                          class="q-py-xs q-px-lg bg3 color6"
                          style="font-size:18px;"
                          :disable="isClickFinishReview"
                          @click="showFinishMission()"
                        />
                      </div>
                    </div>

                    <!-- ************************ หน้าสรุป กราฟ %  ************************-->
                    <div
                      class="q-pa-md br-a-md"
                      style="border:1px dashed #000;border-width:2px;"
                      v-else-if="!showReadingContent && !showTranslationContent"
                    >
                      <div v-show="true" class="q-px-lg">
                        <div align="center" class="color3 text-h5">รายงานผลภารกิจ</div>

                        <div class="color3 q-pt-md text-h6">อัตราความสำเร็จ</div>
                        <div class="q-px-lg">
                          <div class="bg1 relative-position q-mt-md" style="width:100%">
                            <!-- NOTE ขีดแรก -->
                            <div
                              class="absolute color7"
                              style="top:-19px;left:-0.5px;font-size:16px"
                            >|</div>
                            <!-- NOTE ขีดกลาง -->
                            <div
                              class="absolute color7"
                              align="right"
                              style="top:-19px;left:1px;width:50%;font-size:16px"
                            >|</div>
                            <!-- NOTE ขีดขวา -->
                            <div
                              class="absolute color7"
                              style="top:-19px;left:0.5px;width:100%;font-size:16px"
                              align="right"
                            >|</div>
                            <div
                              :class="successPercent >= 50 ? 'bg10' : 'bg7'"
                              :style="'width:' + successPercent + '%'"
                            >
                              <!-- NOTE Green Bar -->
                              <div align="right" class="text-white q-pr-sm">{{ successPercent }}%</div>
                            </div>
                            <div class="color7 absolute" style="top:25px;left:-5px">0%</div>
                            <div
                              class="color7 absolute"
                              style="top:25px;left:0px;width:52%"
                              align="right"
                            >50%</div>
                            <div
                              class="color7 absolute"
                              style="top:25px;left:20px;width:100%"
                              align="right"
                            >100%</div>
                          </div>
                        </div>

                        <div class="q-my-lg">
                          <div class="color3 q-pt-md text-h6">คะแนนเฉลี่ย</div>
                          <div class="q-px-lg">
                            <div class="bg1 relative-position q-mt-md" style="width:100%">
                              <!-- NOTE ขีดแรก -->
                              <div
                                class="absolute color7"
                                style="top:-19px;left:-0.5px;font-size:16px"
                              >|</div>
                              <!-- NOTE ขีดกลาง -->
                              <div
                                class="absolute color7"
                                align="right"
                                style="top:-19px;left:1px;width:50%;font-size:16px"
                              >|</div>
                              <!-- NOTE ขีดขวา -->
                              <div
                                class="absolute color7"
                                style="top:-19px;left:0.5px;width:100%;font-size:16px"
                                align="right"
                              >|</div>
                              <div
                                :class="avgScore >= 50 ? 'bg10' : 'bg7'"
                                :style="'width:' + avgScore + '%'"
                              >
                                <!-- NOTE Green Bar -->
                                <div align="right" class="text-white q-pr-sm">{{ avgScore }}%</div>
                              </div>
                              <div class="color7 absolute" style="top:25px;left:-5px">0%</div>
                              <div
                                class="color7 absolute"
                                style="top:25px;left:0px;width:52%"
                                align="right"
                              >50%</div>
                              <div
                                class="color7 absolute"
                                style="top:25px;left:20px;width:100%"
                                align="right"
                              >100%</div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="q-py-lg row justify-center color3"
                          align="left"
                          style="font-size:22px"
                        >
                          <div
                            v-if="avgScore < 50 && successPercent < 50"
                          >"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดไม่ถูกต้องและทำช้ากว่าปกติ"</div>
                          <div v-else-if="avgScore < 50">"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดไม่ถูกต้อง"</div>
                          <div
                            v-else-if="successPercent < 50"
                          >"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดช้ากว่าปกติ"</div>
                          <div v-else>"ลูกเรือส่วนใหญ่ทำแบบฝึกหัดผ่านเกณฑ์"</div>
                        </div>

                        <!-- FOOTER BUTTON -->
                        <div class="q-pt-lg">
                          <div class="relative-position">
                            <q-btn
                              :disable="isClickFinishReview"
                              @click="showRetry()"
                              label="ทำอีกครั้ง"
                              icon="fas fa-redo"
                              class="q-py-xs q-px-sm bg6 color3"
                              style="font-size:18px;width:215px"
                            />
                            <q-btn
                              @click="nextLesson()"
                              :disable="isClickNextLesson"
                              label="ภารกิจถัดไป"
                              icon="fas fa-star"
                              class="q-py-xs q-px-lg bg3 color6 absolute-center"
                              style="font-size:18px;width:215px"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="false">
                        <!-- NOTE รูปแบบเก่า -->
                        <!-- HEADER TEXT -->
                        <span class="color3">แผนภูมิการกระจายผลคะแนนของลูกเรือ</span>

                        <div class="color3">
                          คะแนนเฉลี่ย
                          <span class="color10">{{ scoreAvgShow }}</span>
                        </div>
                        <!-- GRAPH -->
                        <div class="row q-pa-xl box-progress-bar">
                          <div class="self-end col-12" style="z-index:5;">
                            <!-- TOTAL QUESTION <= 10 -->
                            <div class="row relative-position" style="left:2%" align="center">
                              <div
                                class="col self-end"
                                v-for="(items, index) in summaryGraphHeight"
                                :key="index"
                              >
                                <div>
                                  <div
                                    v-if="
                                      index != summaryGraphHeight.length - 1
                                    "
                                    style="position:relative;left:8%;padding-left:10px;padding-right:20px"
                                  >
                                    <span>{{ items.number }} คน</span>
                                    <div
                                      class="bg10"
                                      style="width:40px"
                                      :style="'height:' + items.height + 'px'"
                                    ></div>
                                  </div>

                                  <div
                                    class="line-bar"
                                    v-if="
                                      index != summaryGraphHeight.length - 1
                                    "
                                    style="position:relative;left:0px"
                                    align="left"
                                  >
                                    <span style="position:relative;top:-12px;left:3px">I</span>

                                    <span
                                      style="position:relative;left:-5px;top:5px"
                                    >{{ items.start }}</span>
                                  </div>
                                  <div v-else style="position:relative;left:0px" align="left">
                                    <span style="position:relative;top:-12px;left:-5px">I</span>

                                    <span
                                      style="position:relative;left:-12px;top:5px"
                                    >{{ items.start }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div align="center" class="q-pt-md">คะแนนของลูกเรือ (%)</div>
                          </div>
                        </div>
                        <!-- FOOTER BUTTON -->

                        <div class="relative-position">
                          <q-btn
                            :disable="isClickFinishReview"
                            @click="showRetry()"
                            label="ทำอีกครั้ง"
                            icon="fas fa-redo"
                            class="q-py-xs q-px-sm bg6 color3"
                            style="font-size:18px;width:215px"
                          />
                          <q-btn
                            @click="nextLesson()"
                            :disable="isClickNextLesson"
                            label="ภารกิจถัดไป"
                            icon="fas fa-star"
                            class="q-py-xs q-px-lg bg3 color6 absolute-center"
                            style="font-size:18px;width:215px"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- ************************ จบหน้าสรุปกราฟ  ************************-->
                  </div>
                </div>

                <!-- หน้าสรุปเนื้อเรื่อง Reading -->
                <div v-if="showReadingContent" class="color3">
                  <!-- NOTE THAI CONTENT -->
                  <div class="bg5 rounded-borders q-pa-sm q-mt-md">
                    <div align="center" class="text-h4" v-html="readingContent.titleThai"></div>
                    <div align="center">
                      <img style="width:80%;margin:auto" :src="readingContent.imageURL" alt />
                    </div>
                    <div align="left" class="text-h6 row" v-html="readingContent.contentThai"></div>
                  </div>

                  <!-- NOTE ENGLISH CONTENT -->
                  <div class="bg5 rounded-borders q-pa-sm q-mt-md">
                    <div align="center" class="text-h4" v-html="readingContent.titleEng"></div>

                    <div align="left" class="text-h6 row" v-html="readingContent.contentEng"></div>
                    <div align="center">
                      <q-btn
                        label="จบภารกิจ"
                        class="q-py-xs q-px-lg bg3 color6"
                        style="font-size:18px;"
                        @click="finishBtn()"
                      />
                    </div>
                  </div>
                </div>
                <!-- หน้าสรุปเนื้อเรื่อง Translation -->
                <div v-if="showTranslationContent">
                  <div class="bg5 rounded-borders q-pa-md br-a-sm">
                    <div class="border-dashed q-pa-md rounded-borders br-a-sm">
                      <div
                        align="center"
                        class="text-h4 color3 q-py-md q-mt-sm"
                      >{{ translationContent.titleEng }}</div>
                      <div
                        align="left"
                        class="color3"
                        style="font-size:calc(16px + .5vw);"
                        v-html="translationContent.contentEng"
                      ></div>

                      <q-separator inset class="q-my-xl" />

                      <div
                        align="center"
                        class="text-h4 color3 q-mb-md"
                      >{{ translationContent.titleTh }}</div>
                      <div align="left" class="q-py-sm color3 q-px-sm row justify-center q-mt-md">
                        <span
                          style="font-size:calc(16px + .5vw);"
                          v-html="translationContent.contentTh"
                        ></span>
                      </div>

                      <div align="center" class="q-mt-xl q-mb-md">
                        <q-btn
                          @click="finishBtn()"
                          label="ดูคะแนน"
                          class="q-px-lg bg3 color6"
                          style="font-size:18px;"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- END Progress -->
      <increase-time
        v-if="showCountdownDialog"
        :isShowDialog="showCountdownDialog"
        @emitShowDialog="getEmitData"
      ></increase-time>

      <dialog-check-login
        v-if="showRetryDialog"
        :propsData="sendDataDialog"
        @dataclose="val => closePopupFunction(val)"
      ></dialog-check-login>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
import increaseTime from "../../components/increaseTime";
import dialogCheckLogin from "../../components/dialogchecklogin.vue";
import countdownTimer from "../../components/countdownTimer";
export default {
  components: {
    increaseTime,
    dialogCheckLogin,
    countdownTimer
  },
  data() {
    return {
      successPercent: 0,
      avgScore: 0,
      isClickNextLesson: false,
      isClickFinishReview: false,
      scoreAvgShow: "0",
      showRetryDialog: false,
      showFinishPracticeDialog: false,
      teacherData: this.decrypt(this.$q.localStorage.getItem("teacherData"), 1),
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentYear: this.decrypt(this.$q.localStorage.getItem("currentYear"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      snapGetOnlineStudent: "",
      isLoadData: false,
      isTimeOut: false,
      practice: {
        timer: this.$q.localStorage.getItem("currentPractice").time
      },
      isArrowLeft: false,
      isArrowRight: true,
      showProgress: "one",
      totalStudent: this.decrypt(
        this.$q.localStorage.getItem("totalStudent"),
        3
      ),
      totalOnlineStudent: 0,
      totalQuestion: 0,
      student: {},
      studentData: [],
      isSnapStudentProgress: "",
      totalFinish: 0,
      progressData: "",
      currentLevel: this.decrypt(
        this.$q.localStorage.getItem("currentLevel"),
        2
      ),
      currentUnit: this.decrypt(this.$q.localStorage.getItem("currentUnit"), 2),
      practiceType: this.decrypt(
        this.$q.localStorage.getItem("practiceType"),
        1
      ),
      currentPractice: this.$q.localStorage.getItem("currentPractice"),
      countdown: "",
      setTimer: "",
      finishClicked: this.$q.localStorage.has("finishClicked") ? true : false,
      enterPageMicrotime: null,
      practiceListData: this.decrypt(
        this.$q.localStorage.getItem("practiceList"),
        1
      ),
      showCountdownDialog: false,
      showReadingContent: false,
      showTranslationContent: false,
      readingContent: "",
      translationContent: "",
      sendDataDialog: {
        type: "",
        title: "",
        btn1: "",
        btn2: "",
        icon: ""
      },
      isDialogPopup: false,
      summaryGraphHeight: ""
    };
  },
  methods: {
    showFinishMission() {
      this.isClickFinishReview = true;
      this.showRetryDialog = true;
      this.sendDataDialog.type = "finishMission";
      this.sendDataDialog.title = "ยืนยันการจบภารกิจ";
      this.sendDataDialog.btn1 = "จบภารกิจ";
      this.sendDataDialog.icon = "fas fa-exclamation";
      this.sendDataDialog.btn2 = "ยกเลิก";
    },
    showRetry() {
      this.isClickFinishReview = true;
      this.showRetryDialog = true;
      this.sendDataDialog.type = "retryPractice";
      this.sendDataDialog.title = "ทำอีกครั้ง";
      this.sendDataDialog.btn1 = "ตกลง";
      this.sendDataDialog.icon = "fas fa-redo";
      this.sendDataDialog.btn2 = "ยกเลิก";
    },

    closePopupFunction(val) {
      this.showRetryDialog = false;
      this.isClickFinishReview = false;

      if (val.type == "finishMission" && val.reFunction) {
        // กรณีกดปุ่มจบภารกิจ และกดตกลง
        this.confirmDialog();
      } else if (val.type == "retryPractice") {
        if (val.reFunction) {
          this.retryLesson();
        }
      }
    },
    getOnlineStudent() {
      this.snapGetOnlineStudent = db
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
          this.totalOnlineStudent = doc.size;
        });
    },
    async checkFinishWorld() {
      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      let numOfPracticeInThisWorld = this.practiceListData.filter(
        x =>
          x.skill == this.currentPractice.skill &&
          x.level == this.currentPractice.level &&
          x.unit == this.currentPractice.unit
      ).length;

      // get passed practice from db
      let classPracticeLog = await db
        .collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("level", "==", this.currentPractice.level)
        .where("unit", "==", this.currentPractice.unit)
        .where("skill", "==", this.currentPractice.skill)
        .get();
      classPracticeLog = classPracticeLog.size;

      if (classPracticeLog == numOfPracticeInThisWorld) {
        return true;
      } else {
        return false;
      }
    },
    confirmRetry(val) {
      this.showRetryDialog = val;
      this.retryLesson();
    },
    cancleDialog(val) {
      this.showFinishPracticeDialog = val;
      this.showRetryDialog = val;
    },
    confirmDialog(val) {
      let currentType = this.currentPractice.practicetype;
      this.showFinishPracticeDialog = val;
      clearInterval(this.countdown);
      if (currentType == "readingmulti" || currentType == "readingfillin") {
        // NOTE กรณีเป็น Reading โชว์สรุปอ่านจับใจความ
        db.collection("readingcontent_server")
          .where("practicekey", "==", this.currentPractice.practiceKey)
          .get()
          .then(doc => {
            let data = doc.docs[0].data();
            let patt = /(\[tab])/g;
            this.readingContent = {
              titleEng: data.titleEng,
              titleThai: data.titleThai,
              contentEng: data.contentEng.replace(patt, ""),
              contentThai: data.contentThai.replace(patt, ""),
              imageURL: data.imageURL
            };

            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentPage: "finish-reading"
              })
              .then(() => {
                this.showReadingContent = true;
              });
          });

        // NOTE ต้อง Update ไป synchronize เพื่อให้นักเรียนโชว์หน้าสรุป
      } else if (currentType == "translation") {
        // NOTE กรณีเป็น Translation โชว์สรุปเนื้อเรื่อง
        db.collection("practicepool_server")
          .where("practicekey", "==", this.currentPractice.practiceKey)
          .get()
          .then(async doc => {
            let practiceName = await db
              .collection("practiceListName")
              .where("level", "==", this.currentPractice.level)
              .where("unit", "==", this.currentPractice.unit)
              .where("skill", "==", this.currentPractice.skill)
              .get();

            let titleEng = practiceName.docs[0].data().name;
            let titleTh = practiceName.docs[0].data().nameth;
            let contentEng = "";
            let contentTh = "";
            let docTemp = [];
            doc.forEach(element => {
              docTemp.push(element.data());
            });

            docTemp.sort((a, b) => Number(a.order) - Number(b.order));

            docTemp.forEach(element => {
              contentEng += element.questionEng;
              contentTh += element.questionThai;
            });
            let reg = new RegExp(/\s[\.]/, "g");

            contentEng = contentEng.replace(/(<([^>]+)>)/gi, "");
            contentEng = contentEng.replace(/&nbsp;/g, " ");
            contentEng = contentEng.replace(reg, ". ");
            this.translationContent = {
              titleEng: titleEng,
              titleTh: titleTh,
              contentEng: contentEng,
              contentTh: contentTh.replace(/(<([^>]+)>)/gi, "")
            };

            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentPage: "finish-translation"
              })
              .then(() => {
                this.showTranslationContent = true;
              });
          });
      } else {
        this.finishBtn();
      }
    },
    getEmitData(val) {
      this.showCountdownDialog = val;
    },

    async nextLesson() {
      this.isClickNextLesson = true;
      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear,
        currentPractice: this.currentPractice
      };
      this.goToNextLesson(sendData);
    },
    async updateSync() {
      let date = await this.getDateAndTime();
      db.collection("synchronize")
        .doc(this.teacherData.key)
        .update({
          currentPage: this.currentPractice.practicetype,
          date: date
        })
        .then(() => {
          this.loadingHide();
          // this.countdownTimer();
          this.isTimeOut = false;
        });
    },
    async retryLesson() {
      // ปุ่มเรียนใหม่
      let date = await this.getDateAndTime();
      this.$q.localStorage.set(
        "countdownMin",
        Number(this.currentPractice.time.split(":")[0])
      );
      this.$q.localStorage.set(
        "countdownSec",
        Number(this.currentPractice.time.split(":")[1])
      );
      this.$q.localStorage.set("isExtraTime", false);
      this.finishClicked = false;
      this.$q.localStorage.remove("finishClicked");
      // ต้อง Reset แบบฝึกหัดของนักเรียนในระดับชั้นและห้อง ให้หมด ถ้ากดทำแบบฝึกหัดใหม่
      this.loadingShow();
      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear +
        "-" +
        this.currentPractice.practiceKey;

      let filterWhere1 =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      db.collection("classroomPracticeLog")
        .where("filter", "==", filterWhere1)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("schoolKey","==",this.teacherData.schoolKey)
        .get()
        .then(docpractice => {
          // ไปลบข้อมูลแบบฝึกหัดของห้องนี้ ระดับชั้นนี้ เทอมนี้ ปีนี้ทิ้ง
          db.collection("classroomPracticeLog")
            .doc(docpractice.docs[0].id)
            .delete()
            .then(() => {
              db.collection("studentpracticelog")
                .where("filter", "==", filterWhere)
                .where("schoolKey","==",this.teacherData.schoolKey)
                .get()
                .then(practice => {
                  if (practice.size) {
                    let counterUpdate = 0;
                    practice.forEach(element => {
                      db.collection("studentpracticelog")
                        .doc(element.id)
                        .delete()
                        .then(async () => {
                          counterUpdate++;
                          if (counterUpdate == practice.size) {
                            let sendData = {
                              class: this.currentClass,
                              room: this.currentRoom,
                              term: this.currentTerm,
                              year: this.currentYear
                            };
                            await this.checkPassedMission(sendData);
                            this.updateSync();
                          }
                        });
                    });
                  } else {
                    this.updateSync();
                  }
                });
            });
        });
    },
    async finishBtn() {
      // SAVE คะแนนเป้าหมายตรงนี้
      let sendData = {
        class: this.currentClass,
        room: this.currentRoom,
        term: this.currentTerm,
        year: this.currentYear
      };
      this.checkPassedMission(sendData);

      let date = await this.getDateAndTime();
      clearInterval(this.countdown);

      let filterWhere =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear;

      let useTime =
        date.microtime - this.$q.localStorage.getItem("enterPracticeTime");
      useTime = useTime / 1000;
      useTime = this.secondToMinutes(useTime);

      // หากกดแล้ว บันทึกเข้า Local ว่า Userครูได้กด แล้ว ป้องกันหากกดRefresh จะได้ไม่เด้งกลับไปหน้าโชคะแนน
      // เช็คว่าเคยเซฟเข้าไปแล้วหรือยัง
      this.loadingShow();
      db.collection("classroomPracticeLog")
        .where("filter", "==", filterWhere)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("status", "==", false)
        .get()
        .then(doc => {
          if (!doc.size) {
            db.collection("classroomPracticeLog")
              .add({
                practiceKey: this.currentPractice.practiceKey,
                date: date,
                useTime: useTime,
                class: this.currentClass,
                room: this.currentRoom,
                term: this.currentTerm,
                year: this.currentYear,
                filter: filterWhere,
                timeIn: this.$q.localStorage.getItem("enterPracticeTime"),
                timeOut: date.microtime,
                practiceName: this.$q.localStorage.getItem("practiceListName")
                  .name,
                order: this.currentPractice.order,
                skill: this.currentPractice.skill,
                practiceType: this.currentPractice.practicetype,
                level: this.currentPractice.level,
                unit: this.currentPractice.unit,
                schoolKey: this.teacherData.schoolKey,
                onlineStudent: this.totalOnlineStudent,
                totalStudent: this.totalStudent
              })
              .then(() => {
                db.collection("synchronize")
                  .doc(this.teacherData.key)
                  .update({
                    currentPage: "finish-practice",
                    date: date
                  })
                  .then(() => {
                    this.showReadingContent = false;
                    this.showTranslationContent = false;
                    this.loadingHide();
                    this.$q.localStorage.set("finishClicked", true);
                    this.finishClicked = true;
                  });
              });
          } else {
            db.collection("synchronize")
              .doc(this.teacherData.key)
              .update({
                currentQuestion: 0,
                currentVocabKey: "",
                practiceKey: "",
                currentPage: "finish-practice",
                date: date
              })
              .then(() => {
                this.loadingHide();
                this.$q.localStorage.set("finishClicked", true);
                this.finishClicked = true;
              });
          }
        });
    },

    handleSwipe({ evt, ...info }) {
      if (this.isArrowRight) {
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
        this.showProgress = "two";
      } else {
        this.showProgress = "one";
        this.isArrowLeft = !this.isArrowLeft;
        this.isArrowRight = !this.isArrowRight;
      }
    },
    async setGraph() {
      // Load Total Question
      this.loadingShow();
      let date = await this.getDateAndTime();
      this.enterPageMicrotime = date.microtime;
      let currentClass = this.currentClass;

      // studentprepostlog
      // studentplacementlog
      let totalQuestion;

      let currentPractice = this.$q.localStorage.getItem("currentPractice");
      let flashcardKey;
      if (currentPractice.practicetype == "spelling bee") {
        let getFlashcardId = await db
          .collection("practicelist")
          .where("level", "==", this.currentPractice.level)
          .where("unit", "==", this.currentPractice.unit)
          .where("practicetype", "==", "flashcard")
          .get();
        flashcardKey = getFlashcardId.docs[0].id;
      }

      let practiceKey =
        currentPractice.practicetype != "spelling bee"
          ? this.currentPractice.practiceKey
          : flashcardKey;

      let getQuestion;
      let countTotalQuestion = 0;
      if (
        this.currentPractice.practicetype == "review grammar" ||
        this.currentPractice.practicetype == "review vocab"
      ) {
        let reviewKey = this.$q.localStorage.getItem("reviewKey");
        for (const element of reviewKey) {
          let getPracticePool = await db
            .collection("practicepool_server")
            .where("practicekey", "==", element)
            .get();
          countTotalQuestion += getPracticePool.size;
          if (countTotalQuestion > 12) {
            break;
          }
        }
        countTotalQuestion = countTotalQuestion > 12 ? 12 : countTotalQuestion;
      } else {
        getQuestion = await db
          .collection("practicepool_server")
          .where("practicekey", "==", practiceKey)
          .get();

        getQuestion.forEach(questionEle => {
          if (questionEle.data().except != undefined) {
            if (questionEle.data().except == false) {
              countTotalQuestion++;
            }
          } else {
            countTotalQuestion++;
          }
        });
      }

      totalQuestion = countTotalQuestion;

      this.totalQuestion = totalQuestion;
      let totalGraph =
        totalQuestion > 10 && totalQuestion <= 20
          ? Math.ceil(totalQuestion / 2)
          : Math.ceil(totalQuestion / 4);
      let startQuestion = 0;
      let endQuestion = 0;
      let data = [];
      for (let i = 0; i < totalGraph; i++) {
        //  i + 1 != totalGraph ? endQuestion + 2 : totalQuestion
        let end;
        if (totalQuestion <= 20) {
          end = i + 1 != totalGraph ? endQuestion + 2 : totalQuestion;
        } else if (totalQuestion > 20) {
          end = i + 1 != totalGraph ? endQuestion + 4 : totalQuestion;
        }
        data.push({
          start: startQuestion + 1,
          end: end
        });

        totalQuestion > 10 && totalQuestion <= 20
          ? (startQuestion += 2)
          : (startQuestion += 4);
        totalQuestion > 10 && totalQuestion <= 20
          ? (endQuestion += 2)
          : (endQuestion += 4);
      }

      this.progressData = data;
      this.loadingHide();

      this.snapStudentProgress();
    },

    snapStudentProgress() {
      let filter =
        this.currentClass +
        "-" +
        this.currentRoom +
        "-" +
        this.currentTerm +
        "-" +
        this.currentYear +
        "-" +
        this.currentPractice.practiceKey;

      this.isSnapStudentProgress = db
        .collection("studentpracticelog")
        .where("class", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .where("term", "==", this.currentTerm)
        .where("year", "==", this.currentYear)
        .where("practiceKey", "==", this.currentPractice.practiceKey)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          this.studentData = [];
          let studentTemp = [];
          this.totalFinish = 0;
          doc.forEach(data => {
            if (data.data().status == true) {
              this.totalFinish += 1;
            }
            let newData = data.data();
            newData.isShowInGraph = true;
            delete newData.currentQuestion;
            if (data.data().currentQuestion == 0) {
              newData.currentQuestion = 1;
            } else {
              newData.currentQuestion = data.data().currentQuestion + 1;
            }

            newData.scorePercent = Math.ceil(
              (data.data().correct / data.data().totalQuestion) * 100
            );

            if (!newData.scorePercent) {
              newData.scorePercent = 0;
            }

            if (data.data().status == true) {
              newData.isShowInGraph = false;
            }

            studentTemp.push(newData);
          });
          studentTemp.sort((a, b) => {
            return Number(a.studentNo) - Number(b.studentNo);
          });
          this.studentData = studentTemp;

          let successPercent = 0;
          let avgScore = 0;

          console.log("totalQuestion=", this.totalQuestion);
          // NOTE ต้องเช็คว่า ค่า currentQuestion ส่วนใหญ่จะส่งมาเกิน 1 เสมอหรือไม่
          successPercent = studentTemp
            .map(x => x.currentQuestion - 1)
            .reduce((a, b) => a + b, 0);

          successPercent = successPercent / studentTemp.length;

          successPercent = (successPercent / this.totalQuestion) * 100;

          successPercent = isNaN(successPercent)
            ? 0
            : Math.round(successPercent);

          this.successPercent = successPercent;

          avgScore = studentTemp
            .map(x => x.scorePercent)
            .reduce((a, b) => a + b, 0);
          avgScore = avgScore / studentTemp.length;

          avgScore = isNaN(avgScore) ? 0 : Math.round(avgScore);
          this.avgScore = avgScore;

          setTimeout(() => {
            this.isLoadData = false;
          }, 800);

          let scoreAvgShow = Math.round(
            this.studentData
              .map(x => x.scorePercent)
              .reduce((a, b) => {
                return a + b;
              }, 0) / this.studentData.length
          );
          if (isNaN(scoreAvgShow)) {
            this.scoreAvgShow = "0%";
          } else {
            this.scoreAvgShow = `${scoreAvgShow}%`;
          }
        });
    },
    finishTimeout() {
      if (
        this.currentPractice.practicetype == "translation" ||
        this.currentPractice.practicetype == "readingmulti" ||
        this.currentPractice.practicetype == "readingfillin"
      ) {
        this.confirmDialog();
      } else {
        this.finishBtn();
      }
    }
  },
  beforeDestroy() {
    this.isSnapStudentProgress();
    this.$q.localStorage.remove("timerMin");
    this.$q.localStorage.remove("timerSec");
    this.snapGetOnlineStudent();
  },
  beforeMount() {
    this.setGraph();
  },
  mounted() {
    this.getOnlineStudent();
  }
};
</script>

<style lang="scss" scoped>
// Progress
.box-progress-bar {
  min-height: 500px;
}
.box-progress-student {
  min-height: 500px;
}

.line-bar {
  border-top: 3px solid #353535;
}

// Table
.me-scrollbar {
  overflow-y: auto;
}
.me-scrollbar::-webkit-scrollbar {
  width: 17px;
}

.me-scrollbar::-webkit-scrollbar-track {
  background-color: #d68a4c;
  border: 4px solid #eabd94;
  border-radius: 15px;
}

.me-scrollbar::-webkit-scrollbar-thumb {
  background-color: #662707;
  border-radius: 10px;
}

/* Handle on hover */
.me-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #662707;
}

.table-spacing {
  width: 100%;
  border-spacing: 8px;
}

.table-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #eabd94;
  padding: 10px 0px;
}

.text-ellipsis {
  max-width: 200px;
  min-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-question {
  margin: auto;
  font-size: 13px;
  font-weight: bold;
  white-space: nowrap;
}

.duration-practice-start-in {
  animation-duration: 0.6s;
}
.duration-practice-start-out {
  animation-duration: 0.6s;
  animation-delay: 0.5s;
}

.duration-timer-in {
  animation-duration: 0.5s;
  animation-delay: 0.5s;
}
.duration-timer-out {
  animation-duration: 0.4s;
}

.duration-practice-logo-in {
  animation-delay: 0.6s;
}

.duration-practice-logo-out {
  animation-delay: 0.2s;
}

.duration-timeout {
  animation-duration: 2s;
}
</style>
