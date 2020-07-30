<template>
  <q-page class="bg_score">
    <!-- NOTE App Bar -->
    <div class="row q-pa-sm relative-position bg5">
      <div class="absolute" style="bottom:6px">
        <q-btn
          to="/teacher/score"
          push
          class="bg3 color6"
          label="เมนูหลัก"
          icon="fas fa-chevron-left"
        ></q-btn>
      </div>
      <div align="center" class="color2 col-12 self-center text-h6">คะแนนแบบฝึกหัด/ทักษะ</div>
    </div>

    <!-- NOTE Selection-->

    <div class="row q-pa-md items-center">
      <div class="col-2 q-pr-sm" style="width:100px" align="right">ชั้น/ห้อง</div>
      <div class="col-1">
        <q-select
          outlined
          square
          dense
          class="bg-white"
          v-model="classRoomSelected"
          :options="classRoomOptions"
          @input="loadStudent()"
        ></q-select>
      </div>
      <div class="col-1 q-pr-sm" style="width:70px" align="right">บทที่</div>
      <div class="col-1">
        <q-select
          @input="loadStudentPracticeLog()"
          outlined
          square
          dense
          class="bg-white"
          v-model="unitSelected"
          :options="unitOptions"
        ></q-select>
      </div>
      <div class="col q-px-md">
        <div class="row items-center q-px-md q-py-md" style="border:1px solid #87533B">
          <div class="col-2">รูปแบบ</div>
          <div class="col-5">
            <q-radio class dense v-model="scoreType" val="1">
              แยกตาม
              <b>แบบฝึกหัด</b>
            </q-radio>
          </div>
          <div class="col q-pl-md">
            <q-radio dense v-model="scoreType" val="2">
              แยกตาม
              <b>ทักษะ</b>
            </q-radio>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pa-md">
      <div style="border:1px solid #87533B;" class="q-pa-md relative-position">
        <!-- <div align="right" class="q-pb-sm">
          <q-btn @click="printScore()" icon="fas fa-print" round class="bg3 text-white" size="md"></q-btn>
        </div>-->
        <div style="margin:auto;width:100%;" class="bg-white q-pa-sm">
          <div class="row bg8 q-pa-xs" style="border-radius:5px">
            <div class="col-2 bg-white" align="center" style="border-radius:5px">
              <img style="width:90px" src="../../statics/logo_winner.png" alt />
            </div>
            <div class="col text-white q-pa-sm" align="center">
              <div class="q-pb-xs">{{ schoolData.name }}</div>
              <div class="q-px-md">
                <q-separator class="bg-white q-mb-xs" />
                ปีการศึกษา {{ this.getTerm() }}/{{ this.getAcademicYear() }} |
                {{ convertClassroom }}
              </div>
            </div>
          </div>
          <div align="center" v-if="scoreType == '1'" class="q-pa-md">คะแนนแยกตามแบบฝึกหัด (%)</div>
          <div align="center" v-else class="q-pa-md">คะแนนแยกตามทักษะ (%)</div>
          <!-- NOTE คะแนนแยกตามแบบฝึกหัด -->
          <div v-if="scoreType == '2'">
            <table class="fit table_border" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td class="q-pa-sm table_border" style="width:50px">เลขที่</td>
                <td class="table_border">ชื่อ - นามสกุล</td>
                <td class="table_border" style="width:9%">คำศัพท์</td>
                <td class="table_border" style="width:9%">ไวยกรณ์</td>
                <td class="table_border" style="width:9%">การอ่าน</td>
                <td class="table_border" style="width:9%">การเขียน</td>
                <td class="table_border" style="width:9%">การออกเสียง</td>
                <td class="table_border" style="width:9%">การพูดและฟัง</td>
                <td class="table_border" style="width:9%">คะแนนเฉลี่ย</td>
              </tr>
              <tr v-for="(items, index) in studentList" :key="index">
                <td class="q-pa-sm table_border">{{ items.no }}</td>
                <td
                  class="table_border"
                  style="text-align:left;padding-left:30px"
                >{{ items.name }} {{ items.surname }}</td>
                <td class="table_border">{{ items.overallScore.vocabScore }}</td>
                <td class="table_border">{{ items.overallScore.grammarScore }}</td>
                <td class="table_border">{{ items.overallScore.readingScore }}</td>
                <td class="table_border">{{ items.overallScore.writingScore }}</td>
                <td class="table_border">{{ items.overallScore.phonicsScore }}</td>
                <td class="table_border">{{ items.overallScore.listeningScore }}</td>
                <td class="table_border">{{ items.overallScore.scoreAvg }}%</td>
              </tr>
            </table>
          </div>
          <!-- NOTE คะแนนแยกตามแบบฝึกหัด -->
          <div v-else>
            <table class="scroll_table fit" style="border-collapse:collapse">
              <tr style="background-color:#616262" class="text-white">
                <td class="table_border" style="min-width:70px">เลขที่</td>
                <td class="table_border" style="width:50%;min-width:170px">ชื่อ - นามสกุล</td>
                <td class="table_border" style="width:20%;padding:0px;">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black;min-width:120px"
                        :colspan="headerColumn.vocab + 1"
                      >คำศัพท์</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:60px"
                        v-for="i in headerColumn.vocab"
                        :key="i"
                        class="border-right"
                      >
                        <span>{{ i }}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="table_border" style="padding:0px;min-width:120px">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black"
                        :colspan="headerColumn.grammar + 1"
                      >ไวยกรณ์</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:50px"
                        v-for="i in headerColumn.grammar"
                        :key="i"
                        class="border-right"
                      >
                        <span>{{ i }}</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td class="table_border" style="min-width:120px;padding:0px">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black"
                        :colspan="headerColumn.reading + 1"
                      >การอ่าน</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:50px"
                        v-for="i in headerColumn.reading"
                        :key="i"
                        class="border-right"
                        v-show="i == 1"
                      >{{ i }}</td>
                    </tr>
                  </table>
                </td>
                <td class="table_border" style="min-width:120px;padding:0px">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black"
                        :colspan="headerColumn.writing + 1"
                      >การเขียน</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:50px"
                        v-for="i in headerColumn.writing"
                        :key="i"
                        class="border-right"
                      >{{ i }}</td>
                    </tr>
                  </table>
                </td>
                <td class="table_border" style="min-width:120px;padding:0px">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black"
                        :colspan="headerColumn.phonics + 1"
                      >การออกเสียง</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:50px"
                        v-for="i in headerColumn.phonics"
                        :key="i"
                        class="border-right"
                      >{{ i }}</td>
                    </tr>
                  </table>
                </td>
                <td class="table_border" style="min-width:120px;padding:0px">
                  <table class="fit" style="border-collapse:collapse">
                    <tr>
                      <td
                        style="border-bottom:1px solid black"
                        :colspan="headerColumn.listening + 1"
                      >การพูดและการฟัง</td>
                    </tr>
                    <tr>
                      <td
                        style="min-width:50px"
                        v-for="i in headerColumn.listening"
                        :key="i"
                        class="border-right"
                      >{{ i }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr
                v-for="(items, index) in studentList"
                :key="index"
                style="border-bottom:1px solid"
              >
                <td align="center" style="border:1px solid black">{{ items.no }}</td>
                <td
                  align="center"
                  style="border-bottom:1px solid black"
                >{{ items.name }} {{ items.surname }}</td>
                <td style="padding:0px">
                  <table
                    class="fit"
                    style="border-collapse:collapse"
                    v-if="headerColumn.vocab != 0"
                  >
                    <tr>
                      <td
                        align="center"
                        v-for="s in headerColumn.vocab"
                        :key="s"
                        :style="'min-width:50px'"
                        style="border-bottom:1px solid;border-left:1px solid black"
                      >
                        <span v-if="items.vocabScoreArr[s - 1]">
                          {{
                          items.vocabScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;">0</td>
                    </tr>
                  </table>
                </td>
                <td style="padding:0px">
                  <table class="fit" style="border-collapse:collapse" v-if="headerColumn.grammar">
                    <tr>
                      <td
                        align="center"
                        style="border-bottom:1px solid;border-left:1px solid black"
                        v-for="s in headerColumn.grammar"
                        :key="s"
                        :style="'min-width:50px'"
                      >
                        <span v-if="items.grammarScoreArr[s - 1]">
                          {{
                          items.grammarScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;">0</td>
                    </tr>
                  </table>
                </td>
                <td style="padding:0px;min-width:100px">
                  <table class="fit" style="border-collapse:collapse" v-if="headerColumn.reading">
                    <tr>
                      <td
                        align="center"
                        style="border-bottom:1px solid;border-left:1px solid black"
                        v-for="s in headerColumn.reading"
                        :key="s"
                        v-show="s == 1"
                      >
                        <span v-if="items.readingScoreArr[s - 1]">
                          {{
                          items.readingScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;">0</td>
                    </tr>
                  </table>
                </td>
                <td style="padding:0px">
                  <table class="fit" style="border-collapse:collapse" v-if="headerColumn.writing">
                    <tr>
                      <td
                        align="center"
                        style="border-bottom:1px solid;border-left:1px solid black"
                        v-for="s in headerColumn.writing"
                        :key="s"
                        :style="'min-width:50px'"
                      >
                        <span v-if="items.writingScoreArr[s - 1]">
                          {{
                          items.writingScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;">0</td>
                    </tr>
                  </table>
                </td>
                <td style="padding:0px">
                  <table class="fit" style="border-collapse:collapse" v-if="headerColumn.phonics">
                    <tr>
                      <td
                        align="center"
                        style="border-bottom:1px solid;border-left:1px solid black"
                        v-for="s in headerColumn.phonics"
                        :style="'width:' + 100 / headerColumn.phonics + '%'"
                        :key="s"
                      >
                        <span v-if="items.phonicsScoreArr[s - 1]">
                          {{
                          items.phonicsScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;">0</td>
                    </tr>
                  </table>
                </td>
                <td style="padding:0px">
                  <table class="fit" style="border-collapse:collapse" v-if="headerColumn.listening">
                    <tr>
                      <td
                        align="center"
                        style="border-bottom:1px solid;border-left:1px solid;border-right:1px solid black"
                        v-for="s in headerColumn.listening"
                        :key="s"
                        :style="'width:' + 100 / headerColumn.listening + '%'"
                      >
                        <span v-if="items.listeningScoreArr[s - 1]">
                          {{
                          items.listeningScoreArr[s - 1]
                          }}
                        </span>
                        <span v-else>0</span>
                      </td>
                    </tr>
                  </table>

                  <table v-else class="fit" style="border-collapse:collapse">
                    <tr>
                      <td align="center" style="border-left:1px solid;border-right:1px solid">0</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div class="q-mt-md">
            <span class="text-italic">หมายเหตุ &nbsp;</span>
            <span>
              ลำดับตัวเลขใต้ทักษะคำศัพท์ และ ไวยากรณ์
              คือลำดับแบบฝึกหัดที่มีการเก็บคะแนนเท่านั้น ไม่รวมการสอน
              ทบทวนก่อนเรียน และ ถามตอบไวยากรณ์
            </span>
          </div>
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
      grammarNumber: 5,

      classRoomOptions: [],
      classRoomSelected: "",
      unitOptions: [],
      unitSelected: "1",
      scoreType: "1",
      headerColumn: "",
      studentList: "",
      selectedLevel: "",
      practiceList: "",
    };
  },
  methods: {
    printScore() {
      this.$router.push({
        name: "teacher/scorePracticePrint",
        params: {
          data: this.studentList,
          schoolKey: this.teacherData.schoolKey,
          term: this.getTerm(),
          year: this.getAcademicYear(),
          classRoomSelected: this.classRoomSelected,
        },
      });
    },
    loadUnitOptions() {
      let term = this.getTerm();
      let year = this.getAcademicYear();

      // NOTE LOAD unit ที่เคยทำแล้วของระดับชั้นนี้ ห้องนี้
      let filter =
        this.classRoomSelected.slice(0, 3) +
        "-" +
        this.classRoomSelected.slice(4) +
        "-" +
        term +
        "-" +
        year;
      let passedUnit = [];

      db.collection("classroomPracticeLog")
        .where("filter", "==", filter)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .get()
        .then((doc) => {
          doc.forEach((element) => {
            passedUnit.push(element.data().unit);
          });

          passedUnit = [...new Set(passedUnit)];
          passedUnit = passedUnit.sort((a, b) => {
            return Number(a) - Number(b);
          });
          this.unitOptions = passedUnit;
          this.unitSelected = passedUnit[passedUnit.length - 1];
          this.loadStudentPracticeLog();
        });
    },
    loadStudentPracticeLog() {
      console.clear();
      let practiceList = this.practiceList;
      let exceptVocabType = ["flashcard", "review vocab"];
      let exceptGrammarType = [
        "grammarlesson",
        "review grammar",
        "grammaraction",
      ];
      let exceptPhonicsType = ["phonicslesson"];
      let exceptListeningType = ["languagetips", "speaking", "roleplay"];

      // NOTE จำนวนแบบฝึกหัดทั้งหมดของ Vocabulary ที่ Unit นี้ โดยยกเว้น flashcard ไม่นับรวมเป็นตัวหาร
      let totalVocab = practiceList.filter(
        (x) =>
          x.skill == "Vocabulary" &&
          x.unit == this.unitSelected &&
          !exceptVocabType.includes(x.practicetype) &&
          x.level == this.selectedLevel
      );

      totalVocab = totalVocab.length;
      console.log("totalVocab", totalVocab);

      // NOTE จำนวนแบบฝึกหัดทั้งหมดของ Grammar โดยยกเว้นตาม exceptGrammarType
      let totalGrammar = practiceList.filter(
        (x) =>
          x.skill == "Grammar" &&
          x.unit == this.unitSelected &&
          !exceptGrammarType.includes(x.practicetype) &&
          x.level == this.selectedLevel
      );
      totalGrammar = totalGrammar.length;
      console.log("totalGrammar", totalGrammar);

      let totalWriting = practiceList.filter(
        (x) =>
          x.skill == "Writing" &&
          x.unit == this.unitSelected &&
          x.level == this.selectedLevel
      );
      totalWriting = totalWriting.length;

      console.log("totalWriting", totalWriting);

      let totalReading = practiceList.filter(
        (x) =>
          x.skill == "Reading" &&
          x.unit == this.unitSelected &&
          x.level == this.selectedLevel &&
          x.practicetype != "readingspeaking"
      );
      totalReading = totalReading.length;
      console.log("totalReading", totalReading);

      let totalPhonics = practiceList.filter(
        (x) =>
          x.skill == "Phonics" &&
          x.unit == this.unitSelected &&
          !exceptPhonicsType.includes(x.practicetype) &&
          x.level == this.selectedLevel
      );
      totalPhonics = totalPhonics.length;
      console.log("totalPhonics", totalPhonics);

      let totalListening = practiceList.filter(
        (x) =>
          x.skill == "Listening & Speaking" &&
          x.unit == this.unitSelected &&
          !exceptListeningType.includes(x.practicetype) &&
          x.level == this.selectedLevel
      );

      totalListening = totalListening.length;
      console.log("totalListening", totalListening);

      let term = this.getTerm();
      let year = this.getAcademicYear();
      db.collection("studentpracticelog")
        .where("class", "==", this.classRoomSelected.slice(0, 3))
        .where("room", "==", this.classRoomSelected.slice(4))
        .where("term", "==", term)
        .where("year", "==", year)
        .where("schoolKey", "==", this.teacherData.schoolKey)
        .where("level", "==", this.selectedLevel)
        .get()
        .then((doc) => {
          let scoreTemp = [];
          doc.forEach((element) => {
            scoreTemp.push(element.data());
          });
          scoreTemp = scoreTemp.filter((x) => x.unit == this.unitSelected);

          this.studentList.forEach((element) => {
            let scoreArr = scoreTemp
              .filter((x) => x.studentKey == element.key)
              .map((e) => (e.correct / e.totalQuestion) * 100);

            let scoreAvg =
              scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length;
            scoreAvg = Math.round(scoreAvg);

            let scoreSum = (scoreArr = scoreArr.reduce((a, b) => a + b, 0));
            scoreSum = Math.round(scoreSum);

            let vocabScore = 0;
            let grammarScore = 0;
            let readingScore = 0;
            let writingScore = 0;
            let phonicsScore = 0;
            let listeningScore = 0;

            let scoreTempArr = scoreTemp.filter(
              (x) => x.studentKey == element.key
            );

            // NOTE ต้องเอาจำนวนแบบฝึกหัดทั้งหมดใน Vocab ไม่ใช่ แบบฝึกหัดที่ทำไปแล้ว
            vocabScore = scoreTempArr
              .filter(
                (x) =>
                  x.skill == "Vocabulary" && !x.practiceType.includes("review")
              )
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);

            vocabScore = vocabScore / totalVocab;

            grammarScore = scoreTempArr
              .filter(
                (x) =>
                  x.skill == "Grammar" &&
                  !exceptGrammarType.includes(x.practiceType)
              )
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);
            grammarScore = grammarScore / totalGrammar;

            readingScore = scoreTempArr
              .filter((x) => x.skill == "Reading")
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);
            readingScore = readingScore / totalReading;

            writingScore = scoreTempArr
              .filter((x) => x.skill == "Writing")
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);
            writingScore = writingScore / totalWriting;

            phonicsScore = scoreTempArr
              .filter((x) => x.skill == "Phonics")
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);
            phonicsScore = phonicsScore / totalPhonics;

            listeningScore = scoreTempArr
              .filter((x) => x.skill == "Listening & Speaking")
              .map((e) => (e.correct / e.totalQuestion) * 100)
              .reduce((a, b) => a + b, 0);
            listeningScore = listeningScore / totalListening;

            if (!vocabScore) vocabScore = 0;
            if (!grammarScore) grammarScore = 0;
            if (!readingScore) readingScore = 0;
            if (!writingScore) writingScore = 0;
            if (!phonicsScore) phonicsScore = 0;
            if (!listeningScore) listeningScore = 0;

            element.overallScore = {
              vocabScore: Math.round(vocabScore),
              grammarScore: Math.round(grammarScore),
              readingScore: Math.round(readingScore),
              writingScore: Math.round(writingScore),
              phonicsScore: Math.round(phonicsScore),
              listeningScore: Math.round(listeningScore),
              scoreAvg: Math.round(
                (vocabScore +
                  grammarScore +
                  readingScore +
                  writingScore +
                  phonicsScore +
                  listeningScore) /
                  6
              ),
            };

            this.headerColumn = {
              vocab: totalVocab,
              grammar: totalGrammar,
              reading: totalReading,
              writing: totalWriting,
              phonics: totalPhonics,
              listening: totalListening,
            };
            element.totalVocab = totalVocab;
            element.totalGrammar = totalGrammar;
            element.totalReading = totalReading;
            element.totalWriting = totalWriting;
            element.totalPhonics = totalPhonics;
            element.totalListening = totalListening;

            let scoreVocabMap = scoreTempArr
              .filter((x) => x.skill == "Vocabulary")
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));
            element.vocabScoreArr = scoreVocabMap;

            // console.log(scoreTempArr.filter(x => x.skill == "Grammar"));

            let scoreGrammarMap = scoreTempArr
              .filter(
                (x) =>
                  x.skill == "Grammar" &&
                  !exceptGrammarType.includes(x.practiceType)
              )
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));
            element.grammarScoreArr = scoreGrammarMap;

            let scoreReadingMap = scoreTempArr
              .filter((x) => x.skill == "Reading")
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));
            element.readingScoreArr = scoreReadingMap;

            let scoreWritingMap = scoreTempArr
              .filter((x) => x.skill == "Writing")
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));
            element.writingScoreArr = scoreWritingMap;

            let scorePhonicsMap = scoreTempArr
              .filter((x) => x.skill == "Phonics")
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));
            element.phonicsScoreArr = scorePhonicsMap;

            let scoreListeningMap = scoreTempArr
              .filter((x) => x.skill == "Listening & Speaking")
              .map((e) => Math.round((e.correct / e.totalQuestion) * 100));

            element.listeningScoreArr = scoreListeningMap;

            this.studentList.push("");
            this.studentList.pop();
          });

          this.loadingHide();
        });
    },
    loadData() {
      // NOTE LOAD CLASSROOM OPTIONS
      this.loadingShow();

      this.studentAllList = this.decrypt(
        this.$q.localStorage.getItem("allStudentData"),
        1
      );

      let roomTotal = [];
      let studentData = this.studentAllList.map((x) => {
        return x.classRoom + "/" + x.room;
      });

      studentData = [...new Set(studentData)];
      studentData.sort((a, b) => {
        let grade1 = a[0];
        let grade2 = b[0];
        if (grade1 == "ป") {
          grade1 = "z";
        }
        if (grade2 == "ป") {
          grade2 = "z";
        }
        let d1 = grade1 + a.slice(1);
        let d2 = grade2 + b.slice(1);
        return d1 > d2 ? 1 : -1;
      });
      this.classRoomOptions = studentData;
      this.classRoomSelected = studentData[0];
      this.loadStudent();
    },
    loadStudent() {
      let classRoom = this.classRoomSelected.slice(0, 3);
      let room = this.classRoomSelected.slice(4);
      let result = this.studentAllList.filter((x) => {
        return x.classRoom == classRoom && x.room == room;
      });

      result.sort((a, b) => {
        return a.no - b.no;
      });

      result.forEach((element) => {
        element.overallScore = {
          vocabScore: 0,
          grammarScore: 0,
          readingScore: 0,
          writingScore: 0,
          phonicsScore: 0,
          listeningScore: 0,
          scoreAvg: 0,
        };
      });

      this.studentList = result;

      let studentLevel = result.map((x) => x.level);
      studentLevel.sort((a, b) => Number(b) - Number(a));
      this.selectedLevel = studentLevel[0];
      this.loadUnitOptions();
    },
    async getPracticeList() {
      let practiceTemp = [];
      let loadPracticelist = await db.collection("practicelist").get();
      loadPracticelist.forEach((element) => {
        let dataKey = { practiceKey: element.id };
        let final = { ...dataKey, ...element.data() };
        practiceTemp.push(final);
        practiceTemp.sort((a, b) => {
          return a.order - b.order;
        });
      });
      practiceTemp.sort((a, b) => {
        return Number(a.unit) - Number(b.unit);
      });
      this.practiceList = practiceTemp;
      this.loadData();
    },
  },
  computed: {
    convertClassroom() {
      if (this.classRoomSelected.includes("ป")) {
        return this.classRoomSelected.replace("ป.", "ชั้นประถมศึกษาปีที่ ");
      } else {
        return this.classRoomSelected.replace("ม.", "ชั้นมัธยมศึกษาปีที่ ");
      }
    },
  },
  mounted() {
    this.getPracticeList();
  },
};
</script>

<style lang="scss" scoped>
.border-right {
  border-right: 1px solid black;
}
.bg_score {
  background-color: #ffe5d2;
}
.table_border {
  border: 1px solid black;
  text-align: center;
}
.scroll_table {
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0683df;
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0683df;
}
.rotate {
  transform: rotate(-90deg);
}
</style>
