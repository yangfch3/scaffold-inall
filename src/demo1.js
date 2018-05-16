/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
import greeting from './commonModules/module1'
import demo1 from '../views/page1.art'
import './sass/page1.scss'

// 同步加载
import $ from 'jquery'

const html = demo1({
  name: 'yangfch3'
})
document.write(html)
console.log($('body'))
greeting()

// 异步加载
import('avalon2').then(({avalon: exports}) => {
  avalon.define({
    $id: 'globalVm',
    logged: true
  })
})
