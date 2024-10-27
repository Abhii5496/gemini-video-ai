
import DOMPurify from 'dompurify'
import { FileVideoIcon } from 'lucide-react'
import { marked } from 'marked'
import React from 'react'

export const ChatCollection = ({ chatHistory }) => {
    // console.log(chatHistory)
    return (
        <div className='w-full flex flex-col gap-2'>
            {chatHistory && chatHistory.length > 0 && chatHistory.map((chat) => (
                <>
                    {chat.role == 'user' ? <div className='w-full flex justify-end'>
                        <div className='bg-muted/25 hover:bg-muted/40 py-2.5 px-2 rounded-xl w-fit'>
                            <p className={`text-sm font-medium  p-1 rounded-lg mb-2 w-fit ${chat.role == 'user' ? 'bg-green-800' : 'bg-blue-800'}`}>{chat.role}</p>
                            <div className="prose text-neutral-300 text-sm prose:w-full w-full" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(chat.parts[0].text || '')) }} />


                            {chat.parts[0]?.fileData && <p className='text-sm bg-green-500 rounded-xl flex items-center gap-1 p-1'> <FileVideoIcon size={16} />video uploaded here.</p>}
                            {/* {chat.parts[0]?.fileData && <video src={chat.parts[0]?.fileData.fileUri} className='aspect-video h-40' />} */}
                        </div></div> : <div className='bg-muted/25 hover:bg-muted/40 py-2.5 px-2 rounded-xl w-fit'>
                        <p className={`text-sm font-medium  p-1 rounded-lg mb-2 w-fit ${chat.role == 'user' ? 'bg-green-800' : 'bg-blue-800'}`}>{chat.role}</p>
                        <div className="prose prose-strong:text-neutral-300 text-neutral-300 text-sm prose:w-full w-full" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(chat.parts[0].text || '')) }} />

                    </div>}
                </>
            ))}
        </div>
    )
}
