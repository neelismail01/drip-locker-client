# Drip

## Inspiration & Description
I have always found a friend's purchase to be one of the most valuable sources of inspiration when looking to purchase new products or explore new brands. My familiarity
with a friend's tastes and quality standards always added an extra layer of credibility to product recommendations, especially when compared to
online product reviews and targeted advertisements. This inspired me to build **Drip**, a social media app that enables users to share their 
purchases with an in-app network of friends. The goal behind this app was to encourage brand discovery and inspire purchases for users by allowing them to view the purchases of a trusted network of people while offering brands a channel of organic marketing. Drip hoped to enable common people to turn into ambassadors for their favourite brands.

I faciliated the sharing of purchases by enabling users to take pictures of a recently purchased product and include brand details, product tags, and a caption before posting. By connecting to a brand autocomplete API, I was able to allow users to easily search for and include the names, logos, and websites of thousands of the most popular brands. The hope was that this would help brands maximize their presence on the app and offer a simple way for users to be directed to their websites.

I tried to encourage brand discovery and inspire purchases in this app through 4 key features: an infinite-scrolling feed, expansive search capabilities, live data on trending brands with the app's users, and a robust user profile that made all of a user's purchases easily accessible.
The feed encouraged users to randomly stumble open interesting products and brands while searching offered more precision and intention to their
discovery by enabling them to view all products purchased by their friends within a product category they are interested in. The profile allowed users browse through purchases made by friends with similar tastes while the trending tab allowed users to discover brands that are popular on the app. 

## Technologies
I built the frontend of this application with **React Native** and used **Redux** for global state management. I built a **serverless** API layer using **AWS Lambda**
functions routed through an **AWS API Gateway**. I used **AWS S3** for highly available cloud file storage and achieved persistent data storage using a **MongoDB NoSQL database**. 

## Preview

<img width="200" alt="Screen Shot 2021-11-29 at 2 08 43 AM" src="https://user-images.githubusercontent.com/23081661/143829020-0e1097c3-6b79-4e31-a1fe-099304523f85.png">&nbsp;&nbsp;&nbsp;<img width="200" alt="Screen Shot 2021-11-29 at 2 10 23 AM" src="https://user-images.githubusercontent.com/23081661/143829022-cad2e7c2-2d70-44dd-8c6d-1dc4e9ad88f6.png">&nbsp;&nbsp;&nbsp;<img width="200" alt="Screen Shot 2021-11-29 at 2 05 49 AM" src="https://user-images.githubusercontent.com/23081661/143829016-4d56cdf8-c715-4091-b48a-4cd65b093a6c.png">
