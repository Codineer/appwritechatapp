import React, { useEffect, useState } from 'react'
import { ID, Query, Role, Permission } from 'appwrite'
import { Trash2 } from 'react-feather'
import { COLLECTION_ID_MESSAGES, DATABASE_ID, databases } from '../appwriteConfig'

import client from '../appwriteConfig'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'
const Room = () => {
    const { user } = useAuth()

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState("")
    useEffect(() => {
        getMessages()
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            console.log(response)
            const event_type = response.events[1].split('.').slice(-1)[0]
            if (event_type === 'create') {
                setMessages(messages => [response.payload, ...messages])
            }
            if (event_type === 'delete') {
                setMessages(messages => messages.filter(msg => msg.$id !== response.payload.$id))
            }

        });
        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id))
        ]
        let response = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload, permissions)

        // setMessages(messages => [response, ...messages])
        setMessageBody('')
    }
    const deleteMessage = async (message_id) => {
        try {
            const result = await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID_MESSAGES,
                message_id
            );

        }
        catch {
            console.log('cant delete permission denied')
        }

        // setMessages(messages.filter(msg => msg.$id !== message_id))

    }

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt')
            ]
        );

        setMessages(response.documents)
    }
    return (
        <main className='container'>
            <Header />
            <div className='room--container'>
                <form onSubmit={handleSubmit} id='message--form'>
                    <div>
                        <textarea required
                            maxLength={1000}
                            value={messageBody}
                            placeholder='Say something...'
                            onChange={(e) => setMessageBody(e.target.value)}

                        ></textarea>
                        <div className='send-btn--wrapper'>
                            <input className='btn btn--secondary' type="submit" value={'Send'} />
                        </div>
                    </div>
                </form>
                <div>
                    {
                        messages.map((message, index) => <div key={message.$id} className='message--wrapper'>
                            <div className='message--header'>
                                <p>
                                    {message?.username ? (<span>{message.username}</span>) : <span>Anonymous user</span>}
                                    <small className='message-timestamp'>
                                        {new Date(message.$createdAt).toLocaleString()}
                                    </small>
                                </p>
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) &&
                                    <Trash2 className='delete--btn' onClick={() => { deleteMessage(message.$id) }} />}
                            </div>
                            <div className='message--body'>
                                {message.body}

                            </div>
                        </div>)
                    }
                </div>
            </div>
        </main>
    )
}

export default Room
