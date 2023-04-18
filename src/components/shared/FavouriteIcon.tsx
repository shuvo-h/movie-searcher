import React from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IconContext } from "react-icons";

interface FavouriteIconProp {
    updateFavourite:(id: number, cb: (list: number[])=>void)=> void,
    onMouseEnter:()=>void,
    onMouseLeave:()=>void,
    isHover:Boolean,
    isFavourite:Boolean,
    updateCallBackFn:(list: number[])=>void,
    movie_id:number,
    size: number
}

const FavouriteIcon = ({updateFavourite,onMouseEnter,onMouseLeave,isHover,isFavourite,updateCallBackFn,movie_id,size=25}:FavouriteIconProp) => {
    return (
        <span 
            className='ms-1 rounded text-cyan-300 cursor-pointer' 
            onClick={()=>updateFavourite(movie_id,updateCallBackFn)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-testid={`favourite-icon-${movie_id}`}
        >
            <IconContext.Provider value={{ color: "blue", size: size.toString(), className: "" }}>
                {
                    isHover 
                    ? <FcLike  /> 
                    : isFavourite 
                    ? <FcLike  />
                    : <FcLikePlaceholder />
                }
            </IconContext.Provider>
        </span>
    );
};

export default FavouriteIcon;