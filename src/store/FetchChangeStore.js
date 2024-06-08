import {makeAutoObservable} from "mobx";

export default class FetchChangeStore {
  constructor() {
    this._isChanged = false
    this._isHistoryChanged = false
    this._isOtherChanged = false
    makeAutoObservable(this)
  }

  toggleIsChanged() {
    this._isChanged = !this._isChanged;
  }

  toggleIsHistoryChanged() {
    this._isHistoryChanged = !this._isHistoryChanged;
  }

  toggleIsOtherChanged() {
    this._isOtherChanged = !this._isOtherChanged;
  }

  get isChanged() {
    return this._isChanged
  }

  get isHistoryChanged() {
    return this._isHistoryChanged
  }

  get isOtherChanged() {
    return this._isOtherChanged
  }
}