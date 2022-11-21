/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// const execa = require('execa');
const { gitMergeMaster2Release } = require('./github-helper');

(async () => {
  // const { stdout: pushMsg = '' } = await execa('git', ['push'], { stdio: 'pipe' })
  //   .catch(error => {
  //     console.log('error:', error.message);
  //   });
  // try {
  //   await execa('git', ['push'], { stdio: 'pipe' });
  // } catch (error) {
  //   console.log('error:', error.message);
  //   const { stdout: currentBranch } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' });
  //   console.log('currentBranch:', currentBranch); // currentBranch: fix/rollup_dependences_mon_oct_31st_2022
  //   await execa('git', ['push', '--set-upstream', 'origin', currentBranch]);
  // }
  // console.log('pushMsg:', pushMsg);
  const cb = await gitMergeMaster2Release();
  console.log('bbb', cb);
})();
