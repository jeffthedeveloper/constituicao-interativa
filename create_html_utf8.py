import markdown
import codecs

# Ler o arquivo Markdown com codificação UTF-8
with codecs.open('/home/ubuntu/proposta_estruturada.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Converter Markdown para HTML com extensões
html_content = markdown.markdown(text, extensions=['extra', 'codehilite', 'toc'])

# Template HTML completo com UTF-8 e meta tags
html_template = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Análise da viabilidade jurídica e prática da desburocratização da máquina estatal e do fomento à empregabilidade na área de segurança pública no Brasil">
    <meta name="keywords" content="segurança pública, desburocratização, parcerias público-privadas, cyber security, legislação brasileira">
    <meta name="author" content="Manus AI">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Proposta de Desburocratização e Parcerias na Segurança Pública Brasileira">
    <meta property="og:description" content="Análise aprofundada da viabilidade jurídica e prática da desburocratização da máquina estatal na área de segurança pública">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="pt_BR">
    <title>Proposta de Desburocratização e Parcerias na Segurança Pública Brasileira</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {{
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Proposta de Desburocratização e Parcerias na Segurança Pública Brasileira</h1>
            <p class="subtitle">Análise da Viabilidade Jurídica e Prática</p>
        </header>
        
        <main>
            {content}
        </main>
        
        <footer>
            <div class="footer-content">
                <p>&copy; 2025 - Análise elaborada por Manus AI</p>
                <p>Documento técnico sobre desburocratização e parcerias na segurança pública brasileira</p>
                <div class="footer-links">
                    <a href="#" onclick="window.print()">Imprimir Documento</a>
                    <a href="#" onclick="window.scrollTo({{top: 0, behavior: 'smooth'}})">Voltar ao Topo</a>
                </div>
            </div>
        </footer>
    </div>
    
    <script src="script.js"></script>
    
    <!-- Analytics e Performance -->
    <script>
        // Monitoramento de performance
        window.addEventListener('load', function() {{
            const loadTime = performance.now();
            console.log(`📊 Página carregada em ${{Math.round(loadTime)}}ms`);
        }});
        
        // Lazy loading para imagens (se houver)
        if ('IntersectionObserver' in window) {{
            const imageObserver = new IntersectionObserver((entries, observer) => {{
                entries.forEach(entry => {{
                    if (entry.isIntersecting) {{
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }}
                }});
            }});
            
            document.querySelectorAll('img[data-src]').forEach(img => {{
                imageObserver.observe(img);
            }});
        }}
    </script>
</body>
</html>'''

# Inserir o conteúdo HTML no template
final_html = html_template.format(content=html_content)

# Salvar o arquivo HTML com codificação UTF-8
with codecs.open('/home/ubuntu/website_proposta/index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("✅ Arquivo HTML criado com sucesso com codificação UTF-8!")
print("🔧 Estrutura HTML completa com meta tags e otimizações")
print("🌐 Suporte completo para caracteres acentuados em português brasileiro")

