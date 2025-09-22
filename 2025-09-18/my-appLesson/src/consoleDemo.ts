console.info('This is an info message')
console.warn('This is a warning message')
console.error('This is an error message')

console.time('loop')
let sum = 0
for (let i = 0; i < 100000; i++) {
    sum += i
}
console.timeEnd('loop')
console.log('Sum result:', sum)

console.assert(2 + 2 === 5, 'Assertion failed: 2 + 2 is not equal to 5')

const users = [
    { name: 'Alice', age: 30, hobby: 'Reading' },
    { name: 'Bob', age: 25, hobby: 'Gaming' },
    { name: 'Charlie', age: 35, hobby: 'Hiking' },
]
console.table(users)

console.group('Grouped logs')
console.log('Line 1 inside group')
console.log('Line 2 inside group')
console.groupEnd()

console.groupCollapsed('Collapsed group')
console.log('Hidden until expanded')
console.groupEnd()

console.count('click')
console.count('click')
console.count('click')
