import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="font-bold bg-gradient-to-r from-[#0c65a5] via-[#12D8FA] to-[#78e4a5] text-transparent bg-clip-text">
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
