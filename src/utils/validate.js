
export function validUsername(val) {
    const start = /^[a-zA-Z][a-zA-Z0-9_]/
    const  reg_name = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
    // return reg_name.test(val)
    if(!val) {
        return {
            state: 'empty',
            message: '输入不能为空' 
        }
    }else if(!start.test(val)) {
        return {
            state: 'start',
            message: '只能输入数字、字母、下划线'
        }
    }else if(!reg_name.test(val)){
        return {
            state: 'allError',
            message: '只能输入以字母开头，且长度大于5小于16，只能输入字母数字下划线'
        }
    }else {
        return true
    }
}

export function validPasssword(val) {
    const start = /^[a-zA-Z]/
    const  reg_pwd = /^[a-zA-Z]\w{5,17}$/;
    if(!val) return {
        state:'empty',
        message:'输入不能为空'
    }
    if(!start.test(val)){
        return {
            state:'start',
            message:'请以字母开头'
        }
    }else if(val.length<6 || val.length>18) {
        return {
            state:'length',
            message:'请输入6-18位的密码'
        }
    }else if(!reg_pwd.test(val)){
        return {
            state:'allError',
            message:'请以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
        }
    }else {
        console.log(11111111)
        return true
    }  
}