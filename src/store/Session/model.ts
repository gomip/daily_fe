import {action, Action, actionOn, ActionOn, State, TargetResolver} from "easy-peasy"
import * as jwt from "jsonwebtoken"
import {StoreModel} from "../index"

export interface Session {
  readonly token: string
  readonly userId: string
  readonly email: string
  readonly iss: string
  readonly exp: number
  readonly iat: number
}

export interface SessionModel {
  session?: Session
  setSession: Action<SessionModel, string>
  removeSession: Action<SessionModel, any>
}

export const Session: SessionModel = {
  session: undefined,
  setSession: action((state, payload) => {
    try {
      const decoded = jwt.decode(payload)
      if (decoded === null || typeof decoded === 'string') {
        console.log('decoded' , decoded)
        throw new Error('JWT is wrong')
      }
      console.log('decoded' , decoded)
      state.session = {
        token: payload,
        userId: decoded.userId,
        email: decoded.email,
        iss: decoded.iss,
        exp: decoded.exp,
        iat: decoded.iat,
      }
    } catch (e) {
      console.log('Error occured while setting session', e)
    }
  }),
  removeSession: action((state) => {
    state.session = undefined
    setTimeout(() => {
      window.location.reload()
    }, 500)
  })
}
export const isValidSession = (session?: Session) => session && (session.exp * 1000 > Date.now())
// eslint-disable-next-line @typescript-eslint/ban-types
export type OnRemoveSession<T extends object> = ActionOn<T, StoreModel>
// eslint-disable-next-line @typescript-eslint/ban-types
export function onRemoveSessionCreator<T extends object>(handler: (state: State<T>) => void): ActionOn<T, StoreModel> {
  return actionOn<T, StoreModel, TargetResolver<T, StoreModel>>((actions, storeActions) => storeActions.session.removeSession, handler)
}
