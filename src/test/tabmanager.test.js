import { Manager } from 'Background/TabManager/tabmanager'
import browser from './mocks/browser'

const manager = new Manager('test_stew', browser)

test('should have storage key of "test_stew" ', () => {
  expect(manager.storageKey).toEqual('test_stew')
})

test('it should not have any storage', async () => {
  const { jwt, username, lastUpdated } = await manager.getAuth()
  expect(jwt).toBeNull()
  expect(username).toBeNull()
  expect(lastUpdated).toBeNull()
})
test('it should store authentication', async () => {
  const toAuthSave = {
    jwt: '123456',
    username: 'test',
    lastUpdated: 'today'
  }

  const { jwt, username, lastUpdated } = await manager.setAuth({ ...toAuthSave })
  expect(jwt).toBe(toAuthSave.jwt)
  expect(username).toBe(toAuthSave.username)
  expect(lastUpdated).toBe(toAuthSave.lastUpdated)
})