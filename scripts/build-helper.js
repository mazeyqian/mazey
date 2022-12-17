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
  const RMFilePath = _resolve('../README.md');
  // https://melvingeorge.me/blog/get-all-the-contents-from-file-as-string-nodejs
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
  tocContent = tocContent.replace(/[ ]{4}/gmi, '');
  tocContent = '<!-- toc - begin -->\n' + '- Generate with 2233 ❤️\n' + tocContent;
  tocContent = tocContent + '<!-- toc - end -->';

  console.log(tocContent);
  // Insert to file.
  // https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
  let newFileContent = fileContent;
  // <!-- toc - begin -->
  // <!-- toc - end -->
  newFileContent = newFileContent.replace(/<!-- toc - begin -->(.|\n)*<!-- toc - end -->/gm, tocContent);
  console.log(newFileContent);
  fs.writeFile(RMFilePath, newFileContent, 'utf8', function (err) {
    if (err) return console.log(err);
  });
};

module.exports = {
  _resolve,
  version,
  generateToc,
};
