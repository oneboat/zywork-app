<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Form ref="generatorForm" :model="form" :label-width="150" :rules="rules">
            <FormItem label="字符编码" prop="charset">
              <Input v-model="form.charset"/>
            </FormItem>
            <FormItem label="Java代码作者" prop="author">
              <Input v-model="form.author"/>
            </FormItem>
            <FormItem label="表前缀" prop="tablePrefix">
              <Input v-model="form.tablePrefix"/>
            </FormItem>
            <FormItem label="代码保存根目录" prop="saveBaseDir">
              <Input v-model="form.saveBaseDir"/>
            </FormItem>
            <FormItem label="Java代码保存目录" prop="javaSrcDir">
              <Input v-model="form.javaSrcDir"/>
            </FormItem>
            <FormItem label="资源文件保存目录" prop="resourceDir">
              <Input v-model="form.resourceDir"/>
            </FormItem>
            <FormItem label="Java基础包" prop="basePackage">
              <Input v-model="form.basePackage"/>
            </FormItem>
            <FormItem label="DO类包" prop="doPackage">
              <Input v-model="form.doPackage"/>
            </FormItem>
            <FormItem label="DTO类包" prop="dtoPackage">
              <Input v-model="form.dtoPackage"/>
            </FormItem>
            <FormItem label="VO类包" prop="voPackage">
              <Input v-model="form.voPackage"/>
            </FormItem>
            <FormItem label="Query类包" prop="queryPackage">
              <Input v-model="form.queryPackage"/>
            </FormItem>
            <FormItem label="DAO接口包" prop="daoPackage">
              <Input v-model="form.daoPackage"/>
            </FormItem>
            <FormItem label="Service接口包" prop="servicePackage">
              <Input v-model="form.servicePackage"/>
            </FormItem>
            <FormItem label="Service实现类包" prop="serviceImplPackage">
              <Input v-model="form.serviceImplPackage"/>
            </FormItem>
            <FormItem label="Controller类包" prop="controllerPackage">
              <Input v-model="form.controllerPackage"/>
            </FormItem>
            <FormItem label="Mapper文件保存目录" prop="mapperDir">
              <Input v-model="form.mapperDir"/>
            </FormItem>
            <FormItem label="DO类后缀" prop="doSuffix">
              <Input v-model="form.doSuffix"/>
            </FormItem>
            <FormItem label="DTO类后缀" prop="dtoSuffix">
              <Input v-model="form.dtoSuffix"/>
            </FormItem>
            <FormItem label="VO类后缀" prop="voSuffix">
              <Input v-model="form.voSuffix"/>
            </FormItem>
            <FormItem label="Query类后缀" prop="querySuffix">
              <Input v-model="form.querySuffix"/>
            </FormItem>
            <FormItem label="DAO接口后缀" prop="daoSuffix">
              <Input v-model="form.daoSuffix"/>
            </FormItem>
            <FormItem label="Service接口后缀" prop="serviceSuffix">
              <Input v-model="form.serviceSuffix"/>
            </FormItem>
            <FormItem label="Service实现类后缀" prop="serviceImplSuffix">
              <Input v-model="form.serviceImplSuffix"/>
            </FormItem>
            <FormItem label="Controller类后缀" prop="controllerSuffix">
              <Input v-model="form.controllerSuffix"/>
            </FormItem>
            <FormItem label="Mapper文件后缀" prop="mapperSuffix">
              <Input v-model="form.mapperSuffix"/>
            </FormItem>
            <FormItem label="View文件保存目录" prop="viewFileDir">
              <Input v-model="form.viewFileDir"/>
            </FormItem>
            <FormItem label="不需要添加及修改的字段" prop="exclusiveAddEditColumns">
              <Input v-model="form.exclusiveAddEditColumns"/>
            </FormItem>
            <FormItem>
              <Button @click="confirmGenerator" type="primary">确认</Button>
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
    name: 'generator',
    data() {
      return {
        form: {
          charset: 'utf-8',
          author: 'http://zywork.top 王振宇',
          tablePrefix: 't_',
          saveBaseDir: '/codes',
          javaSrcDir: 'java',
          resourceDir: 'resources',
          basePackage: 'top.zywork',
          doPackage: 'dos',
          dtoPackage: 'dto',
          voPackage: 'vo',
          queryPackage: 'query',
          daoPackage: 'dao',
          servicePackage: 'service',
          serviceImplPackage: 'service.impl',
          controllerPackage: 'controller',
          mapperDir: 'mapper',
          doSuffix: 'DO',
          dtoSuffix: 'DTO',
          voSuffix: 'VO',
          querySuffix: 'Query',
          daoSuffix: 'DAO',
          serviceSuffix: 'Service',
          serviceImplSuffix: 'ServiceImpl',
          controllerSuffix: 'Controller',
          mapperSuffix: 'DAOMapper',
          viewFileDir: 'views',
          exclusiveAddEditColumns: 'id,create_time,update_time,is_active'
        },
        rules: {
          charset: [
            {required: true, message: '字符编码不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: 'Java代码作者不能为空', trigger: 'blur'}
          ],
          saveBaseDir: [
            {required: true, message: '代码保存根目录不能为空', trigger: 'blur'}
          ],
          javaSrcDir: [
            {required: true, message: 'Java代码保存目录不能为空', trigger: 'blur'}
          ],
          resourceDir: [
            {required: true, message: '资源文件保存目录不能为空', trigger: 'blur'}
          ],
          basePackage: [
            {required: true, message: 'Java基础包不能为空', trigger: 'blur'}
          ],
          doPackage: [
            {required: true, message: 'DO类包不能为空', trigger: 'blur'}
          ],
          dtoPackage: [
            {required: true, message: 'DTO类包不能为空', trigger: 'blur'}
          ],
          voPackage: [
            {required: true, message: 'VO类包不能为空', trigger: 'blur'}
          ],
          queryPackage: [
            {required: true, message: 'Query类包不能为空', trigger: 'blur'}
          ],
          daoPackage: [
            {required: true, message: 'DAO接口包不能为空', trigger: 'blur'}
          ],
          servicePackage: [
            {required: true, message: 'Service接口包不能为空', trigger: 'blur'}
          ],
          serviceImplPackage: [
            {required: true, message: 'Service实现类包不能为空', trigger: 'blur'}
          ],
          controllerPackage: [
            {required: true, message: 'Controller类包不能为空', trigger: 'blur'}
          ],
          mapperDir: [
            {required: true, message: 'Mapper文件保存目录不能为空', trigger: 'blur'}
          ],
          doSuffix: [
            {required: true, message: 'DO类后缀不能为空', trigger: 'blur'}
          ],
          dtoSuffix: [
            {required: true, message: 'DTO类后缀不能为空', trigger: 'blur'}
          ],
          voSuffix: [
            {required: true, message: 'VO类后缀不能为空', trigger: 'blur'}
          ],
          querySuffix: [
            {required: true, message: 'Query类后缀不能为空', trigger: 'blur'}
          ],
          daoSuffix: [
            {required: true, message: 'DAO接口后缀不能为空', trigger: 'blur'}
          ],
          serviceSuffix: [
            {required: true, message: 'Service接口后缀不能为空', trigger: 'blur'}
          ],
          serviceImplSuffix: [
            {required: true, message: 'Service实现类后缀不能为空', trigger: 'blur'}
          ],
          controllerSuffix: [
            {required: true, message: 'Controller类后缀不能为空', trigger: 'blur'}
          ],
          mapperSuffix: [
            {required: true, message: 'Mapper文件后缀不能为空', trigger: 'blur'}
          ],
          viewFileDir: [
            {required: true, message: 'View文件保存目录不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    created() {
      axios.request({
        url: '/setting/generator',
        method: 'get'
      }).then(response => {
        this.form = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      confirmGenerator() {
        this.$refs['generatorForm'].validate(valid => {
          if (valid) {
            axios.request({
              url: '/setting/generator',
              method: 'post',
              data: this.form
            }).then(response => {
              if (response.data.code === 200) {
                this.$Message.success('已修改generator配置')
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
