<template>
    <main :class="['layout', {
        'aside-folded': asideFolded,
        'aside-hover': asideHover,
        nocrumb: hideCrumb,
        nofooter: !showFooter,
        noaside: hideSideNav
    }]">
        <aside class="aside" v-if="!hideSideNav">
            <div class="side-bd"
                @mouseenter="asideHover = true"
                @mouseleave="asideHover = false">
                <nav class="nav-list">
                    <template v-if="isRouteContains('marketplace')">
                        <router-link tag="div" class="nav-item" to="/marketplace/template">
                            <i class="bk-drag-icon bk-drag-template-fill"></i>{{ $t('模板市场') }}<i></i>
                        </router-link>
                        <router-link tag="div" class="nav-item" to="/marketplace/function">
                            <i class="bk-drag-icon bk-drag-function-fill"></i>{{ $t('函数市场') }}
                        </router-link>
                    </template>

                    <!-- <div v-if="iamNoResourcesPerm[$IAM_ACTION.manage_platform[0]]">
                        <div class="nav-parent" v-if="!asideFolded || asideHover">
                            平台管理
                        </div>
                        <router-link tag="div" class="nav-item" to="/pm/platform/project-member">
                            <i class="bk-drag-icon bk-drag-member"></i>平台管理员
                        </router-link>
                    </div> -->

                    <template v-if="isRouteContains('op') && iamNoResourcesPerm[$IAM_ACTION.view_operation_data[0]]">
                        <router-link tag="div" class="nav-item" to="/op/stats/user">
                            <i class="bk-drag-icon bk-drag-user-count"></i>{{ $t('用户数据') }}
                        </router-link>
                        <router-link tag="div" class="nav-item" to="/op/stats/project">
                            <i class="bk-drag-icon bk-drag-project-count"></i>{{ $t('应用数据') }}
                        </router-link>
                        <router-link tag="div" class="nav-item" to="/op/stats/func">
                            <i class="bk-drag-icon bk-drag-fc-count"></i>{{ $t('函数数据') }}
                        </router-link>
                        <router-link tag="div" class="nav-item" to="/op/stats/comp">
                            <i class="bk-drag-icon bk-drag-compoment-count"></i>{{ $t('自定义组件数据') }}
                        </router-link>
                    </template>
                </nav>
            </div>
            <div class="side-ft">
                <span class="nav-toggle" @click="asideFolded = !asideFolded">
                    <i class="bk-drag-icon bk-drag-nav-toggle"></i>
                </span>
            </div>
        </aside>
        <div class="breadcrumbs" v-if="!hideCrumb">
            <h3 class="current">{{$t($route.meta.title)}}</h3>
            <extra-links></extra-links>
        </div>
        <div class="main-container">
            <router-view :key="$route.path"></router-view>
        </div>
        <footer class="footer" v-if="showFooter">
            <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDgwMjAwMV80NDMwOTZfODAwODAyMDAxXzJf"
                target="_blank"
                class="magic-feedback"
                :title="$t('QQ交谈')">
                <img src="../../images/qq.png" />
                <span>{{ $t('QQ交谈') }}</span>
            </a>
            <!-- <a href="wxwork://message/?username=BK-MagicBox" class="magic-feedback" title="蓝鲸MagicBox助手">
                <img src="../../images/wx-work.png" />
                <span>蓝鲸MagicBox助手</span>
            </a> -->
            Copyright &copy; 2012 Tencent BlueKing. All Rights Reserved. {{$t('腾讯蓝鲸 版权所有')}}
        </footer>
    </main>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ExtraLinks from '@/components/ui/extra-links'
    export default {
        components: {
            ExtraLinks
        },
        data () {
            return {
                asideFolded: false,
                asideHover: false,
                region: 'tencent',
                navFolded: {}
            }
        },
        computed: {
            ...mapGetters(['iamNoResourcesPerm']),
            hideSideNav () {
                return this.$route?.meta?.hideSideNav
            },
            hideCrumb () {
                return this.$route?.meta?.hideCrumb
            },
            showFooter () {
                return this.$route?.meta?.showFooter
            }
        },
        methods: {
            isRouteContains (path) {
                return this.$route.matched.some(route => route.path.startsWith(`/${path}`))
            }
        }
    }
</script>

