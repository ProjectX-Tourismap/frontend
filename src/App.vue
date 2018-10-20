<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .application, .application--wrap, .v-content, .v-content__wrap {
    min-height: 100% !important;
    width: 100%;
    height: 100%;
  }

  /*noinspection All */
  .application {
    margin-top: constant(safe-area-inset-top);
    margin-bottom: constant(safe-area-inset-bottom);
    margin-left: constant(safe-area-inset-left);
    margin-right: constant(safe-area-inset-right);
    margin-top: env(safe-area-inset-top);
    margin-bottom: env(safe-area-inset-bottom);
    margin-left: env(safe-area-inset-left);
    margin-right: env(safe-area-inset-right);
  }
</style>
