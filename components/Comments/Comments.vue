<template>
  <div>
    <h2 class="mb-2">
      Commentaires
    </h2>
    <ul class="max-w-2xl">
      <li v-for="comment in comments" :key="comment.id" class="rounded px-4 py-2 bg-gray-100 hover:bg-gray-300 text-bold text-gray-600 mb-2">
        {{ comment }}
      </li>
    </ul>
    <CommentForm />
  </div>
</template>
<script>
import CommentForm from './CommentForm'

export default {
  name: 'Comments',
  components: {
    CommentForm
  },
  props: ['comments']
}
</script>
