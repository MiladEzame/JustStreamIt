# JUST STREAM IT

**Version 1.0**


# Project Configuration

## Pull the project from github 
	
- After getting access to the github repository, pull the project with the following command :
	```python 	
	git clone https://github.com/MiladEzame/JustStreamIt.git
	```
## Creating a virtual environment

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

## Install requirement files

- Once the environment is __active__, and that you are in the Books_Scrapping folder , type this in the command prompt : 
	```python 	
	pip install -r requirements.txt	
	```
## Lauch the script 
	
- First, open the git bash inside the project folder if you are not in it.
Before running the script, make sure you are in the virtual environment.
You can run the file by using the following command :
	```python 	
	python *.py	
	```

## Important information about the differents files 

- test.py
	
	test

## Contributors 

- Milad EZAME <milad.ezame@gmail.com>
- © Milad EZAME - OpenClassrooms 
