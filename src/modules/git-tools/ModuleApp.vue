<template>
  <div>
    <NavBar />
    <router-view class="pt-12 min-h-screen" />
    <AppFooter />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "ModuleApp",

  components: {
    NavBar,
    AppFooter,
  },
};
</script>
