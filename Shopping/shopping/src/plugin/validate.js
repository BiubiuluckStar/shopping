// vee-validate插件：表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages, //中文信息
    is:(field) =>`${field}必须相同`  //修改内置规则的message,让确认密码与密码相同
  },
  attributes:{  //给校验的field属性名映射中文名称
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
})
// 自定义校验规则---协议
VeeValidate.Validator.extend('agree',{  //自定义校验规则的名字
  validate:value=>{
    return value
  },
  getMessage:field=>field + '必须同意'
})
