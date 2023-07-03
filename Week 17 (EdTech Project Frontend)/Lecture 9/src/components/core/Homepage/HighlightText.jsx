import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="font-bold bg-gradient-to-bl from-[#004792] via-[#00CCFF] to-[#99FFFF] text-transparent bg-clip-text">
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
