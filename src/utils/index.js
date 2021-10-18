// 表单校验是否通过
export function formCheck(self,name){
    return new Promise((resolve,reject)=>{
        self.$refs[name].validate((valid)=>{
            return valid ? resolve(valid) : reject(valid)
        })
    })
}