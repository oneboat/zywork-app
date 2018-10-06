<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Button @click="refreshTables" type="primary">刷新所有表</Button>&nbsp;
          <Button @click="showTables" type="primary">显示所选多个表的信息</Button>&nbsp;
          <Button @click="generateCodes" type="primary">生成所选关联表的代码</Button>&nbsp;
          <Form ref="joinForm" :model="form" :label-width="120" :rules="rules" style="margin-top:20px;">
            <FormItem label="选择多个表" prop="tables">
              <Select v-model="tables.tables" filterable multiple>
                <Option v-for="item in tables.multipleTableList" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
              </Select>
            </FormItem>
            <FormItem v-if="tables.tables.length > 0" label="主体表" prop="primaryTable">
              <RadioGroup v-model="form.primaryTable">
                <Radio v-for="item in tables.tables" :label="item">{{ item }}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="实体类名称" prop="beanName">
              <Input v-model="form.beanName" placeholder="请输入实体类名称"/>
            </FormItem>
            <FormItem label="控制器映射URL" prop="requestMapping">
              <Input v-model="form.requestMapping" placeholder="请输入控制器映射URL"/>
            </FormItem>
            <FormItem label="关联条件语句" prop="whereClause">
              <Input v-model="form.whereClause" placeholder="使用完整的[表名.字段]的形式输入关联条件，如t_user.id = t_role.user_id"/>
            </FormItem>
            <FormItem label="需要生成">
              <CheckboxGroup v-model="form.codeTypes">
                <Checkbox label="bean"><span>Bean代码</span></Checkbox>
                <Checkbox label="mapper"><span>Mapper映射文件</span></Checkbox>
                <Checkbox label="dao"><span>DAO代码</span></Checkbox>
                <Checkbox label="service"><span>Service代码</span></Checkbox>
                <Checkbox label="controller"><span>Controller代码</span></Checkbox>
                <Checkbox label="view"><span>View视图代码</span></Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
          <h4>所选表的信息：</h4>
          <Tabs v-model="currentTab">
            <TabPane v-for="item in allTablesInfo" :label="item.name" :name="item.name" :key="item.name">
              <Table stripe :columns="tableColumns" :data="item.tableData" @on-selection-change="changeSelection"></Table>
            </TabPane>
          </Tabs>

        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import axios from '@/libs/api.request'

  export default {
    name: 'join-table',
    data() {
      return {
        form: {
          beanName: '',
          requestMapping: '',
          whereClause: '',
          primaryTable: '',
          columns: [],
          codeTypes: ['bean', 'mapper', 'dao', 'service', 'controller', 'view']
        },
        tableColumnMap: {},
        tables: {
          multipleTableList: [],
          tables: []
        },
        rules: {
          primaryTable: [
            {required: true, message: '必须选择主表', trigger: 'blur'}
          ],
          beanName: [
            {required: true, message: '实体类名称不能为空', trigger: 'blur'}
          ],
          requestMapping: [
            {required: true, message: '控制器映射URL不能为空', trigger: 'blur'}
          ],
          whereClause: [
            {required: true, message: 'where条件语句不能为空', trigger: 'blur'}
          ]
        },
        currentTab: '',
        tableColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '字段名称',
            key: 'name'
          },
          {
            title: '字段类型',
            key: 'jdbcTypeName'
          },
          {
            title: 'Java属性名称',
            key: 'fieldName'
          },
          {
            title: 'Java属性类型',
            key: 'javaTypeName'
          },
          {
            title: '注释',
            key: 'comment'
          }
        ],
        allTablesInfo: []
      }
    },
    computed: {},
    created() {
      this.refreshTables()
    },
    methods: {
      refreshTables() {
        axios.request({
          url: '/table/all',
          method: 'get'
        }).then(response => {
          this.tables.multipleTableList = response.data.data
          this.$Message.success('已刷新所有数据表')
        }).catch(error => {
          console.log(error)
        })
      },
      showTables() {
        if (this.tables.tables.length <= 0) {
          this.$Message.warning('请选择数据表')
        } else {
          this.currentTab = this.tables.tables[0]
          this.allTablesInfo = []
          let tableNames = ''
          this.tables.tables.forEach((data, index) => {
            if (tableNames === '') {
              tableNames += data
            } else {
              tableNames += ',' + data
            }
          })
          axios.request({
            url: '/table/tables-columns/' + tableNames,
            method: 'get'
          }).then(response => {
            this.tables.tables.forEach((data, index) => {
              let table = {
                name: data,
                tableData: {}
              }
              table.tableData = response.data.data[index]
              this.allTablesInfo.push(table)
            })
          }).catch(error => {
            console.log(error)
          })
        }
      },
      changeSelection(selections) {
        this.tableColumnMap[this.currentTab] = selections
        this.form.columns = []
        for (let key in this.tableColumnMap) {
          this.tableColumnMap[key].forEach((item, index) => {
            this.form.columns.push(key + '-' + item.name + '-' + item.javaTypeName)
          })
        }
        console.log(this.form.columns)
      },
      generateCodes() {
        this.$refs['joinForm'].validate(valid => {
          if (valid) {
            if (this.form.columns.length > 0) {
              axios.request({
                url: '/generator/join-code',
                method: 'post',
                data: this.form
              }).then(response => {
                this.$Message.success(response.data.message)
              }).catch(error => {
                console.log(error)
                this.$Message.error('未生成成功，请稍候再试')
              })
            } else {
              this.$Message.warning('请选择数据表及关联的字段')
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>
