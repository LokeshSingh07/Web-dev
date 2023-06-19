import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useSelector } from 'react-redux'
import { Player } from 'video-react'




const Upload = ({name, label, register, setValue, errors, video=false, viewData=null, editData=null}) => {

    const {course} = useSelector((state)=> state.course);
    const [selectedFile,setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData? editData : "" );


    
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles)=>{
        const file = acceptedFiles[0];
        if(file){
            previewFile(file);
            setSelectedFile(file);
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: !video
            ? {"image/*" : [".jpeg", ".jpg", ".png"] }
            : {"video/*" : [".mp4", ".mkv", ".mov"]},
        onDrop,
    });

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)
        }
    }



    useEffect(()=>{
        register(name, {required: true});
    },[register])

    useEffect(()=>{
        setValue(name, selectedFile);
    },[selectedFile, setValue])




  return (
    <div className='flex flex-col space-y-2'>
        <label htmlFor='name' className='label-style'>
            {label} 
            {!viewData && <sup className='text-pink-200'>*</sup>}
        </label>

        <div className={`
            ${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
            flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 
        `}>
            {
                previewSource ? 
                (<div className='w-full flex flex-col p-6'>
                    {!video ? 
                        (<img
                            src={previewSource}
                            alt=""
                            className='h-full w-full rounded-md object-cover'
                        />
                        ) :
                        (<Player aspectRatio='16:9' playsInline src={previewSource}/>)       
                    }

                    {!viewData && (
                        <button
                            type='button'
                            onClick={()=>{
                                setPreviewSource("")
                                setSelectedFile(null)
                                setValue(name, null)
                            }}
                        >
                            Cancel
                        </button>
                        )
                    }
                </div>) : 

                (
                    <div 
                        className='flex flex-col items-center p-6 w-full'
                        {...getRootProps()}
                    >
                        <input {...getRootProps()} ref={inputRef} className="opacity-0"/>
                        <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                            <FiUploadCloud className='text-2xl text-yellow-50'/>
                        </div>

                        <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
                            Drag and drop an {!video ? "image" : "video"}, or click to {" "}
                            <span className='font-semibold text-yellow-50'>Browse</span>
                            {" "} a file
                        </p>

                        <ul className='mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024×576</li>
                        </ul>
                    </div>
                )
            }
        </div>
        {
            errors[name] && (
                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                    {label} is required
                </span>
            )
        }

    </div>
  )
}

export default Upload