<template>
  <div>
    <CommentForm />
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment }}
      </li>
    </ul>
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
