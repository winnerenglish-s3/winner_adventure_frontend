<template>
  <div class="q-pa-md q-gutter-md">
    <!-- <q-select
      v-model="optionSelected"
      :options="['Vocabulary','Grammar','Reading','Writing','Phonics','Listening & Speaking']"
    ></q-select>
    <div align="center">
      <q-btn
        @click="resetPractice()"
        class="bg10 color1"
        label="Reset PracticeLog && studentPracticeLog"
      ></q-btn>
    </div>-->
    <!-- <q-btn @click="updatePracticeType()" label="update practice type"></q-btn> -->
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      optionSelected: "Vocabulary",
      studentArr: "",
      isShowDialogMoveRoom: false,
      roomOptions: [1, 2, 3],
      roomSelected: "",
      roomOptionSelected: "",
      studentIdClicked: "",
      schoolId: "k6XigIP0EXp7H1xS2dss"
    };
  },
  methods: {
    updatePracticeType() {
      db.collection("classroomPracticeLog")
        .get()
        .then(doc => {
          // console.log(doc.docs);
          // this.$q.localStorage.set("classroomTempPractice", doc.docs);
          doc.forEach(element => {
            if (element.data().practicetype) {
              let data = element.data();
              delete data.practicetype;
              db.collection("classroomPracticeLog")
                .doc(element.id)
                .set(data);
            }
          });
        });
    },
    confirmMoveRoom() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to do this process?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')

          let classSelected = this.roomSelected.slice(0, 3);
          let roomSelected = this.roomSelected.slice(4);
          // เปลี่ยนเลขที่
          db.collection("student")
            .doc(this.studentIdClicked)
            .update({
              classRoom: classSelected,
              room: roomSelected
            });

          // MOVE STUDENT PRACTICE LOG
          db.collection("studentpracticelog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then(doc => {
              doc.forEach(element => {
                db.collection("studentpracticelog")
                  .doc(element.id)
                  .update({
                    class: classSelected,
                    room: roomSelected
                  });
              });
            });
          // MOVE STUDENT PLACEMENT LOG
          db.collection("studentplacementlog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then(doc => {
              doc.forEach(element => {
                db.collection("studentplacementlog")
                  .doc(element.id)
                  .update({
                    class: classSelected,
                    room: roomSelected
                  });
              });
            });

          // MOVE STUDENT PREPOST LOG
          db.collection("studentprepostlog")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then(doc => {
              doc.forEach(element => {
                db.collection("studentprepostlog")
                  .doc(element.id)
                  .update({
                    class: classSelected,
                    room: roomSelected
                  });
              });
            });

          // MOVE STUDENT PREPOST LOG
          db.collection("missionvote")
            .where("studentKey", "==", this.studentIdClicked)
            .get()
            .then(doc => {
              doc.forEach(element => {
                db.collection("missionvote")
                  .doc(element.id)
                  .update({
                    class: classSelected,
                    room: roomSelected
                  });
              });
            });

          this.isShowDialogMoveRoom = false;
        });
    },
    moveRoom(id) {
      this.isShowDialogMoveRoom = true;
      this.roomSelected = this.roomOptions[0];
      this.studentIdClicked = id;
    },
    loadRoomOptions() {
      db.collection("student")
        .where("schoolKey", "==", this.schoolId)
        .get()
        .then(doc => {
          let roomTemp = [];
          doc.forEach(element => {
            roomTemp.push(element.data().classRoom + "/" + element.data().room);
          });
          let newRoom = [...new Set(roomTemp)];
          newRoom.sort((a, b) => (a > b ? 1 : -1));
          this.roomOptions = newRoom;
          this.roomOptionSelected = newRoom[0];
          this.roomSelected = newRoom[0];
          this.getStudentData();
        });
    },
    async getStudentData() {
      // let roomOptions = await this.loadRoomOptions();
      // this.roomOptions = roomOptions;

      let classSelected = this.roomOptionSelected.slice(0, 3);
      let roomSelected = this.roomOptionSelected.slice(4);
      db.collection("student")
        .where("schoolKey", "==", this.schoolId)
        .where("classRoom", "==", classSelected)
        .where("room", "==", roomSelected)
        .onSnapshot(doc => {
          let temp = [];
          doc.forEach(element => {
            temp.push({ ...element.data(), studentId: element.id });
          });
          temp.sort((a, b) => Number(a.no) - Number(b.no));
          this.studentArr = temp;
        });
    },
    getClassroomPracticeLog() {
      // db.collection("classroomPracticeLog")
      //   .where("class", "==", "ม.1")
      //   .where("room", "==", "3")
      //   .where("schoolKey", "==", "LWvFPI4VusMpdnikxLD8")
      //   .where("practiceType", "==", "translation")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       console.log(element.id);
      //       console.log(element.data());
      //     });
      //   });
    },
    move() {
      let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // this.transferData("classroomLessonLog");
      // this.transferData("classroomMission");
      // this.transferClassroomPracticeLog();
      // this.transferData("missionvote");
      // this.transferData("studentpracticelog")

      // db.collection("studentpracticelog")
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     console.log(doc.size);
      //     doc.forEach(element => {
      //       let filter = element.data().filter;
      //       filter = filter.replace("ป.6", "ม.1");
      //       db.collection("studentpracticelog")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1",
      //           filter: filter
      //         })
      //         .then(() => {
      //           console.log("UPDATE classroom practicelog");
      //         });
      //     });
      //   });

      // db.collection("studentpracticelog")
      //   .where("studentKey", "==", "FLGsgypwBRLhS2Ccz86m")
      //   .get()
      //   .then(doc => {
      //     let practiceKey = [];
      //     doc.forEach(element => {
      //       practiceKey.push(element.data().practiceKey);
      //     });

      //     let noDup = [...new Set(practiceKey)];

      //     console.log(practiceKey);

      //     console.log(noDup);

      //     // console.log(practiceKey.filter(x => !noDup.includes(x)));
      //   });
    },
    transferClassroomPracticeLog() {
      // let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // db.collection("classroomPracticeLog")
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       let filter = element.data().filter;
      //       filter = filter.replace("ป.6", "ม.1");
      //       db.collection("classroomPracticeLog")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1",
      //           filter: filter
      //         })
      //         .then(() => {
      //           console.log("UPDATE classroom practicelog");
      //         });
      //     });
      //   });

      // db.collection("placementMark")
      //   .where("class", "==", "ป.6")
      //   .where("schoolKey", "==", schoolKey)
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       db.collection("placementMark")
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1"
      //         })
      //         .then(() => {
      //           console.log("UPDATE placementMark");
      //         });
      //     });
      //   });

      db.collection("studentpracticelog");
      // .where("schoolKey", "==", schoolKey)
      // .where("class", "==", "ป.6")
      // .where("room", "==", "1")
      // .get()
      // .then(doc => {
      //   doc.forEach(element => {
      //     let filter = element.data().filter;
      //     filter = filter.replace("ป.6", "ม.1");
      //     db.collection("classroomPracticeLog")
      //       .doc(element.id)
      //       .update({
      //         class: "ม.1",
      //         filter: filter
      //       })
      //       .then(() => {
      //         console.log("UPDATE classroom practicelog");
      //       });
      //   });
      // });
    },

    transferData(collection) {
      // let schoolKey = "nRVbC1KZ9JjBxVDmCIhF";
      // db.collection(collection)
      //   .where("schoolKey", "==", schoolKey)
      //   .where("class", "==", "ป.6")
      //   .where("room", "==", "1")
      //   .get()
      //   .then(doc => {
      //     doc.forEach(element => {
      //       db.collection(collection)
      //         .doc(element.id)
      //         .update({
      //           class: "ม.1"
      //         })
      //         .then(() => {
      //           console.log(collection, "updated");
      //         });
      //     });
      //   });
    },
    resetPractice() {
      //     this.$q
      //       .dialog({
      //         message: "ยืนยัน",
      //         cancel: "ยกเลิก",
      //         ok: "ตกลง"
      //       })
      //       .onOk(() => {
      //         console.log("YES");
      //         db.collection("classroomPracticeLog")
      //           .where("skill", "==", this.optionSelected)
      //           .where("schoolKey", "==", this.teacherData.schoolKey)
      //           .get()
      //           .then(doc => {
      //             console.log("classroompracticelog", doc.size);
      //             let counterDelete = 0;
      //             doc.forEach(element => {
      //               db.collection("classroomPracticeLog")
      //                 .doc(element.id)
      //                 .delete()
      //                 .then(() => {
      //                   console.log("DELETING classroomPracticeLog");
      //                   counterDelete++;
      //                 });
      //             });
      //           });
      //         db.collection("studentpracticelog")
      //           .where("skill", "==", this.optionSelected)
      //           .where("schoolKey", "==", this.teacherData.schoolKey)
      //           .get()
      //           .then(doc => {
      //             console.log("studentpracticelogSize", doc.size);
      //             doc.forEach(element => {
      //               db.collection("studentpracticelog")
      //                 .doc(element.id)
      //                 .delete()
      //                 .then(() => {
      //                   console.log("DELETING student practice log");
      //                 });
      //             });
      //           });
      //       });
    }
  },
  mounted() {
    // this.loadRoomOptions();
    // db.collection("studentpracticelog")
    //   .where("schoolKey", "==", "PCqo2TqcEFMOcfkHnCEk")
    //   .where("missionKey", "==", "zKV9miN6uHXKnU5L4V2u")
    //   .get()
    //   .then(doc => {
    //     // let test = [];
    //     doc.forEach(element => {
    //       console.log(element.data().correct);
    //       // test.push(element.data().missionKey);
    //     });
    //     // test.sort((a, b) => (a > b ? 1 : -1));
    //     // console.log(test);
    //   });
  }
};
</script>

<style lang="scss" scoped>
</style>