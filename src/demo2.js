/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
import op from './commonModules/module2'
import time from './commonModules/moduleX'
import page2 from '../views/page2.art'
import './sass/common.scss'
import './sass/page2.scss'

// 同步加载
import $ from 'jquery'

console.log(op)

const html = page2({
  time
})
document.write(html)

console.log($('body'))

// 异步加载
import('avalon2').then(({avalon: exports}) => {
  avalon.define({
    $id: 'globalVm',
    logged: true
  })
})