<style lang="postcss">
    @import "@/css/mixins/ellipsis";
    @import "@/css/mixins/scroller";

    .layout {
        --side-hd-height: 0px;
        --side-ft-height: 50px;
        --aside-width: 258px;
        --footer-height: 50px;
        --breadcrumb-height: 52px;
        --aside-folded-width: 60px;
        min-width: 1280px;
        height: 100%;

        &.aside-folded {
            .aside {
                width: var(--aside-folded-width);
                .side-bd {
                    overflow: hidden;
                }
                .side-ft {
                    .nav-toggle {
                        transform: rotate(0);
                    }
                }
            }

            .footer {
                padding-left: var(--aside-folded-width);
            }

            .nav-list {
                .nav-item-parent {
                    .sub-nav {
                        display: none;
                    }
                }
            }
        }

        &.aside-hover {
            .aside {
                width: var(--aside-width);
            }
            .nav-list {
                .nav-item-parent {
                    .sub-nav {
                        display: block;
                    }
                }
            }
        }

        &.nocrumb {
            .main-container {
                height: calc(100% - var(--footer-height));
            }
        }
        &.nofooter {
            .main-container {
                height: calc(100% - var(--breadcrumb-height));
            }
        }
        &.nocrumb.nofooter {
            height: 100%;
        }
        &.noaside {
            .footer {
                padding-left: 0;
            }
        }

        .aside {
            position: relative;
            width: var(--aside-width);
            height: 100%;
            border-right: 1px solid #DCDEE5;
            background: #FFF;
            float: left;
            z-index: 1;
            transition: width .2s cubic-bezier(0.4, 0, 0.2, 1);

            .side-hd {
                display: flex;
                justify-content: space-between;
                height: var(--side-hd-height);
                line-height: var(--side-hd-height);
            }
            .side-bd {
                height: calc(100% - var(--side-hd-height) - var(--side-ft-height));
                overflow-y: auto;
                @mixin scroller;
            }
            .side-ft {
                position: absolute;
                bottom: 0;
                height: var(--side-ft-height);
                line-height: var(--side-ft-height);
                width: 100%;
                background: #fff;
                padding-left: 12px;

                .nav-toggle {
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    cursor: pointer;
                    display: inline-block;
                    text-align: center;
                    transform: rotate(180deg);
                    transition: transform .2s cubic-bezier(0.4, 0, 0.2, 1);

                    &:hover {
                        opacity: .8;
                    }
                }
            }
        }

        .breadcrumbs {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: var(--breadcrumb-height);
            background: #fff;
            box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.1);
            padding-left: 24px;
            .current {
                color: #000;
                font-size: 16px;
                font-weight: normal;
            }
        }

        .main-container {
            @mixin scroller;
            height: calc(100% - var(--footer-height) - var(--breadcrumb-height));
            overflow: auto;
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            font-size: 12px;
            background: #fff;
            height: var(--footer-height);
            line-height: var(--footer-height);
            border-top: 1px solid #DCDEE5;
            text-align: center;
            padding-left: var(--aside-width);
            transition: padding .2s cubic-bezier(0.4, 0, 0.2, 1);

            .magic-feedback {
                color: #63656E;
                border-right: 1px solid #ddd;
                margin-right: 6px;
                padding-right: 10px;
                img {
                    width: 17px;
                    vertical-align: middle;
                    margin-top: -2px;
                }
            }
        }

        .nav-list {
            margin-top: 8px;

            .nav-parent {
                font-size: 12px;
                text-align: left;
                color: #979ba5;
                height: 42px;
                line-height: 42px;
                padding: 0 12px 0 22px;
            }
            .nav-item {
                display: flex;
                align-items: center;
                font-size: 14px;
                height: 42px;
                line-height: 42px;
                padding: 0 12px 0 22px;
                margin: 4px 0;
                white-space: nowrap;
                cursor: pointer;

                .bk-icon,
                .bk-drag-icon {
                    font-size: 16px;
                    margin-right: 22px;
                }
                &:hover {
                    background: #F6F6F9;
                }
                &.router-link-active {
                    background: #E1ECFF;
                    color: #3A84FF;
                }

                .bk-drag-arrow-down {
                    color: #63656e;
                    font-size: 24px;
                    transform: rotate(0);
                    margin-left: auto;
                    margin-right: 0;
                    transition: all .1s linear;
                }
            }

            .product-link{
                color: #63656e;
            }

            .nav-item-parent {
                &.folded {
                    .sub-nav {
                        height: 0;
                    }
                    .bk-drag-arrow-down {
                        transform: rotate(-90deg);
                    }
                }
                .sub-nav {
                    height: 168px;
                    overflow: hidden;
                    background: #fafbfd;
                    transition: height .175s ease-in-out;
                }
                .sub-nav-item {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    height: 42px;
                    line-height: 42px;
                    padding: 0 12px 0 22px;
                    cursor: pointer;
                    white-space: nowrap;

                    &::before {
                        width: 16px;
                        font-size: 12px;
                        text-align: center;
                        margin-right: 22px;
                        content: "•";
                    }

                    &:hover {
                        background: #F6F6F9;
                    }
                    &.router-link-active {
                        background: #E1ECFF;
                        color: #3A84FF;
                    }
                }
            }
        }
    }
</style>
