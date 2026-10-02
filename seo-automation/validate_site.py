from __future__ import annotations

import csv
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parent.parent


def validate_article(path: Path) -> int:
    source = path.read_text(encoding="utf-8")
    h1_count = len(re.findall(r"<h1(?:\s|>)", source, re.IGNORECASE))
    if h1_count != 1:
        raise ValueError(f"{path}: expected one H1, found {h1_count}")

    json_ld = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', source, re.DOTALL
    )
    if not json_ld:
        raise ValueError(f"{path}: no JSON-LD blocks found")
    for block in json_ld:
        json.loads(block)

    missing: list[str] = []
    for reference in re.findall(r'(?:href|src)="([^"]+)"', source):
        parsed = urlsplit(reference)
        if parsed.scheme or reference.startswith(("mailto:", "tel:", "#")):
            continue
        local_path = parsed.path
        if not local_path:
            continue
        target = (path.parent / local_path).resolve()
        if local_path.endswith("/"):
            target /= "index.html"
        if not target.exists():
            missing.append(reference)
    if missing:
        raise ValueError(f"{path}: missing local references: {missing}")

    visible_text = html.unescape(re.sub(r"<[^>]+>", " ", source))
    return len(re.findall(r"[A-Za-z0-9]+", visible_text))


def main() -> None:
    article = ROOT / "blog" / "vs-pnad-plus-professional-guide.html"
    word_count = validate_article(article)
    if not 1200 <= word_count <= 2000:
        raise ValueError(f"{article}: word count {word_count} is outside 1200-2000")

    ET.parse(ROOT / "sitemap.xml")
    for filename in (
        "product-seo-queue.csv",
        "content-calendar-template.csv",
        "seo-100-article-campaign.csv",
    ):
        with (ROOT / "seo-automation" / filename).open(
            encoding="utf-8-sig", newline=""
        ) as stream:
            list(csv.DictReader(stream))

    print(
        "PASS",
        f"article={article.name}",
        f"words={word_count}",
        "h1=1",
        "jsonld=valid",
        "sitemap=valid",
        "csv=valid",
        "local_refs=valid",
    )


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"FAIL {error}", file=sys.stderr)
        raise
