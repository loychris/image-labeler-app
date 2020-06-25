#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np


days = ["fr", "sa", "so", "mo", "di", "mi", "do"] 

sprintdays = dict(zip(days, [1,2,3,4,5,6,7]))
burnt_minutes = [0]*8
sum_minutes = 0
issues = []

with open ('Sprint1_issues-minutes-closed.txt') as f:
    for line in f:
        issue, minute_str, daynewline = line.split(" ")  
        minutes = int(minute_str)
        sum_minutes += minutes
        day = daynewline.rstrip("\n")
        issues.append(issue)
        if day == "none":
            continue
        burnt_minutes[sprintdays[day]]+= minutes

burndown = [sum_minutes]*8
print(burndown)
for i in range(len(burndown)):
    burndown[i]-= sum(burnt_minutes[:i+1])

day_in_minutes = 480
#hour = 60
tasks_in_days = sum_minutes/day_in_minutes
#tasks_in_hours = sum_minutes/hour
burnt_days = [item/day_in_minutes for item in burndown]
#burnt_hours = [item/hour for item in burndown]
burnt_days_arr = np.array(burnt_days)
#burnt_hours_arr = np.array(burnt_hours)

#sum_in_hours = sum_minutes/7
x = np.arange(0,8,1)
#x = np.arange(0, sum_in_hours+1,1)
y = np.arange(tasks_in_days)
#y = np.arange(tasks_in_hours)
plt.plot([0,7], [tasks_in_days,0], label = 'Ideal Tasks Remaining')
#plt.plot([0,sum_in_hours], [tasks_in_hours,0], label = 'Ideal Tasks Remaining')
plt.axis('equal')
plt.plot(x, burnt_days_arr, label = "Actual Tasks Remaining")
#plt.plot(x, burnt_hours_arr, label = 'Actual Tasks Remaining')

ax = plt.subplot(1,1,1)
ax.set_ylim(bottom = 0.)


plt.xlabel('Time (in days)')
plt.ylabel('Tasks (in days)')
#plt.ylabel('Tasks (in hours)')
plt.title('Burn-down Chart Sprint 1')
plt.legend()
plt.show()
