<template>
  <q-input
    filled
    v-model="dado"
    :label="props.label"
    hint="Name and surname"
    class="col-lg-6 col-xs-12"
    maxlength="150"
    lazy-rules
    :rules="[val => props.validate]"
  />
</template>
<script setup lang="ts">
import { defineModel, defineProps } from 'vue'
export interface Props {
  label: string,
  validate: string | boolean
}

const dado = defineModel<string>()
const props = withDefaults(defineProps<Props>(), {
  label: () => '',
  validate: (): string| boolean => '' as string | false as boolean
})

</script>
