<template>
  <div
    class="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center"
  >
    <div class="content text-3xl text-center md:text-left">
      <main
        class="mt-10 mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:mt-16 lg:mt-10 lg:px-4 xl:mt-8"
      >
        <div class="sm:text-center lg:text-left">
          <h1
            class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
          >
            <span class="block xl:inline">fungo fantasy baseball</span>
            <span class="block text-green-600 xl:inline"> stats and stories</span>
          </h1>
          <p
            class="mt-3 mb-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
          >
            Welcome to the home of baseball dfs news, lineup and betting advice. Sign up for our newsletter to receive our weekly top lineup & player prop selections.
          </p>
          <div>
            <router-link to="/table">
              <div class="rounded-md">
                <span class="w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-gray-800 md:py-4 md:text-lg">
                  Player Stats
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </main>
    </div>
    <div class="container mx-auto flex flex-col items-center">
      <div class="w-full">
        <img src="../../public/stadium-trees-phone.png" alt="" />
      </div>
    </div>
  </div>
</template>
