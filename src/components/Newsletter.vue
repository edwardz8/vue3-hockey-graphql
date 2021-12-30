<template>
  <div class="bg-gray-50 mt-8 w-100">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Baseball Newsletter</span>
        <span class="block text-green-600">Enter your email to receive fantasy baseball weekly</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="rounded-md">
          <div>
            <input type="email" id="email" name="email" placeholder="email">
          </div>
          <!-- <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
            Get started
          </a> -->
        </div>
        <div class="ml-3 rounded-md shadow">
          <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-green-50">
            Submit
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input[type=text] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

</style>