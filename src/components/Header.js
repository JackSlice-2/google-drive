import { QuestionMark } from '@mui/icons-material';
import CloudIcon from '@mui/icons-material/Cloud';
import { CogIcon, SearchCodeIcon, SquareStackIcon, UserIcon } from 'lucide-react';
import React from 'react'

export const HeaderLogo = () => {
  return (
    <div className='flex p-2 items-center w-100 h-10'>
         <h1 className='size-30px'>
            Dark Cloud</h1>
        <CloudIcon className='space-x-5' />
    </div>
  )
}

export const HeaderSearch = () => {
  return (
    <div className='flex items-center p-2'>
        <input type="text" 
        placeholder='Search Folders' 
        width="30px" 
        className='mr-2 p-2 border border-black-300 rounded-lg'
        for="search"
        />
        <button id="search">
        <SearchCodeIcon className='w-8 h-8 text-black' />        
        </button>
    </div>
  )
}

const Header = () => {
  return (
    <div className='flex bg-purple-800 text-black p-1 items-center'>
        <HeaderLogo />
        <HeaderSearch />
        <QuestionMark />
        <CogIcon />
        <SquareStackIcon/>
        <UserIcon />

    </div>
  )
}

export default Header