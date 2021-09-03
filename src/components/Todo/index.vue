<template>
  <div class="todo-container">
    <h3>待办事项</h3>
    <todo-add @add="addTodo" />
    <todo-filter :selected="filter" @change="filter = $event" />
    <todo-list :todos="filteredTodos" />
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import TodoAdd from './TodoAdd.vue'
import TodoFilter from './TodoFilter.vue'
import TodoList from './TodoList.vue'

// 来自 [【完整版】Vue 3.0 实战，开发基于 Composition API 的 To do Web App] (https://www.bilibili.com/video/BV1wy4y1k7Lr)
// React版本 https://github.com/someGenki/react-example-todo-app
export default {
  name: 'Todo',
  components: { TodoAdd, TodoFilter, TodoList },

  setup() {
    const todos = reactive([])

    const { filter, filteredTodos } = useFilteredTodos(todos)

    function addTodo(content) {
      todos.push({ id: content, content, competed: false })
    }

    addTodo('添加删除功能')
    addTodo('添加折叠按钮')
    addTodo('添加右键功能')

    return { addTodo, todos, filter, filteredTodos }
  },
}

function useFilteredTodos(todos) {
  const filter = ref('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'done':
        return todos.filter((todo) => todo.completed)
      case 'todo':
        return todos.filter((todo) => !todo.completed)
      default:
        return todos
    }
  })

  return { filter, filteredTodos }
}
</script>

<style scoped>
.todo-container {
  width: 100%;
  max-width: 330px;
  margin: 10px auto;
  padding: 4px 12px 12px;
  background-color: #f5f6fc; /* 淡紫灰色 */
  border-radius: 16px;
  box-shadow: 0 0 16px #00000026;
}

.todo-container > h3 {
  margin: 4px 6px 12px;
  font-size: 20px;
  color: #414873;
}
</style>
