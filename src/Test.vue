<template>
    <div>
        <div
            class="box"
            draggable="true"
            @dragstart="dragStart"
            @dragend="dragEnd">
            Drag Me
        </div>
        <div class="box" @dragover="dragOver" @drop="drop">
            Drop Here
        </div>
        <svg class="line" v-if="isDrawing">
            <line :x1="startX" :y1="startY" :x2="currentX" :y2="currentY" />
        </svg>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawing: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    };
  },
  methods: {
    dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
      this.isDrawing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
    },
    dragEnd() {
      this.isDrawing = false;
    },
    dragOver(event) {
      event.preventDefault();
    },
    drop(event) {
      event.preventDefault();
      this.currentX = event.clientX;
      this.currentY = event.clientY;
    },
  },
};
</script>


<style lang="stylus" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.line {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  stroke: #000;
  stroke-width: 2px;
}
</style>
