import {Action, action, Actions, State, Thunk, thunk} from "easy-peasy"
import {StoreModel} from "../index"
import service from "./service"
import {SelectDictionaryOut} from "../../API"
import {OnRemoveSession, onRemoveSessionCreator} from "../Session/model"

export type Dictionary = SelectDictionaryOut

export interface DictionaryModel {
  isLoaded: boolean
  codes: SelectDictionaryOut['codes']
  setDictionary: Action<DictionaryModel, Dictionary>
  fetchDictionary: Thunk<DictionaryModel, void, void, StoreModel>
  onRemoveSession: OnRemoveSession<DictionaryModel>
}

export const Dictionary: DictionaryModel = {
  isLoaded: false,
  codes: {},
  setDictionary: action((state: State<DictionaryModel>, payload) => {
    state.isLoaded = true
    state.codes = payload.codes
  }),
  fetchDictionary: thunk(async (actions: Actions<DictionaryModel>, payload, {getStoreState}) => {
    const {session} = getStoreState().session
    if (!session) {
      throw new Error('인증이 필요합니다.')
    }
    const res = await service.getDictionary(session.token)
    console.log('res', res)
    actions.setDictionary(res.data)
  }),
  onRemoveSession: onRemoveSessionCreator<DictionaryModel>((state) => {
    state.isLoaded = false
    state.codes = {}
  }),
}
