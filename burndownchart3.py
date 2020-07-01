#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np
import sys

"""
sys.argv[0] : scriptname
sys.argv[1] : filename
sys.argv[2] : number of columns in input file (3 or 4)
sys.argv[3] : number of graphs to plot (2 or 3)
sys.argv[4] : first day of sprint (mo, di, mi, do, fr, sa, so)
sys.argv[5] : length of sprint in days

"""

if len(sys.argv) < 4:
    sys.argv.extend(["2", "mo", "7"])

days = ["mo", "di", "mi", "do", "fr", "sa", "so"] 
start = days.index(sys.argv[4])
tail = days[:start]
sprintweek = days[start:]
sprintweek.extend(tail)

number = int(sys.argv[5])
if number < 7:
    sprintweek = sprintweek[:number]

if number > 7:
    diff = number-7
    for i in range(diff):
        sprintweek.append(days[(start+i)%7] + str(number//7))

daynumber = [i+1 for i in range(number)]

sprintdays = dict(zip(sprintweek, daynumber))
burnt_minutes = [0]*(number+1)
burnt_actualminutes = [0]*(number+1)
sum_minutes = 0
issues = []
day_in_minutes = 480
actualminutes = 0

with open (sys.argv[1]) as f:
    for line in f:
        if sys.argv[2] == "4":
            issue, minutes_str, day, actualminutes_newline = line.split(" ")  
        if sys.argv[2] == "3":
            issue, minutes_str, daynewline = line.split(" ")  
            day = daynewline.rstrip("\n")
        minutes = int(minutes_str)
        sum_minutes += minutes
        issues.append(issue)
        if day == "none":
            continue
        burnt_minutes[sprintdays[day]] += minutes
        actualminutes = int(actualminutes_newline.rstrip("\n"))
        burnt_actualminutes[sprintdays[day]] += actualminutes
    unique_issues = list(set(issues))
    print(len(unique_issues), len(issues))

print("average minutes/task = ", sum_minutes/len(issues))

def burn_minutes(workload_week, burndown_week):
    burnt = 0
    for i in range(len(workload_week)):
        burnt += burndown_week[i]
        workload_week[i] -= burnt
    return workload_week

def minutes2days(burnt_week):
    return [item/day_in_minutes for item in burnt_week]

workload_week = [sum_minutes]* (number+1)
burntdown = burn_minutes(workload_week, burnt_minutes)
burnt_days = minutes2days(burntdown)
burnt_days_arr = np.array(burnt_days)

tasks_in_days = sum_minutes/day_in_minutes

x = np.arange(0,number+1,1)
y = np.arange(tasks_in_days)
plt.plot([0,number], [tasks_in_days,0], label = 'Ideal Tasks Remaining')
plt.axis('equal')
plt.xticks(x)
plt.plot(x, burnt_days_arr, label = "Actual Tasks Remaining", marker='o')

if sys.argv[2] == "4":
    if sys.argv[3] == "3":
        workload_week = [sum_minutes]*(number+1)
        burntdown_actual = burn_minutes(workload_week, burnt_actualminutes)
        burnt_days_actual = minutes2days(burntdown_actual)
        burnt_days_actual_arr = np.array(burnt_days_actual)
        plt.plot(x, burnt_days_actual_arr, label = "Actual Time Burnt")

ax = plt.subplot(1,1,1)
if sys.argv[3] == "2":
    ax.set_ylim(ymin=0)
#ax.set_xlim(xmin=0)
sprintweek.insert(0,"0")
sprintweek = [item.rstrip('01234') for item in sprintweek]
for i in range(number+1):
    sprintweek[i] = str(i)+ "\n" + sprintweek[i]
ax.set_xticklabels(sprintweek)
ax.spines['left'].set_position('zero')
ax.spines['bottom'].set_position('zero')
ax.spines['right'].set_visible(False)
ax.spines['top'].set_visible(False)

#plt.xlabel('Time (in days)')
plt.ylabel('Tasks (in days)\n56h = 7 days')
filename = sys.argv[1].partition(".")
plt.title('Burndown Chart ' + filename[0])
plt.legend()
plt.show()
