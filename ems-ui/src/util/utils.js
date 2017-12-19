/**
 * http://blog.csdn.net/pcaxb/article/details/53670097
 * Created by hsj on 2017/12/19.
 * 由于ES6输入的模块变量，只生成一个动态的只读引用,所以这个变量是只读的，
 * 对它进行重新赋值会报错,只能改变对象属性的值,不能够改变引用。
 * 如果是一个基本数据类型,不是引用类型的数据,也不能改变他的值。
 */
let count = 1;
function compute(){
    count++;
}
export {count,compute}