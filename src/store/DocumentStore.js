import {makeAutoObservable} from "mobx"

export default class DocumentStore {
  constructor() {
    this._history = []
    this._inbox = []
    makeAutoObservable(this)
  }

  setHistory(history) {
    this._history = history
  }

  setInbox(inbox) {
    this._inbox = inbox
  }

  get history() {
    return this._history
  }

  get inbox() {
    return this._inbox
  }
}