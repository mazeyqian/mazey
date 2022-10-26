/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// release
const execa = require('execa');
const pkgVersion = process.env.VERSION || require('../package.json').version;

// Main
const main = async (ver) => {
  const releaseVersion = `v${ver}`;
  const { stdout: releaseStdout } = await execa('echo', [`Start release ${releaseVersion}...`]);
  console.log(releaseStdout);
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
  await execa('git', ['push']);

  console.log('All done.');
};

main(pkgVersion);

// module.exports = {
//   main,
// };
