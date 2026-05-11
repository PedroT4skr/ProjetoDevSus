
import os

filepath = r'c:\Users\pedro\Documents\PROJETOS\proejto sexta\src\features\ResidentDashboard.module.css'

with open(filepath, 'rb') as f:
    content = f.read()

# Remove null bytes and fix encoding if it was messed up
clean_content = content.replace(b'\x00', b'').replace(b'\xff\xfe', b'').replace(b'\xfe\xff', b'')

with open(filepath, 'wb') as f:
    f.write(clean_content)

print("File cleaned.")
