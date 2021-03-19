import {createStore} from "easy-peasy"
import {PersistConfig} from 'redux-persist/es/types'
import {persistReducer} from 'redux-persist'
import {Reducer as ReduxReducer} from 'redux'
import storage from "redux-persist/lib/storage"
import {Session, SessionModel} from "./Session/model"

export interface StoreModel {
  _persist?: {version: number, rehydrated: boolean}
  session: SessionModel
}

const storeModel: StoreModel = {
  session: Session
}
const persistConfig: PersistConfig<StoreModel> = {
  key: 'root',
  storage,
  whitelist: ['session', 'dictionary', 'visitedBld'],
}
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['session']
// }

export const store = createStore(storeModel,{
  middleware: [(api) => (next) => (action) => {
    if (action.type === '@action.session.removeSession') {
      persistConfig.storage.removeItem('persist:root')

      setTimeout(() => {
        window.location.reload()
      }, 300)
    }
    return next(action)
  }],
  reducerEnhancer: (reducer: ReduxReducer<any, any>) => persistReducer(persistConfig, reducer),
})
