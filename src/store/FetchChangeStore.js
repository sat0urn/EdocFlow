import {makeAutoObservable} from "mobx";

export default class FetchChangeStore {
  constructor() {
    this._isChanged = false
    makeAutoObservable(this)
  }

  toggleIsChanged() {
    this._isChanged = !this._isChanged;
  }

  get isChanged() {
    return this._isChanged
  }
}