/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// Github Helper
const execa = require('execa');

/**
 * Release code.
 *
 * Example: Release code with version by `process.env.VERSION` or `package.json`.
 * 
 * ```
 * const pkgVersion = process.env.VERSION || require('../package.json').version;
 * release(pkgVersion);
 * ```
 */
async function release (ver) {
  if (!ver) {
    ver = process.env.SCRIPTS_NPM_PACKAGE_VERSION;
  }
  if (!ver) {
    console.error('Fail to get the current version.');
    return;
  }
  const releaseVersion = `v${ver}`;
  const { stdout: releaseStdout } = await execa('echo', [`Start release ${releaseVersion}...`]);
  console.log(releaseStdout);
  // commit
  await getCommit('stage');
  // marge
  await gitMergeMaster2Release();
  // build
  await execa('npm', ['run', 'preview']);
  await execa('npm', ['publish']);
  // git branch --show-current
  // console.log('git push --set-upstream origin <branch>');
  // Commit Stdout
  const { stdout: diffStdout } = await execa('git', ['diff'], { stdio: 'pipe' });
  if (diffStdout) {
    console.log('Committing changes...');
    await execa('git', ['add', '-A']);
    await execa('git', ['commit', '-m', `release: ${releaseVersion}`]);
  } else {
    console.log('No changes to commit.');
  }
  // Push
  console.log('Pushing to GitHub...');
  await execa('git', ['tag', '-a', `${releaseVersion}`, '-m', `Release ${releaseVersion}`]);
  await execa('git', ['push', 'origin', `refs/tags/${releaseVersion}`]);
  await gitPush(); // execa('git', ['push']);

  console.log('All done.');
}

/**
 * Push code.
 */
async function gitPush () {
  try {
    await execa('git', ['push'], { stdio: 'pipe' });
  } catch (error) {
    console.log('error:', error.message);
    const { stdout: currentBranch } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' });
    console.log('currentBranch:', currentBranch); // currentBranch: fix/rollup_dependences_mon_oct_31st_2022
    await execa('git', ['push', '--set-upstream', 'origin', currentBranch]);
  }
  return true;
}

/**
 * Merge master to current branch.
 */
async function gitMergeMaster2Release () {
  const currentBranch = await getGitCurrentBranch();
  await execa('git', ['checkout', 'master']);
  await execa('git', ['pull']);
  await execa('git', ['checkout', currentBranch]);
  await execa('git', ['merge', 'master']);
  return true;
}

/**
 * Get git current branch.
 */
async function getGitCurrentBranch () {
  let currentBranch = '';
  try {
    ({ stdout: currentBranch } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' }));
  } catch (error) {
    // console.log('error:', error.message);
    ({ stdout: currentBranch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { stdio: 'pipe' }));
  }
  console.log('currentBranch:', currentBranch);
  return currentBranch;
}

/**
 * Commit current code.
 */
async function getCommit (releaseVersion = 0) {
  const { stdout: diffStdout } = await execa('git', ['diff'], { stdio: 'pipe' });
  if (diffStdout) {
    console.log('Committing changes...');
    await execa('git', ['add', '-A']);
    await execa('git', ['commit', '-m', `release: ${releaseVersion}`]);
  } else {
    console.log('No changes to commit.');
  }
  return true;
}

module.exports = {
  release,
  gitPush,
  gitMergeMaster2Release,
  getGitCurrentBranch,
  getCommit,
};
