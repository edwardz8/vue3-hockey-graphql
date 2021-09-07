<template>
  <!-- <div class="bg-gray-100"> -->
  <div class="container rounded-lg features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-20 lg:max-w-none">
        <h2 class="text-2xl font-extrabold text-gray-900">Features</h2>
        <p class="text-medium font-bold text-gray-900">Prosper in your fantasy leagues and apps with articles on betting, lineup and season-long fantasy advice.</p>

        <div class="mt-3 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
          <div v-for="callout in callouts" :key="callout.name" class="group relative">
            <div class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <img :src="callout.imageSrc" :alt="callout.imageAlt" class="w-full h-full object-center object-cover" />
            </div>
            <h3 class="mt-3 text-sm text-gray-500">
              <a :href="callout.href">
                <span class="absolute inset-0" />
                {{ callout.name }}
              </a>
            </h3>
            <p class="text-base font-semibold text-gray-900">{{ callout.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const callouts = [
  {
    name: 'Daily Fantasy',
    description: 'Lineup and season-long articles',
    imageSrc: require('../../public/assets/UFOBag.svg'),
    imageAlt: 'daily fantasy sports hockey feature image',
    href: '#',
  },
  {
    name: 'Betting Props',
    description: 'Player and future props and parlays',
    imageSrc: require('../../public/assets/PlumbersJersey.svg'),
    imageAlt: 'betting props articles feature image',
    href: '#',
  },
  {
    name: 'Prospects',
    description: 'Keep up with future stars',
    imageSrc: require('../../public/assets/Skates-Retro-Pink-2.svg'),
    imageAlt: 'prospects section feature image',
    href: '#',
  },
]

export default {
  setup() {
    return {
      callouts,
    }
  },
}
</script>