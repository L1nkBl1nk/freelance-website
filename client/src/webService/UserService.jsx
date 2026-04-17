import {makeAutoObservable} from 'mobx'

export default class UserService{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._profileImg = null
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setProfileImg(img){
        this._profileImg = img
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get profileImg(){
        return this._profileImg
    }
}