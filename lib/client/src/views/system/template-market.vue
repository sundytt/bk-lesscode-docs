<template>
    <main class="template-market page-content">
        <div style="height: 100%" v-bkloading="{ isLoading: pageLoading, opacity: 1 }">
            <div v-show="!pageLoading">
                <div class="project-template">
                    <div class="page-head" style="align-items: center">
                        <span style="font-size: 14px;font-weight: 700">{{ $t('应用模板') }}</span>
                        <ul class="filter-links">
                            <li
                                v-for="(link, index) in template.project.links"
                                :key="index"
                                :class="['link-item', { 'active': template.project.filter === link.id }]"
                                @click="handleClickProjectFilter(link.id)">
                                {{link.name}}
                            </li>
                        </ul>
                        <div class="extra">
                            <bk-input
                                style="width: 400px"
                                :placeholder="$t('请输入关键词')"
                                :clearable="true"
                                :right-icon="'bk-icon icon-search'"
                                v-model="template.project.keyword"
                                @clear="handleProjectSearchClear"
                                @enter="handleFilter('project')">
                            </bk-input>
                        </div>
                    </div>
                    <div class="page-body">
                        <div class="project-list" v-show="template.project.list.length">
                            <div :class="['project-item']" v-for="project in template.project.list" :key="project.id">
                                <div class="item-bd">
                                    <template>
                                        <div class="preview">
                                            <page-preview-thumb :alt="$t('应用缩略预览')" :project-id="project.id" :img-src="project.templateImg" />
                                        </div>
                                    </template>
                                    <div class="operate-btns">
                                        <auth-button
                                            theme="primary"
                                            auth="create_app_with_template"
                                            @click="handleApply(project)"
                                            style="margin-left: 7px;width: 106px"
                                            v-enClass="'en-btn-title'"
                                            :title="$t('创建为新应用')"
                                            :permission="iamNoResourcesPerm[$IAM_ACTION.create_app_with_template[0]]">
                                            {{ $t('创建为新应用') }} </auth-button>
                                        <auth-button
                                            auth="preview_app_template"
                                            @click="handlePreviewProject(project.id)"
                                            style="margin-left: 10px;width: 76px"
                                            :permission="iamNoResourcesPerm[$IAM_ACTION.preview_app_template[0]]">
                                            {{ $t('预览') }} </auth-button>
                                        <auth-button
                                            auth="download_app_template_source"
                                            @click="handleDownloadProject(project)"
                                            style="margin-left: 10px;width: 76px"
                                            v-enClass="'en-btn-title'"
                                            :title="$t('下载源码')"
                                            :permission="iamNoResourcesPerm[$IAM_ACTION.download_app_template_source[0]]">
                                            {{ $t('下载源码') }} </auth-button>
                                    </div>
                                </div>
                                <div class="item-ft">
                                    <div class="col">
                                        <h3 class="name" :title="project.projectName">{{project.projectName}}</h3>
                                        <div class="stat"> {{$t('由 {0} 上传',[project.createUser || 'admin'])}}</div>
                                       
                                    </div>
                                    <framework-tag class="framework-op" :framework="project.framework"></framework-tag>
                                </div>
                                <span class="favorite-btn">
                                    <i class="bk-icon icon-info-circle" v-bk-tooltips.top="{ content: project.projectDesc, allowHTML: false }"></i>
                                </span>
                            </div>
                        </div>
                        <empty-status class="empty" v-show="!template.project.list.length" :type="projectEmptyType" @clearSearch="handlerClearSearchProject"></empty-status>
                    </div>
                </div>
                <div class="page-template">
                    <div class="page-head" style="align-items: center">
                        <span style="font-size: 14px;font-weight: 700">{{ $t('页面模板') }}</span>
                        <ul class="filter-links">
                            <li
                                v-for="(link, index) in template.page.links"
                                :key="index"
                                :class="['link-item', { 'active': template.page.filter === link.id }]"
                                @click="handleClickPageFilter(link.id)">
                                {{link.name}}
                            </li>
                        </ul>
                        <div class="extra">
                            <bk-input
                                style="width: 400px"
                                :placeholder="$t('请输入关键词')"
                                :clearable="true"
                                :right-icon="'bk-icon icon-search'"
                                v-model="template.page.keyword"
                                @clear="handlePageSearchClear"
                                @enter="handleFilter('page')">
                            </bk-input>
                        </div>
                    </div>
                    <div class="page-body">
                        <div class="page-list" v-show="template.page.list.length">
                            <div :class="['page-item']" v-for="page in template.page.list" :key="page.id">
                                <div class="item-bd">
                                    <template>
                                        <div class="preview">
                                            <img v-if="page.previewImg" :src="getPreviewImg(page.previewImg)" :alt="$t('应用缩略预览')">
                                            <div class="empty-preview-img" v-else>{{ $t('页面为空') }}</div>
                                        </div>
                                    </template>
                                    <div class="operate-btns">
                                        <bk-button style="margin-left: 17px;width: 86px" theme="primary" @click="handleAddToProject(page)">{{ $t('添加至应用') }}</bk-button>
                                        <bk-button style="margin-left: 10px;width: 76px" @click="handlePreviewTemplate(page)">{{ $t('预览') }}</bk-button>
                                        <bk-button style="margin-left: 10px;width: 76px" v-enClass="'en-btn-title'" :title="$t('下载源码')" @click="handleDownloadTemplate(page)">{{ $t('下载源码') }}</bk-button>
                                    </div>
                                </div>
                                <div class="item-ft">
                                    <div class="col">
                                        <div class="col-warp">
                                            <div>
                                                <div class="page-name">
                                                    <span class="page-type">
                                                        <i v-if="page.templateType === 'MOBILE'" class="bk-drag-icon bk-drag-mobilephone"> </i>
                                                        <i v-else class="bk-drag-icon bk-drag-pc"> </i>
                                                    </span>
                                                    <div class="name" :title="page.templateName">{{page.templateName}}</div>
                                            
                                                </div>
                                                <div class="stat">{{$t('由 {0} 上传',[page.createUser || 'admin'])}}</div>
                                            </div>
                                            <framework-tag class="framework-op" :framework="page.framework"></framework-tag>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <empty-status class="empty" v-show="!template.page.list.length" :type="pageEmptyType" @clearSearch="handlerClearSearchPage"></empty-status>
                    </div>
                </div>
            </div>
        </div>

        <download-dialog ref="downloadDialog"></download-dialog>

        <create-empty-project-dialog ref="createDialog" />

        <bk-dialog v-model="dialog.page.visible"
            render-directive="if"
            theme="primary"
            :title="$t('应用模板')"
            width="750"
            :position="{ top: 100 }"
            :mask-close="false"
            :auto-close="false"
            header-position="left"
            ext-cls="page-create-dialog"
            @value-change="handlePageDialogToggle">
            <div class="selected-project">{{ $t('已选模板：{0}，添加至应用后，可以在画布中拖拽使用', [dialog.page.curPage.templateName]) }}</div>
            <bk-form :label-width="86">
                <bk-form-item :label="$t('应用')" required :ext-cls="'selected-template-project'">
                    <bk-select searchable
                        multiple
                        display-tag
                        :placeholder="$t('请选择应用，可多选')"
                        v-model="dialog.page.formData.project"
                        :loading="dialog.page.selectLoading"
                        @change="handleSelectChange"
                        @clear="handleSelectClear"
                        style="background: #fff">
                        <bk-option v-for="option in dialog.page.projectList"
                            :key="option.id"
                            :id="option.id"
                            :name="option.projectName">
                        </bk-option>
                    </bk-select>
                </bk-form-item>
            </bk-form>
            <template v-if="dialog.page.selectedList.length">
                <div style="margin: 20px 0">{{ $t('请指定添加至对应应用的模板分类：') }}</div>
                <div style="min-height: 140px">
                    <bk-form ref="pageForm" :label-width="180">
                        <bk-form-item v-for="item in dialog.page.selectedList"
                            :key="item.id"
                            :label="item.projectName" required>
                            <bk-select searchable
                                :clearable="false"
                                v-model="item.selectedCategory">
                                <bk-option v-for="option in item.categoryList"
                                    :key="option.id"
                                    :id="option.id"
                                    :name="option.name">
                                </bk-option>
                            </bk-select>
                        </bk-form-item>
                    </bk-form>
                </div>
            </template>
            <div class="dialog-footer" slot="footer">
                <bk-button
                    theme="primary"
                    @click="handlePageConfirm"
                    :loading="dialog.page.loading">{{ $t('确定') }}</bk-button>
                <bk-button @click="handlePageCancel" :disabled="dialog.page.loading">{{ $t('取消') }}</bk-button>
            </div>
        </bk-dialog>
    </main>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    import preivewErrImg from '@/images/preview-error.png'
    import DownloadDialog from './components/download-dialog'
    import CreateEmptyProjectDialog from '@/views/system/components/create-empty-project-dialog'
    import PagePreviewThumb from '@/components/project/page-preview-thumb.vue'
    import { PROJECT_TEMPLATE_TYPE, PAGE_TEMPLATE_TYPE } from '@/common/constant'
    import { parseFuncAndVar } from '@/common/parse-function-var'
    import LC from '@/element-materials/core'
    import frameworkTag from '@/components/framework-tag.vue'
    import {
        isMatchFramework
    } from 'shared/util'

    const PROJECT_TYPE_LIST = [{ id: '', name: window.i18n.t('全部') }].concat(PROJECT_TEMPLATE_TYPE)
    const PAGE_TYPE_LIST = [{ id: '', name: window.i18n.t('全部') }].concat(PAGE_TEMPLATE_TYPE)

    export default {
        name: 'template-market',
        components: {
            CreateEmptyProjectDialog,
            DownloadDialog,
            PagePreviewThumb,
            frameworkTag
        },
        data () {
            return {
                template: {
                    project: {
                        list: [],
                        filter: '',
                        links: [...PROJECT_TYPE_LIST],
                        keyword: ''
                    },
                    page: {
                        list: [],
                        filter: '',
                        keyword: '',
                        links: [...PAGE_TYPE_LIST]
                    }
                },
                projectList: [],
                pageList: [],
                dialog: {
                    page: {
                        visible: false,
                        loading: false,
                        selectLoading: false,
                        curPage: {},
                        projectList: [],
                        selectedList: [],
                        formData: {
                            project: []
                        },
                        formRules: {
                            project: [
                                {
                                    required: true,
                                    message: window.i18n.t('必填项'),
                                    trigger: 'click'
                                }
                            ]
                        }
                    }
                },
                pageLoading: false,
                formLoading: false,
                projectEmptyType: 'noData',
                pageEmptyType: 'noData'
            }
        },
        computed: {
            ...mapGetters(['iamNoResourcesPerm'])
        },
        watch: {
            'template.project.keyword' (val) {
                if (!val) {
                    this.handleProjectSearchClear()
                }
            },
            'template.page.keyword' (val) {
                if (!val) {
                    this.handlePageSearchClear()
                }
            }
        },
        created () {
            this.getTemplateList()
        },
        methods: {
            ...mapActions('pageTemplate', ['getProjectFuncAndVar']),
            async getTemplateList () {
                this.pageLoading = true
                try {
                    const params = { filter: 'official', officialType: this.template.project.filter }
                    const [{ projectList }, pageTemplateList] = await Promise.all([
                        this.$store.dispatch('project/query', { config: { params } }),
                        this.$store.dispatch('pageTemplate/list', { type: 'OFFCIAL', framework: 'all' })
                    ])
                    this.projectList = projectList
                    this.pageList = pageTemplateList
                    this.template.project.list = projectList
                    this.template.page.list = pageTemplateList
                } catch (e) {
                    console.error(e)
                } finally {
                    this.pageLoading = false
                }
            },
            async getProjectList () {
                this.selectLoading = true
                try {
                    const { projectList } = await this.$store.dispatch('project/query', { config: {} })
                    // 过滤出符合框架的项目
                    this.dialog.page.projectList.splice(
                        0,
                        this.dialog.page.projectList.length,
                        ...projectList.filter(project => isMatchFramework(project.framework, this.dialog.page.curPage.framework))
                    )
                } catch (e) {
                    console.error(e)
                } finally {
                    this.selectLoading = false
                }
            },
            async getTemplateCategory (item) {
                this.formLoading = true
                try {
                    item['categoryList'] = await this.$store.dispatch('pageTemplate/categoryList', { projectId: item.id })
                    item['selectedCategory'] = item.categoryList.length > 0 ? item.categoryList[0].id : ''
                } catch (e) {
                    console.error(e)
                } finally {
                    this.formLoading = false
                }
            },
            handleFilter (type) {
                switch (type) {
                    case 'project':
                        this.template.project.list.splice(0, this.template.project.list.length, ...this.projectList)
                        if (this.template.project.filter !== '') {
                            this.projectEmptyType = 'search'
                            this.template.project.list = this.template.project.list.filter(item => {
                                return item.offcialType && item.offcialType.includes(this.template.project.filter)
                            })
                        } else {
                            this.projectEmptyType = 'noData'
                        }
                        
                        if (this.template.project.keyword !== '') {
                            this.projectEmptyType = 'search'
                            this.template.project.list = this.template.project.list.filter(item => {
                                return item.projectName.toUpperCase().includes(this.template.project.keyword.toUpperCase())
                            })
                        } else {
                            this.projectEmptyType = 'noData'
                        }
                        break
                    case 'page':
                        this.template.page.list.splice(0, this.template.page.list.length, ...this.pageList)
                        if (this.template.page.filter !== '') {
                            this.pageEmptyType = 'search'
                            this.template.page.list = this.template.page.list.filter(item => {
                                return item.offcialType && item.offcialType.includes(this.template.page.filter)
                            })
                        } else {
                            this.pageEmptyType = 'noData'
                        }
                        if (this.template.page.keyword !== '') {
                            this.pageEmptyType = 'search'
                            this.template.page.list = this.template.page.list.filter(item => {
                                return item.templateName.toUpperCase().includes(this.template.page.keyword.toUpperCase())
                            })
                        } else {
                            this.pageEmptyType = 'noData'
                        }
                        break
                    default:
                        break
                }
            },
            handleClickProjectFilter (link) {
                this.template.project.filter = link
                this.handleFilter('project')
            },
            handleClickPageFilter (link) {
                this.template.page.filter = link
                this.handleFilter('page')
            },
            handleProjectSearchClear () {
                this.template.project.keyword = ''
                this.handleFilter('project')
            },
            handlePageSearchClear () {
                this.template.page.keyword = ''
                this.handleFilter('page')
            },
            getPreviewImg (previewImg) {
                if (previewImg && previewImg.length > 20) {
                    return previewImg
                }
                return preivewErrImg
            },
            handleApply (project) {
                this.$refs.createDialog.projectType = 'applyTemplate'
                this.$refs.createDialog.formData.copyFrom = project.id
                this.$refs.createDialog.formData.framework = project.framework || 'vue2'
                this.$refs.createDialog.selectTemplateName = project.projectName
                this.$refs.createDialog.visible = true
            },
            handleAddToProject (page) {
                this.dialog.page.curPage = page
                this.dialog.page.visible = true
            },
            handlePageDialogToggle (val) {
                if (val) {
                    this.getProjectList()
                    this.handleSelectClear()
                }
            },
            handlePageCancel () {
                this.dialog.page.visible = false
            },
            async handlePageConfirm () {
                this.dialog.page.loading = true
                if (!this.dialog.page.selectedList.length) {
                    this.$bkMessage({
                        theme: 'error',
                        message: window.i18n.t('未选择应用')
                    })
                    return
                }
                try {
                    const fromTemplate = this.dialog.page.curPage
                    const templateInfo = this.dialog.page.selectedList.map(item => ({
                        belongProjectId: item.id,
                        categoryId: item.selectedCategory,
                        versionId: null
                    }))
                    const data = {
                        id: fromTemplate.id,
                        fromProjectId: fromTemplate.belongProjectId,
                        templateInfo
                    }
                    const { variableList, funcGroups } = await this.getProjectFuncAndVar({ projectId: fromTemplate.belongProjectId, versionId: fromTemplate.versionId, pageCode: fromTemplate.fromPageCode })

                    const templateNode = LC.parseTemplate(JSON.parse(fromTemplate.content || {}))
                    // 解析出模板targetData绑定的变量和函数
                    const { varList = [], funcList = [] } = parseFuncAndVar(templateNode, variableList, funcGroups)
                    Object.assign(data, { varList, funcList })

                    const res = await this.$store.dispatch('pageTemplate/apply', data)
                    if (res) {
                        this.$bkMessage({
                            theme: 'success',
                            message: res
                        })
                        this.dialog.page.visible = false
                    }
                } catch (err) {
                    this.$bkMessage({
                        theme: 'error',
                        message: err.message || err
                    })
                } finally {
                    this.dialog.page.loading = false
                }
            },
            handleSelectClear () {
                this.dialog.page.selectedList = []
                this.dialog.page.formData.project = []
            },
            async handleSelectChange (newValue, oldValue) {
                if (newValue.length > oldValue.length) {
                    const selectedProject = this.dialog.page.projectList.find(project => project.id === newValue[newValue.length - 1])
                    const selected = { id: selectedProject.id, projectName: selectedProject.projectName, selectedCategory: '' }
                    // check是否已被添加到被选中的应用
                    const hasApply = await this.$store.dispatch('pageTemplate/checkIsExist', { belongProjectId: selectedProject.id, parentId: this.dialog.page.curPage.id })
                    if (hasApply === true) {
                        this.dialog.page.formData.project.pop()
                        this.$bkMessage({
                            theme: 'warning',
                            message: window.i18n.t('模板已被该应用应用,无需重复添加')
                        })
                    } else {
                        await this.getTemplateCategory(selected)
                        this.dialog.page.selectedList.push(selected)
                    }
                } else {
                    const that = this
                    oldValue.forEach(function (item, index) {
                        if (newValue.indexOf(item) < 0) {
                            that.dialog.page.selectedList.splice(index, 1)
                        }
                    })
                }
            },
            handlePreviewProject (id) {
                window.open(`/preview/project/${id}/`, '_blank')
            },
            handlePreviewTemplate (template) {
                window.open(`/preview-template/project/${template.belongProjectId}/${template.id}?framework=${template.framework}`, '_blank')
            },
            handleDownloadProject (project) {
                this.$refs.downloadDialog.isShow = true
                this.$refs.downloadDialog.projectId = project.id
                this.$refs.downloadDialog.projectCode = project.projectCode
                this.$refs.downloadDialog.projectName = project.projectName
            },
            handleDownloadTemplate (template) {
                const targetData = []
                targetData.push(JSON.parse(template.content))
                this.$store.dispatch('vueCode/getPageCode', {
                    targetData,
                    projectId: template.belongProjectId,
                    fromPageCode: template.fromPageCode

                }).then((res) => {
                    const downlondEl = document.createElement('a')
                    const blob = new Blob([res])
                    downlondEl.download = `bklesscode-template-${template.templateName}.vue`
                    downlondEl.href = URL.createObjectURL(blob)
                    downlondEl.style.display = 'none'
                    document.body.appendChild(downlondEl)
                    downlondEl.click()
                    document.body.removeChild(downlondEl)
                })
            },
            handlerClearSearchProject (searchName) {
                this.template.project.keyword = searchName
            },
            handlerClearSearchPage (searchName) {
                this.template.page.keyword = searchName
            }
        }
    }
