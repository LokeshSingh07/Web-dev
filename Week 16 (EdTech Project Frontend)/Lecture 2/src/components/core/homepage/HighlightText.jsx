import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="font-bold bg-gradient-to-r from-[#0c65a5] via-[#12D8FA] to-[#78e4a5] inline-block text-transparent bg-clip-text px-2">
        {text}
    </span>
  )
}

export default HighlightText
