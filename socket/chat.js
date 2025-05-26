// socket/chat.js
const Chat = require('../models/chat');
const Gift = require('../models/gift');
const User = require('../models/user');

function setupSocket(io, session) {
  io.use((socket, next) => {
    session(socket.request, {}, next);
  });

io.on('connection', (socket) => {
  console.log('⚡ A user connected with session:', socket.request.session);
    const req = socket.request;

    const user = req.user || { _id: req.session.user, isGuest: true }

   socket.on('joinRoom', ({ giftId }) => {
  console.log(`📦 User joined room for gift ${giftId}`);
      const roomName = `gift_${giftId}`;
      socket.join(roomName);
      socket.room = roomName;
    });
    
    
  // Inside socket/chat.js
socket.on('chatMessage', async ({ message, giftId }) => {
  const roomName = `gift_${giftId}`;
  const user  = req.session.user || { _id: null, isGuest: true };

  console.log('[chatMessage] User:', user);
  console.log('[chatMessage] Message:', message);

  const newMsg = new Chat({
    sender: user._id,
    isGuest: user.isGuest,
    gift: giftId,
    message,
    timestamp: new Date()
  });

  try {
    await newMsg.save();
    console.log('Message saved:', newMsg);
  } catch (err) {
    console.error('Error saving message:', err);
  }

  let senderName = 'Guest';
  let senderRole = 'Guest';
  let senderId = null;

  if (user._id) {
    const userData = await User.findById(user._id);
    const gift = await Gift.findById(giftId);
    senderName = userData?.name || 'User';
    senderRole = gift?.sellerID?.toString() === user._id.toString() ? 'Seller' : 'Buyer';
    senderId = user._id.toString();
  }

  io.to(roomName).emit('message', {
    senderName,
    senderId,
    senderRole,
    message,
    timestamp: newMsg.timestamp
  });
});

    socket.on('disconnect', () => {
      if (socket.room) socket.leave(socket.room);
    });
  });
}

module.exports = { setupSocket };
