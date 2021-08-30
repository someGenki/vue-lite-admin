<template>
  <!-- 输入框和按钮 -->
  <div class="input-add">
    <input
      type="text"
      name="todo"
      placeholder="添加任务"
      v-model="todoContent"
      @keyup.enter="emitAddTodo"
    />
    <button @click="emitAddTodo">
      <!-- 按钮图标 -->
      <i class="plus" />
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TodoAdd',
  props: ['tid'],
  setup(props, { emit }) {
    const todoContent = ref('')

    const emitAddTodo = () => {
      if (todoContent.value && todoContent.value.trim()) {
        emit('add', todoContent.value)
        todoContent.value = ''
      }
    }

    return { todoContent, emitAddTodo }
  },
}
</script>

<style scoped>
.input-add {
  position: relative;
  display: flex;
  align-items: center;
}

.input-add input {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  font-size: 16px;
  color: #626262;
  border: none;
  border-radius: 40px;
  outline: none;
  box-shadow: 0 0 20px #0000000f;
}

.input-add button {
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  background: linear-gradient(#c0a5f3, #7f95f7);
  border: none;
  border-radius: 50%;
  outline: none;
}

.plus {
  display: block;
  width: 100%;
  height: 100%;

  /* 生成横着的线和竖着的线:配合size来控制大小 */
  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50% 2px, 2px 50%;
}
</style>
