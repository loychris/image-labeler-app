#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np
import sys

latency_average = [] #np.zeros(10)
latency_max = []#np.zeros(10)
requests_persecond_average = [] #np.zeros(10)
requests_persecond_max = [] #np.zeros(10)
total_number_of_requests = [] #np.zeros(10)
total_amount_of_data = [] #np.zeros(10)
total_requests_persecond = [] #np.zeros(10)

with open(sys.argv[1]) as f:
    l = np.zeros(100)
    j = 0
    for line in f:
        j += 1
        line.lstrip()
        if j%17 == 5:
            latency = line.split()
            #print(latency)
            '''
            if latency != []:
                latency_average.append(latency[7].rstrip('ms'))
                latency_max.append(latency[12].rstrip('ms'))
            '''
            latency_average.append(latency[1].rstrip('ms'))
            latency_max.append(latency[3].rstrip('ms'))

        elif j%17 == 6:
            requests_persecond = line.split()
            print(requests_persecond)
            requests_persecond_average.append(requests_persecond[1])
            requests_persecond_max.append(requests_persecond[3])
        elif j%17 == 12:
            continue
        elif j%17 == 15:
            continue
        elif j%17 == 16:
            continue

#print(latency_average)
#print(latency_max)
print(requests_persecond_average)
print(requests_persecond_max)
latency_average_arr = np.array([float(str) for str in latency_average])
latency_max_arr = np.array([float(str) for str in latency_max])
requests_persecond_average_arr = np.array([float(str) for str in requests_persecond_average])
requests_persecond_max_arr = np.array([float(str) for str in requests_persecond_max])


x = np.arange(0, 1000, 100)

plt.plot(x, latency_average_arr,  label = 'Average latency', marker = 'o')

plt.xlabel('Number of connections')
plt.ylabel('Time in ms')
plt.xticks(x)
plt.title('Latency (12 Threads in 30 sec)')
plt.legend()
plt.show()


plt.plot(x, requests_persecond_average_arr, label = 'Request per second average')

plt.xlabel('Number of connections')
plt.ylabel('Request per second')
plt.title('Requests per second')
plt.legend()
plt.show()

'''
plt.plot(x, offset[i], label = str(i) + '.de.pool.ntp.org')

plt.xlabel('Anfragenummer')
plt.ylabel('Offset in Sekunden')
plt.title('offset')
plt.legend()
plt.show()
'''
