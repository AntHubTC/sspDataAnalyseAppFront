import 'intro.js/introjs.css' // introjs默认css样式
// introjs还提供了多种主题，可以通过以下方式引入
import 'intro.js/themes/introjs-modern.css'
// import 'intro.js/themes/introjs-flattener.css'
// import 'intro.js/themes/introjs-dark.css'
// import 'intro.js/themes/introjs-nassim.css'
// import 'intro.js/themes/introjs-nazanin.css'
// import 'intro.js/themes/introjs-royal.css'

import IntroJs from 'intro.js' // introjs库

const initIntroJs:Function = () => {
    const steps = [
        {
            title: '使用说明导航',
            element: '.level-button-group',
            intro: '这里是资源层级视图切换工具',
            position: 'bottom',
        },
        {
            title: '使用说明导航',
            element: '.tool-box',
            intro: '<div>这里是一些工具按钮区域<br/>可以进行将数据图导出为PNG或PDF，放大与缩小，展开与折叠</div>',
            position: 'bottom',
        },
        // {
        //     title: '使用说明导航',
        //     element: '.workspace-column.left-column',
        //     intro: '阿斯顿发射点',
        //     position: 'right',
        // },
        {
            title: '使用说明导航',
            intro: '左侧是SSP树型数据，右侧是融媒树型数据！',
            position: 'center',
        },
        {
            title: '快捷键支持',
            intro: '<div>[ 缩小<br/>] 放大</div>',
            position: 'center',
        },
        {
            title: '使用说明导航',
            intro: '工具介绍完毕，让我们开始修复数据吧！',
            position: 'center',
        }
    ]
    
    IntroJs().setOptions({
        // nextLabel: '下一个  &rarr;', // 下一个按钮文字
        // prevLabel: '&larr; 上一个', // 上一个按钮文字
        // skipLabel: '跳过', // 跳过按钮文字
        // doneLabel: '立即体验', // 完成按钮文字
        // hidePrev: true, // 在第一步中是否隐藏上一个按钮
        // hideNext: true, // 在最后一步中是否隐藏下一个按钮
        // exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
        // showStepNumbers: false, // 是否显示红色圆圈的步骤编号
        // disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
        // showBullets: false, // 是否显示面板指示点
        // 这里是更换成中文（默认英文）
        prevLabel: '上一步',
        nextLabel: '下一步',
        skipLabel: '跳过',
        doneLabel: '完成',
        /* 引导说明框相对高亮说明区域的位置 */
        tooltipPosition: 'bottom',
        /* 引导说明文本框的样式 */
        tooltipClass: 'intro-tooltip', // 用于设置全局的样式
        /* 说明高亮区域的样式 */
        highlightClass: 'intro-highlight',
        /* 引导说明框相对高亮说明区域的位置 */
        /* 是否使用键盘Esc退出 */
        exitOnEsc: true,
        /* 是否允许点击空白处退出 */
        exitOnOverlayClick: false,
        /* 提示边框的padding */
        helperElementPadding: 2,
        /* 是否显示说明的数据步骤 */
        showStepNumbers: false,
        /* 是否允许键盘来操作 */
        keyboardNavigation: true,
        /* 是否按键来操作 */
        showButtons: true,
        /* 是否使用点显示进度 */
        showBullets: false,
        /* 是否显示进度条 */
        showProgress: false,
        /* 是否滑动到高亮的区域 */
        scrollToElement: true,
        /* 遮罩层的透明度 */
        overlayOpacity: 0.9,
        /* 当位置选择自动的时候，位置排列的优先级 */
        positionPrecedence: ['bottom', 'top', 'right', 'left'],
        /* 是否禁止与元素的相互关联 */
        disableInteraction: false,
        /* 是否在第一步隐藏上一步 */
        // hidePrev: true,
        /* 是否在最后一步隐藏下一步 */
        // hideNext: true,
        /* steps步骤，可以写个工具类保存起来 */
        steps: steps,
    }).oncomplete(() => {
        // 点击结束按钮后执行的事件
        console.log('oncomplete');
      }).onexit(() => {
        // 点击跳过按钮后执行的事件
        console.log('onexit');
      })
    .onchange(() => {
        // 点击下一步执行的事件
        console.log('onchange');
    })
    .start();
}
export default initIntroJs;