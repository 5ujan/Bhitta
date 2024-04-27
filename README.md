# Bhitta 
## Your thoughts for the world to hear

## Features 
- image upload, user authentication with google
- write, edit, post blogs for everyone to see
- edit easily in a intuitive and clean manner with editorjs
- continue where you left off while editing
- leave comments on posts you like
- filter by tags

## How to build and run 
```git clone https://github.com/5ujan/Bhitta.git```  
 ```
cd Bhitta
npm install
npm run dev
```
in another terminal
 ```
cd backend    
npm run dev
 ```

## prerequisites
- you'll need a dotenv file with necessary api keys
```
MONGO_URI = your-mongo-uri
PORT = 6173

CLIENT_ID = <google client id>
CLIENT_SECRET = <google client secret> 

SESSION_SECRET = <choose session id >
JWT_SECRET = <a strong jwt secret>

CLOUDINARY_CLOUD_NAME = <get cloudinary api keys>
CLOUDINARY_API_KEY = <for your project>
CLOUDINARY_API_SECRET = <for free from cloudinary.com>
