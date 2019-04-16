<template>
    <div class="login-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" auto-complete="on" class="login-form">
            <div class="title-container">
                <h3 class="title">
                    欢迎使用后台
                </h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入您的用户名"
                    type="text"
                    auto-complete="on"
                    name="username"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" placement="right" content="大写已开" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType" 
                        ref="password"
                        v-model="loginForm.password"
                        placeholder="请输入您的密码"
                        :type="passwordType"
                        auto-complete="on"
                        name="password"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-button class="thirdparty-button" type="primary" @click="handleLogin" :loading="loading">
                登录
            </el-button>
        </el-form>
    </div>    
</template>

<script>
import { validUsername, validPasssword } from '@/utils/validate';
export default {
    data() {
        const validateUsername = (rule, value, callback) => {
            if(value === 'admin') {
                callback()
                return true
            }
            if( validUsername(value) !== true ) {
                callback(new Error(validUsername(value).message))
            }else {
                console.log(validPasssword(value))
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if(value === '111111') {
                callback()
                return true
            }
            if( validPasssword(value) !== true ) {
                callback(new Error(validPasssword(value).message))
            }else {
                callback()
            }
        }
        return {
            loginRules:{
                username:[ {required: true, tigger: 'blur', validator: validateUsername } ],
                password:[ {required: true, tigger: 'blur', validator: validatePassword } ]
            },
            loginForm:{
                username: 'admin',
                password: '111111'
            },
            passwordType:'password',
            capsTooltip: false,
            loading: false,
            redirect: undefined
        }
    },
    methods: {
        showPwd() {
            if(this.passwordType === 'password') {
                this.passwordType = 'text'
            }else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            });
        },
        handleLogin() {
            
            this.$refs.loginForm.validate(valid => {
                if(!valid) {
                    this.loading = true
                    this.$store.dispatch('user/login',this.loginForm)
                        .then(() => {
                            this.$router.push({ path: this.redirect || '/' })
                            this.loading = false
                        })
                        .catch(() =>{
                            this.loading = false
                        })
                }else {
                    console.log('error login')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
    /* 重置element-ui的样式 */
    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    .login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    width: 100%;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

