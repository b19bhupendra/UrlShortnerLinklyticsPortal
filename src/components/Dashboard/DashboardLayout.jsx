import React, { useState } from 'react'
import Graph from './Graph'
import { dummyData } from '../../dummyData/Data'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'

export const DashboardLayout = () => {

  const refetch = false;
  //Custom hook that will give us token from the global state
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);// this is a state that keeps track of whether the shorten URL popup is open or not, default is false

  //Now creating function that will handel error if any occurs during the data fetching process
  function onError(){
    console.log("Error occurred while fetching total clicks data");
  }

  // console.log(useFetchTotalClicks(token, onError));
  const { isLoading: loader, data: totalClicks = [] } = useFetchTotalClicks(token, onError)

  return (
    <div className='lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]'>
      {loader ? (
        <p>Loading....</p>
      ): (
       <div className='lg:w-[90%] w-full mx-auto py-16'>
          <div className='h-96 relative '>
            {totalClicks.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            <Graph graphData={ totalClicks } />
          </div>
          <div className='py-5 sm: text-end text-center'>
            {/* Additional dashboard content can go here */}
            <button className='bg-custom-gradient px-4 py-2 rounded-md text-white'
              onClick={()=> setShortenPopUp(true)}>
              Create a new short URL
            </button>
          </div>
       </div>   
      )}
      {/* importing shorten popup component*/}
      <ShortenPopUp
        refetch={refetch} // refetch is a flag that tells whether to refetch data after creating a new short URL or not
        open={shortenPopUp} // open is a boolean that tells whether the shorten URL popup is open or not
        setOpen = {setShortenPopUp} // setOpen is a function that sets the state of shortenPopUp
      />

    </div>
    
  )
}

export default DashboardLayout

