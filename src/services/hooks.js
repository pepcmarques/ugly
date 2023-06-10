import * as SecureStore from "expo-secure-store";

export async function saveToSecureStore(key, value) {
  await SecureStore.setItemAsync(key, value).then();
}

export async function getFromSecureStore(key) {
  let result = await SecureStore.getItemAsync(key)

  if (result) {
    return result;
  } 
}

export async function deleteSecureStoreKey(key, options = {}) {
  let result = await SecureStore.deleteItemAsync(key, options).then()
}
