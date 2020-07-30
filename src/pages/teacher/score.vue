<template>
  <q-page class="bg_score">
    <div align="center" class="q-pa-xl text-h3 color3">คะแนน</div>
    <div align="center">
      <q-btn
        style="width:40%;min-width:500px"
        class="bg3 color6 q-pa-md text-h5 shadow-4"
        push
        label="คะแนนทบทวน"
        to="/teacher/scoreReview"
      ></q-btn>
    </div>
    <div align="center" class="q-pt-lg">
      <q-btn
        style="width:40%;min-width:500px"
        class="bg3 color6 q-pa-md text-h5 shadow-4"
        push
        label="คะแนนเก็บ"
        to="/teacher/scoreAvg"
      ></q-btn>
    </div>
    <div align="center" class="q-pt-lg">
      <q-btn
        style="width:40%;min-width:500px"
        class="bg3 color6 q-pa-md text-h5 shadow-4"
        push
        label="คะแนนแบบฝึกหัด / ทักษะ"
        to="/teacher/scorePractice"
      ></q-btn>
    </div>
    <div align="center" class="q-pt-lg">
      <q-btn
        style="width:40%;min-width:500px"
        class="bg3 color6 q-pa-md text-h5 shadow-4"
        push
        label="คะแนนทดสอบก่อนเรียน / หลังเรียน"
        to="/teacher/scorePrePost"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg_score {
  background-image: url("../../statics/bg_teacher_menu.png");
  background-size: cover;
  background-repeat: repeat;
  background-attachment: scroll;
  background-position: bottom;
}
</style>