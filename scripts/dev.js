/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const execa = require('execa');

(async () => {
  const { stdout: currentBranch } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' });
  console.log('currentBranch:', currentBranch); // currentBranch: fix/rollup_dependences_mon_oct_31st_2022
})();
