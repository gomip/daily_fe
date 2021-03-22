import {createStore} from "easy-peasy"
import {PersistConfig} from 'redux-persist/es/types'
import {persistReducer, persistStore} from "redux-persist"
import {Reducer as ReduxReducer} from 'redux'
import storage from "redux-persist/lib/storage"
import {Session, SessionModel} from "./Session/model"
import {Dictionary, DictionaryModel} from "./Dictionary/model"

export interface StoreModel {
  _persist?: {version: number, rehydrated: boolean}
  session: SessionModel
  dictionary: DictionaryModel
}

const storeModel: StoreModel = {
  session: Session,
  dictionary: Dictionary
}
const persistConfig: PersistConfig<StoreModel> = {
  key: 'root',
  storage,
  whitelist: ['session', 'dictionary'],
}

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

const persistor = persistStore(store)                                           // refresh에도 토큰값을 유지하도록 해준다
