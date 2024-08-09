import {useEffect} from "react";

const Main = () => {
  useEffect(() => {
    console.log("it is components Mains")
  }, [])

  return (
    <div>
      haha lox, it is components Main
    </div>
  )
}

export default Main