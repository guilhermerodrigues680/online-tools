<template>
  <div class="home pt-24">
    <section class="container px-4 mx-auto md:px-0">
      <header>
        <h1 class="text-3xl">Alterar o carimbo de data/hora de um antigo commit</h1>
        <p class="text-xl font-extralight"></p>
      </header>

      <div class="max-w-2xl mt-8 mx-auto">
        <div class="flex flex-col sm:flex-row sm:justify-center gap-x-4 gap-y-2">
          <div ref="flatpickrDiv" class="inline-flex border rounded">
            <input
              class="flex-1 px-2 py-1 appearance-none text-center"
              ref="flatpickrInputDateTime"
              name=""
              placeholder="Selecione a data/hora"
              data-input
            />

            <span class="border-l cursor-pointer" title="toggle" data-toggle>
              <i class="p-2 block text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </i>
            </span>

            <span class="border-l cursor-pointer" title="clear" data-clear>
              <i class="p-2 block text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </i>
            </span>
          </div>
        </div>

        <button
          class="
            w-full
            block
            mt-4
            bg-blue-500
            hover-pointer-fine:bg-blue-700
            active:bg-blue-900
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          @click="generateShellCommand()"
        >
          Gerar comando shell
        </button>

        <div v-show="shellCommandWasGenerated">
          <div class="text-xs sm:text-base mt-4 text-white bg-black">
            <pre class="p-4"><code>commit xxxxxxxx (HEAD -&gt; master)
  Author: userx &lt;userx@email.com&gt;
  Date:   {{commitDate}}

  Mensagem do commit</code></pre>
          </div>

          <div class="flex mt-3 gap-x-1 border rounded bg-gray-500 bg-opacity-10">
            <div class="flex-1 overflow-auto">
              <pre><code ref="codeShellCommand" class="block text-xs md:text-sm px-4 py-6 whitespace-nowrap">GIT_COMMITTER_DATE="{{ commitDate }}" git commit --amend --date="{{ commitDate }}" --no-edit</code></pre>
            </div>

            <button
              class="
                flex
                items-center
                text-white
                cursor-pointer
                bg-blue-500 bg-opacity-90
                hover-pointer-fine:bg-blue-700
                active:bg-blue-900
              "
              ref="buttonCopyClipboard"
            >
              <i class="block px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import ClipboardJS from "clipboard";
import alerts from "@/services/alerts";

export default {
  name: "ChangeTimestampOldCommitView",

  data: () => ({
    selectedDate: null,
    shellCommandWasGenerated: false,
  }),

  computed: {
    commitDate() {
      //"Wed Oct 20 16:09:30 2021 -0300"
      if (this.selectedDate) {
        return new Date(this.selectedDate).toGMTString();
      } else {
        return "...selecione a data/hora";
      }
    },
  },

  mounted() {
    flatpickr(this.$refs.flatpickrDiv, {
      enableTime: true,
      dateFormat: "d/m/Y H:i",
      time_24hr: true,
      wrap: true,
      onChange: (selectedDates, dateStr) => this.changeSelectedDates(selectedDates, dateStr),
    });

    const clipboard = new ClipboardJS(this.$refs.buttonCopyClipboard, {
      target: (/*trigger*/) => {
        return this.$refs.codeShellCommand;
      },
    });

    clipboard.on("success", (e) => {
      console.debug("e:", e);
      console.debug("Action:", e.action);
      console.debug("Text:", e.text);
      console.debug("Trigger:", e.trigger);
      e.clearSelection();
      alerts.fireToast("Comando copiado para área de transferência!", alerts.MSG_SUCCESS);
    });

    clipboard.on("error", (e) => {
      console.error("e:", e);
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  },

  methods: {
    changeSelectedDates(selectedDates /*, dateStr*/) {
      // console.debug("change", selectedDates);
      const selectedDate = selectedDates[0];
      if (selectedDate) {
        this.selectedDate = selectedDate.toISOString();
      }
    },

    generateShellCommand() {
      if (!this.selectedDate) {
        alerts.fireToast("Selecione uma data", alerts.MSG_WARNING);
        return;
      }

      this.shellCommandWasGenerated = true;
    },
  },
};
</script>
