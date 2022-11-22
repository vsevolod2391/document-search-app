<template>
  <button
  :class="['btn', `btn_${color}`, {'btn_rounded': rounded}]"
  @click="clickOnButton"
  :disabled='disabled'>{{ label }}</button>
</template>

<script setup>
const props = defineProps({
  label: {
  type: String,
  default: 'Button'
  },
  color: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    required: false
  },
  rounded: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits(['click'])

const clickOnButton = () => {
  emit('click')
}

</script>

<style scoped lang="scss">
.btn {
  padding: 7px 28px;

  width: 114px;
  height: 31px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background: #fff;
  margin-bottom: 10px;

  border: none;
  cursor: pointer;
  transition: .2s;

  &_primary {
    border: 1px solid #0D6EFD;
    color: #0D6EFD;
    &:enabled:hover {
      background: #0D6EFD;;
      color: #fff;
    }
  }
  &_warning {
    color: #DC3545;
    border: 1px solid #DC3545;
    &:enabled:hover {
      background: #DC3545;
      color: #fff;
    }
  }
  &:disabled {
    opacity: .6;
    cursor: default;
  }
  &_rounded {
    border-radius: 8px;
  }
}
</style>