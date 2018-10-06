<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Button @click="showPage" type="primary">新页面</Button>&nbsp;
          <Button @click="showModal('add')" type="primary">添加</Button>&nbsp;
          <Dropdown @on-click="batchOpt">
            <Button type="primary">
              批量操作
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="batchActive">批量激活</DropdownItem>
              <DropdownItem name="batchInactive"><span style="color: red;">批量冻结</span></DropdownItem>
              <DropdownItem name="batchRemove" divided><span style="color: red;">批量删除</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>&nbsp;
          <Button @click="showModal('search')" type="primary">高级搜索</Button>&nbsp;
          <Tooltip content="刷新" placement="right">
            <Button icon="md-refresh" type="success" shape="circle" @click="search"></Button>
          </Tooltip>
          <Table stripe :loading="table.loading" :columns="table.tableColumns" :data="table.tableDetails"
                 style="margin-top:20px;" @on-selection-change="changeSelection" @on-sort-change="changeSort"></Table>
          <div style="margin: 20px;overflow: hidden">
            <div style="float: right;">
              <Page :total="page.total" :current="searchForm.pageNo" @on-change="changePageNo"
                    @on-page-size-change="changePageSize" showSizer showTotal></Page>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <Modal v-model="modal.add" title="添加" @on-visible-change="changeModalVisibleResetForm('addForm', $event)">
      <Form ref="addForm" :model="form" :label-width="80" :rules="validateRules">
        <FormItem label="编号" prop="id">
          <Input v-model="form.id"/>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="form.email"/>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="form.phone"/>
        </FormItem>
        <FormItem label="账户名" prop="accountName">
          <Input v-model="form.accountName"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="form.password"/>
        </FormItem>
        <FormItem label="加密盐值" prop="salt">
          <Input v-model="form.salt"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetFormCancelModal('addForm', 'add')">取消</Button>
        <Button type="primary" size="large" @click="add">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.edit" title="修改" @on-visible-change="changeModalVisibleResetForm('form', $event)">
      <Form ref="editForm" :model="form" :label-width="80" :rules="validateRules">
        <FormItem label="编号" prop="id">
          <Input v-model="form.id"/>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="form.email"/>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="form.phone"/>
        </FormItem>
        <FormItem label="账户名" prop="accountName">
          <Input v-model="form.accountName"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="form.password"/>
        </FormItem>
        <FormItem label="加密盐值" prop="salt">
          <Input v-model="form.salt"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetFormCancelModal('editForm', 'edit')">取消</Button>
        <Button type="primary" size="large" @click="edit">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.search" title="高级搜索" @on-visible-change="changeModalVisibleResetForm('searchForm', $event)">
      <Form ref="searchForm" :model="searchForm" :label-width="80">
        <FormItem label="编号">
          <Row>
            <i-col span="11">
              <FormItem prop="idMin">
                <Input v-model="form.idMin"/>
              </FormItem>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <FormItem prop="idMax">
                <Input v-model="form.idMax"/>
              </FormItem>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="form.email"/>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="form.phone"/>
        </FormItem>
        <FormItem label="账户名" prop="accountName">
          <Input v-model="form.accountName"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="form.password"/>
        </FormItem>
        <FormItem label="加密盐值" prop="salt">
          <Input v-model="form.salt"/>
        </FormItem>
        <FormItem label="创建时间">
          <Row>
            <i-col span="11">
              <FormItem prop="createTimeMin">
                <DatePicker v-model="form.createTimeMin" type="datetime" format="yyyy-MM-dd HH:mm"
                            style="width: 100%;"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <FormItem prop="createTimeMax">
                <DatePicker v-model="form.createTimeMax" type="datetime" format="yyyy-MM-dd HH:mm"
                            style="width: 100%;"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="更新时间">
          <Row>
            <i-col span="11">
              <FormItem prop="updateTimeMin">
                <DatePicker v-model="form.updateTimeMin" type="datetime" format="yyyy-MM-dd HH:mm"
                            style="width: 100%;"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <FormItem prop="updateTimeMax">
                <DatePicker v-model="form.updateTimeMax" type="datetime" format="yyyy-MM-dd HH:mm"
                            style="width: 100%;"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="是否激活">
          <Row>
            <i-col span="11">
              <FormItem prop="isActiveMin">
                <Input v-model="form.isActiveMin"/>
              </FormItem>
            </i-col>
            <i-col span="2" style="text-align: center">-</i-col>
            <i-col span="11">
              <FormItem prop="isActiveMax">
                <Input v-model="form.isActiveMax"/>
              </FormItem>
            </i-col>
          </Row>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetForm('searchForm')">清空</Button>
        <Button type="text" size="large" @click="cancelModal('search')">取消</Button>
        <Button type="primary" size="large" @click="searchOkModal('search')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.detail" title="详情">
      <p>编号: <span v-text="form.id"></span></p>
      <p>邮箱: <span v-text="form.email"></span></p>
      <p>手机号: <span v-text="form.phone"></span></p>
      <p>账户名: <span v-text="form.accountName"></span></p>
      <p>密码: <span v-text="form.password"></span></p>
      <p>加密盐值: <span v-text="form.salt"></span></p>
      <p>创建时间: <span v-text="form.createTime"></span></p>
      <p>更新时间: <span v-text="form.updateTime"></span></p>
      <p>是否激活: <span v-text="form.isActive"></span></p>

    </Modal>
  </div>
