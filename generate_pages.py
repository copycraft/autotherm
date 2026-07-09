#!/usr/bin/env python3
"""Generate page.tsx files from scraped WordPress content."""

import json, re, os, textwrap

DATA = json.load(open('/tmp/autotherm-scrape/pages_data.json'))
BASE = '/home/copi/autotherm/app'

LANG_META = {
    'hu': {'title_suffix': 'Autotherm Kft.'},
    'en': {'title_suffix': 'Autotherm Ltd.'},
    'de': {'title_suffix': 'Autotherm Kft.'},
    'ro': {'title_suffix': 'Autotherm Kft.'},
}

def find_scraped(lang, slug):
    """Find scraped file matching a slug for a given language."""
    candidates = [
        f'{lang}_{slug}.html.raw',
        f'{lang}_{slug.replace("-", "_")}.html.raw',
    ]
    for c in candidates:
        if c in DATA:
            return DATA[c]
    # Try prefix match
    for k, v in DATA.items():
        if k.startswith(f'{lang}_') and (slug in k or k.replace(f'{lang}_', '').replace('.html.raw', '').replace('-', '_') == slug.replace('-', '_')):
            return v
    return None

def clean_content(text, lang='hu'):
    """Extract real page content, stripping nav/CTA/footer noise."""
    # Remove phone header
    m = re.search(r'MENU\s*MENU', text)
    if not m:
        m = re.search(r'MENU', text)
    if m:
        text = text[m.end():]

    # Remove everything after footer markers
    footers = [
        r'Erreichbarkeiten.*', r'© 1992.*', r'Minden, amit egy hűtőautóról.*',
        r'Kedves Látogató.*', r'Subscribe Now.*', r'Töltsd le most.*',
        r'Kérem az e-bookot.*', r'Az oldal, vagy egy.*', r'Close.*',
        r'Sitz:.*', r'GPS:.*', r'Telefon:.*', r'E-Mail:.*', r'Web:.*',
        r'Munkanapokon.*', r'Share\s*:', r'Related Posts.*', r'Tags:.*',
        r'Leave Your.*', r'Comments.*', r'Read More.*', r'BLOG',
        r'Blog Home', r'\+36\s*\d{2}\s*\d{3}\s*\d{4}',
        r'\+3620\s*\d{2}\s*\d{3}\s*\d{4}',
    ]
    for pat in footers:
        text = re.sub(pat, '', text, flags=re.DOTALL | re.IGNORECASE)

    # Now remove nav items and CTA banners from the beginning
    # Build nav patterns
    nav_sets = {
        'hu': [r'Kik vagyunk\?', r'Termékeink', r'Szerviz', r'Raktérhűtő szerviz',
               r'Járműfelépítmény javítás', r'Miért mi\?', r'Galéria', r'Kapcsolat',
               r'Ajánlatkérés', r'Blog'],
        'en': [r'Who are we\?', r'Our Products', r'Why us\?', r'Galeries',
               r'Contact', r'Quotation', r'Blog', r'Service', r'Van isolations',
               r'Commercial vehicle bodies', r'Cooled refrigerated vehicle bodies',
               r'Deceased transport', r'Hutoautoblog'],
        'de': [r'Wer sind wir\?', r'Kühlfahrzeug', r'Warum gerade wir\?',
               r'Bildergalerie', r'Kontakt', r'Anfrage', r'Aufbauten-Galerie', r'Blog'],
        'ro': [r'Cine suntem noi\?', r'Carosari', r'Carosări furgoane frigorifice',
               r'De ce noi\?', r'Galerie foto', r'Service', r'Contact',
               r'Cerere ofertă', r'Dube frigorifice', r'Blog', r'Produse',
               r'Cer oferta'],
    }
    nav_pat = '(' + '|'.join(nav_sets.get(lang, nav_sets['hu'])) + ')'
    # Also merge all nav patterns for safety
    all_nav = '|'.join([item for sublist in nav_sets.values() for item in sublist])
    full_nav_pat = '(' + all_nav + ')'

    cta = [
        r'Kérje online árajánlatunkat most', r'ajánlatot kérek',
        r'Ask for your quotation online now', r'Ask for quotation', r'I want a quote',
        r'Cer oferta de preț acum', r'Cer oferta',
        r'Fragen Sie uns', r'Online Anfrage', r'Kostenloses Angebot', r'Angebot erhalten',
        r'Fordítson egy percet', r'Töltse ki az űrlapot', r'Kérjen ajánlatot', r'Ajánlatkérés',
        r'Kérem az e bookot', r'Elfogadom', r'Privacy policy',
        r'ajánlatot kérek!', r'Cer oferta!',
    ]
    cta_pat = '(' + '|'.join(cta) + ')'

    # Split into lines and remove nav-only lines
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Remove nav items from this line
        stripped = re.sub(full_nav_pat, '', line, flags=re.IGNORECASE).strip()
        stripped = re.sub(cta_pat, '', stripped, flags=re.IGNORECASE).strip()
        stripped = re.sub(r'[,\!\?\.\s\-]{2,}', ' ', stripped).strip()
        if stripped:
            cleaned.append(line)

    text = '\n'.join(cleaned)

    # Remove the nav prefix that's at the very start
    # Find first sentence that looks like real content (all-caps heading or long sentence)
    # Strategy: find first occurrence of "?" or "!" that's part of a heading that's not a nav item
    paragraphs = []
    raw_paras = text.split('\n')
    for p in raw_paras:
        p = p.strip()
        if not p:
            continue
        # Check if most of this paragraph is nav/CTA
        nav_count = len(re.findall(full_nav_pat, p, re.IGNORECASE))
        cta_count = len(re.findall(cta_pat, p, re.IGNORECASE))
        total_words = len(p.split())
        if total_words > 0 and (nav_count + cta_count) / total_words > 0.6:
            continue
        paragraphs.append(p)

    return '\n\n'.join(paragraphs)


