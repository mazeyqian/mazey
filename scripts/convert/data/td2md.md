Custom console printing (`console`).

Usage:

```javascript
const myConsole = genCustomConsole('MazeyLog:');
myConsole.log('I am string.');
myConsole.info('I am boolean.', true);
myConsole.info('I am number.', 123, 456);
myConsole.info('I am object.', { a: 123, b: 456});
```

Output:

```text
MazeyLog: I am string.
MazeyLog: I am boolean. true
MazeyLog: I am number. 123 456
MazeyLog: I am object. {a: 123, b: 456}
```