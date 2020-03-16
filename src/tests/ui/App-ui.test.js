import 'regenerator-runtime/runtime'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import App from '../../App'
const { act } = TestRenderer

// Declare stubs for contract, walletConnection, and nearConfig
const contract = {
  account: {
    connection: {},
    accountId: 'test.near'
  },
  contractId: 'test.near',
  getMessages: () => new Promise(() => {}),
  addMessage: () => ''
}
const walletConnection = {
  requestSignIn: () => null,
  signOut: () => null,
  isSignedIn: () => false,
  getAccountId: () => 'test.near'
}
const nearConfig = {
  networkId: 'default',
  nodeUrl: 'https://rpc.nearprotocol.com',
  contractName: 'test.near',
  walletUrl: 'https://wallet.nearprotocol.com',
  helperUrl: 'https://near-contract-helper.onrender.com'
}

// For UI tests, use pattern from: https://reactjs.org/docs/test-renderer.html
let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders with proper title', () => {
  let testRenderer

  act(() => {
    testRenderer = TestRenderer.create(
      <App contract={contract} wallet={walletConnection} nearConfig={nearConfig} />
    )
  })

  const pageJson = testRenderer.toJSON()
  // When the DOM is rendered, the h1 tag exists at a particular location
  // Confirm the h1 tag (title) has loaded and is what we expect
  const titleTag = pageJson.children[0].children[0].children[0]
  expect(titleTag).toBe('NEAR Guest Book')
})
