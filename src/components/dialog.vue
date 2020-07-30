<template>
  <div>
    <q-dialog persistent v-model="isShow" content-class="backdrop">
      <q-card class="bg5 color3" style="max-width:450px;width:100%">
        <q-card-section>
          <div class="text-h6">{{ header }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{ content }}</q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-show="cancle"
            flat
            label="ยกเลิก"
            @click="cancleDialog()"
          ></q-btn>
          <q-btn label="ตกลง" outline @click="confirmDialog()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["isShow", "header", "content", "cancle"],
  methods: {
    confirmDialog() {
      this.$emit("confirmDialog", false);
    },
    cancleDialog() {
      this.$emit("cancleDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
