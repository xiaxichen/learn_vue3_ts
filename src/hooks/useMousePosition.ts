import {onMounted, onUnmounted, reactive} from "vue";

function useMousePosition() {
    // 捕捉鼠标位置
    const position = reactive({
        x: 0, y: 0
    });
    const updateMouseCoord = (e: MouseEvent) => {
        position.x = e.pageX
        position.y = e.pageY
    }
    onMounted(() => {
        document.addEventListener('click', updateMouseCoord)
    })
    onUnmounted(() => {
        document.removeEventListener('click', updateMouseCoord)
    })
    return {position}
}


export default useMousePosition
