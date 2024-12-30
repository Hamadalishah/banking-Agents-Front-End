import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/csrd"
import { ThemeToggle } from "./theme-toggle"
import { Spotlight } from "./spotlight"
import { AI_API_URL } from './config'
import { 
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem 
} from "./spotlight"

type Message = {
  type: 'user' | 'ai'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    // WebSocket connection initialize
    ws.current = new WebSocket(AI_API_URL)

    ws.current.onmessage = (event: MessageEvent) => {
      const aiMessage: Message = {
        type: 'ai',
        content: event.data
      }
      setMessages(prev => [...prev, aiMessage])
    }

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close()
      }
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() === '') return
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      return
    }

    const userMessage: Message = { type: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    
    // Send message through WebSocket
    ws.current.send(input)
    setInput('')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="flex flex-col h-screen dark:bg-gray-900">
      <header className="flex items-center justify-between p-4 bg-background border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Image src="/logo.jpeg" alt="Bank Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold dark:text-white">Banking Assistant</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Spotlight>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Check Balance</CommandItem>
                <CommandItem>Transfer Money</CommandItem>
                <CommandItem>Pay Bills</CommandItem>
              </CommandGroup>
            </CommandList>
          </Spotlight>
          <ThemeToggle />
        </div>
      </header>

      <Card className="flex-grow overflow-hidden m-4 dark:bg-gray-800">
        <CardContent className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.type === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted dark:bg-gray-700 dark:text-white'
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      <div className="p-4 border-t bg-background dark:bg-gray-900 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="dark:bg-gray-800 dark:text-white"
          />
          <Button 
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