</template>

<script>
  import * as utils from '@/api/utils'

  import { mapMutations } from 'vuex'

  export default {
    name: 'User',
    data() {
      return {
        modal: {
          add: false,
          edit: false,
          search: false,
          detail: false
        },
        urls: {
          addUrl: '/user/save',
          batchAddUrl: '/user/batch-save',
          editUrl: '/user/update',
          batchEditUrl: '/user/batch-update',
          searchUrl: '/user/pager-cond',
          allUrl: '/user/all',
          removeUrl: '/user/remove/',
          batchRemoveUrl: '/user/batch-remove',
          detailUrl: '/user/one/'
        },
        page: {
          total: 0
        },
        form: {
          id: '',
          email: '',
          phone: '',
          accountName: '',
          password: '',
          salt: '',
          createTime: '',
          updateTime: '',
          isActive: '',

        },
        validateRules: {
          id: [
            {required: true, message: '此项为必须项', trigger: 'blur'}
          ],
          email: [
            {type: 'string', min: 1, max: 100, message: '必须1-100个字符', trigger: 'blur'}
          ],
          phone: [
            {type: 'string', min: 1, max: 11, message: '必须1-11个字符', trigger: 'blur'}
          ],
          accountName: [
            {type: 'string', min: 1, max: 20, message: '必须1-20个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '此项为必须项', trigger: 'blur'},
            {type: 'string', min: 1, max: 50, message: '必须1-50个字符', trigger: 'blur'}
          ],
          salt: [
            {type: 'string', min: 1, max: 200, message: '必须1-200个字符', trigger: 'blur'}
          ],
          createTime: [
            {required: true, message: '此项为必须项', trigger: 'blur'}
          ],
          updateTime: [
            {required: true, message: '此项为必须项', trigger: 'blur'}
          ],
          isActive: [
            {required: true, message: '此项为必须项', trigger: 'blur'}
          ],

        },
        searchForm: {
          pageNo: 1,
          pageSize: 10,
          sortColumn: '',
          sortOrder: '',
          id: '',
          idMin: '',
          idMax: '',
          email: '',
          phone: '',
          accountName: '',
          password: '',
          salt: '',
          createTime: '',
          createTimeMin: '',
          createTimeMax: '',
          updateTime: '',
          updateTimeMin: '',
          updateTimeMax: '',
          isActive: '',
          isActiveMin: '',
          isActiveMax: '',

        },
        table: {
          loading: false,
          tableColumns: [
            {
              type: 'selection',
              width: 45,
              key: "id",
              align: 'center',
              fixed: 'left'
            },
            {
              width: 60,
              align: 'center',
              fixed: "left",
              render: (h, params) => {
                return h('span', params.index + (this.searchForm.pageNo - 1) * this.searchForm.pageSize + 1)
              }
            },
            {
              title: '编号',
              key: 'id',
              width: 100,
              sortable: true
            },
            {
              title: '邮箱',
              key: 'email',
              width: 100,
              sortable: true
            },
            {
              title: '手机号',
              key: 'phone',
              width: 100,
              sortable: true
            },
            {
              title: '账户名',
              key: 'accountName',
              width: 100,
              sortable: true
            },
            {
              title: '密码',
              key: 'password',
              width: 100,
              sortable: true
            },
            {
              title: '加密盐值',
              key: 'salt',
              width: 100,
              sortable: true
            },
            {
              title: '创建时间',
              key: 'createTime',
              width: 100,
              sortable: true
            },
            {
              title: '更新时间',
              key: 'updateTime',
              width: 100,
              sortable: true
            },
            {
              title: '是否激活',
              key: 'isActive',
              width: 120,
              sortable: true
            },

            {
              title: '激活状态',
              key: 'isActive',
              width: 100,
              align: 'center',
              render: (h, params) => {
                return h('i-switch', {
                  props: {
                    size: 'large',
                    value: params.row.isActive === 0
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (status) => {
                      console.log(status)
                      this.active(params.row)
                    }
                  }
                }, [
                  h('span', {
                    slot: 'open'
                  }, '激活'),
                  h('span', {
                    slot: 'close'
                  }, '冻结')
                ])
              }
            },
            {
              title: '操作',
              key: 'action',
              width: 180,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showDetail('detail', params.row)
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showEdit('edit', params.row)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          tableDetails: [],
          selections: []
        }
      }
    },
    computed: {},
    mounted() {
      this.search()
    },
    methods: {
      ...mapMutations([
        'addTag'
      ]),
      showPage() {
        let route = {
          name: "user-page1",
          params: {
            id: 1
          }
        }
        this.addTag({
          route: route,
          type: 'push'
        })
        this.$router.push(route)
      },
      showModal(modal) {
        utils.showModal(this, modal)
      },
      showEdit(modal, row) {
        utils.showModal(this, modal)
        this.form = JSON.parse(JSON.stringify(row))
      },
      showDetail(modal, row) {
        utils.showModal(this, modal)
        this.form = row
      },
      changeModalVisibleResetForm(formRef, visible) {
        if (!visible) {
          utils.resetForm(this, formRef)
        }
      },
      resetForm(formRef) {
        utils.resetForm(this, formRef)
      },
      cancelModal(modal) {
        utils.cancelModal(this, modal)
      },
      resetFormCancelModal(formRef, modal) {
        utils.cancelModal(this, modal)
        utils.resetForm(this, formRef)
      },
      searchOkModal(modal) {
        utils.cancelModal(this, modal)
        utils.search(this)
      },
      batchOpt(itemName) {
        if (itemName === 'batchActive') {
          utils.batchActive(this, 0)
        } else if (itemName === 'batchInactive') {
          utils.batchActive(this, 1)
        } else if (itemName === 'batchRemove') {
          utils.batchRemove(this)
        }
      },
      add() {
        utils.add(this)
      },
      edit() {
        utils.edit(this)
      },
      active(row) {
        utils.active(this, row)
      },
      remove(row) {
        utils.remove(this, row)
      },
      search() {
        utils.search(this)
      },
      changeSelection(selections) {
        utils.changeSelections(this, selections)
      },
      changeSort(sortColumn) {
        utils.changeSort(this, sortColumn)
      },
      changePageNo(pageNo) {
        utils.changePageNo(this, pageNo)
      },
      changePageSize(pageSize) {
        utils.changePageSize(this, pageSize)
      }
    }
  }
</script>

<style>
</style>
