# SmartSpend: Personal Finance Manager

Public URL: https://frost2k5.is-a.dev/SmartSpend
Backend API Docs: https://smartspend-h6cxb0dng5ardeef.centralindia-01.azurewebsites.net/api/docs

# Introduction

SmartSpend: A MERN Stack Based Personal Finance Manager SPA WebApp built with the intent to learn all those technologies hands on.

Lisence: [MIT](https://github.com/FrosT2k5/SmartSpend/blob/master/LISENCE.md)

This was our B.E course's 5th semester Mini Project

# Features:
- MERN Based SPA WebApp using React Router
- JWT and Secure HTTP Cookie based Authentication
- FrontEnd - Backend decoupled architecture with JSON API
- ExpressJS based backend with custom auth middleware
- Use of Mongoose ODM for mongodb data models
- Support for investment, expenses, income tracking and transaction history
- Support for multiple investment and expenses types
- Minimalistic UI (not mobile friendly for now, we built this project with intent of learning more about backend, API Integration and Secure AUTH in mind)
- Axios based API calls

# How to run
Install NodeJS, NPM and MongoDB Server for your platform/OS. Then, run the following commands install dependencies, configure and execute the webapp and backend

1. clone the FrontEnd and Backend
```
git clone https://github.com/FrosT2k5/SmartSpend.git
```
```
git clone https://github.com/FrosT2k5/SmartSpend_Backend.git
```
2. Install the requirements
```
# Install FrontEnd Dependencies
cd SmartSpend/
npm ci
```
```
# Install Backend Dependencies
cd SmartSpend_Backend/
npm ci
```
3. Setup env file (.env) in SmartSpend_Backend, sample env file [here](https://github.com/FrosT2k5/SmartSpend_Backend/blob/master/sample.env)

```
# .env file
MONGO_URI=mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
JWT_SECRET=abcdefghijklmnopqrstuvwxyz
JWT_EXPIRES_IN=6h

```

4. Run the FrontEnd
```
cd SmartSpend
npm run dev
```
5. Run the Backend
```
cd SmartSpend_Backend
npm start 
# OR, for development live backend backend changes
# npm run nodemon
```
5. Production deployment

Frontend HTTP server servable pack can be built with:
```
npm build
```
That is how the website is currently deployed at github pages.


# Preview

Wan't to check out our prehosted instance? There you go: https://frost2k5.is-a.dev/SmartSpend.

The Backend is hosted at: https://smartspend-h6cxb0dng5ardeef.centralindia-01.azurewebsites.net/api/docs

# Documentation

Our project report can be found here: [SmartSpend Report.pdf](https://raw.githubusercontent.com/FrosT2k5/SmartSpend/refs/heads/master/assets/smartspend_report.pdf)

And ppt here: [SmartSpend PPT.pdf](https://raw.githubusercontent.com/FrosT2k5/SmartSpend/refs/heads/master/assets/smartspend_ppt.pdf)

`bunch of AI slop though. We like writing code, not theory ;)`

# Credits
Made with ❤️ by [FrosT2k5](https://github.com/FrosT2k5), [Sairaj Pai](https://github.com/gegendepressed) & [Nandini Nichite](https://github.com/NandiniNichite)

