<template>
  <student-list />
</template>

<script>
import StudentList from "./list/StudentList.vue";

export default {
  name: "Student-View",

  components: {
    StudentList
  }
};
</script>
