<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Button @click="refreshTables" type="primary">刷新所有表</Button>&nbsp;
          <Button @click="showTables" type="primary">显示所选多个表的信息</Button>&nbsp;
          <Button @click="generateCodes" type="primary">生成所选多个表的代码</Button>
          <Form :model="form" :label-width="120" style="margin-top:20px;">
            <FormItem label="选择多个表">
              <Select v-model="form.tables" filterable multiple>
                <Option v-for="item in tables.multipleTableList" :value="item.value" :key="item.value">{{ item.label }}
                </Option>
              </Select>
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
          <Tabs>
            <TabPane v-for="item in allTablesInfo" :label="item.name" :name="item.name" :key="item.name">
              <Table stripe :columns="tableColumns" :data="item.tableData"></Table>
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
    name: 'single-table',
    data() {
      return {
        form: {
          tables: [],
          codeTypes: ['bean', 'mapper', 'dao', 'service', 'controller', 'view']
        },
        tables: {
          multipleTableList: []
        },
        tableColumns: [
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
        if (this.form.tables.length <= 0) {
          this.$Message.warning('请选择数据表')
        } else {
          this.allTablesInfo = []
          let tableNames = ''
          this.form.tables.forEach((data, index) => {
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
            this.form.tables.forEach((data, index) => {
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
      generateCodes() {
        if (this.form.tables.length <= 0) {
          this.$Message.warning('请选择数据表')
        } else {
          axios.request({
            url: '/generator/codes',
            method: 'post',
            data: this.form
          }).then(response => {
            if (response.data.code === 200) {
              this.$Message.success(response.data.message)
            }
          }).catch(error => {
            console.log(error)
            this.$Message.error('未生成成功，请稍候再试')
          })
        }
      }
    }
  }
</script>

<style>
</style>
