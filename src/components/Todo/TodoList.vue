<template>
  <div class="todo-list">
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id + ':item'"
      :todo-item="todo"
      @change-state="todo.completed = $event.target.checked"
    />
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'

export default {
  name: 'TodoList',
  components: { TodoListItem },
  props: ['todos'],
}
</script>

<style scoped>
.todo-list {
  display: grid;
  row-gap: 10px;
  max-height: 200px;
  overflow: auto;
}
</style>
