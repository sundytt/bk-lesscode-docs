/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 * Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

export default {
    name: 'van-switch',
    type: 'van-switch',
    displayName: '开关',
    icon: 'bk-drag-switcher',
    group: '表单',
    order: 1,
    document: 'https://youzan.github.io/vant/v2/#/zh-CN/switch',
    events: [
        {
            name: 'change',
            tips: '状态发生变化时调用该事件函数，事件回调参数 (value: boolean)'
        },
        {
            name: 'click',
            tips: '点击时触发，事件回调参数 (event: Event)'
        }
    ],
    styles: [
        'position',
        {
            name: 'size',
            include: ['display']
        },
        'margin',
        'pointer',
        'opacity'
    ],
    renderStyles: {
        display: 'inline-block'
    },
    props: {
        'model-value': {
            type: 'boolean',
            val: false,
            displayName: '是否选中',
            tips: '开关选中状态',
            directive: 'v-model'
        },
        loading: {
            type: 'boolean',
            val: false,
            displayName: '是否加载中状态'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用'
        },
        size: {
            type: ['string', 'number'],
            val: '30px',
            displayName: '开关大小',
            tips: '开关尺寸，默认单位为px'
        },
        'active-color': {
            type: 'color',
            val: '#1989fa',
            displayName: '打开时背景色',
            tips: '打开时的背景色'
        },
        'inactive-color': {
            type: 'color',
            val: 'white',
            displayName: '关闭时背景色',
            tips: '关闭时的背景色'
        }
        // 'active-value': {
        //     type: 'boolean',
        //     val: true,
        //     tips: '打开时对应的值'
        // },
        // 'inactive-value': {
        //     type: 'boolean',
        //     val: false,
        //     tips: '关闭时对应的值'
        // }
    }
    // slots: {
    //     node: {
    //         name: ['html'],
    //         type: ['html'],
    //         displayName: '自定义按钮的内容',
    //         tips: '自定义按钮的内容'
    //     },
    //     background: {
    //         name: ['html'],
    //         type: ['html'],
    //         displayName: '自定义开关的背景内容',
    //         tips: '自定义开关的背景内容'
    //     }
    // }
}
