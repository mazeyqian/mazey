/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const _resolve = (_path) => path.resolve(__dirname, _path);
const format = require('date-fns/format');
const toc = require('markdown-toc');
const fs = require('fs');
// Generate version: 20210308.072903
const genVersion = () => {
  const d = new Date();
  const version = format(d, 'yyyyMMdd.HHmmss');
  return version;
};
const version = genVersion();

const generateToc = () => {
  console.log('Generating Table of Contents...');
  const RMFilePath = _resolve('../README.md');
  // https://melvingeorge.me/blog/get-all-the-contents-from-file-as-string-nodejs
  console.log('running...');
  const buffer = fs.readFileSync(RMFilePath);
  const fileContent = buffer.toString();
  // https://github.com/jonschlinkert/markdown-toc
  const removeUnnecessaryHeadings = (str) => {
    return ![
      'mazey',
      'Install',
      'Usage',
      'Contributing',
      'License',
      'API Examples',
    ].some(v => {
      return str.includes(v);
    });
  };
  let tocContent = toc(fileContent, {
    filter: removeUnnecessaryHeadings,
    bullets: ['-', '*'],
  }).content;
  tocContent = tocContent.replace(/[ ]{4}/gm, '');
  tocContent = '<!-- toc - begin -->\n' + '- Generated with ❤️\n' + tocContent;
  tocContent = tocContent + '\n<!-- toc - end -->';
  // console.log(tocContent);
  // Insert to file.
  // https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
  let newFileContent = fileContent;
  // https://stackoverflow.com/questions/1979884/how-to-use-javascript-regex-over-multiple-lines
  newFileContent = newFileContent.replace(/<!-- toc - begin -->[\s\S]*<!-- toc - end -->/gm, tocContent);
  // console.log(newFileContent);
  console.log('running...');
  fs.writeFileSync(RMFilePath, newFileContent);
  console.log('Generating Table of Contents is done.');
};

module.exports = {
  _resolve,
  version,
  generateToc,
};
