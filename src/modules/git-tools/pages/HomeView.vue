<template>
  <div class="home pt-24">
    <section class="container mx-auto">
      <header>
        <h1 class="text-5xl mb-2">Git Tools</h1>
        <p class="text-2xl font-extralight">Ferramentas para Git</p>
      </header>

      <div class="mt-8">
        <h2 class="text-3xl">Links</h2>
        <ul>
          <li class="underline text-blue-500">
            <router-link to="/git-tools/change-timestamp-old-commit">
              Alterar o carimbo de data/hora de um antigo commit
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
