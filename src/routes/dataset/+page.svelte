<div class="bg-white shadow-md">
    <div class="mx-auto max-w-8xl divide-y divide-gray-900/10 px-6 py-6 sm:py-32 lg:px-8 lg:py-10 mt-4">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">Your Dataset</h2>
        <a href="/dataset/add" class="rounded-md bg-green-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add question</a>
      </div>
      {#each [1,2,3,4,5,6] as item}
      <dl class="mt-4 space-y-4 divide-y divide-gray-900/10">
        <div class="pt-4 lg:grid lg:grid-cols-12 lg:gap-2">
          <dt class="text-base font-semibold leading-7 text-gray-900 lg:col-span-4">What&#039;s the best thing about Switzerland?</dt>
          <dd class="mt-2 lg:col-span-6 lg:mt-0">
            <p class="text-base leading-7 text-gray-600">I don&#039;t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
          </dd>
          <div class="lg:col-span-2 flex justify-end items-center space-x-2">
            <button class="rounded-md bg-amber-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Update</button>
            <button class="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Delete</button>
          </div>
        </div>  
      </dl>
      {/each}
    </div>
  </div>
  