<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Form ref="jdbcForm" :model="form" :label-width="120" :rules="rules">
            <FormItem label="驱动程序类" prop="driverClassName">
              <Input v-model="form.driverClassName"/>
            </FormItem>
            <FormItem label="连接URL" prop="url">
              <Input v-model="form.url"/>
            </FormItem>
            <FormItem label="用户名" prop="username">
              <Input v-model="form.username"/>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="form.password"/>
            </FormItem>
            <FormItem>
              <Button @click="confirmJdbc" type="primary">确认</Button>
            </FormItem>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import axios from '@/libs/api.request'

  export default {
    name: 'jdbc',
    data() {
      return {
        form: {
          driverClassName: 'com.mysql.jdbc.Driver',
          url: 'jdbc:mysql://localhost:3306/zywork?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false&amp;allowMultiQueries=true',
          username: 'root',
          password: 'root'
        },
        rules: {
          driverClassName: [
            {required: true, message: '驱动程序类不能为空', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '连接URL不能为空', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    created() {
      axios.request({
        url: '/setting/jdbc',
        method: 'get',
      }).then(response => {
        this.form = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      confirmJdbc() {
        this.$refs['jdbcForm'].validate(valid => {
          if (valid) {
            axios.request({
              url: '/setting/jdbc',
              method: 'post',
              data: this.form
            }).then(response => {
              if (response.data.code === 200) {
                this.$Message.success('已修改JDBC配置')
              }
            }).catch(error => {
              console.log(error)
              this.$Message.error('未修改成功，请稍候再试')
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
