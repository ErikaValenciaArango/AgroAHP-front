import { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';

export const validContext = createContext(null)
export const useLogin = () => {
    const context = useContext(validContext)
    if (!context) throw new Error('There is no Auth provider')
    return context
  }
  export const LoginProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('login'))
        if (user) {
            setIsLogged(true)
            setUser(user?.user)
        };
      },[])
      const logOut = ()  => {
          localStorage.removeItem("login")
          setUser(null)
          setIsLogged(false)
      }
      const login = async (formData) =>{
            const data = {
                usename: formData.get('usename'),
                password: formData.get('password')
            };
            return axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_URL}/loginUser`,
                data: {
                    user_email: data.usename, //Quitar esto para un get
                    user_password: data.password
                }
            }).then(function (response) {
                localStorage.setItem("login", JSON.stringify(response.data))
                setUser(response.data.user) 
                setIsLogged(true)
            }).catch(function (error) {
                console.log(error);
            })
      }
      return(
        <validContext.Provider value={{user,isLogged, logOut, login}}>{children}</validContext.Provider>
      )
  }