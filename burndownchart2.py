#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np
import sys

if len(sys.argv) == 2:
    sys.argv.append("3")

days = ["fr", "sa", "so", "mo", "di", "mi", "do"] 
sprintdays = dict(zip(days, [1,2,3,4,5,6,7]))
burnt_minutes = [0]*8
burnt_actualminutes = [0]*8
sum_minutes = 0
issues = []
day_in_minutes = 480

with open (sys.argv[1]) as f:
    for line in f:
        if sys.argv[2] == "4":
            issue, minutes_str, day, actualminutes_newline = line.split(" ")  
            actualminutes = int(actualminutes_newline.rstrip("\n"))
        if sys.argv[2] == "3":
            issue, minutes_str, daynewline = line.split(" ")  
            day = daynewline.rstrip("\n")
        minutes = int(minutes_str)
        sum_minutes += minutes
        issues.append(issue)
        if day == "none":
            continue
        burnt_minutes[sprintdays[day]] += minutes
        burnt_actualminutes[sprintdays[day]] += minutes

workload_week = [sum_minutes]*8

def burn_minutes(workload_week, burndown_week):
    burnt = 0
    for i in range(len(workload_week)):
        burnt += burndown_week[i]
        workload_week[i] -= burnt
    return workload_week

def minutes2days(burnt_week):
    return [item/day_in_minutes for item in burnt_week]

burntdown = burn_minutes(workload_week, burnt_minutes)
burnt_days = minutes2days(burntdown)
burnt_days_arr = np.array(burnt_days)

tasks_in_days = sum_minutes/day_in_minutes

x = np.arange(0,8,1)
y = np.arange(tasks_in_days)
plt.plot([0,7], [tasks_in_days,0], label = 'Ideal Tasks Remaining')
plt.axis('equal')
plt.plot(x, burnt_days_arr, label = "Actual Tasks Remaining")

if sys.argv[2] == "4":
    print("Third argument is 4")
    if sys.argv[3] == "3":
        print("Fourth argument is 3")
        burntdown_actual = burn_minutes(workload_week, burnt_actualminutes)
        burnt_days_actual = minutes2days(burntdown_actual)
        burnt_days_actual_arr = np.array(burnt_days_actual)
        plt.plot(x, burnt_days_actual_arr, label = "Actual Time Burnt")

ax = plt.subplot(1,1,1)
#ax.set_xlim(xmin=0)
ax.spines['left'].set_position('zero')
ax.axhline(y=0, color='k')
#ax.axvline(x=0)

plt.xlabel('Time (in days)')
plt.ylabel('Tasks (in days)\n56h = 7 Tage')
plt.title('Burn-down Chart Sprint 2')
plt.legend()
plt.show()
