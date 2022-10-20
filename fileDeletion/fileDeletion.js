const fs = require('fs');
const path = require('path');
// const targets = ['._', 'IT教程吧-www.it'];


/** 
* 函数说明 
* 批量删除文件递归版
* @url 需要删除文件所处文件夹路径
* targets 需要删除的文件名称(模糊筛选)
*/
function bulkFileDeletion(url, targets, delCount = 0) {
    fs.readdir(url, 'utf-8', (err, fileList) => {
        if (err) return err;
        fileList.forEach(v => {
            if (fs.lstatSync(path.join(url, v)).isDirectory()) return;
            else if (targets.some(value => { return v.indexOf(value) = -1 })) return;
            delCount++;
            fs.unlinkSync(path.join(url, v));
            console.log(`delete:${v}`);
        })
    })
    console.log(`delete:${delCount}file`);
    return delCount
}

/** 
* 函数说明 
* 批量删除文件递归版
* @url 需要删除文件所处文件夹路径
* targets 需要删除的文件名称(模糊筛选)
*/
function bulkFileDeletion_recursion(url, targets, delCount = 0) {
    // 获取指定路径的文件列表
    fs.readdir(url, 'utf-8', (err, fileList) => {
        if (err) console.log(err)
        //循环判断每一个文件的类别
        fileList.forEach(v => {
            // 如果是文件夹,则递归本函数
            if (fs.lstatSync(path.join(url, v)).isDirectory()) {
                return delCount + fileRecursion(path.join(url, v), targets);
            }
            //如果不是文件夹,且文件名称包含指定字符则删除文件
            else if (targets.some(value => { return v.indexOf(value) != -1 })) {
                fs.unlinkSync(path.join(url, v));
                // 控制台打印被删除的文件
                console.log(`delete:${v}`)
                delCount++
            }
        })
    })
    console.log(`delete:${delCount}file`);
    return delCount;
}


module.exports = {
    bulkFileDeletion,
    bulkFileDeletion_recursion
}