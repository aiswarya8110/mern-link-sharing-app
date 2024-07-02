import React, { useState } from 'react';
import { FaGripLines, FaLink } from 'react-icons/fa';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { deleteLink, setLocalLinks } from '../../redux/features/linksSlice';
import { isValidURL } from '../../utils/constants';
const LinkItem = ({ platform, link, options, index, links, _id })=>{
    const [platformErrorMsg, setPlatformErrorMsg ] = useState('');
    const [linkErrorMsg, setLinkErrorMsg ] = useState('');
    const dispatch = useDispatch();

    const defaultValue = options.find((item)=>{
        return item.value.toLowerCase() === platform.toLowerCase();
    })

    const updateLinks = ({ key, value, _id })=>{
        dispatch(setLocalLinks(
            links.map((item)=>{
                if(item._id === _id){
                    return {
                        ...item,
                        [key]: value
                    }
                }

                return item;
            })
        ))
    }

    return (
        <div className='p-5 bg-[#fafafa] rounded-md'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <FaGripLines className='cursor-pointer'/>
                    <span className='font-semibold'>Link #{index+1}</span>
                </div>
                <button 
                className='hover:underline'
                onClick={()=> dispatch(deleteLink(_id))}
                >Remove
                </button>
            </div>
            <form>
                <div className='my-4'>
                    <label className='text-xs'>platform</label>
                    <Select
                    defaultValue={defaultValue}
                    options={options}
                    onChange={(selected)=>{
                        setPlatformErrorMsg('');
                        const selectedValue = selected.value.toLowerCase();
                        const existingPlatform = links.find((item)=>{
                           return item.platform.toLowerCase() === selectedValue && selectedValue !== defaultValue.value.toLowerCase()
                        });

                        if(existingPlatform){
                           return setPlatformErrorMsg("selected platform already exists");
                        }

                        updateLinks({
                            _id,
                            key: 'platform',
                            value: selected.value
                        })

                    }}
                    />
                    {platformErrorMsg && <p className='error-msg text-sm'>{platformErrorMsg}</p>}
                    <div>
                        <label htmlFor="link" className='text-xs'>Link</label>
                        <div className='flex border-2 border-gray-200 rounded-[4px] p-2 bg-white'>
                            <FaLink />
                            <input
                            type='text' 
                            defaultValue={link}
                            className='border-none ml-2 font-[18px] text-[#8d8c8c] bg-white focus:outline-none w-full'
                            onChange={(e)=>{
                                setLinkErrorMsg('');
                                const url = e.target.value;
                                if(url === ''){
                                   return setLinkErrorMsg('');
                                }
                                if(isValidURL(url)){
                                  return updateLinks({
                                        _id,
                                        key: 'link',
                                        value: url,
                                    })
                                }
                                if(!isValidURL(url)){
                                   return setLinkErrorMsg('Invalid URL');
                                }
                            }}
                            />
                        </div>
                        {linkErrorMsg && <p className='error-msg text-sm'>{linkErrorMsg}</p>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LinkItem;