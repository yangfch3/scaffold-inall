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

/**
 * standard/eslint 不支持解析 import()
 * 所以此处 require.ensure
 */
import('avalon2').then(({avalon: exports}) => {
  avalon.define({
    $id: 'globalVm',
    logged: true
  })
})
