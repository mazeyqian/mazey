import {mJoin, mTrim, MSet} from './index'

console.log(mJoin('-', 1, 2, 3))

console.log(mTrim('   1   2 3   '))

const aa = new MSet()

aa.add(1)
aa.add(3)
aa.add(2)

console.log(aa.dataStore)
