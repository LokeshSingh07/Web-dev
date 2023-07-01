import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { ControlBar, CurrentTimeDisplay, ForwardControl, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider, VolumeMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';




const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const PlayerRef = useRef();
  const {token} = useSelector((state)=> state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=> state.viewCourse);

  const [videoData, setVideoData] = useState();
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);





  const isFirstVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
    );

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }

  const isLastVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    );
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
    );

    if(currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1 ){
        return true;
    }
    else{
      return false;
    }
  }

  const goToNextVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    );
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
    );

    if(currentSubSectionIndex !== noOfSubSections - 1){
      // same section ki next video me jana hai
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      // uss video pr jao
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }
    else{
      // different section ki next video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      // ussvideo pr chale jao
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const goToPrevVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex(
      (data)=> data._id === sectionId
    );
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
      (data)=> data._id === subSectionId
    );

    if(currentSubSectionIndex !== 0){
      // same section ke prev video pr jao
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }
    else{
      // different/prev section ki last video pr jao
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength  = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleLectureCompletion = async()=>{
    // dummy code, later we will replace it with the actual call
    setLoading(true);
    const res = await markLectureAsComplete(
      {
        courseId: courseId, 
        subSectionId:subSectionId
      },
      token
    );

    if(res){
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(true);
  }


  useEffect(()=>{
    console.log(videoData);
  },[])




  useEffect(()=>{
    const setVideoSpecificDetails = async()=>{
      if(!courseSectionData.length)
        return;

      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        // let's assume ki all 3 fields are present
        const filteredData = courseSectionData.filter(
          (data)=> data._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data)=> data._id === subSectionId
        )

        setVideoData(filteredVideoData?.[0]);
        setVideoEnded(false);
      }
    }

    setVideoSpecificDetails();
  },[courseSectionData,courseEntireData, location.pathname])


  
  return (
    <div className='relative text-richblack-5'>
      {
        !videoData 
        ? (<div>No data Found</div>)
        : (
            <Player
              ref={PlayerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={()=> setVideoEnded(true)}
              src={videoData?.videoUrl}
            >


              <ControlBar>
                <ReplayControl seconds={10} order={1.0} />
                <ForwardControl seconds={30} order={1.2} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton order={7.1} />
                <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} order={7.2}/>
              </ControlBar>


              {/* <AiFillPlayCircle size={80}/> */}
              
              {
                videoEnded && (
                  <div className='absolute top-[30%] left-[30%] gap-5 z-20'>

                    <div className='flex space-x-3'>
                      {
                        !completedLectures.includes(subSectionId) && (
                          <IconBtn
                            disabled={loading}
                            onclick={()=> handleLectureCompletion()}
                            text={!loading ? "Mark as Completed" : "Loading..."}
                          />
                        )
                      }

                      <IconBtn
                        disabled={loading}
                        text="Rewatch"
                        onclick={()=> {
                          if(PlayerRef?.current){
                            PlayerRef.current?.seek(0);
                            setVideoEnded(false);
                          }
                        }}
                      />
                    </div>

                    
                    <div className='space-x-3'>
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="blackButton"
                        >
                          Prev
                        </button>
                      )}

                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="blackButton"
                        >
                          Next
                        </button>
                      )}
                    </div>

                  </div>
                )
              }


            </Player>
          )
      }


      <div className='mt-10'>
        <h2>{videoData?.title}</h2>
        <p>{videoData?.description}</p>
      </div>
    </div>
  )
}

export default VideoDetails
