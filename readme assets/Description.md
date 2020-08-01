## PROJECT AUXILIUM
Project Auxilium is aimed at connecting people who CAN HELP with the people who NEED HELP. 
 India has a staggering 22% of its people living below the poverty line. That roughly accounts to 300 million people, some of whom leave their homes and come to the big cities to find small jobs like working at construction sites or moving around the city as small scale vendors, or working odd jobs on a daily wage basis, just to make less than $2 a day; and with the Covid-19 pandemic at hand, the situation for these people, took a turn for the worse. In no time, our daily wage workers could not find jobs and with public transport shut down, they were left with only two options; Either to starve in the city or walk hundreds of miles back home. some Government Organizations, NGOs and some families strive to help the destitute by offering them food, shelter or even some small jobs. NGOs and Families usually do this by carrying food around and identifying the people in need which can be quite tricky while Government organizations make public announcements about it. But as you would’ve guessed, the word does not reach everyone. While the situation is quite similar for the migrants, there are truckers and private vehicles who want to help them by picking and dropping them en route. Once again, how do these truckers and private vehicles get in touch with those in need. To address this issue, Project Auxilium was built.
Web Application Link: https://covid19help.eu-gb.cf.appdomain.cloud/

### SECTION-1 – An example of App usage
Our first set of users (let's refer to them as users-1) are the Daily wage workers or migrants who have lost their jobs or are on the move back home. Our second set of users (let's refer to them as users-2) are the people who are willing to provide services like food, jobs, accommodation etc.
The app is aimed to be as simple as possible so that anyone can use it. There are two primary buttons on the Dashboard, the ‘Provide services’ and the ‘Need Services?’ button.
Users-2 can post the services they offer in the ‘Provide services’ section while the Users-1 can find services near them using the ‘Need Services?’ Section.
The ‘Provide services’ section will have fields to specify the service offered, description and the location of service while the ‘Need Services?’ section will list all the services in a geological order (starting from services nearest to them to the farthest). Users-1 will also be able to search for services they want. 
Note: In the ‘Recent Services Posted’ tab under the ‘Provide services’ button provides a list services the user had posted before, with an option to activate or deactivate the service.
A brief example of this can be, a user-2 can post a service in the ‘Need Services?’ section titled food and describe it as ' food is being served between 12 pm to 2 pm. Open to all daily wage workers '. This will be posted on Auxilium. A user-1 will who needs food with look at this post in the ‘Need Services?’ section and head to that location or food. 
Another example can be a migrant worker (user-1) who is on the road towards home. If a user-2 who lives somewhere near the route he's taking posts a service of Job and a description saying, I need help with packing and moving. Payment Rs. 200/-. The migrant can take up this task and earn a little out of it.


### SECTION- 2 – PROJECT DESCRIPTION 
The project is set on the COVID-19 track. Various Node.js functions were deployed on IBM Cloud Foundry to support the back-end functionality like API calls and integrated Cloudant NoSQL database with the front-end services. IBM’s APP ID was used to provide authentication to users
List of Cloud functions created
1.	HELP_NEW_POST – To post services to Database
2.	HELP_GET_POST – To get the user’s services to the database
3.	USER_DATA_UPDATE – To update the user’s data in the database
4.	GET_HELP_SEARCH_COORDINATES – To add distance parameter to the queried service
5.	HELP_DELETE_POST – To delete service from database
6.	HELP_UPDATE_POST – To update the user services in the database 

### RESULTS
FRONT END DESIGN:
 [![Watch the video](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/2020-08-01.png)

This is the Dashboard of the AUXILIUM Web Application. On Launch, you will be promoted a login for the first time which is powered by IBM APP ID. Once you login you will land on the ‘About Us’ Page as seen in the image above. You will notice the ‘Provide Services’ and the ‘Need Services?’ buttons. 
Despite the application being made simple to use, the ‘About Us’ page has instructions on how to use the Web Application.  
Our mission statement is 'To Help you Help others'. Our tag line is 'Leave a footprint of Kindness' because we believe that the ones who get helped today will help someone else another day and together, make the world a better place.

### VISUALIZING GEO-SPATIAL QUERYING IN ON CLOUDANT
 [![Watch the video](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/2020-08-01%20(1).png)

Here we are querying the geo-spatial index to return all the services around a particular user within a radius of 10 Kms. The user here is the one who is looking for the service and all the services within a 10 Km radius that matches his search criteria are displayed on the map. 

### VISUALIZATION ON THE FRONT END:
  [![Watch the video](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/2020-08-01%20(2).png)]
When a user searches for Food, he is prompted all the search results within the 10 Km radius and he can view the map to the location where the Food service is offered by clicking on the ‘view source’ button.
CONCLUSION:
Hence Project Auxilium is an aid to the needy who are affected by the Covid-19 Pandemic and it’s a clear example of how technology can change and save the lives of the poor in India, even by those who are willing to help but simply don’t know where to start. With simple Cloud based functions, one can realise interactive web applications like this and truly change the world 

