#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np


days = ["fr", "sa", "so", "mo", "di", "mi", "do"] 

sprintdays = dict(zip(days, [1,2,3,4,5,6,7]))
burnt_minutes = [0]*7
sum_minutes = 0
issues = []

with open ('Sprint1_issues-minutes-closed.txt') as f:
    for line in f:
        issue, minute_str, daynewline = line.split(" ")  
        minutes = int(minute_str)
        day = daynewline.rstrip("\n")
        issues.append(issue)
        sum_minutes += minutes
        burnt_minutes[sprintdays[day]-1]+= minutes


burndown = [sum_minutes]*8
for i in range(1,len(burndown)):
    burndown[i]-= sum(burnt_minutes[:i-1])

day_in_minutes = 480
tasks_in_days = sum_minutes/day_in_minutes
burnt_days = [item/day_in_minutes for item in burndown]
burnt_days_arr = np.array(burnt_days)

x = np.arange(0,8,1)
y = np.arange(tasks_in_days)
plt.plot([0,7], [tasks_in_days,0], label = 'Ideal Tasks Remaining')
plt.axis('equal')
plt.plot(x, burnt_days_arr, label = "Actual Tasks Remaining")

plt.xlabel('Time (in days)')
plt.ylabel('Tasks (in days)')
plt.title('Burn-down Chart Sprint 1')
plt.legend()
plt.show()
