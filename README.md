# zywork-app

*作者：王振宇*

zywork-app项目是基于SpringBoot和SpringCloud的多个子系统的集合，使用分布式服务架构，开发团队不需要再配置任何框架便可使用众多集成的功能，甚至是可用的系统！zywork-app项目遵循阿里巴巴的Java开发规范，并补充自己团队内部的一些Java开发规范。

zywork-app项目包含的功能有：

1. 通用工具类
2. 代码自动生成器
3. 用户注册、登录，使用QQ，微信，微博等第三方登录的**用户中心**
4. 基于SpringSecurity和JWT的**用户认证及权限验证**
5. 基于Activiti的**业务流程管理**
6. 基于POI和JasperReport的**Excel处理和PDF报表导出**
7. 基于ECharts的**HTML5 WEB报表**
8. 基于Redis的**数据缓存**
9. 基于SpringCloud的**分布式服务架构**
10. 基于Logback的**日志记录**
11. 基于Spring Task或QuartZ的**作业调度**
12. 基于JavaMail和阿里云短信API的**消息中心**
13. 基于微信支付，支付宝支付的**支付中心**
14. 基于Vue.js和iView的前端及后台**用户界面**

#### 系统基本架构 
此系统为基于SpringBoot和SpringCloud的分布式系统，包含有多个独立可运行的子系统。使用Nginx提供Tomcat集群的负载均衡。

此系统采用前后端分离的开发模式，前端使用Vue.js和iView。

在zywork-app项目中，提供了一个documents目录，用于存储本项目相关的所有文档，其中zywork_app.sql文件是整个项目的数据库脚本文件，包含建立数据表及初始化数据的所有脚本。

#### 项目子系统划分
<table>
	<tbody>
		<tr>
			<th>名称</th>
			<th>说明</th>
		</tr>
		<tr>
			<td>zywork-common</td>
			<td>通用模块，包含有常用的工具类</td>
		</tr>
		<tr>
			<td>zywork-generator</td>
			<td>代码自动生成器模块，可自动生成项目中所需要的实体类，DAO接口及其MyBatis映射文件，Service接口及其实现类，Controller</td>
		</tr>
		<tr>
			<td>zywork-log</td>
			<td>日志系统，操作日志的记录，查询等管理</td>
		</tr>
		<tr>
			<td>zywork-ucenter</td>
			<td>用户中心系统，包含有用户注册，登录，第三方登录</td>
		</tr>
		<tr>
			<td>zywork-upms</td>
			<td>权限管理系统，细粒度的权限控制。包含模块，角色，权限等管理</td>
		</tr>
		<tr>
			<td>zywork-cms</td>
			<td>内容管理系统，包含有文章类别，文章管理，系统通知，友情链接等</td>
		</tr>
		<tr>
			<td>zywork-bpms</td>
			<td>
			业务流程系统，包含有业务流程的上传，手动部署业务流程，业务流程的执行等			</td>
		</tr>
		<tr>
			<td>zywork-report</td>
			<td>
			报表系统，包含有Excel的处理，PDF报表的导出，模板的导入与下载
			</td>
		</tr>
		<tr>
			<td>zywork-message</td>
			<td>消息通知系统，包含有邮件，短信。消息模板的添加与修改</td>
		</tr>
		<tr>
			<td>zywork-pay</td>
			<td>支付系统，包含有微信支付，支付宝支付。支付订单的管理</td>
		</tr>
		<tr>
			<td>zywork-schedule</td>
			<td>作业调度系统，作业查询，修改，启动，停止，暂停与重启</td>
		</tr>
		<tr>
            <td>zywork-ui</td>
        	<td>基于Vue.js和iView的UI系统，包含前端用户界面和后台用户界面</td>
        </tr>
	</tbody>
</table>

#### 使用的技术

**后台部分：**

