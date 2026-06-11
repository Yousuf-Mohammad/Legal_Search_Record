import re #built-in regex module

from .data import DOCUMENTS
from .models import DocumentResult

_STOP_WORDS = {
    "a", "an", "the", "and", "or", "in", "is", "to", "for",
    "with", "that", "this", "on", "by", "be", "are", "of", "at",
} # set of words that carry no search meaning and should be ignored


def _tokenize(text: str) -> set[str]:
    words = re.findall(r"[a-z]+", text.lower())
    return {word for word in words if word not in _STOP_WORDS}


def _score_document(query_tokens: set[str], doc: dict) -> float:
    # recall-style: fraction of query tokens that appear anywhere in the doc
    if not query_tokens:
        return 0.0
    doc_tokens = _tokenize(doc["full_text"])
    matched = query_tokens & doc_tokens
    return round(len(matched) / len(query_tokens), 2)


def _make_snippet(full_text: str, max_chars: int = 200) -> str:
    if len(full_text) <= max_chars:
        return full_text
    cut = full_text[:max_chars]
    last_space = cut.rfind(" ")
    return (cut[:last_space] if last_space != -1 else cut) + "…"


def search(query: str) -> list[DocumentResult]:
    #Score and rank all docs by keyword overlap with the query
    tokens = _tokenize(query)
    scored = [(doc, _score_document(tokens, doc)) for doc in DOCUMENTS]
    ranked = sorted(
        [(doc, s) for doc, s in scored if s > 0],
        key=lambda x: x[1],
        reverse=True,
    )
    return [
        DocumentResult(
            id=doc["id"],
            title=doc["title"],
            snippet=_make_snippet(doc["full_text"]),
            score=s,
            source=doc["source"],
        )
        for doc, s in ranked
    ]


def summarize(query: str, results: list[DocumentResult]) -> str:
    """Build a plain-text summary line for the API response."""
    if not results:
        return "No documents matched your query."
    titles = ", ".join(f"'{r.title}'" for r in results)
    return f"Found {len(results)} document(s) relevant to '{query}': {titles}."
