// IndexedDBService.js

const DB_NAME = 'myDatabase'
const DB_VERSION = 2 // Increment version for database upgrade
export const STORE_NAME = 'myStore'

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Create or modify object store if needed
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => {
      const db = request.result
      resolve(db)
    }

    request.onerror = () => reject(request.error)
  })
}

export const setDataToDB = (data) => {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)

        const putRequest = store.put(data)

        putRequest.onsuccess = () => {
          console.log('Data added to IndexedDB')
          document.dispatchEvent(new Event(data.id))
          resolve()
        }

        putRequest.onerror = () => reject(putRequest.error)
      })
      .catch((error) => reject(error))
  })
}

export const getDataFromDB = () => {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const getRequest = store.getAll()

        getRequest.onsuccess = () => {
          const data = getRequest.result
          resolve(data)
        }

        getRequest.onerror = () => reject(getRequest.error)
      })
      .catch((error) => reject(error))
  })
}

export const getDataByIdFromDB = (id) => {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const getRequest = store.get(id)

        getRequest.onsuccess = () => {
          const data = getRequest.result
          resolve(data)
        }

        getRequest.onerror = () => reject(getRequest.error)
      })
      .catch((error) => reject(error))
  })
}
