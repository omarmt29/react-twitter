import React from 'react'
import dateFormat from 'dateformat';

export const Cardpost = ({ tagcolor, star, date, avatar, message, username, namecolor }) => {
    return (
        <article className="flex max-w-xl flex-col items-start justify-between  bg-opacity-5 rounded-3xl p-4 border border-white/10 mb-6 hover:bg-white/20 cursor-pointer transition-all ease-in">
            <div className="flex justify-between flex-col w-full">
                <div className="relative  flex items-center gap-x-4">
                    <img src={avatar ? avatar : 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg' } alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6 flex justify-between w-full items-center">
                        <p className={`font-semibold ${namecolor}`}>
                            <a >
                                <span className="absolute inset-0"></span>
                                {username}
                            </a>
                        </p>
                        <p className="text-white/50 text-xs">{dateFormat(date, "mmmm dS, yyyy")}</p>
                    </div>
                </div>
                <div className='mt-4'>
                    <p className='text-white/80 font-normal text-sm '>{message}</p>
                </div>
                <div className='mt-4'>

                </div>

            </div>


        </article>
    )
}
