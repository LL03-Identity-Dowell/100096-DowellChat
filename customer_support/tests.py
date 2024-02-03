
'''
import shutil
import os.path

# Creating the ZIP file
target = '/home/100096/100096/Chat'
result = '/home/100096/100096/result'


archived = shutil.make_archive(result, 'zip', target)

if os.path.exists(result + '.zip'):
   print("ZIP file created.")
else:
   print("ZIP file not created")


'''

from django.test import TestCase

# Create your tests here.