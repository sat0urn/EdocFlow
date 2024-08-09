import {makeAutoObservable} from "mobx"

export default class SearchDataStore {
  constructor() {
    this._emails = []
    makeAutoObservable(this)
  }

  setEmails(emails) {
    this._emails = emails
  }

  get emails() {
    return this._emails
  }
}