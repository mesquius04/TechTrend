# Tech Trend

This project is a small demo that I used to see how MongoDB Atlas and Next.js can interact to produce real-time metrics. A natural extension of this project would be adding more complex metrics, improving the UI and, of course, collecting data from real websites and other data sources.

## Why MongoDB

MongoDB is my choice for this project because it is schema-less, which gives flexibility when collecting and storing varied or evolving data. MongoDB Atlas makes it easy to deploy and manage a cloud database with minimal setup. I also considered its integration with JS and Node.js, and libraries like Mongoose make it easy to work with. It is also especially good for handling large volumes of semi-structured and real-time data like tech trends. 

## Requirements

To run this project you need:
- npm (use `npm install` to get all the dependencies)
- MongoDB Atlas URI (place MONGODB_URI in a **.env** file in the root)

Now, you can simply run:

```bash
npm run dev
```

By default, you will find the project running on `http://localhost:3000/`. Have fun playing with it!
