# JUST STREAM IT

**Version 1.1**


# Project Configuration

## Pull the project from github 
	
- After getting access to the github repository, pull the project with the following command :
	```python 	
	git clone https://github.com/MiladEzame/JustStreamIt.git
	```
## Creating a virtual environment to run the API

- Python installation is required for the following process. You can download Python on python.org.
Python3 includes venv that allows us to create a virtual environment very easily.
To make sure there is no problem in the process, you can still install the virtual environment package
using this command : 
	```python 	
	pip install virtualenv
	```
	
- To create a new virtual environment called __environment_name__, write the following command line in your windows command prompt : 
	```python
	python -m venv environment_name
	```
	
## Activate/Deactivate virtual environment

- Once you've created the virtual environment, you have to activate it.
	On __Windows__, type the following command :
	```python	
	.\environment_name\Scripts\activate
	```
	On __Unix__ or __MacOS__, type the following command:
	```python 		
	source environment_name/bin/activate
	```
	If you have any difficulties, please refer to this page : https://docs.python.org/3/tutorial/venv.html
	
	Once you are done, you can simply __deactivate__ by using the following command :
	```python 		
	deactivate
	```

## Start API

- Once you've created the virtual environment, you have to start the API by using the following command :
	```python 		
	python manage.py runserver
	```

## Run the index.html file 
	
- If you are using Visual Studio Code, you can simply run it with : 
	```python 		
	ctrl+f5
	```
-If you are using any other text editor, simply open the html file with your browser.

## Important information about the differents files/folders 

- script.js	
	Contains all the javascript code. Is called in the index.html file with the following command :
	```python 		
	<script defer src="script.js"></script>
	```
	This file contains all the event handling processes and all the data management.
	
- index.html
	This file contains the basic html code and all the link relations necessary to allow the code to
	run properly. Just like the command before, it also calls CSS files and other Javascript links.

- styles.css
	Contains all the styling of the project. 
	
- main.scss
	This file is used for the styling of the project. This file is compiled by sass and will adapt 
	all the code in basic css for the browsers to adapt the styling to the project. 
	
- css folder
	The prefixed folder contains a second styles.css file that is linked and called. The prefixer 
	is here to adapt the code to all the different browsers.
	The css folder contains the styles.css file that is filled with the mains.scss compiled file.

- package.json
	Contains all the configurations of the project, the sass and the prefixer configurations, the 
	repositories, the versionning etc.

## Contributors 

- Milad EZAME <milad.ezame@gmail.com>
- © Milad EZAME - OpenClassrooms 