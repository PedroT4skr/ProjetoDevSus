
import re

filepath = r'c:\Users\pedro\Documents\PROJETOS\proejto sexta\src\features\ResidentDashboard.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Simple regex for tags (not perfect but should help)
open_tags = re.findall(r'<([a-zA-Z0-9]+)(?:\s+[^>]*[^/])?>', content)
close_tags = re.findall(r'</([a-zA-Z0-9]+)>', content)
self_closing = re.findall(r'<([a-zA-Z0-9]+)(?:\s+[^>]*)?/>', content)

tag_counts = {}
for t in open_tags:
    tag_counts[t] = tag_counts.get(t, 0) + 1
for t in close_tags:
    tag_counts[t] = tag_counts.get(t, 0) - 1

print("Tag balances (should be 0):")
for t, count in tag_counts.items():
    if count != 0:
        print(f"  {t}: {count}")

# Check braces again but more carefully
braces = 0
for i, char in enumerate(content):
    if char == '{':
        braces += 1
    elif char == '}':
        braces -= 1
    if braces < 0:
        print(f"Brace underflow at index {i}")

print(f"Final brace balance: {braces}")
