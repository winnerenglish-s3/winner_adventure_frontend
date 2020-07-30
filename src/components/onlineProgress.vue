<template>
  <q-dialog maximized v-model="showStudentDataDialog">
    <q-card class="q-pa-sm bg5 animated fadeIn">
      <q-card-actions align="right">
        <q-btn icon="fas fa-times" @click="closePopup()" round flat></q-btn>
      </q-card-actions>
      <q-card-section>
        <div align="center">
          <span class="text-h5 color3 text-weight-bolder">ลูกเรือที่ยังไม่ขึ้นเรือ</span>
        </div>

        <div class="q-pa-lg">
          <div style="border:1px dashed #662707;border-width:2px;border-radius:5px" class="q-pa-lg">
            <div class="row text-h5">
              <div align="center" class="col-1" style="width:100px;">เลขที่</div>
              <div align="left" class="col">
                <div class="q-pl-md">ชื่อ-นามสกุล</div>
              </div>
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
              <div class="col q-px-sm">
                <div
                  :class="index%2 != 0 ? 'bg9' : 'bg4'"
                  class="q-pa-sm"
                  style="border-radius:5px"
                >{{ item.name }} {{ item.surname }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { db } from "../router";
export default {
  data() {
    return {
      showStudentDataDialog: true,
      snapshot: "",
      currentClass: this.decrypt(
        this.$q.localStorage.getItem("currentClass"),
        2
      ),
      currentRoom: this.decrypt(this.$q.localStorage.getItem("currentRoom"), 2),
      currentTerm: this.decrypt(this.$q.localStorage.getItem("currentTerm"), 2),
      showStudentData: [],
      buddyOptions: [],
      snapshotOnline: ""
    };
  },
  methods: {
    closePopup() {
      this.showStudentDataDialog = false;
      this.$emit("closePopup", false);
    },
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
            return x.status != "online";
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