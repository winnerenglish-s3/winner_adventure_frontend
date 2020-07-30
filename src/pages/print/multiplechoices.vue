<template>
  <div class="page-white">
    <div class="page-header row">
      <div align="right" class="self-center col q-px-md">
        <q-btn icon="fas fa-print" dense round class="text-white" flat @click="printBtn()"></q-btn>
      </div>
    </div>

    <div class="box-space"></div>

    <div class="box-page" v-if="practiceData.length">
      <div class="page-A4">
        <div class="q-px-lg q-pb-md">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <!-- Header -->
                  <div class="row text-h6 font-default q-mb-xl q-pt-md">
                    <div class="col-6" align="left">
                      <span>WINNER ADVENTURES</span>
                    </div>
                    <div class="col-6" align="right">
                      <span>{{"UNIT" + practiceData[0].unit}}</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tr>
              <th>
                <!-- ชื่อ-นามสกุล -->
                <div class="row text-h6 font-default q-mb-xl" style="margin-top:-15px;">
                  <div class="col" align="left">
                    <span>
                      ชื่อ
                      <span
                        class="q-mr-xs"
                      >...........................................................................................................</span>
                    </span>
                  </div>
                  <div class="col-2" style="width:300px;" align="right">
                    <span class="q-mr-sm">
                      ชั้น
                      <span>..........................</span>
                    </span>
                    <span>
                      เลขที่
                      <span>..........................</span>
                    </span>
                  </div>
                </div>
              </th>
            </tr>

            <tr>
              <th>
                <div>
                  <div align="center">
                    <span class="font-default text-h6">แบบฝึกหัด</span>
                  </div>
                  <div class="box-choices row q-py-md q-px-xs q-mt-md q-mb-md">
                    <div class="q-mx-sm q-px-xs" v-for="(item,index) in choices" :key="index">
                      <span class="text-subtitle1 font-default" v-html="item"></span>
                    </div>
                  </div>
                </div>
              </th>
            </tr>

            <tbody>
              <tr v-for="(item,index) in practiceData" :key="index">
                <td>
                  <div class="q-py-xs q-mt-xs">
                    <div class="text-subtitle1 font-default q-mb-sm row">
                      <div class="col-1" style="width:50px;">
                        <span>{{index + 1 + ". "}}</span>
                      </div>
                      <div class="col">
                        <span v-html="item.question"></span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="page-A4">
        <div class="q-px-lg q-pt-md">
          <table class="table">
            <tr>
              <th>
                <!-- Header -->
                <div class="row text-h6 font-default q-mb-md q-mt-xl">
                  <div class="col" align="center">
                    <span class="text-h6">เฉลย</span>
                  </div>
                </div>
              </th>
            </tr>

            <tr v-for="(item,index) in practiceData" :key="index">
              <td>
                <div class="q-mt-md">
                  <div class="text-subtitle1 font-default q-mb-sm row">
                    <div class="col-1" style="width:50px;">
                      <span>{{index + 1 + "."}}</span>
                    </div>
                    <div class="col">
                      <span
                        v-html="item.choices.filter((x,index) => index == item.correctanswer )[0]"
                      ></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../router/index";
import { format } from "url";
export default {
  data() {
    return {
      practiceData: [],
      choices: []
    };
  },
  methods: {
    printBtn() {
      window.print();
    },
    async loadPractice() {
      let practiceId = this.$route.params.practiceId;

      db.collection("practicepool_server")
        .where("practicekey", "==", practiceId)
        .get()
        .then(doc => {
          let temp = [];
          let newchoices = [];
          doc.forEach(result => {
            let answer = result
              .data()
              .choices.filter(
                (x, index) => index == result.data().correctanswer
              )[0];

            newchoices.push(answer);

            // console.log(answer.length);

            // let newline = "";

            // for (let i = 0; i < answer.length; i++) {
            //   newline += "___";
            // }

            let newQuestion = result
              .data()
              .question.replace(/{______}/g, "________________")
              .replace(/_____/g, "________________");

            let newData = {
              ...result.data(),
              question: newQuestion
            };

            temp.push(newData);
          });

          newchoices.sort(x => 0.5 - Math.random());

          this.choices = newchoices;

          temp.sort((a, b) => {
            return a.order - b.order;
          });

          this.practiceData = temp;
        });
    }
  },
  mounted() {
    this.loadPractice();
  }
};
</script>

<style lang="scss" scoped>
.font-default {
  font-family: pridi;
}

.box-choices {
  border: 1px solid #000;
  border-radius: 5px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.border-dotted {
  border: 1px dotted rgb(211, 211, 211);
}

.page-white {
  width: 100%;
  background-color: #ffe5d2;
  background-size: cover;
}

.page-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #662707;
}

.box-space {
  padding-top: 70px;
}

.box-page {
  padding-bottom: 15px;
}

.page-A4 {
  width: 210mm;
  min-height: 297mm;
  height: fit-content;
  margin: 15px auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgb(0, 0, 0);
}

@media print {
  .page-header {
    display: none;
  }

  .page-white {
    width: 100%;
    background-color: transparent;
    background-size: cover;
  }

  .page-A4 {
    width: 210mm;
    height: 297mm;
    margin: 0px auto;
    background-color: #fff;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  }

  .box-space {
    padding-top: 0px;
  }

  .box-page {
    padding-bottom: 0px;
  }

  @page {
    margin: 0mm;
  }
}
</style>