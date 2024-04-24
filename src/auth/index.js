import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider,signInWithRedirect , signInWithPopup, onAuthStateChanged, getAuth } from 'firebase/auth'
import {firebaseConfig} from './config'
import { readable } from 'svelte/store';



const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const userMapper = claims => ({
  id: claims.user_id,
  name: claims.name,
  email: claims.email,
  picture: claims.picture
})


export const initAuth = ( useRedirect = false) => {
  const loginWithGoogle = () =>{
    if(useRedirect){
      return signInWithRedirect(auth,provider)
    }else{
      return signInWithPopup(auth,provider)
    }
  }


  const user = readable(null, (set)=>{
    
    const unsub = onAuthStateChanged(auth, async fireUser =>{
      if(fireUser){
        const token = await fireUser.getIdTokenResult()
        const user = {...token.claims}
        set(user)
      }else{
        set(null)
      }
    })
    return unsub
  })

  return {
    user,
    loginWithGoogle
  }
}