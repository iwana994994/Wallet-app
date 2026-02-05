import { Code2Icon, CodeIcon, DatabaseIcon, ZapIcon } from "lucide-react"
import Navigation from "./components/Navigation"

const HomePage = () => {
  return (
   <>

   <div className="flex items-center justify-between"> 
      {/* Left side*/}
   <div className="ml-50" >
          <h1 className="text-6xl font-black bg-accent bg-clip-text text-transparent ">YOUR SPECIAL</h1>
          <h2 className="text-6xl font-black bg-accent bg-clip-text text-transparent ">WALLET</h2>
          <h3 className="text-6xl font-black bg-accent bg-clip-text text-transparent ">APP</h3>


          
    </div>


  
   {/* Right Side */}
   <div className="w-full h-full  ">
 <img src="../../public/wallet.png" alt="hello" sizes="5"/>
   </div>
    </div>



</>
  )
}

export default HomePage