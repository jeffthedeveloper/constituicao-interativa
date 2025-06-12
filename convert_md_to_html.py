import markdown

with open('/home/ubuntu/proposta_estruturada.md', 'r') as f:
    text = f.read()

html = markdown.markdown(text)

with open('/home/ubuntu/website_proposta/index.html', 'w') as f:
    f.write(html)

