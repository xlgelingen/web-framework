<template>
  <div class="home-page">
    <div class="home-content">Home</div>
    <!-- 全局注册的组件，@/components/common/iconSvg.vue，图片是指定在@/assets/images/icons文件目录下，
      通过name查询ID：xx就是文件名；xx-xx就是目录-文件名
      指定文件和查询ID格式都是在vite.config.js通过createSvgIconsPlugin({...})设置的
    -->
    <svg-icon name="logo" width="64px" height="64px"></svg-icon>
  </div>
</template>
