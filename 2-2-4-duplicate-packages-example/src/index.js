const packageA = require('package-a')
const packageB = require('package-b')
const _ = require('lodash')

console.log('=== Duplicate Packages Example ===\n')

// Using package-a (depends on lodash@3.x)
const fruits = ['apple', 'banana', 'cherry', 'date']
console.log('Available fruits:', fruits)
console.log('Random fruit from package-a:', packageA.getRandomItem(fruits))

// Using package-b (depends on lodash@4.x)
const debouncedLog = packageB.debounceFunction(() => {
  console.log('Debounced function called!')
}, 100)

// Using lodash directly (4.x from root)
const numbers = [1, 2, 3, 4, 5]
console.log('\nNumbers:', numbers)
console.log('Chunked (from root lodash):', _.chunk(numbers, 2))

// Call debounced function
setTimeout(() => {
  debouncedLog()
}, 150)

console.log('\n✅ All packages working!')
console.log(
  '\n💡 Run "npm ls lodash" to see duplicate lodash installations',
)
