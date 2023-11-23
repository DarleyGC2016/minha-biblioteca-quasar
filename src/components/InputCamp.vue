<template>
  <q-input
    filled
    model-value=""
    :label="props.label"
    :value="props.dado"
    @input="$emit('update:props.dado', $event.target.value)"
    class="col-lg-6 col-xs-12"
    maxlength="150"
    lazy-rules
    :rules="[val => props.validate]"
  />
</template>
<script setup lang="ts">
const props = defineProps(['dado', 'label', 'validate'])
defineEmits(['update:dado'])
</script>