</script>

<style lang="postcss" scoped>
    @import "@/css/mixins/ellipsis";
    @import "@/css/mixins/scroller";

    .filter-links {
        display: flex;
        align-items: center;
        margin-left: 16px;
        .link-item {
            padding: 6px 12px;
            margin: 0 8px;
            border-radius: 16px;
            cursor: pointer;

            &:hover {
                background: #E1ECFF;
            }

            &.active {
                background: #E1ECFF;
                color: #3A84FF;
            }
        }
    }

    .empty{
        height: 300px;
    }

    .project-list{
        margin-top: 10px;
    }
    .page-list{
        margin-bottom: 10px;
    }

    .project-list, .page-list {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;

        .project-item{
            margin: 0 14px 40px 0;
            &::before {
                content: "";
                position: absolute;
                top: -10px;
                left: 0;
                width: 156px;
                height: 10px;
                border-radius: 6px 0px 0px 0px;
                background: linear-gradient(-160deg, transparent 9px, #dcdee5 0)
            }
        }
        .page-item{
             margin: 0 14px 30px 0;
             .col-warp{
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                .framework-op{
                    position: absolute;
                    right: -30px;
                }
             }
        }
        .project-item, .page-item {
            position: relative;
            flex: none;
            width: 304px;
            height: 234px;
            padding: 6px;
            background: #fff;
            border-radius: 0px 6px 6px 6px;
            box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.11);
            cursor: pointer;

            &:hover {
                box-shadow: 1px 2px 8px 2px rgba(0, 0 ,0 , 0.11);

                .favorite-btn {
                    opacity: 1;
                }
                .preview {
                    &::before {
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
                .operate-btns {
                    opacity: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    .en-btn-title {
                        /deep/ span {
                                display: block;
                                width: 100%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                text-align: center;
                                padding: 0 2px;
                            }
                    }
                }
                .empty {
                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
            }

            .item-bd {
                flex: none;
                position: relative;
                width: 292px;
                height: 158px;
                background: #fff;
                border-radius: 4px 4px 0px 0px;
                overflow: hidden;
            }
            .item-ft {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 16px 10px 0 10px;
            }

            .preview {
                position: relative;
                font-size: 0;
                height: 100%;
                overflow: hidden;
                border-radius: 4px 4px 0px 0px;
                display: flex;
                justify-content: center;
                img {
                    width: 100%;
                    object-fit: contain;
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.02);
                }
            }
            .empty-preview-img {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
                color: #C4C6CC;
                height: 100%;
                background: #f0f1f5;
                border-radius: 4px 4px 0px 0px;
            }
            .operate-btns {
                display: none;
                .bk-button{
                    padding: 0 0;
                }
            }
            .empty {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 700;
                color: #C4C6CC;
                height: 100%;
                background: #f0f1f5;
                border-radius: 4px 4px 0px 0px;
            }
            .name {
                margin: 0;
                font-size: 12px;
                font-weight: 700;
                color: #63656E;
                @mixin ellipsis 240px, block;
            }
            .page-name {
                display: flex;
                align-items: center;
                margin: -2px 0 0 0;

                .name {
                    font-size: 12px;
                    font-weight: 700;
                    color: #63656E;
                    width: 215px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-left: 7px;
                }

                .page-type {
                    font-size: 16px;
                    line-height: 18px;
                    height: 20px;
                    width: 20px;
                    text-align: center;
                    margin-left: -2px;
                    color: #979ba5;
                    border-radius: 2px;
                    background: #f0f1f5;
                }
            }
            .stat {
                font-size: 12px;
                color: #979BA5;
                padding: 4px 0;
            }
            .favorite-btn {
                position: absolute;
                right: 16px;
                top: 16px;
                opacity: 0;
                transition: all .3s ease;
                .icon-info-circle {
                    color: #fff;
                    font-size: 16px;
                    margin-right: 4px;
                }
            }
        }
    }

    /deep/ .bk-dialog-header{
            padding: 3px 24px 10px;
    }

    .selected-project{
        font-size: 12px;
        color: #63656e;
        margin-bottom: 14px;
    }

    .selected-template-project {
        height: 64px;
        padding-top: 16px;
        background: rgb(240, 241, 245);
    }

    .page-create-dialog{
        /deep/ & .bk-form-content{
            padding-right: 30px;
        }
        /deep/ & .bk-dialog-body{
            height: 360px;
            overflow-y: auto;
            @mixin scroller;
        }
    }
</style>