<table>
	<tbody>
		<tr>
			<th>技术</th>
			<th>说明</th>
		</tr>
		<tr>
			<td>Apache Maven</td>
			<td>项目构建管理</td>
		</tr>
		<tr>
			<td>Shell Script</td>
			<td>Bash Shell脚本</td>
		</tr>
		<tr>
			<td>SpringBoot</td>
			<td>SpringMVC, SpringIoC, SpringAOP</td>
		</tr>
		<tr>
			<td>SpringCloud</td>
			<td>分布式架构</td>
		</tr>
		<tr>
			<td>SpringSecurity</td>
			<td>权限认证</td>
		</tr>
		<tr>
          <td>JWT</td>
          <td>JSON Web Token</td>
       </tr>
		<tr>
			<td>MyBatis</td>
			<td>数据库访问</td>
		</tr>
		<tr>
			<td>MySQL</td>
			<td>数据库</td>
		</tr>
		<tr>
			<td>Druid</td>
			<td>数据源及连接池</td>
		</tr>
		<tr>
			<td>Redis</td>
			<td>分布式缓存数据库</td>
		</tr>
		<tr>
			<td>Activiti</td>
			<td>业务流程引擎</td>
		</tr>
		<tr>
			<td>QuzrtZ</td>
			<td>作业调度</td>
		</tr>
		<tr>
			<td>Apache POI</td>
			<td>Excel处理</td>
		</tr>
		<tr>
			<td>JasperReport</td>
			<td>PDF报表</td>
		</tr>
		<tr>
			<td>JavaMail</td>
			<td>邮件发送</td>
		</tr>
		<tr>
			<td>阿里云短信API</td>
			<td>短信接口</td>
		</tr>
		<tr>
			<td>slf4j & Logback</td>
			<td>日志记录</td>
		</tr>
		<tr>
			<td>Apache Kafka</td>
			<td>分布式消息队列</td>
		</tr>
		<tr>
			<td>FastDFS</td>
			<td>分布式文件系统</td>
		</tr>
		<tr>
			<td>阿里云OSS</td>
			<td>阿里云对象存储</td>
		</tr>
	</tbody>
</table>

**前端部分：**

<table>
	<tbody>
		<tr>
			<th>技术</th>
			<th>说明</th>
		</tr>
		<tr>
			<td>Node.js</td>
			<td>Node.js</td>
		</tr>
		<tr>
			<td>npm</td>
			<td>npm</td>
		</tr>
		<tr>
			<td>Webpack</td>
			<td>Webpack</td>
		</tr>
		<tr>
			<td>Promise</td>
			<td>Promise</td>
		</tr>
		<tr>
			<td>HTML5</td>
			<td>HTML5</td>
		</tr>
		<tr>
			<td>CSS3</td>
			<td>CSS3</td>
		</tr>
		<tr>
			<td>JavaScript</td>
			<td>JavaScript</td>
		</tr>
		<tr>
			<td>Vue.js</td>
			<td>用户界面构建</td>
		</tr>
		<tr>
			<td>Vue Router</td>
			<td>Vue路由</td>
		</tr>
		<tr>
			<td>iView</td>
			<td>UI框架</td>
		</tr>
		<tr>
			<td>axios</td>
			<td>Vue AJAX请求</td>
		</tr>
		<tr>
			<td>ECharts</td>
			<td>HTML5 WEB报表</td>
		</tr>
	</tbody>
</table>

**第三方登录：**

QQ登录，微信登录，微博登录

**在线支付：**

微信支付，支付宝支付

**后台服务：**

Ngnix, Tomcat, Eureka, Redis, MySQL

**开发及测试环境：**

MacOS, IntellijIDEA, Google Chrome, Postman, JDK1.8, JavaEE7.0, Nginx, Tomcat8.5, Eureka, Redis, MySQL5.7

#### 按顺序启动的服务(详细安装及使用方法可参考```documents```目录下的技术文档)

1. MySQL
2. Redis
3. Tomcat
4. Nginx
5. Node

#### LICENSE许可协议

**[MIT](https://github.com/GZWgssmart/zywork-app/blob/master/LICENSE)**

Copyright &copy; 王振宇 [http://zywork.top](http://zywork.top)