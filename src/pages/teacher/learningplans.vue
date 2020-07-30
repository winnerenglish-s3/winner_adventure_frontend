<template>
  <q-page style="background-color:#FFE5D2">
    <div class="row q-pa-sm relative-position bg5">
      <div class="col">
        <q-btn
          push
          class="bg3 color6"
          to="/teacher/folder"
          icon="fas fa-chevron-left"
          label="ย้อนกลับ"
        ></q-btn>
      </div>
      <div align="center" class="color2 col self-center text-h6">แผนการสอน</div>
      <div class="col"></div>
    </div>

    <div class="q-pa-md" v-if="isLoadData">
      <div class="row justify-between">
        <div class="col-6 self-center" style="max-width:500px;width:100%;">
          <q-select
            outlined
            square
            :options="roomOptions"
            v-model="selectClass"
            type="text"
            label="ชั้น"
            class="bg1 border2-xs"
          />
        </div>
      </div>

      <!-- 
      @input="loadStudent()"-->

      <div class="row">
        <div
          class="col-12 row q-mt-md q-py-xl q-px-xs"
          style="max-width:1000px;width:100%;margin:auto;"
        >
          <div
            class="col border-dashed q-ma-md br-a-xs q-pb-lg"
            style="height:fit-content;max-width:450px;width:100%;"
            v-if="studentData.term >= 1"
          >
            <div align="center" class="q-pa-md">
              <span class="text-body1 text-bold">เทอม 1</span>
            </div>

            <!-- NOTE : กรณีมีข้อมูล level -->
            <div v-if="setLevel != 0">
              <!-- NOTE : กรณ๊มีไพล์แผนการสอน -->
              <div v-if="checkDoc1">
                <div class="q-pa-sm" align="center">
                  <q-btn
                    class="bg-teal color1"
                    no-caps
                    style="width:85%;"
                    @click="downloadFiles(Number(setLevel), 'DOC')"
                  >
                    <div class="row full-width q-pa-xs">
                      <div class="col-2" align="left" style="width:45px;">
                        <q-img src="../../statics/DOC.png" style="width:44px;"></q-img>
                      </div>
                      <div class="col self-center text-body1">
                        <span>level {{ setLevel }} Unit 1-16</span>
                      </div>
                    </div>
                  </q-btn>
                </div>
                <div class="q-mt-md q-pa-sm" align="center">
                  <q-btn
                    class="bg-teal color1"
                    no-caps
                    style="width:85%;"
                    @click="downloadFiles(Number(setLevel), 'PDF')"
                  >
                    <div class="row full-width q-pa-xs">
                      <div class="col-2" align="left" style="width:45px;">
                        <q-img src="../../statics/PDF.png" style="width:44px;"></q-img>
                      </div>
                      <div class="col self-center text-body1">
                        <span>level {{ setLevel }} Unit 1-16</span>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </div>

              <!-- NOTE : กรณ๊ไม่มีไพล์แผนการสอน -->
              <div align="center" class="q-py-xl q-px-md" v-else>
                <span class="block text-h6 q-py-md q-mb-sm">ไม่มีแผนการสอน</span>
              </div>
            </div>

            <!-- NOTE : กรณีไม่มีข้อมูล level -->
            <div v-else align="center" class="q-py-xl q-px-md">
              <span class="block text-h6 q-py-md q-mb-sm">ยังไม่มีการลงทะเบียน Level</span>
            </div>
          </div>

          <div
            class="col border-dashed q-ma-md br-a-xs q-pb-lg"
            style="height:fit-content;max-width:450px;width:100%;"
            v-if="studentData.term >= 2"
          >
            <div align="center" class="q-pa-md">
              <span class="text-body1 text-bold">เทอม 2</span>
            </div>

            <!-- NOTE : กรณีมีข้อมูล level -->
            <div v-if="setLevel != 0">
              <!-- NOTE : กรณ๊มีไพล์แผนการสอน -->
              <div v-if="checkDoc2">
                <div class="q-pa-sm" align="center">
                  <q-btn
                    class="bg-teal color1"
                    no-caps
                    style="width:85%;"
                    @click="downloadFiles(Number(setLevel) + 1, 'DOC')"
                  >
                    <div class="row full-width q-pa-xs">
                      <div class="col-2" align="left" style="width:45px;">
                        <q-img src="../../statics/DOC.png" style="width:44px;"></q-img>
                      </div>
                      <div class="col self-center text-body1">
                        <span>level {{ Number(setLevel) + 1 }} Unit 1-16</span>
                      </div>
                    </div>
                  </q-btn>
                </div>
                <div class="q-mt-md q-pa-sm" align="center">
                  <q-btn
                    type="a"
                    class="bg-teal color1"
                    no-caps
                    style="width:85%;"
                    @click="downloadFiles(Number(setLevel) + 1, 'PDF')"
                  >
                    <div class="row full-width q-pa-xs">
                      <div class="col-2" align="left" style="width:45px;">
                        <q-img src="../../statics/PDF.png" style="width:44px;"></q-img>
                      </div>
                      <div class="col self-center text-body1">
                        <span>level {{ Number(setLevel) + 1 }} Unit 1-16</span>
                      </div>
                    </div>
                  </q-btn>
                </div>
              </div>

              <!-- NOTE : กรณ๊ไม่มีไพล์แผนการสอน -->
              <div align="center" class="q-py-xl q-px-md" v-else>
                <span class="block text-h6 q-py-md q-mb-sm">ไม่มีแผนการสอน</span>
              </div>
            </div>

            <!-- NOTE : กรณีไม่มีข้อมูล level -->
            <div v-else align="center" class="q-py-xl q-px-md">
              <span class="block text-h6 q-py-md q-mb-sm">ยังไม่มีการลงทะเบียน Level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { st } from "../../router/index.js";
