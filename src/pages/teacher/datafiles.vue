<template>
  <q-page class="bg-folder">
    <div align="center" class="q-pa-xl text-h3 color3">แฟ้มข้อมูล</div>
    <div align="center">
      <div>
        <q-btn
          style="width:40%;min-width:500px"
          class="bg3 color6 q-pa-md text-h5 shadow-4"
          push
          label="แผนการสอน"
          @click="$router.push('/teacher/learningplans')"
        ></q-btn>
      </div>
      <div class="q-pt-lg">
        <q-btn
          style="width:40%;min-width:500px"
          class="bg3 color6 q-pa-md text-h5 shadow-4"
          push
          label="รายชื่อนักเรียน"
          @click="$router.push('/teacher/studentlist')"
        ></q-btn>
      </div>
      <div class="q-pt-lg">
        <q-btn
          style="width:40%;min-width:500px"
          class="bg3 color6 q-pa-md text-h5 shadow-4"
          push
          label="คู่มือช่วยเหลือ"
          type="a"
          href="https://www.winner-english.com/manual"
          target="_blank"
        ></q-btn>
      </div>

      <div class="q-pt-lg">
        <q-btn
          to="/print/main"
          style="width:40%;min-width:500px"
          class="bg3 color6 q-pa-md text-h5 shadow-4"
          push
          label="พิมพ์แบบฝึกหัด"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>