/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// Github Helper
const execa = require('execa');
const { generateToc } = require('./build-helper');

/**
 * Release this project with version by `process.env.VERSION` or `package.json`.
 * 
 * Usage:
 * 
 * ```
 * const pkgVersion = process.env.VERSION || require('../package.json').version;
 * release(pkgVersion);
 * ```
 * 
 * It will be more straightforward if you use the development dependence CrossEnv.
 * 
 * ```
 * # Install
 * npm i cross-env -D
 * 
 * # scripts
 * cross-env SCRIPTS_NPM_PACKAGE_VERSION=$npm_package_version node ./scripts/release.js
 * 
 * # release.js
 * release();
 * ```
 * 
 * @param {string} ver Version
 * @returns {void}
 */
async function release (ver, { canGenerateToc = true } = {}) {
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
  // Generating Table of Contents
  if (canGenerateToc) {
    generateToc();
  }
  // Commit
  await gitCommit('stage');
  // Marge
  await gitMergeMaster2Release();
  // Build
  await execa('npm', ['run', 'preview']);
  await execa('npm', ['publish']);
  // Commit Again
  await gitCommit(releaseVersion);
  // Push
  console.log('Pushing to GitHub...');
  await execa('git', ['tag', '-a', `${releaseVersion}`, '-m', `Release ${releaseVersion}`]);
  await execa('git', ['push', 'origin', `refs/tags/${releaseVersion}`]);
  await gitPush();
  console.log('All done.');
}

/**
 * Push code.
 */
async function gitPush () {
  try {
    await execa('git', ['push'], { stdio: 'pipe' });
  } catch (error) {
    console.log('Error:', error.message);
    const { stdout: currentBranch } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' });
    console.log(`Current Branch: ${currentBranch}`);
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
    ({ stdout: currentBranch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { stdio: 'pipe' }));
  }
  console.log(`Current Branch: ${currentBranch}`);
  return currentBranch;
}

/**
 * Commit current code.
 */
async function gitCommit (releaseVersion = 0) {
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
  gitCommit,
};