def format_paragraphs(text):
    """Split cleaned text into paragraphs for rendering."""
    # Split by sentence-ending punctuation for natural paragraph breaks
    sentences = re.split(r'(?<=[.!?])\s+', text)
    paragraphs = []
    current = []
    char_count = 0
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        current.append(s)
        char_count += len(s)
        if char_count > 300 or s.endswith('?') or s.endswith('!'):
            paragraphs.append(' '.join(current))
            current = []
            char_count = 0
    if current:
        paragraphs.append(' '.join(current))
    return paragraphs


def slug_to_title(slug, lang):
    """Convert a slug to a display title."""
    title_map = {
        'hu': {
            'kik-vagyunk': 'Kik Vagyunk?',
            'szervizunk': 'Szervizünk',
            'arajanlatkeres': 'Ajánlatkérés',
            'kapcsolat': 'Kapcsolat',
            'termekeink': 'Termékeink',
            'kepgaleria': 'Képgaléria',
            'hutoauto-blog': 'Blog',
            'miert-mi': 'Miért Mi?',
            'haszonjarmu-felepitmenyek': 'Haszonjármű Felépítmények',
            'rakterhuto-szerviz': 'Raktérhűtő Szerviz',
            'altalanos-szerzodesi-feltetelek': 'Általános Szerződési Feltételek',
            'adatkezelesi-tajekoztato': 'Adatkezelési Tájékoztató',
            'jarmufelepitmeny-javitas': 'Járműfelépítmény Javítás',
            'szerviz': 'Szerviz',
        },
        'en': {
            'who-are-we': 'Who Are We?',
            'our-products': 'Our Products',
            'quotation': 'Request a Quotation',
            'contact': 'Contact',
            'galeries': 'Galeries',
            'deceased-transport': 'Deceased Transport',
            'van-isolations': 'Van Isolations',
            'commercial-vehicle-bodies': 'Commercial Vehicle Bodies',
            'cooled-refrigerated-vehicle-bodies': 'Cooled & Refrigerated Vehicle Bodies',
            'why-us': 'Why Us?',
            'hutoautoblog': 'Blog',
        },
        'de': {
            'wer-sind-wir-3': 'Wer Sind Wir?',
            'kuehlfahrzeug': 'Kühlfahrzeug',
            'kontakt': 'Kontakt',
            'anfrage': 'Anfrage',
            'aufbauten-galerie': 'Aufbauten Galerie',
            'warum-gerade-wir': 'Warum Gerade Wir?',
            'hutoauto-blog-2': 'Blog',
        },
        'ro': {
            'cine-suntem-noi': 'Cine Suntem Noi?',
            'contact-2': 'Contact',
            'cerere-oferta': 'Cerere Ofertă',
            'galerie-foto': 'Galerie Foto',
            'carosari-furgoane-frigorifice': 'Carosări Furgoane Frigorifice',
        },
    }
    return title_map.get(lang, {}).get(slug, slug.replace('-', ' ').title())


