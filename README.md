# Employee Tracker

## Task 

This task involved writing a command line application to help manage employees withing a particular organisation. This app uses the MySQL2 package to connect to a database on which we host employee information. Our database is made up of three tables: Department, Role and Employee. Our employee table references our role table and ou role table references our department table. You can add and delete entries from the employee, role and department tables. You can also view all entires within these tables and can update an employee role. 

## Install
To install, type `npm i` into the command line

To set up database, incuding seeds, navigate to the 'database' folder and log into the MySQL shell. Then type `source schema.sql` to set up  schema, then type `source seeds.sql` to add seeds to test database

## Usage 

To start type `npm run start` into the command line. (note: I'm unsure if its an issue with my code or the command prompt, but whenever you add, update or delete an entry from the database, you may need to press up or down on the arrow keys to get the prompt to show)

## Link To Video Walkthrough
[Link](https://drive.google.com/file/d/1bn_1fjplUgNtdj3YqO9KIUGB4HNZIwdD/view)