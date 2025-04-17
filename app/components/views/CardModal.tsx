'use client'

import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState, FormEvent } from 'react';
import { BoardContext, BoardContextProps } from "../BoardContext"
import { Card, useMutation, useStorage } from "@/app/liveblocks.config"
import { shallow } from "@liveblocks/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCancel, faEllipsisVertical, faTrash, faX, faXmark, faXmarkCircle, faXRay } from "@fortawesome/free-solid-svg-icons"
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons/faXmarkSquare";
import DeleteWithConfirmation from '../DeleteWithConfirmation';



export default function CardModal ()  {
    const router = useRouter()
    const params = useParams()
    const {openCard, setOpenCard} = useContext<BoardContextProps>(BoardContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false) 
    const updateCard = useMutation(({storage}, cardId, updateData) => {



        const cards = storage.get('cards').map(c => c.toObject())
        const index = cards.findIndex(c => c.id === cardId) 
        const card = storage.get('cards').get(index)
        for (let updateKey in updateData) {
            card?.set(updateKey as keyof Card, updateData[updateKey])
        }

    },[])

    const deleteCard = useMutation(({storage},id) => {

        const cards = storage.get('cards')
        const cardIndex = cards.findIndex(c => c.toObject().id === id) 
        cards.delete(cardIndex)

    },[])

    function handleDelete() {
        deleteCard(params.cardId)
        if (setOpenCard){
            setOpenCard(null)
        }
        router.push(`/boards/${params.boardId}`)
        router.back() 
    }

    useEffect(() => {
     if ( params.cardId && setOpenCard) {
        setOpenCard(params.cardId.toString())
     }
    },[params])


    const card = useStorage(root =>{ 
        return root.cards.find(c => c.id === params.cardId)
    },shallow)

    function handleNameChangeSubmit(ev: FormEvent) {
        ev.preventDefault()
        const input = (ev.target as HTMLFormElement).querySelector('input')
        if (input) {
            const newName = input.value;
            updateCard(params.cardId, {name:newName})
            setEditMode(false)

        }
    }


    function handleBackdropClick(): void {
        router.back() 
    }

    return (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-white p-4 mt-8 mx-auto rounded-md shadow-lg
            w-[calc(100vw-2rem)]
            max-w-sm"
            onClick={ev => ev.stopPropagation()}
          >
            {/* Header with buttons */}
            <div className="flex justify-between items-center">
              {editMode ? (
                <button 
                  onClick={() => setEditMode(false)}
                  className="text-gray-400 hover:text-gray-600 mb-4"
                >
                  <FontAwesomeIcon icon={faArrowLeft} size='lg' />
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode(true)}
                  className="btn flex items-center gap-2 px-4 text-gray-700 rounded-lg transition-colors"
                >
                  <span>Edit</span>
                  <FontAwesomeIcon icon={faEllipsisVertical} className="text-sm" />
                </button>
              )}
              
              <button 
                onClick={handleBackdropClick}
                className="text-gray-500 hover:text-gray-700 transition-colors mb-3"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>
            </div>
            
            {/* Content area */}
            {editMode ? (
                        <>
                            <div className="mb-8">
                            {!deleteConfirmationVisible && (  // Only show edit form when delete confirmation isn't visible
                                <>
                                <h1 className="mb-2">Edit name:</h1> 
                                <form onSubmit={handleNameChangeSubmit} className="mb-2">
                                    <input 
                                    type="text" 
                                    defaultValue={card?.name}
                                    className="w-full p-2 border rounded mb-2"
                                    /> 
                                    <button className='btn mt-2 w-full' type="submit">
                                    Save
                                    </button>    
                                </form>
                                </>
                            )}
                            <DeleteWithConfirmation 
                                onVisibilityChange={setDeleteConfirmationVisible}
                                onDelete={handleDelete}
                            /> 
                            </div>
                        </>
                        ) : (
                        <div className="text-center">
                            <h4 className="text-lg font-medium">{card?.name}</h4>
                        </div>
            )}
          </div>
        </div>
      )
    }