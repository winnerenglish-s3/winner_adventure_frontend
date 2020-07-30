<template>
  <q-page class="row relative-position justify-center q-pa-sm bg-vocabulary animated fadeIn">
    <div class="bg5 br-a-md q-pa-md col-11">
      <div align="center">
        <span class="text-h5 color3 text-weight-bolder">ลูกเรือที่ยังไม่ขึ้นเรือ</span>
      </div>

      <div class="q-pa-lg">
        <div style="border:1px dashed #662707;border-width:2px;border-radius:5px" class="q-pa-lg">
          <!-- data table -->
          <div class="row text-h5">
            <div align="center" class="col-1">เลขที่</div>
            <div align="center" class="col-6">ชื่อ-นามสกุล</div>
            <div align="center" class="col-5">ลูกเรือที่จับคู่ด้วย</div>
          </div>

          <div
            class="row items-center q-mt-sm text-h5"
            v-for="(item,index) in showStudentData"
            :key="index"
          >
            <div class="col-1 q-px-sm">
              <div
                :class="index%2 != 0 ? 'bg9' : 'bg4'"
                align="center"
                style="border-top-left-radius:5px;border-bottom-left-radius:5px"
                class="q-pa-sm"
              >{{ item.no }}</div>
            </div>
            <div class="col-6 q-px-sm">
              <div
                :class="index%2 != 0 ? 'bg9' : 'bg4'"
                class="q-pa-sm"
                style="border-top-left-radius:5px;border-bottom-left-radius:5px"
              >{{ item.name }} {{ item.surname }}</div>
            </div>
            <div class="col-5 q-px-sm">
              <q-select
                @input="selectBuddy()"
                borderless
                :options="buddyOptions"
                class="bg-white q-px-md"
                style="height:30px;border-radius:5px"
                v-model="item.follow"
                map-options
                emit-value
              ></q-select>
            </div>
          </div>
          <!-- end data table -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { db } from "../../router";
export default {
  data() {
    return {
      snapshot: "",
      currentClass: this.$q.localStorage
        .getItem("currentClass")
        .replace("ป.", "p")
        .replace("ม.", "m"),
      currentRoom: this.$q.localStorage.getItem("currentRoom"),
      currentTerm: this.$q.localStorage.getItem("currentTerm"),
      showStudentData: [],
      buddyOptions: [],
      snapshotOnline: ""
    };
  },
  methods: {
    selectBuddy() {},
    snapCheckStudent() {
      this.loadingShow();
      this.snapshot = db
        .collection("student")
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("classRoom", "==", this.currentClass)
        .where("room", "==", this.currentRoom)
        .onSnapshot({ includeMetadataChanges: true }, doc => {
          let temp = [];
          doc.forEach(element => {
            let dataKey = {
              key: element.id,
              follow: "-- ขาดเรียน --",
              label: element.data().name,
              value: element.id
            };
            let merge = { ...dataKey, ...element.data() };
            temp.push(merge);
          });
          temp.sort((a, b) => {
            return Number(a.no) - Number(b.no);
          });

          this.showStudentData = temp.filter(x => {
            return x.status == "offline";
          });
          this.buddyOptions = temp.filter(x => {
            return x.status == "online";
          });
          this.loadingHide();
        });
    }
  },
  mounted() {
    this.snapCheckStudent();
  },
  beforeDestroy() {
    this.snapshot();
  }
};
</script>

<style lang="scss" scoped>
</style>