def generate_page(lang, slug, scraped_data):
    """Generate a page.tsx for a given language and slug."""
    title = scraped_data.get('title', slug_to_title(slug, lang))
    raw_content = scraped_data.get('content', '')

    # Clean and extract meaningful content
    clean_text = clean_content(raw_content, lang)
    paragraphs = format_paragraphs(clean_text)

    # Split title into main and description
    title_parts = title.split('•')
    h1 = title_parts[0].strip() if title_parts else slug_to_title(slug, lang)

    # Generate paragraph JSX
    para_elms = []
    for p in paragraphs:
        if not p:
            continue
        # Escape quotes for TSX
        p_esc = p.replace('{', '{{').replace('}', '}}').replace("'", "\\'")
        para_elms.append(f"          <p className=\"text-gray-700 leading-relaxed mb-4 text-lg\">{p_esc}</p>")

    para_str = '\n'.join(para_elms)

    tsx = f"""import type {{ Metadata }} from "next";

type Props = {{ params: Promise<{{ lang: string }}> }};

const pageMeta: Record<string, Metadata> = {{
  hu: {{ title: "{h1} - Autotherm Kft." }},
  en: {{ title: "{h1} - Autotherm Ltd." }},
  de: {{ title: "{h1} - Autotherm Kft." }},
  ro: {{ title: "{h1} - Autotherm Kft." }},
}};

export async function generateMetadata({{ params }}: Props): Promise<Metadata> {{
  const {{ lang }} = await params;
  return pageMeta[lang] || pageMeta.hu;
}}

export default async function Page({{ params }}: Props) {{
  const {{ lang }} = await params;
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{h1}</h1>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
{para_str}
          </div>
        </div>
      </section>
    </div>
  );
}}
"""
    return tsx


def main():
    # Define all slug-to-scraped mappings
    pages = {
        'hu': [
            'kik-vagyunk', 'szervizunk', 'arajanlatkeres', 'kapcsolat',
            'termekeink', 'kepgaleria', 'hutoauto-blog', 'miert-mi',
            'haszonjarmu-felepitmenyek', 'rakterhuto-szerviz',
            'altalanos-szerzodesi-feltetelek', 'adatkezelesi-tajekoztato',
            'jarmufelepitmeny-javitas', 'szerviz',
        ],
        'en': [
            'who-are-we', 'our-products', 'quotation', 'contact',
            'galeries', 'deceased-transport', 'van-isolations',
            'commercial-vehicle-bodies', 'cooled-refrigerated-vehicle-bodies',
            'why-us', 'hutoautoblog',
        ],
        'de': [
            'wer-sind-wir-3', 'kuehlfahrzeug', 'kontakt', 'anfrage',
            'aufbauten-galerie', 'warum-gerade-wir', 'hutoauto-blog-2',
        ],
        'ro': [
            'cine-suntem-noi', 'contact-2', 'cerere-oferta',
            'galerie-foto', 'carosari-furgoane-frigorifice',
        ],
    }

    generated = 0
    failed = []

    for lang, slugs in pages.items():
        for slug in slugs:
            dir_path = os.path.join(BASE, lang, slug)
            os.makedirs(dir_path, exist_ok=True)
            page_path = os.path.join(dir_path, 'page.tsx')

            scraped = find_scraped(lang, slug)
            if not scraped:
                failed.append(f'{lang}/{slug} (no scraped data)')
                continue

            tsx = generate_page(lang, slug, scraped)
            with open(page_path, 'w') as f:
                f.write(tsx)
            generated += 1
            print(f"  ✓ {lang}/{slug}")

    print(f"\nGenerated: {generated} pages")
    if failed:
        print(f"Failed: {len(failed)}")
        for f in failed:
            print(f"  ✗ {f}")


if __name__ == '__main__':
    main()
