import { Text } from "react-native"
import { requestUserPermission,getToken } from "./firebase"
import { useEffect } from "react"

const App = () => {
  useEffect(() => {
    requestUserPermission()
    getToken()

  },[])
  return(<Text>Hello World</Text>)
}

export default App