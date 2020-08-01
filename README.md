# Project Auxilium
 [![Website](https://img.shields.io/badge/View-Website-blue)](https://covid19help.eu-gb.cf.appdomain.cloud/)

A  GitHub repository  for Call for Code.

## Contents

1. [Short description](#short-description)
1. [Full video](#full-video)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Authors](#authors)

## Short description

### What's the problem?

Due to the Covid-19 pandemic , the daily wage workers in India have lost jobs and are migrating home on foot. Government Organizations, Non- Government Organizations and some families try to help these migrants with Food, Jobs or Shelter but cannot reach them all

### How can technology help?

People offering services like food, jobs, and shelter can post their services online and the people who these need these services can find it and reach the host of the service.

### The idea

A web application that acts as an interface between the ones who want to help and the ones who need help will make it easier for both parties, as the one offering services can post it on the web application while the one who needs the service can find it on the web application.

## Full video

[![Watch the video](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/Thumbnail.png)](https://youtu.be/hSH2qF6qa40)

## Demo video

[![Watch the video](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/Demo_Thumbnail.png)](https://youtu.be/GfD0K7R8UD4)

## The architecture

![Video transcription/translation app](https://developer.ibm.com/developer/tutorials/cfc-starter-kit-speech-to-text-app-example/images/cfc-covid19-remote-education-diagram-2.png)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Long description

[More detail is available here](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/Description.md)

## Project roadmap

![Roadmap](https://github.com/malviyayash18/Project-Auxilium/blob/master/readme%20assets/Roadmap.jpg)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

node.js : https://nodejs.org/en/download/

### Start the App

Replace the redirectUri  ```redirectUri: "https://covid19help.eu-gb.cf.appdomain.cloud/app/callback"```  with ```redirectUri: "http://localhost:3000/app/callback"```

To start the server : 
``` node server.js ``` in the node.js application folder


## Live demo

You can find a running system to test at [ Auxilium ](https://covid19help.eu-gb.cf.appdomain.cloud)

## Built with

* [IBM Cloudant](https://cloud.ibm.com/catalog?search=cloudant#search_results) - The NoSQL database used
* [IBM Cloud Functions](https://cloud.ibm.com/catalog?search=cloud%20functions#search_results) - The compute platform for handing logic
* [IBM API Connect](https://cloud.ibm.com/catalog?search=api%20connect#search_results) - The web framework used

## Authors

* **Stanislaus Lasrado** - [stanislaus35](https://github.com/stanislaus35)
* **Kishan Kumar** - [Kishan-K88](https://github.com/Kishan-K88)
* **Vidhyashree B M** - [VidhyaGowda](https://github.com/VidhyaGowda)
* **Yasir Faiz Ahmed** - [PurpleBooth](https://github.com/PurpleBooth)
* **Yash Malviya** - [malviyayash18](https://github.com/malviyayash18)

See also the list of [contributors](https://github.com/Code-and-Response/Project-Sample/graphs/contributors) who participated in this project.




