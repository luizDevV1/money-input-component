<template>
  <money-field :value-field="num" @money-update="update_value" />
</template>

<script setup lang="ts">
import MoneyField from "./components/money-field/money-field.vue";
import {ref} from "vue";

const num = ref(500)

function update_value(value: number): void {
  num.value = value;
}
</script>
