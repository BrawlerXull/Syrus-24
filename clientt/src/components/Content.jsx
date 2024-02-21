import React from 'react'

function Content() {
  // const [isActive, setIsActive] = useState(false);

  // const handleClick = () => {
  //   setIsActive(!isActive);
  // };
  return (
    <div className='text-white pb-6'>
        <div className=' w-64 '>
          <ul className=' flex justify-between text-l text font-bold gap-4 '>
            <li className=' hover:bg-gray-700 p-1 pl-4 pr-4 border rounded-lg  focus:border-blue-500' >All</li>
            <li className=' hover:bg-gray-700 p-1 pl-4 pr-4 border rounded-lg' >Gaming</li>
            <li className=' hover:bg-gray-700 p-1 pl-4 pr-4 border rounded-lg' >music</li>
            <li className=' hover:bg-gray-700 p-1 pl-4 pr-4 border rounded-lg' >Art</li>
            <li className=' hover:bg-gray-700 p-1 pl-4 pr-4 border rounded-lg' >latest</li>


          </ul>
          
        </div>
        <div className=' w-[100%] rounded-3xl h-[30rem] flex  justify-center gap-20  items-center bg-gradient-to-r from-stone-200 via-red-300 to-purple-400 p-4 mt-7'>
          
          <img className='  h-[80%] rounded-xl'
              src="https://ipfs.raribleuserdata.com/ipfs/QmWDaKHqbovJaCQZYFtwL8q4kT3HatSCW9yr4e9tfW8opd/Ataraxia_large.jpg">            
          </img>
          <div className=' w-[25rem]'>
            <h1 className=' font-bold text-4xl text-black pb-4'>ForbesWeb3 x Rarible - Drops</h1>
            <p className=' text-gray-900'>Introducing 10 Open Edition drops from the top ten finalists of the ForbesWeb3 x Rarible Art Contest, selected from over 2,600 submissions. These winning artworks are minting on RARI Chain exclusively on Rarible. </p>
          </div>
        </div>

    </div>
  )
}

export default Content