import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._role = ''
    this._employess = []
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setUser(user) {
    this._user = user
  }

  setRole(role) {
    this._role = role
  }

  setEmployees(employees) {
    this._employess = employees
  }

  addEmployee(employee) {
    this._employess.push(employee)
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get role() {
    return this._role
  }

  get employees() {
    return this._employess
  }
}