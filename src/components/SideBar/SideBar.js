import React, {useRef, useState} from 'react'
import './index.css'

const SideBar = () => {
    // 1. home button at top
    // search
    // filter options
    // colour switching
    // 
    const [click, setClick] = useState(true);
    const clickRef = useRef();
    const fillerRef = useRef();
    const handleClick = () => {
        if(!click){
            clickRef.current.classList.add("closeSide");
            fillerRef.current.classList.add("closeFiller");
            setClick(true);
        } else {
            clickRef.current.classList.remove("closeSide");
            fillerRef.current.classList.remove("closeFiller");
            setClick(false);
        }
    }
  return (
    <>
        <div className='gear' onClick={handleClick}>
            GEAR
        </div>
        <div className='filler closeFiller' ref={fillerRef}/>
        <div className='sideContainer closeSide' ref={clickRef}>
            hi
       </div>
    </>
  )
}

export default SideBar