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
    name: 'van-notice-bar',
    type: 'van-notice-bar',
    // bk-drag-custom-comp-default
    icon: 'bk-drag-noticebar',
    displayName: '通知栏',
    group: '数据',
    document: 'https://vant-contrib.gitee.io/vant/#/zh-CN/notice-bar',
    events: [
        { name: 'click', tips: '点击通知栏时触发，回调参数Event' },
        { name: 'close', tips: '关闭通知栏时触发，回调参数Event' },
        { name: 'replay', tips: '每当滚动栏重新开始滚动时触发' }
    ],
    styles: ['padding', 'margin'],
    renderStyles: {
    },
    props: {
        'mode': {
            type: 'string',
            val: '',
            options: ['closeable', 'link'],
            displayName: '通知栏模式',
            tips: '通知栏模式'
        },

        'text': {
            type: 'string',
            val: '通知内容',
            displayName: '通知文本内容',
            tips: '通知文本内容'
        },
        'color': {
            type: 'color',
            val: '#f60',
            displayName: '通知文本颜色',
            tips: '通知文本颜色'
        },
        'background': {
            type: 'color',
            val: '#fff7cc',
            displayName: '滚动条背景颜色',
            tips: '滚动条背景'
        },
        'left-icon': {
            type: 'van-icon',
            val: 'info-o',
            displayName: '左侧图标或图片',
            tips: '左侧图标名称或图片链接'
        },
        'delay': {
            type: ['string', 'number'],
            val: '1',
            displayName: '动画延迟时间',
            tips: '动画延迟时间 (s)'
        },
        'speed': {
            type: ['string', 'number'],
            val: '60',
            displayName: '滚动速度',
            tips: '滚动速率(px/s)'
        },
        'scrollable': {
            type: 'boolean',
            displayName: '是否有滚动播放',
            tips: '是否开启滚动播放，内容长度溢出时默认开启'
        },
        'wrapable': {
            type: 'boolean',
            val: false,
            displayName: '是否文本可换行',
            tips: '是否开启文本换行，只在禁用滚动时生效'
        }
    }
    // slots: {
    //     default: {
    //         name: ['text'],
    //         type: ['text'],
    //         displayName: '通知文本内容',
    //         val: '通知文本内容'
    //     },
    //     'left-icon': {
    //         name: ['text'],
    //         type: ['text'],
    //         displayName: '自定义左侧图标',
    //         val: '自定义左侧图标'
    //     },
    //     'right-icon': {
    //         name: ['text'],
    //         type: ['text'],
    //         displayName: '自定义右侧图标',
    //         val: '自定义右侧图标'
    //     }
    // }
}
