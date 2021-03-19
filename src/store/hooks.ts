import {createTypedHooks} from 'easy-peasy'
import {StoreModel} from "./index"

// 모델을 helper (createTypedHooks)에 제공한다.
const {useStoreActions, useStoreState, useStoreDispatch, useStore} = createTypedHooks<StoreModel>()

// typed hooks를 내보낸다.
export {useStoreActions, useStoreState, useStoreDispatch, useStore}
