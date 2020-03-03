import m from './index';

console.log('i am test');

const aaa = { aaaa: 0 }; // m.trim('   123 3')

m.setSessionStorage('aaa123', aaa);

// const bbb = m.getSessionStorage('aaa123')

// console.log(bbb)

setTimeout(() => {
  console.log('bbb', m.getSessionStorage('aaa123'));
}, 1000);
