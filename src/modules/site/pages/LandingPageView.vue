<template>
  <div class="flex flex-col min-h-screen overflow-hidden antialiased text-gray-900 tracking-tight">
    <header
      class="fixed z-50 top-0 left-0 right-0 bg-transparent transition-colors duration-200"
      :class="{ 'bg-blue-500 shadow-md': wasScrolled }"
    >
      <div class="max-w-6xl mx-auto px-5 sm:px-6">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- logo -->
          <div class="mr-4 flex-shrink-0">
            <a :href="baseUrl">
              <img :src="require('@/assets/logo.svg')" alt="logo online tools" />
            </a>
          </div>

          <!-- Nav -->
          <nav class="flex-grow flex justify-end">
            <button
              class="
                w-8
                h-8
                flex
                items-center
                justify-center
                text-white
                bg-white
                rounded-full
                bg-opacity-20
              "
              @click="mobileMenu = !mobileMenu"
            >
              <MenuIcon v-show="!mobileMenu" />
              <XIcon v-show="mobileMenu" />
            </button>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-grow flex flex-col">
      <article class="flex-grow flex flex-col">
        <header class="flex-grow relative max-w-6xl mx-auto px-4 pt-32 pb-12">
          <div>
            <h1
              class="
                text-5xl text-center text-white
                font-extrabold
                leading-tight
                tracking-tighter
                mb-4
              "
            >
              Online Tools
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-400"
              >
                Webapp
              </span>
            </h1>

            <p class="text-xl text-center text-gray-50 mb-8">
              Our landing page template works on all devices, so you only have to set it up once,
              and get beautiful results forever.
            </p>

            <button
              class="
                block
                w-full
                px-5
                py-5
                mb-4
                text-base text-indigo-600
                font-semibold
                transition-colors
                duration-75
                sm:duration-300
                bg-white
                rounded-full
                shadow-md
                hover-pointer-fine:text-white hover-pointer-fine:bg-green-400
                active:text-white active:bg-green-500
              "
            >
              Acao 1
            </button>

            <button
              class="
                block
                w-full
                px-5
                py-5
                mb-4
                text-base text-indigo-600
                font-semibold
                transition-colors
                duration-75
                sm:duration-300
                bg-white
                rounded-full
                shadow-md
                hover-pointer-fine:text-white hover-pointer-fine:bg-green-400
                active:text-white active:bg-green-500
              "
            >
              Acao 2
            </button>
          </div>

          <!-- Background Shapes -->
          <div
            class="
              absolute
              -z-1
              inset-0
              bg-gradient-to-b
              from-blue-500
              via-purple-600
              to-indigo-800
            "
          ></div>
          <div
            class="
              absolute
              -z-1
              inset-0
              opacity-90
              bg-gradient-to-br
              from-transparent
              via-indigo-900
              to-transparent
              transform
              translate-y-12
              -translate-x-1/3
              rotate-30
              scale-y-110
            "
          ></div>
          <div
            class="
              absolute
              -z-1
              inset-0
              opacity-40
              bg-gradient-to-br
              from-transparent
              via-indigo-900
              to-transparent
              transform
              translate-y-12 translate-x-1/3
              rotate-45
              scale-y-110
            "
          ></div>
        </header>
      </article>
      <section class="bg-white"></section>
    </main>

    <footer>footer</footer>
  </div>
</template>

<script>
import MenuIcon from "@/components/icons/MenuIcon.vue";
import XIcon from "@/components/icons/XIcon.vue";
import _throttle from "lodash/throttle";

export default {
  name: "LandingPageView",

  components: {
    MenuIcon,
    XIcon,
  },

  data: () => ({
    baseUrl: process.env.BASE_URL,
    mobileMenu: false,
    wasScrolled: false,
    throttled: null,
  }),

  mounted() {
    // '_throttle' Evita atualizar excessivamente a posição durante a rolagem.
    this.throttled = _throttle(this.handleScroll, 250);
    document.addEventListener("scroll", this.throttled);
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.throttled);
  },

  methods: {
    handleScroll() {
      this.wasScrolled = document.documentElement.scrollTop >= 32;
      console.debug("handleScroll", this.wasScrolled);
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  min-height: 150vh;
}
</style>
