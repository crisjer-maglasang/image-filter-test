# Getting Started with Test Assessment App

## Run the app on your local

### Clone the code from my github

Run the following command to clone the code
`git clone https://github.com/crisjer-maglasang/image-filter-test.git`

### Install the dependencies

Run the following command to install the dependencies
`npm install`

### Run the APP on your local

Run the following command to run the app on your local
`npm run start`

- Notice:
`This App uses node 22.2.0 and React 18.3.1. Any version difference my causes unexpected error so please confirm the node version and make sure that you are using same version.

## About the Project

### Technical requirements for this app

- This App is built with React(JavaScript) and TailwindCSS
- This App uses axios to fetch the data from the backend
- This App uses Redux for state management. We can use `useContext` instead since it has the simple structure but I used Redux for extendability
- You can search and filter the images by using the search input which is on the header. If you type the name of photo album, the dropdown is appeared. You can select one album and the photos which are on that album will be displayed. Because https://jsonplaceholder.typicode.com/photos API provide only album filtering for the photos, you can only filter the photos by album right now.
- The UI is fully responsive

### Bonus points

- Lazy loading and infinite scrolling is implemented to optimize the performance