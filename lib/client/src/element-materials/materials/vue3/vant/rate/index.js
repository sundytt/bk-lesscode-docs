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
    name: 'van-rate',
    type: 'van-rate',
    // bk-drag-custom-comp-default
    icon: 'bk-drag-rate',
    displayName: '评分',
    group: '表单',
    document: 'https://vant-contrib.gitee.io/vant/#/zh-CN/rate',
    events: [
        {
            name: 'change',
            tips: '当前分值变化时触发，事件回调参数 (value: Number)'
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
    props: {
        'model-value': {
            type: 'number',
            val: 0,
            displayName: '显示分数',
            tips: '当前分值',
            directive: 'v-model'
        },
        count: {
            type: ['number', 'string'],
            val: 5,
            displayName: '图标总数',
            tips: '图标总数'
        },
        size: {
            type: ['number', 'string'],
            val: 20,
            displayName: '尺寸',
            tips: '图标大小，默认单位为px'
        },
        gutter: {
            type: ['number', 'string'],
            val: 4,
            displayName: '图标之间的距离',
            tips: '图标间距，默认单位为px'
        },
        color: {
            type: 'color',
            val: '#ee0a24',
            displayName: '选中时颜色样式',
            tips: '选中时的颜色'
        },
        'void-color': {
            type: 'color',
            val: '#c8c9cc',
            displayName: '未选中时颜色样式',
            tips: '未选中时的颜色'
        },
        'disabled-color': {
            type: 'color',
            val: '#c8c9cc',
            displayName: '禁用时颜色样式',
            tips: '禁用时的颜色'
        },
        icon: {
            type: 'van-icon',
            val: 'star',
            displayName: '选中时的图标名称',
            tips: '选中时的图标名称'
        },
        'void-icon': {
            type: 'van-icon',
            val: 'star-o',
            displayName: '未选中时的图标名称',
            tips: '未选中时的图标名称'
        },
        'icon-prefix': {
            type: 'string',
            val: 'van-icon',
            displayName: '图标类名前缀',
            tips: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性'
        },
        'allow-half': {
            type: 'boolean',
            val: false,
            displayName: '是否可以半选',
            tips: '是否允许半选'
        },
        readonly: {
            type: 'boolean',
            val: false,
            displayName: '是否只读',
            vips: '是否为只读状态'
        },
        disabled: {
            type: 'boolean',
            val: false,
            displayName: '是否禁用',
            vips: '是否禁用评分'
        },
        touchable: {
            type: 'boolean',
            val: true,
            displayName: '是否可滑动选择评分',
            vips: '是否可以通过滑动手势选择评分'
        }
    }
}
