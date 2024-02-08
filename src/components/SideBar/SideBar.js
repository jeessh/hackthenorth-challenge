import React, {useRef, useState} from 'react'
import './index.css'

const SideBar = () => {
    // 1. home button at top
    // search
    // filter options
    // colour switching
    // 
    const [click, setClick] = useState(false);
    const clickRef = useRef();
    const handleClick = () => {
        if(!click){
            clickRef.current.classList.add("closeSide");
            setClick(true);
        } else {
            clickRef.current.classList.remove("closeSide");
            setClick(false);
        }
    }
  return (
    <>
        <div className='gear' onClick={handleClick}>
            GEAR
        </div>
        <div className='sideContainer' ref={clickRef}>
            hey
       </div>
    </>
  )
}

export default SideBar