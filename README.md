# 🎁 Giftzy - SIT725 Group Project

Giftzy is a web application built using **Node.js** that provides smart solutions for **gift recommendation**, **event planning**, and **event marking**. It is designed to assist users in making thoughtful and timely decisions for various events and special occasions.

The student ID should show 224350062 


---

## 🐳 Docker Instructions

### 🔧 How to Build the Image

In your terminal, navigate to the root of this project and run with ENV items that are provided in the submission pdf:

Below is the line that put be run with the env values to be plugged into the "" placeholders as such "<Include value>":
```bash
docker build -t giftzy .
docker run -p 3000:3000  -e GOOGLE_CLIENT_ID=""  -e GOOGLE_CLIENT_SECRET="" -e JWT_SECRET="" -e MONGO_URI=mongodb://localhost:27017/ -e SESSION_SECRET="" giftzy