export default {
  data() {
    return {
      selectClass: "",
      roomOptions: [],
      studentAllList: [],

      allFiles: [],

      isLoadData: false
    };
  },
  methods: {
    downloadFiles(level, type) {
      let setdata =
        "LV" +
        level +
        "-" +
        this.selectClass.replace("ป.", "P").replace("ม.", "M") +
        "-" +
        type +
        ".rar";

      let result = this.allFiles.find(x => x.name == setdata);

      if (result != undefined) {
        return (window.location.href = result.url);
      }
    },
    loadData() {
      this.loadingShow();

      this.studentAllList = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let studentData = this.studentAllList.map(x => {
        return x.classRoom;
      });

      studentData = [...new Set(studentData)];

      console.log(studentData);

      studentData.sort((a, b) => {
        let grade1 = a[0];
        let grade2 = b[0];
        if (grade1 == "ป") {
          grade1 = "a";
        }
        if (grade2 == "ม") {
          grade2 = "z";
        }
        let d1 = grade1;
        let d2 = grade2;
        return a > b ? 1 : -1;
      });

      this.roomOptions = studentData;
      this.selectClass = studentData[0];

      this.loadDocumentFiles();

      return;
    },
    loadDocumentFiles() {
      st.child("document/")
        .listAll()
        .then(doc => {
          doc.items.forEach(async getData => {
            let result = await getData.getDownloadURL();

            let newData = {
              name: getData.name,
              url: result
            };

            this.allFiles.push(newData);
          });

          this.isLoadData = true;

          this.loadingHide();
        });
    }
  },
  computed: {
    setLevel() {
      return this.studentAllList.find(x => x.classRoom == this.selectClass)
        .level;
    },
    checkDoc1() {
      let setlevel = this.studentAllList.find(
        x => x.classRoom == this.selectClass
      ).level;

      let setroom = this.selectClass.replace("ป.", "P").replace("ม.", "M");

      let result = "LV" + setlevel + "-" + setroom + "-" + "DOC.rar";

      result = this.allFiles.find(x => x.name == result);

      if (result != undefined) {
        return true;
      } else {
        return false;
      }
    },
    checkDoc2() {
      let setlevel = this.studentAllList.find(
        x => x.classRoom == this.selectClass
      ).level;

      let setroom = this.selectClass.replace("ป.", "P").replace("ม.", "M");

      let result =
        "LV" + (Number(setlevel) + 1) + "-" + setroom + "-" + "DOC.rar";

      result = this.allFiles.find(x => x.name == result);

      if (result != undefined) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped></style>
