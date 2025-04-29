"""
Usage: python jupyter_to_jekyll.py <full_path_to_ipynb_file>
ipynb file shall be placed in the _posts/{dates}-{title}/ directory

"""
import os
import re
import subprocess
import argparse
import pathlib

parser = argparse.ArgumentParser()
parser.add_argument('ipynb_path', type=str)
args = parser.parse_args()


'''
Input paths
'''
this_script_dir = os.path.abspath(pathlib.Path(__file__).parent.resolve())
ipynb_file_name = os.path.basename(args.ipynb_path)
config_script_path = os.path.join(this_script_dir, 'nbconvert_config.py')
'''
Output paths
'''

# '/Users/Desktop/_posts/YYYY-MM-DD-post-name/'
out_abs_dir = os.path.abspath(pathlib.Path(args.ipynb_path).parent.resolve())
# '_posts/YYYY-MM-DD-post-name/'
out_rel_dir = '/'.join(args.ipynb_path.split('/')[:-1])

# '/Users/Desktop/_posts/YYYY-MM-DD-post-name/markdown_images/'
out_img_abs_dir = os.path.abspath(os.path.join(out_abs_dir, 'markdown_images/'))

# '_posts/YYYY-MM-DD-post-name/markdown_images/'
out_img_rel_dir = os.path.join(out_rel_dir, 'markdown_images/')

# 'YYYY-MM-DD-post-name'
file_name_with_date = ipynb_file_name.lower().replace(' ', '-').replace('.ipynb', '')

# 'YYYY-MM-DD-post-name' => 'post-name'
base_file_name = re.sub(r'^\d{4}\-\d{2}\-\d{2}\-', '', file_name_with_date)

# '/Users/Desktop/_posts/YYYY-MM-DD-post-name/post-name.md'
md_out_path = os.path.join(out_abs_dir, base_file_name + '.md')

# '/Users/Desktop/_posts/YYYY-MM-DD-post-name/YYYY-MM-DD-post-name.md'
jekyll_md_path = os.path.join(out_abs_dir, file_name_with_date + '.md')


print(f"Converting {ipynb_file_name} => {os.path.basename(jekyll_md_path)}")
subprocess.run(["jupyter", "nbconvert", args.ipynb_path, "--to", "markdown", "--config", config_script_path])

# Clean up markdown
with open(md_out_path, 'r') as fd:
    md = fd.read()
md_clean = md

# HTML cleanup
#   Remove <style> tags
md_clean = re.sub(r'\<style scoped\>(.|\n)*\<\/style\>', '', md_clean, flags=re.IGNORECASE)
#   Remove <axessubplot> tags
md_clean = re.sub(r'\<\/?axessubplot:.*\n', '', md_clean, flags=re.IGNORECASE)
#   Avoid "Tag '{%' was not properly terminated with regexp" errors
idxs = [x.start() for x in re.finditer('{%', md_clean)] + \
       [x.start() for x in re.finditer('%}', md_clean)]
       # [ x.start() for x in re.finditer('}}', md_clean) ] + \
       # [ x.start() for x in re.finditer('{{', md_clean) ]
added_offset = 0
for i in idxs:
    i += added_offset
    md_clean = md_clean[:i] + "{% raw %}" + md_clean[i:i+2] + "{% endraw %}" + md_clean[i + 2:]
    added_offset += len("{% raw %}{% endraw %}")
with open(md_out_path, 'w') as fd:
    fd.write(md_clean)

# if markdown images are empty, remove the directory
# out_img_abs_dir
if len(os.listdir(out_img_abs_dir)) == 0:
    os.rmdir(out_img_abs_dir)
    print(f"Removed empty directory: {out_img_abs_dir}")


# Rename .md file to have 'YYYY-MM-DD' prefix that Jekyll expects for all posts
os.rename(md_out_path, jekyll_md_path)
