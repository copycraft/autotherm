#!/usr/bin/env python3
"""Extract content from scraped HTML and generate Next.js page files."""
import os
import re
import html

PAGES_DIR = "/tmp/autotherm-scrape/pages"
OUTPUT_DIR = "/home/copi/autotherm/app"

PAGE_MAP = {
    # HU pages
    "hu_kik-vagyunk": {"lang": "hu", "route": "kik-vagyunk"},
    "hu_szervizunk": {"lang": "hu", "route": "szervizunk"},
    "hu_arajanlatkeres": {"lang": "hu", "route": "arajanlatkeres"},
    "hu_kapcsolat": {"lang": "hu", "route": "kapcsolat"},
    "hu_termekeink": {"lang": "hu", "route": "termekeink"},
    "hu_kepgaleria": {"lang": "hu", "route": "kepgaleria"},
    "hu_hutoauto-blog": {"lang": "hu", "route": "hutoauto-blog"},
    "hu_miert-mi": {"lang": "hu", "route": "miert-mi"},
    "hu_haszonjarmu-felepitmenyek": {"lang": "hu", "route": "haszonjarmu-felepitmenyek"},
    "hu_rakterhuto-szerviz": {"lang": "hu", "route": "rakterhuto-szerviz"},
    "hu_altalanos-szerzodesi-feltetelek": {"lang": "hu", "route": "altalanos-szerzodesi-feltetelek"},
    "hu_adatkezelesi-tajekoztato": {"lang": "hu", "route": "adatkezelesi-tajekoztato"},
    "hu_jarmufelepitmeny-javitas": {"lang": "hu", "route": "jarmufelepitmeny-javitas"},
    "hu_szerviz": {"lang": "hu", "route": "szerviz"},
    # EN pages
    "en_who-are-we": {"lang": "en", "route": "who-are-we"},
    "en_contact": {"lang": "en", "route": "contact"},
    "en_quotation": {"lang": "en", "route": "quotation"},
    "en_our-products": {"lang": "en", "route": "our-products"},
    "en_why-us": {"lang": "en", "route": "why-us"},
    "en_galeries": {"lang": "en", "route": "galeries"},
    "en_van-isolations": {"lang": "en", "route": "van-isolations"},
    "en_commercial-vehicle-bodies": {"lang": "en", "route": "commercial-vehicle-bodies"},
    "en_cooled-refrigerated-vehicle-bodies": {"lang": "en", "route": "cooled-refrigerated-vehicle-bodies"},
    "en_deceased-transport": {"lang": "en", "route": "deceased-transport"},
    "en_hutoautoblog": {"lang": "en", "route": "hutoautoblog"},
    # DE pages
    "de_wer-sind-wir-3": {"lang": "de", "route": "wer-sind-wir-3"},
    "de_kuehlfahrzeug": {"lang": "de", "route": "kuehlfahrzeug"},
    "de_warum-gerade-wir": {"lang": "de", "route": "warum-gerade-wir"},
    "de_kontakt": {"lang": "de", "route": "kontakt"},
    "de_anfrage": {"lang": "de", "route": "anfrage"},
    "de_hutoauto-blog-2": {"lang": "de", "route": "hutoauto-blog-2"},
    "de_aufbauten-galerie": {"lang": "de", "route": "aufbauten-galerie"},
    # RO pages
    "ro_cine-suntem-noi": {"lang": "ro", "route": "cine-suntem-noi"},
    "ro_contact-2": {"lang": "ro", "route": "contact-2"},
    "ro_cerere-oferta": {"lang": "ro", "route": "cerere-oferta"},
    "ro_carosari-furgoane-frigorifice": {"lang": "ro", "route": "carosari-furgoane-frigorifice"},
    "ro_galerie-foto": {"lang": "ro", "route": "galerie-foto"},
    "ro_service-dube-frigorifice": {"lang": "ro", "route": "service-dube-frigorifice"},
    "ro_carosari": {"lang": "ro", "route": "carosari"},
    "ro_de-ce-noi": {"lang": "ro", "route": "de-ce-noi"},
    "ro_reparatii-dube": {"lang": "ro", "route": "reparatii-dube"},
}

LANG_LABELS = {
    "hu": {"title": "Autotherm -", "breadcrumb": "Kezdőlap"},
    "en": {"title": "Autotherm -", "breadcrumb": "Home"},
    "de": {"title": "Autotherm -", "breadcrumb": "Startseite"},
    "ro": {"title": "Autotherm -", "breadcrumb": "Acasă"},
}

