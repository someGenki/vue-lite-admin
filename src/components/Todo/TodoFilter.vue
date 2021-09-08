<template>
  <!-- 过滤选项 -->
  <div class="filters">
    <span
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('change', filter.value)"
      class="filter"
      :class="{ active: selected === filter.value }"
    >
      {{ filter.label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TodoFilter',
  props: ['selected'],
  setup() {
    const filters = [
      { label: '全部', value: 'all' },
      { label: '已完成', value: 'done' },
      { label: '未完成', value: 'todo' },
    ]
    return { filters }
  },
}
</script>

<style scoped>
.filters {
  display: flex;
  padding-bottom: 5px;
  margin: 16px 4px;
  font-size: 14px;
  color: #c0c2ce;
  border-bottom: 1px solid #DAD7D7;
}

.filters .filter {
  margin-right: 14px;
  cursor: pointer;
  transition: 0.5s;
}

.filters .filter.active {
  color: #6b729c;
  transform: scale(1.2);
}
</style>
