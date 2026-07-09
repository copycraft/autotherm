#!/usr/bin/env python3
"""Fix common lint issues across all page files."""
import os
import re

APP_DIR = "/home/copi/autotherm/app"

# Files with <a> tag issues (use Link instead)
LINK_ISSUES = [
    (r'<a href="(/[a-z]+/[a-z-]+/?)"', r'<Link href="\1"'),
    (r'<a href=\{(/[a-z]+/[a-z-]+/?)\} ', r'<Link href={\1} '),  
]

# Unescaped entities
ENTITY_FIXES = [
    ('"Többet tenni a világért', '"Többet tenni a világért'),
    ('― ez a siker."', '&mdash; ez a siker."'),
]


def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix <a> to <Link> for internal routes
    content = re.sub(
        r'<a href="(/(?:hu|en|de|ro)/[^"]*?)">',
        r'<Link href="\1">',
        content
    )
    content = re.sub(
        r'<a href=\{(/[a-z]+/[a-z-]+/?)\} ',
        r'<Link href={\1} ',
        content
    )
    
    # Close any remaining </a> tags that were converted
    # Actually, need to also close Link tags properly
    
    # Fix unescaped quotes in JSX text content
    # Replace " within JSX text (not in attributes)
    # This is tricky, let me use a simpler approach
    
    if content != original:
        # Need to fix closing </a> tags
        # Find pairs of <Link ...> ... </a> and change to </Link>
        content = content.replace('</a>', '</Link>')
        
        # Add Link import if not present
        if 'import Link from "next/link"' not in content and 'from "next/link"' not in content:
            # Find the last import line and add Link
            content = re.sub(
                r'(import.*?;)\n',
                r'\1\nimport Link from "next/link";\n',
                content,
                count=1
            )
    
    # Fix curly quotes that are actually standard quotes
    content = content.replace('\u201c', '"').replace('\u201d', '"').replace('\u2018', "'").replace('\u2019', "'")
    
    # Escape unescaped quotes in JSX text - replace " with &quot; in specific patterns
    # This is hard to do perfectly, let me just escape the common patterns
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


def main():
    fixed = 0
    for root, dirs, files in os.walk(APP_DIR):
        for f in files:
            if f == 'page.tsx':
                filepath = os.path.join(root, f)
                if fix_file(filepath):
                    print(f"Fixed: {filepath}")
                    fixed += 1
    print(f"Total files fixed: {fixed}")


if __name__ == "__main__":
    main()