CTA_TEXTS = {
    "hu": {"btn": "Ajánlatkérés", "link": "/hu/arajanlatkeres", "title": "Kérjen ajánlatot még ma!", "text": "12 órán belül árajánlatot adunk."},
    "en": {"btn": "Request a Quotation", "link": "/en/quotation", "title": "Request a Quotation Today!", "text": "We will provide a quotation within 12 hours."},
    "de": {"btn": "Kostenloses Angebot", "link": "/de/anfrage", "title": "Fordern Sie noch heute ein Angebot an!", "text": "Wir erstellen Ihnen innerhalb von 12 Stunden ein Angebot."},
    "ro": {"btn": "Cerere ofertă", "link": "/ro/cerere-oferta", "title": "Cereți o ofertă astăzi!", "text": "Vă vom oferi o ofertă în 12 ore."},
}


def extract_title(html_content):
    m = re.search(r'<title>(.*?)</title>', html_content, re.DOTALL)
    if m:
        return html.unescape(m.group(1).strip())
    return ""


def extract_description(html_content):
    m = re.search(r'<meta name="description" content="(.*?)"', html_content, re.DOTALL)
    if m:
        return html.unescape(m.group(1).strip()[:150])
    return ""


def extract_body_text(html_content, max_chars=800):
    """Extract readable paragraphs from the page content area."""
    texts = []
    in_content = False

    for line in html_content.split('\n'):
        stripped = line.strip()

        if 'id="content-section' in stripped or 'class="content-section' in stripped:
            in_content = True
            continue
        if '</div>' == stripped and in_content:
            continue

        if in_content and stripped:
            # Remove HTML tags
            clean = re.sub(r'<[^>]+>', ' ', stripped)
            clean = html.unescape(clean).strip()
            clean = re.sub(r'\s+', ' ', clean)
            if len(clean) > 60 and 'Az oldal' not in clean and 'sokszorosítása' not in clean:
                texts.append(clean)

    full = ' '.join(texts)
    return full[:max_chars] if len(full) > max_chars else full


def extract_images(html_content, max_count=3):
    """Extract image URLs from the content."""
    urls = re.findall(r'https://www\.autotherm\.hu/wp-content/uploads/[^"\')\s]+\.(?:jpg|jpeg|png|gif)', html_content)
    seen = set()
    unique = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            unique.append(u)
    return unique[:max_count]


def generate_page_html(filepath, page_info):
    """Generate the Next.js page.tsx file content."""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        html_content = f.read()

    title = extract_title(html_content)
    description = extract_description(html_content)
    body = extract_body_text(html_content)
    images = extract_images(html_content)

    lang = page_info["lang"]
    route = page_info["route"]
    cta = CTA_TEXTS[lang]
    label = LANG_LABELS[lang]
    page_title = title.replace("Autotherm", "").strip() or route.replace("-", " ").title()

    return f'''import type {{ Metadata }} from "next";

type Props = {{ params: Promise<{{ lang: string }}> }};

export const metadata: Metadata = {{
  title: "{page_title}",
  description: "{description}",
}};

export default async function Page({{ params }}: Props) {{
  await params;
  return <PageContent />;
}}

function PageContent() {{
  const cta = {cta};
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{page_title}</h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p>{body}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["{images.map((img, i) => ("}
            <div key={{i}} className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
              <img src={{img}} alt="" className="w-full h-full object-cover" />
            </div>
            ))}"}
          </div>
        </div>
      </section>

      <section className="cta-section py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{{cta.title}}</h2>
          <p className="text-lg text-blue-200 mb-8">{{cta.text}}</p>
          <a href="{{cta.link}}" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors shadow-lg">
            {{cta.btn}}
          </a>
        </div>
      </section>
    </div>
  );
}}
'''


def main():
    for basename, info in PAGE_MAP.items():
        filepath = os.path.join(PAGES_DIR, basename + ".html.raw")
        if not os.path.exists(filepath):
            print(f"Missing: {filepath}")
            continue

        lang = info["lang"]
        route = info["route"]
        out_dir = os.path.join(OUTPUT_DIR, "[lang]", route)
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "page.tsx")

        content = generate_page_html(filepath, info)
        with open(out_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated: {out_file} [{lang}]")


if __name__ == "__main__":
    main()
