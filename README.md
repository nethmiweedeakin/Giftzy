# 🎁 Giftzy - SIT725 Group Project

Giftzy is a web application built using **Node.js** that provides smart solutions for **gift recommendation**, **event planning**, and **event marking**. It is designed to assist users in making thoughtful and timely decisions for various events and special occasions.

## 💡 Project Features

- 🎁 Intelligent Gift Recommendations
- 📅 Event Planning Assistant
- 🌍 Gift Ideas Community
- ✅ Event Marking and Tracking System
- 🔐 User Authentication and Role Management

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS (Embedded JavaScript) Templates
- **Database**: MongoDB
- **Authentication**: JWT / Cookie-based sessions

## 👨‍👩‍👧‍👦 Team Members

| Name             | Student ID |
| ---------------- | ---------- |
| Tsz Hin Yee      | 223983938  |
| Cynthia Wijaya   | 225138694  |
| My Chi Nguyen    | 225255856  |
| Nethmi Weeraman  | 224350062  |
| Janaki Chaudhary | 224941505  |

## API Documentation
/api/users
- `GET` : Get all users

/api/users/google
- `GET` : Authenticate user login by Google

/api/users/login
- `POST` : User login

/api/users/forget-password
- `POST` : user forget password

/api/posts/addpost
- `POST` : Upload new Post

## 🚀 Gift Marketplace APIs
## 🚀 Users can log in as guest, seller, or buyer and have exchange of goods in this market
/gifts
- `GET` : Get all gifts

/gifts/:id
- `GET` : Get gift by ID

/gifts/:id/reviews
- `GET` : Get gift with populated reviews

/gifts/add
- `POST` : Add a new gift

/gifts/:id
- `PUT` : Update gift by ID

/gifts/:id
- `DELETE` : Delete gift by ID

/gifts/category/:category
- `GET` : Get gifts by category

/gifts/price
- `GET` : Get gifts in price range (query: ?min=xx&max=xx)

/gifts/available/:availability
- `GET` : Get gifts with availability >= given value

/gifts/date
- `GET` : Get gifts between created dates (query: ?start=yyyy-mm-dd&end=yyyy-mm-dd)

/gifts/search
- `GET` : Search gifts by name (query: ?name=string)

/gifts/seller/:sellerID
- `GET` : Get gifts by seller ID

/gifts/rating/:rating
- `GET` : Get gifts with rating >= given value

## Example gift schema
{
  "_id": "66447990e64b8a92e2df673b",
  "name": "Magic Puzzle",
  "description": "A challenging 1000-piece puzzle.",
  "price": 25.99,
  "availability": 10,
  "inCartUsers": [
    "663eabc123def456ghi789jk",  
    "663efff111aaa222bbb333cc"   
  ],
  "category": "Toys",
  "sellerName": "Jane Doe",
  "sellerEmail": "jane@example.com"
  "reviews": [
    {
      "userId": {
        "_id": "123",
        "name": "Alice"
      },
      "rating": 4,
      "comment": "Loved it!"
    }
  ]
}


## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or on the cloud

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cynthiawjy135/WebProjectSIT725.git
   cd giftzy
   ```

2. Run the install script:

```
npm install
```

3. Make sure to create a .env file with the necessary environment variables:
   Please refer to the .env.example

```
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. To run the project, use this command:
```
npm run start
```

5. Open your web broswer at

```
http://localhost:3000
```
