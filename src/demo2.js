/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
import op from './commonModules/module2'
import time from './commonModules/moduleX'
import page2 from '../views/page2.art'
import './sass/page2.scss'

// 同步加载
import $ from 'jquery'

console.log(op)

const html = page2({
  time
})
document.write(html)

console.log($('body'))

/**
 * standard/eslint 不支持解析 import()
 * 所以此处 require.ensure
 */
require.ensure('avalon2').then(({avalon: exports}) => { // eslint-disable-line
  avalon.define({
    $id: 'globalVm',
    logged: true
  })
})
