import m from './index'

console.log(m.join('-', 1, 2, 3))

console.log(m.trim('   1   2 3   '))

console.log(m.getDomain({
  url: 'http://km.qutoutiao.net/plugins/servlet/mobile?contentId=96777829#content/view/96777829',
  rules: ['hostname', 'pathname']
}))

const aa = new m.Set()

aa.add(1)
aa.add(3)
aa.add(2)
aa.add(5)

aa.remove(1)

console.log(aa.dataStore)
