  <script>
	import { goto } from '$app/navigation';
    import { toast } from '@zerodevx/svelte-toast';

    async function sendAnswer() {
      const question = document.getElementById('question').value
      const answer = document.getElementById('answer').value
      const data = {
        question,
        answer
      }
      const resp = await fetch('/api/qlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        toast.push('Question saved!');
        goto('/dataset')
      }
    }
  </script>

  <div class="max-w-xl mx-auto mt-10 overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <form action="#" class="relative">
            <div class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500">
              <label for="question" class="sr-only">Question</label>
              <input type="text" name="question" id="question" class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0" placeholder="Question" autofocus>
              <label for="answer" class="sr-only">Answer</label>
              <textarea rows="2" name="answer" id="answer" class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Your Answer..."></textarea>
          
              <!-- Spacer element to match the height of the toolbar -->
              <div aria-hidden="true">
                <div class="py-2">
                  <div class="h-9"></div>
                </div>
                <div class="h-px"></div>
                <div class="py-2">
                  <div class="py-px">
                    <div class="h-9"></div>
                  </div>
                </div>
              </div>
            </div>
          
            <div class="absolute inset-x-px bottom-0">
              <div class="flex items-center justify-center space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                <div class="flex-shrink-0">
                  <button on:click={sendAnswer} class="inline-flex items-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Create</button>
                </div>
              </div>
            </div>
          </form>
    </div>
  </div>
