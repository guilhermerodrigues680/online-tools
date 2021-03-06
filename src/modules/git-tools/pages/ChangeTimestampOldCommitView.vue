<template>
  <div class="home pt-24">
    <section class="container px-4 pb-8 mx-auto md:px-0">
      <header>
        <h1 class="text-3xl">Alterar o carimbo de data/hora de um commit antigo</h1>
        <p class="text-lg sm:text-xl font-extralight">
          As vezes pode ser útil ajustar a data de um commit para fins diversos, para isso foi
          criada essa ferramenta que gera o comando shell necessário para realizar este ajuste. Os
          passos são os seguintes: Primeiro faça um commit, depois preencha os dados de data/hora no
          calendario abaixo e em seguida execute o comando gerado. Você verá no seu log de commits
          `git log` a alteração parecida com a demonstração.
        </p>
      </header>

      <div class="max-w-2xl mt-8 mx-auto">
        <div class="font-semibold">Selecione a data/hora</div>
        <div ref="flatpickrDiv" class="flex border rounded">
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

        <div class="mt-4" v-show="shellCommandWasGenerated">
          <div class="font-semibold">Demonstração</div>
          <div class="text-xs sm:text-base text-white bg-black">
            <pre class="p-4"><code>commit xxxxxxxx (HEAD -&gt; master)
  Author: userx &lt;userx@email.com&gt;
  Date:   {{commitDate}}

  Mensagem do commit</code></pre>
          </div>

          <div class="mt-3 font-semibold">Comando shell</div>
          <div class="flex border rounded bg-gray-500 bg-opacity-10">
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
                ml-1
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

            <button
              class="
                flex
                items-center
                text-white
                cursor-pointer
                bg-blue-500 bg-opacity-90
                hover-pointer-fine:bg-blue-700
                active:bg-blue-900
                border-l
              "
              v-if="navigatorCanShareText"
              @click="shareShellCommand()"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
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
import { Portuguese } from "flatpickr/dist/l10n/pt";
import ClipboardJS from "clipboard";
import alerts from "@/services/alerts";

export default {
  name: "ChangeTimestampOldCommitView",

  data: () => ({
    selectedDate: null,
    shellCommandWasGenerated: false,
    navigatorCanShareText: !!navigator.share,
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
      locale: Portuguese,
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
      } else {
        this.selectedDate = null;
        this.shellCommandWasGenerated = false;
      }
    },

    generateShellCommand() {
      if (!this.selectedDate) {
        alerts.fireToast("Selecione uma data", alerts.MSG_WARNING);
        return;
      }

      this.shellCommandWasGenerated = true;
    },

    shareShellCommand() {
      if (this.navigatorCanShareText) {
        try {
          navigator.share({
            title: "Comando shell",
            text: this.$refs.codeShellCommand.innerText,
            // url: window.location.toString(),
          });
          console.debug("Successful share");
          alerts.fireToast("Comando compartilhado!", alerts.MSG_SUCCESS);
        } catch (error) {
          console.log("Error sharing", error);
          alerts.fireToast(`Erro ao fazer compartilhamento: ${error}`, alerts.MSG_SUCCESS);
        }
      }
    },
  },
};
</script>
