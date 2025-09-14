// src/components/LiveChat.tsx

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'kos' | 'investor' | 'admin';
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatRoom {
  id: string;
  participants: {
    id: string;
    name: string;
    type: 'kos' | 'investor';
    avatar?: string;
    isOnline: boolean;
  }[];
  lastMessage?: Message;
  unreadCount: number;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [currentUser] = useState({
    id: 'user-1',
    name: 'Demo User',
    type: 'investor' as const
  });

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: 'chat-1',
      participants: [
        { id: 'user-1', name: 'Demo User', type: 'investor', isOnline: true },
        { id: 'kos-1', name: 'TechStart MMC', type: 'kos', isOnline: true }
      ],
      unreadCount: 2
    },
    {
      id: 'chat-2',
      participants: [
        { id: 'user-1', name: 'Demo User', type: 'investor', isOnline: true },
        { id: 'kos-2', name: 'GreenTech Solutions', type: 'kos', isOnline: false }
      ],
      unreadCount: 0
    },
    {
      id: 'chat-3',
      participants: [
        { id: 'user-1', name: 'Demo User', type: 'investor', isOnline: true },
        { id: 'kos-3', name: 'AgroInnovate', type: 'kos', isOnline: true }
      ],
      unreadCount: 1
    }
  ]);

  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>({
    'chat-1': [
      {
        id: 'msg-1',
        senderId: 'kos-1',
        senderName: 'TechStart MMC',
        senderType: 'kos',
        content: 'Salam! Bizim AI layihəmiz barədə əlavə məlumat almaq istəyirsiniz?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: false
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        senderName: 'Demo User',
        senderType: 'investor',
        content: 'Salam! Bəli, çox maraqlanıram. Hansı mərhələdəsiniz?',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'kos-1',
        senderName: 'TechStart MMC',
        senderType: 'kos',
        content: 'Hazırda MVP mərhələsindəyik. 150,000 manat investisiya axtarırıq. Biznes planımızı göndərə bilərəm?',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isRead: false
      }
    ],
    'chat-2': [
      {
        id: 'msg-4',
        senderId: 'kos-2',
        senderName: 'GreenTech Solutions',
        senderType: 'kos',
        content: 'Ekoloji layihəmiz üçün əməkdaşlıq etmək istəyirsiniz?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true
      }
    ],
    'chat-3': [
      {
        id: 'msg-5',
        senderId: 'kos-3',
        senderName: 'AgroInnovate',
        senderType: 'kos',
        content: 'Kənd təsərrüfatında IoT həllərini müzakirə edə bilərik?',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isRead: false
      }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState<{ [chatId: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  // Simulate typing indicators and new messages
  useEffect(() => {
    const intervals: number[] = [];
    
    // Simulate random typing
    chatRooms.forEach(room => {
      const interval = setInterval(() => {
        if (Math.random() > 0.95) {
          setIsTyping(prev => ({ ...prev, [room.id]: true }));
          setTimeout(() => {
            setIsTyping(prev => ({ ...prev, [room.id]: false }));
          }, 2000);
        }
      }, 3000);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [chatRooms]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderType: currentUser.type,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: true
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), message]
    }));

    setNewMessage('');

    // Simulate response after 2-4 seconds
    setTimeout(() => {
      const otherParticipant = chatRooms
        .find(room => room.id === activeChat)
        ?.participants.find(p => p.id !== currentUser.id);

      if (otherParticipant) {
        const responses = [
          'Çox yaxşı fikir!',
          'Bu barədə daha ətraflı danışaq',
          'Biznes planı göndərirəm',
          'Sabah görüşə bilərik',
          'Başa düşdüm, məlumat üçün təşəkkür',
          'Bu bizim üçün maraqlıdır'
        ];

        const response: Message = {
          id: `msg-${Date.now()}-response`,
          senderId: otherParticipant.id,
          senderName: otherParticipant.name,
          senderType: otherParticipant.type,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          isRead: false
        };

        setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), response]
        }));

        // Update unread count if chat is not active
        if (activeChat !== activeChat) {
          setChatRooms(prev => prev.map(room => 
            room.id === activeChat 
              ? { ...room, unreadCount: room.unreadCount + 1 }
              : room
          ));
        }
      }
    }, Math.random() * 2000 + 2000);
  };

  const openChat = (chatId: string) => {
    setActiveChat(chatId);
    // Mark messages as read
    setChatRooms(prev => prev.map(room => 
      room.id === chatId ? { ...room, unreadCount: 0 } : room
    ));
  };

  const getTotalUnreadCount = () => {
    return chatRooms.reduce((total, room) => total + room.unreadCount, 0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('az-AZ', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getOtherParticipant = (room: ChatRoom) => {
    return room.participants.find(p => p.id !== currentUser.id);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-black p-4 rounded-full shadow-lg z-50 hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L1 23l6.65-2.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10zm0 18c-1.1 0-2.18-.25-3.15-.72L4 20l.72-4.85C4.25 14.18 4 13.1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          {getTotalUnreadCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalUnreadCount()}
            </span>
          )}
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-primary text-black p-4 flex justify-between items-center">
              <h3 className="font-semibold">💬 Canlı Söhbət</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            {activeChat ? (
              /* Active Chat View */
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveChat(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ←
                    </button>
                    <div>
                      {(() => {
                        const participant = getOtherParticipant(chatRooms.find(r => r.id === activeChat)!);
                        return (
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${participant?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <span className="font-medium text-sm text-gray-800">{participant?.name}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages[activeChat]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.senderId === currentUser.id
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === currentUser.id ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping[activeChat] && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Mesaj yazın..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat List View */
              <div className="flex-1 overflow-y-auto">
                {chatRooms.map((room) => {
                  const otherParticipant = getOtherParticipant(room);
                  return (
                    <div
                      key={room.id}
                      onClick={() => openChat(room.id)}
                      className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-medium">
                                {otherParticipant?.name.charAt(0)}
                              </span>
                            </div>
                            {otherParticipant?.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{otherParticipant?.name}</p>
                            <p className="text-xs text-gray-500">
                              {otherParticipant?.type === 'kos' ? 'KOS' : 'İnvestor'}
                            </p>
                          </div>
                        </div>
                        {room.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;