import React from 'react';
import { Reorder } from 'framer-motion';
import LinkItem from '../link-item/LinkItem';
import { useDispatch } from 'react-redux';
import { setLocalLinks } from '../../redux/features/linksSlice';
import { options } from '../../utils/constants';
const LinksList = ({ links })=>{
    const dispatch = useDispatch();
    return (
        <div className='mt-4 px-0 py-[10px] text-neutral-500 h-[500px] overflow-auto'>
            <Reorder.Group values={links} onReorder={(newOrderedItems)=>{
                dispatch(setLocalLinks(newOrderedItems))
            }}>
                {
                    links.map((item, index)=>{
                        return (
                        <Reorder.Item key={item._id} value={item}>
                            <LinkItem 
                            {...item}
                            options={options}
                            index={index}
                            links={links}
                            />
                        </Reorder.Item>)
                    })
                }
            </Reorder.Group>
        </div>
    )
}

export default LinksList;