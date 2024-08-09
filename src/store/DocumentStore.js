import {makeAutoObservable} from "mobx"

export default class DocumentStore {
  constructor() {
    this._history = []
    this._inbox = []
    this._outbox = []
    makeAutoObservable(this)
  }

  setHistory(history) {
    this._history = history
  }

  setInbox(inbox) {
    this._inbox = inbox
  }

  setOutbox(outbox) {
    this._outbox = outbox
  }

  get history() {
    return this._history
  }

  get inbox() {
    return this._inbox
  }

  get outbox() {
    return this._outbox
  }
}