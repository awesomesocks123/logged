import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import {Doc} from "yjs"
import {EditorContent, useEditor} from '@tiptap/react'
import {Placeholder} from "@tiptap/extension-placeholder"
import {StarterKit} from "@tiptap/starter-kit"
import {Collaboration} from "@tiptap/extension-collaboration"
import {CollaborationCursor} from "@tiptap/extension-collaboration-cursor"
import { useSelf } from '../liveblocks.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faList, faUnderline } from '@fortawesome/free-solid-svg-icons';

type EditorProps = {
    doc: Doc;
    provider: LiveblocksYjsProvider; 
    cardId: string; 
}


export default function DescriptionEditor({doc,provider,cardId}: EditorProps) {
    const userInfo = useSelf(me =>me.info)
    if (!userInfo) {
        return
    }
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc list-outside pl-5",
                    },
                },
            }),
            Placeholder.configure({
                emptyEditorClass: 'is-editor-empty',
                placeholder: 'Task description...'
            }),
            Collaboration.configure({
                document: doc,
                field: cardId,

            }),
            CollaborationCursor.configure({
                provider, 
                user: userInfo,

            })

        ]
        
    })
    return (
        <div>
            <div className='flex gap-1 mb-1'>
                <button 
                    className='shadow bg-white rounded-md py-1 px-2 text-sm' 
                    onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <FontAwesomeIcon icon={faBold}/> 
                </button>
                <button 
                    className='shadow bg-white rounded-md py-1 px-2 text-sm'
                    onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <FontAwesomeIcon icon={faItalic}/> 
                </button>
                <button 
                    className='shadow bg-white rounded-md py-1 px-2 text-sm'
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                    <FontAwesomeIcon icon={faList}/> 
                </button>

            </div>
            <EditorContent editor={editor} className='border rounded-md p-2'/>

        </div>
    )

}