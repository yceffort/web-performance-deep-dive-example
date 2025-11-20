// This is a simplified example to demonstrate peerDependencies conflict
// In a real React app, you would use a bundler like webpack or vite

console.log('=== peerDependencies Conflict Example ===\n')

try {
  const React = require('react')
  const ReactDOM = require('react-dom')
  const DnD = require('react-beautiful-dnd')

  console.log('✅ React version:', React.version)
  console.log('✅ ReactDOM loaded successfully')
  console.log('✅ react-beautiful-dnd loaded successfully')
  console.log(
    '\n⚠️  Check the npm install warnings above to see peerDependencies conflicts',
  )
  console.log(
    '💡 Run "npm ls react react-dom" to see the dependency tree\n',
  )
} catch (error) {
  console.error('❌ Error loading modules:', error.message)
  console.log(
    '\n💡 This error demonstrates the peerDependencies conflict issue',
  )
}
