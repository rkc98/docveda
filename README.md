# Project: Design a simple To-Do List App using React


# Description:

You need to design a web-based to-do list application, as per the given requirements:
1. Tasks should be displayed in a Tabular format, using the Ant Pro table component.
2. The table should have the following columns:
a. Timestamp created: Timestamp at which a task was created.
Should be auto set when creating a new entry. A user should not be able to edit this.
b. Title: Title of the task to be done.
i. A user can set this while creating a new entry. A user can also change
this updating existing entry.
ii. Max length: 100 characters.
iii. Mandatory field
c. Description: Description of the task to be done.
i. A user can add details about this task.
ii. Max length: 1000 characters
iii. Mandatory field
d. Due Date: Expected due date to finish the task
i. A user can set this while creating a new entry. A user can also change this updating existing entry.
ii. Optional field
e. Tag: One or more tags which user can add to the entry
i. A user can set this while creating a new entry. A user can also change this updating existing entry. Multiple tags can be added to the same entry
ii. Optional field
iii. Multiple tags with the same value should be saved only once.
f. Status: Shows status of a task
i. Should be one of these values.
1. OPEN (Default value)
2. WORKING
3. DONE
4. OVERDUE
ii. Mandatory field
3. The table should support pagination.
4. User should be able to perform the following operations:
a. ADD a new to-do entry
