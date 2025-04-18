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
    name: 'van-stepper',
    type: 'van-stepper',
    displayName: '步进器',
    icon: 'bk-drag-stepper',
    group: '表单',
    order: 1,
    document: 'https://vant-contrib.gitee.io/vant/#/zh-CN/stepper',
    events: [
        {
            name: 'change',
            tips: '当绑定值变化时触发的事件，事件回调参数 (value: string, detail: { name: string })'
        },
        {
            name: 'overlimit',
            tips: '点击不可用的按钮时触发'
        },
        {
            name: 'plus',
            tips: '点击增加按钮时触发'
        },
        {
            name: 'minus',
            tips: '点击减少按钮时触发'
        },
        {
            name: 'focus',
            tips: '输入框聚焦时触发，事件回调参数 (event: Event)'
        },
        {
            name: 'blur',
            tips: '输入框失焦时触发，事件回调参数 (event: Event)'
        }
    ],
    styles: ['position', 'size', 'margin', 'opacity'],
    renderStyles: {
        display: 'inline-block'
    },
    props: {
        'model-value': {
            type: ['string', 'number'],
            displayName: '当前输入值',
            tips: '当前输入值',
            directive: 'v-model'
        },
        min: {
            type: ['string', 'number'],
            val: '1',
            displayName: '最小值',
            tips: '最小值'
        },
        max: {
            type: ['string', 'number'],
            displayName: '最大值',
            tips: '最大值'
        },
        'default-value': {
            type: ['string', 'number'],
            val: '1',
            displayName: '初始值',
            tips: '初始值，当 modelValue 为空时生效'
        },
        step: {
            type: ['string', 'number'],
            val: '1',
            displayName: '每次增多少值',
            tips: '步长，每次点击时改变的值'
        },
        name: {
            type: ['string', 'number'],
            displayName: '标识符',
            tips: '标识符，可以在change事件回调参数中获取'
        },
        'input-width': {
            type: ['string', 'number'],
            val: '32px',
            displayName: '输入框宽度',
            tips: '输入框宽度，默认单位为px'
        },
        'button-size': {
            type: ['string', 'number'],
            val: '28px',
            displayName: '步进器高度',
            tips: '按钮大小以及输入框高度，默认单位为px'
        },
        'decimal-length': {
            type: ['string', 'number'],
            displayName: '小数位数',
            tips: '固定显示的小数位数'
        },
        'theme': {
            type: 'string',
            options: ['round'],
            displayName: '样式风格',
            tips: '样式风格'
        },
        placeholder: {
            type: 'string',
            displayName: '空值时提示文案',
            tips: '输入框占位提示文字'
        },
        integer: {
            type: 'boolean',
            val: false,
            displayName: '是否只输入整数',
            tips: '只允许输入整数'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用步进器',
            tips: '是否禁用步进器'
        },
        'disabled-plus': {
            type: 'boolean',
            val: false,
            displayName: '是否禁用增加按钮',
            tips: '是否禁用增加按钮'
        },
        'disabled-minus': {
            type: 'boolean',
            val: false,
            displayName: '是否禁用减少按钮',
            tips: '是否禁用减少按钮'
        },
        'disabled-input': {
            type: 'boolean',
            val: false,
            displayName: '是否禁用输入框',
            tips: '是否禁用输入框'
        },
        'before-change': {
            type: 'function',
            val: (value) => value,
            displayName: '值变化前回调函数',
            tips: '输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise'
        },
        'show-plus': {
            type: 'boolean',
            val: true,
            displayName: '是否有增加按钮',
            tips: '是否显示增加按钮'
        },
        'show-minus': {
            type: 'boolean',
            val: true,
            displayName: '是否有减少按钮',
            tips: '是否显示减少按钮'
        },
        'show-input': {
            type: 'boolean',
            val: true,
            displayName: '是否有输入框',
            tips: '是否显示输入框'
        },
        'long-press': {
            type: 'boolean',
            val: true,
            displayName: '是否可长按手势',
            tips: '是否开启长按手势'
        },
        'allow-empty': {
            type: 'boolean',
            val: false,
            displayName: '是否输入值可为空',
            tips: '是否允许输入的值为空'
        }

    }
}
