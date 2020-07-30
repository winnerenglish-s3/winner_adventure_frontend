const routes = [
  {
    path: "/",
    component: () => import("pages/loading.vue"),
    name: "loading"
  },
  {
    path: "/login",
    component: () => import("pages/login.vue"),
    name: "login"
  },
  {
    path: "/test",
    component: () => import("pages/test.vue"),
    name: "test"
  },
  {
    path: "/test1",
    component: () => import("pages/test1.vue"),
    name: "test1"
  },
  {
    path: "/teacher/scorePracticePrint",
    component: () => import("pages/teacher/scorePracticePrint.vue"),
    name: "teacher/scorePracticePrint"
  },
  {
    path: "/teacher/studentlistprint/",
    component: () => import("pages/teacher/studentlistprint.vue"),
    name: "teacher/studentlistprint"
  },
  {
    path: "/teacher/scorePrePostPrint/",
    component: () => import("pages/teacher/scorePrePostPrint.vue"),
    name: "teacher/scorePrePostPrint"
  },
  {
    path: "/teacher/scoreAvgPrint/",
    component: () => import("pages/teacher/scoreAvgPrint.vue"),
    name: "teacher/scoreAvgPrint"
  },
  {
    path: "/print/flashcard/:practiceId",
    component: () => import("pages/print/flashcard.vue"),
    name: "t-printflashcard"
  },
  {
    path: "/print/spellingbee/:practiceId",
    component: () => import("pages/print/spellingbee.vue"),
    name: "t-printspellingbee"
  },
  {
    path: "/print/multiple/:practiceId",
    component: () => import("pages/print/multiplechoices.vue"),
    name: "t-printmultiple"
  },

  // Teacher : คุณครู
  {
    path: "/teacher/",
    component: () => import("layouts/teacherMyLayout.vue"),
    children: [
      // SECTION  Test หน้าคุณครู : วัดระดับ , prepost , ประเมิน
      {
        path: "/teacher/placement/",
        component: () => import("pages/teacher/placement.vue"),
        name: "t-placement"
      },
      {
        path: "/teacher/prepost/",
        component: () => import("pages/teacher/prepost.vue"),
        name: "t-prepost"
      },
      {
        path: "/teacher/questionnaire/",
        component: () => import("pages/teacher/questionnair.vue"),
        name: "t-questionnair"
      },
      {
        path: "/talkingplacement",
        component: () => import("pages/talkingplacement.vue"),
        name: "t-talkingplacement"
      },

      // SECTION  Main app
      // NOTE  หน้าเลือก Classroom
      {
        path: "/teacher/classroom/",
        component: () => import("pages/teacher/classroom.vue"),
        name: "t-classroom"
      },
      // NOTE  หน้าหลักคุณครู
      {
        path: "/teacher/main/",
        component: () => import("pages/teacher/main.vue"),
        name: "t-main"
      },
      // NOTE  โหวตนักเรียน
      {
        path: "/teacher/vote/",
        component: () => import("pages/teacher/vote.vue"),
        name: "t-vote"
      },
      // NOTE  เลือกแบบฝึกหัด
      {
        path: "/teacher/studyplan/",
        component: () => import("pages/teacher/studyplan.vue"),
        name: "t-studyplan"
      },
      // FLASHCARD
      {
        path: "/teacher/flashcard/",
        component: () => import("pages/teacher/flashcard.vue"),
        name: "t-flashcard"
      },
      // progress
      {
        path: "/teacher/progress/",
        component: () => import("pages/teacher/progress.vue"),
        name: "t-progress"
      },
      // practice
      {
        path: "/teacher/practice/",
        component: () => import("pages/teacher/practice.vue"),
        name: "t-practice"
      },
      // finish practice
      {
        path: "/teacher/finishpractice/",
        component: () => import("pages/teacher/finishpractice.vue"),
        name: "t-finishpractice"
      },
      // add more score
      {
        path: "/teacher/addmorescore/",
        component: () => import("pages/teacher/addmorescore.vue"),
        name: "t-addmorescore"
      },
      // Snap Check Onlnie Student
      {
        path: "/teacher/onlineProgress/",
        component: () => import("pages/teacher/onlineProgress.vue"),
        name: "t-onlineProgress"
      },
      // show current mission
      {
        path: "/teacher/mission/",
        component: () => import("pages/teacher/mission.vue"),
        name: "t-mission"
      },
      {
        path: "/teacher/grammarlesson/",
        component: () => import("pages/teacher/grammarlesson.vue"),
        name: "t-grammarlesson"
      },
      {
        path: "/teacher/readingstory/",
        component: () => import("pages/teacher/readingstory.vue"),
        name: "t-readingstory"
      },
      {
        path: "/teacher/grammaraction/",
        component: () => import("pages/teacher/grammaraction.vue"),
        name: "t-grammaraction"
      },
      {
        path: "/teacher/vdolesson/",
        component: () => import("pages/teacher/vdolesson.vue"),
        name: "t-vdolesson"
      },
      {
        path: "/teacher/conversationlesson/",
        component: () => import("pages/teacher/conversationlesson.vue"),
        name: "t-conversationlesson"
      },
      {
        path: "/teacher/summaryscore/",
        component: () => import("pages/teacher/summaryscore.vue"),
        name: "t-summaryscore"
      },
      {
        path: "/teacher/score/",
        component: () => import("pages/teacher/score.vue"),
        name: "t-score"
      },
      {
        path: "/teacher/scorePractice/",
        component: () => import("pages/teacher/scorepractice.vue"),
        name: "t-scorePractice"
      },
      {
        path: "/teacher/scoreReview/",
        component: () => import("pages/teacher/scoreReview.vue"),
        name: "t-scoreReview"
      },
      {
        path: "/teacher/scorePrePost/",
        component: () => import("pages/teacher/scoreprepost.vue"),
        name: "t-scorePrePost"
      },
      {
        path: "/teacher/scoreAvg/",
        component: () => import("pages/teacher/scoreavg.vue"),
        name: "t-scoreAvg"
      },
      {
        path: "/teacher/folder/",
        component: () => import("pages/teacher/datafiles.vue"),
        name: "t-documentfolder"
      },
      {
        path: "/teacher/studentlist/",
        component: () => import("pages/teacher/studentlist.vue"),
        name: "t-studentlist"
      },
      {
        path: "/teacher/learningplans/",
        component: () => import("pages/teacher/learningplans.vue"),
        name: "t-learningplans"
      },
      {
        path: "/teacher/userInfo/",
        component: () => import("pages/teacher/userInfo.vue"),
        name: "t-userInfo"
      },
      {
        path: "/teacher/finishMission/",
        component: () => import("pages/teacher/finishMission.vue"),
        name: "t-finishMission"
      },
      {
        path: "/teacher/roleplay/",
        component: () => import("pages/teacher/roleplay.vue"),
        name: "t-roleplay"
      },
      {
        path: "/print/main/",
        component: () => import("pages/print/main.vue"),
        name: "t-printmain"
      }
    ]
  },

  // Student : นักเรียน
  {
    path: "/student/",
    component: () => import("layouts/studentMylayout.vue"),
    children: [
      // SECTION  Waiting หน้ารอนักเรียน
      {
        path: "/student/waiting/",
        component: () => import("pages/student/waiting.vue"),
        name: "s-waiting"
      },
      // SECTION  Test หน้านักเรียน : วัดระดับ , prepost , ประเมิน
      {
        path: "/student/placement/",
        component: () => import("pages/student/placement.vue"),
        name: "s-placement"
      },
      {
        path: "/student/prepost/",
        component: () => import("pages/student/prepost.vue"),
        name: "s-prepost"
      },
      {
        path: "/student/questionnaire/",
        component: () => import("pages/student/questionnaire.vue"),
        name: "s-questionnaire"
      },

      // SECTION  Main app
      // NOTE  หน้าหลักนักเรียน
      {
        path: "/student/main/",
        component: () => import("pages/student/main.vue"),
        name: "s-main"
      },
      // NOTE  โหวต
      {
        path: "/student/vote/",
        component: () => import("pages/student/vote.vue"),
        name: "s-vote"
      },
      // NOTE  รอการเรียน
      {
        path: "/student/studyplan/",
        component: () => import("pages/student/studyplan.vue"),
        name: "s-studyplan"
      },
      // SECTION  Practice
      // NOTE  หน้าหลักแบบฝึกหัด
      {
        path: "/student/practice/",
        component: () => import("pages/student/practice.vue"),
        name: "s-practice"
      },
      // TODO : Review Practice
      {
        path: "/student/practice/review/",
        component: () => import("pages/student/reviewpractice.vue"),
        name: "s-reviewpractice"
      },
      // NOTE  vocabulary flashcard
      {
        path: "/student/practice/flashcard/",
        component: () => import("pages/student/flashcard.vue"),
        name: "s-flashcard"
      },
      // NOTE  vocabulary spelling bee
      {
        path: "/student/practice/spellingbee/",
        component: () => import("pages/student/spellingbee.vue"),
        name: "s-spellingbee"
      },
      // NOTE  vocabulary multiple
      {
        path: "/student/practice/multiplechoice/",
        component: () => import("pages/student/multiplechoice.vue"),
        name: "s-multiplechoice"
      },
      // NOTE  grammar action
      {
        path: "/student/practice/grammaraction/",
        component: () => import("pages/student/grammaraction.vue"),
        name: "s-grammaraction"
      },
      // NOTE  grammar fill in the blank
      {
        path: "/student/practice/grammarfillin/",
        component: () => import("pages/student/grammarfillin.vue"),
        name: "s-grammarfillin"
      },

      // NOTE  writing translation
      {
        path: "/student/practice/translation/",
        component: () => import("pages/student/translation.vue"),
        name: "s-translation"
      },
      // NOTE  reading content
      {
        path: "/student/practice/readingcontent/",
        component: () => import("pages/student/readingcontent.vue"),
        name: "s-readingcontent"
      },
      // NOTE  reading multiple choice
      {
        path: "/student/practice/readingmultiple/",
        component: () => import("pages/student/readingmultiple.vue"),
        name: "s-readingmultiple"
      },
      // NOTE  reading fill in the blank
      {
        path: "/student/practice/readingfillin/",
        component: () => import("pages/student/readingfillin.vue"),
        name: "s-readingfillin"
      },
      // NOTE  phonics practice
      {
        path: "/student/practice/multipleother/",
        component: () => import("pages/student/multiplechoice_other.vue"),
        name: "s-multipleother"
      },
      // NOTE  listening & speaking practice
      {
        path: "/student/practice/listeningpractice/",
        component: () => import("pages/student/listeningmultiple.vue"),
        name: "s-listeningmultiple"
      },
      // NOTE  listening & speaking role play
      {
        path: "/student/practice/roleplay/",
        component: () => import("pages/student/roleplay.vue"),
        name: "s-roleplay"
      },
      // NOTE  practice Lesson
      {
        path: "/student/practice/lesson/",
        component: () => import("pages/student/lesson.vue"),
        name: "s-lesson"
      },
      // NOTE  คะแนน
      {
        path: "/student/practice/score/",
        component: () => import("pages/student/score.vue"),
        name: "s-score"
      },
      // NOTE  ภารกิจสำเร็จ
      {
        path: "/student/missionsuccess",
        component: () => import("pages/student/missionsuccess.vue"),
        name: "s-missionsuccess"
      },
      // NOTE  ได้รับสมบัติ
      {
        path: "/student/gettreasure",
        component: () => import("pages/student/gettreasure.vue"),
        name: "s-gettreasure"
      },

      // NOTE  คะแนน
      {
        path: "/student/practice/extrascore/",
        component: () => import("pages/student/extrascore.vue"),
        name: "s-extrascore"
      },
      // mission
      {
        path: "/student/mission/",
        component: () => import("pages/student/mission.vue"),
        name: "s-mission"
      },
      // NOTE  Waiting for Friend หน้ารอเพื่อนหลังจากทำแบบฝึกหัดเสร็จ
      {
        path: "/student/practice/waiting/",
        component: () => import("pages/student/waitingfriend.vue"),
        name: "s-waitingfriend"
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
