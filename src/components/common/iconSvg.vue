<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    // SVG 图标名称或在线URL
    name: {
      type: String,
      required: true
    },
    // 图标类名
    className: {
      type: String,
      default: ''
    }
  })
//匹配以 http: 或 https: 开头的字符串
  const isOnlineSvg = computed(() => /^(https?:)/.test(props.name))
</script>
<template>
  <div v-if="isOnlineSvg" 
    :style="{ '--svg-icon-url': `url(${name})` }" 
    class="svg-icon svg-icon-online"
    :class="className"
  />
  <!--需要加载的图片是指定在@/assets/images/icons文件目录下，
      通过 :xlink:href=ID 来查询图片，
      通过name查询ID：xx就是文件名；xx-xx就是目录-文件名
      指定文件和查询ID格式都是在vite.config.js通过createSvgIconsPlugin({...})设置的
  -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <!-- 通过ID：#icon-${name}来查询图片 -->
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  // width: 1em;
  // height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
