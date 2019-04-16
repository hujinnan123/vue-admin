<template>
    <!-- aria-hidden="true":识别并朗读由 CSS 生成的内容和特定的 Unicode 字符 -->
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name:'SvgIcon',
    props:{
        iconClass: {
            type: String,
            required: true //必须传
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if(this.className){
                return 'svg-icon' + this.className
            }else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
