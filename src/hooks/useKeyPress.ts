import {onMounted, onUnmounted, reactive, ref} from "vue";


function useKeyPress() {
    // 捕捉鼠标位置
    const onKeyPress = ref("")

    const updateKeyboardCord = (e: KeyboardEvent) => {
        onKeyPress.value = e.key
    }
    onMounted(() => {
        document.addEventListener('keydown', updateKeyboardCord)
    })
    onUnmounted(() => {
        document.removeEventListener('keydown', updateKeyboardCord)
    })
    return {onKeyPress}
}


export default useKeyPress
