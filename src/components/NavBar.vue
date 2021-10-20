<template>
  <nav
    class="
      text-white
      bg-blue-900
      fixed
      left-0
      right-0
      py-2
      shadow-sm
      ring-1 ring-gray-900 ring-opacity-5
    "
  >
    <div class="container px-4 mx-auto md:px-0">
      <span class="mr-4">Logo</span>
      <Dropdown />
    </div>
  </nav>
</template>

<script>
import Dropdown from "./Dropdown.vue";

export default {
  name: "NavBar",

  components: {
    Dropdown,
  },
};
</script>
